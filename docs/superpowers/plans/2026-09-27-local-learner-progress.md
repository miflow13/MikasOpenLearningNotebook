# Local Learner Progress Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add private, browser-local learner progress, onboarding, trail selection, continue behavior, deterministic recommendations, and export/import/reset without accounts or server state.

**Architecture:** Keep all progress logic in pure TypeScript modules with DOM integration in small Astro components and client scripts. Persist one versioned JSON document in `localStorage`. Recommendation logic reads roadmap metadata plus progress but mutates neither.

**Tech Stack:** Astro 7, TypeScript, Vitest, browser `localStorage`, vanilla client-side DOM APIs

**Spec:** `docs/superpowers/specs/2026-09-27-open-learning-roadmap-ux-design.md`

## Global Constraints

- No accounts, backend database, cloud sync, or uploaded learner progress.
- Storage key is `mika-open-roadmap-progress-v1`.
- Schema version is `1`.
- Confidence states are exactly: `encountered`, `practicing`, `applied`, `can-explain`, `comfortable`.
- Checkpoint completion never changes confidence automatically.
- The first progress save shows one privacy notice; subsequent saves do not repeat it.
- If storage is unavailable, the roadmap remains usable in memory and explains that progress will not persist.
- Import errors must never overwrite existing progress.
- Unknown or removed skill IDs must be ignored without breaking known progress.
- All controls must be keyboard accessible and have text labels independent of emoji/color.

## Review Focus

- Corrupt or non-JSON localStorage must fall back safely without deleting the raw value; Task 1 tests this.
- Importing a future schema version must fail without mutating current progress; Task 4 tests this.
- A renamed display label must not affect saved state because only stable IDs are stored; Task 1 tests ID-based behavior.
- Completing every checkpoint must not auto-promote confidence; Task 2 tests this.
- Recommendation ties must be deterministic and never recommend a `comfortable` skill; Task 3 tests ordering.

---

## File Structure

- Create `src/lib/progress-types.ts` — progress schema and confidence types.
- Create `src/lib/progress-store.ts` — parse, validate, load, save, migrate, reset.
- Create `src/lib/recommendations.ts` — deterministic next-skill selection.
- Create `src/components/ConfidenceControl.astro` — accessible learner confidence control.
- Create `src/components/CheckpointList.astro` — local checkpoint controls.
- Create `src/components/TrailSelector.astro` — multi-select trails.
- Create `src/components/RoadmapOnboarding.astro` — optional starting-point flow.
- Create `src/components/RoadmapSettings.astro` — export/import/reset UI.
- Create `src/components/ProgressNotice.astro` — first-save privacy message / no-storage message.
- Create `src/scripts/roadmap-progress.ts` — DOM wiring and event handling.
- Modify `src/pages/roadmap/index.astro` — progress summary, continue action, phase state.
- Modify `src/pages/roadmap/[skill].astro` — confidence, checkpoints, next recommendation.
- Modify `src/styles/global.css` — progress controls.
- Create `tests/progress-store.test.ts`
- Create `tests/recommendations.test.ts`

### Task 1: Implement the versioned progress schema and storage boundary

**Files:**
- Create: `src/lib/progress-types.ts`
- Create: `src/lib/progress-store.ts`
- Test: `tests/progress-store.test.ts`

**Interfaces:**
- Produces: `type ConfidenceState = 'encountered' | 'practicing' | 'applied' | 'can-explain' | 'comfortable'`
- Produces: `interface SkillProgress { confidence?: ConfidenceState; checkpoints: Record<string, boolean>; lastTouchedAt?: string }`
- Produces: `interface RoadmapProgressV1 { version: 1; startingPoint?: PhaseId; selectedTrails: TrailId[]; lastActiveSkill?: string; privacyNoticeSeen: boolean; skills: Record<string, SkillProgress> }`
- Produces: `const STORAGE_KEY = 'mika-open-roadmap-progress-v1'`
- Produces: `createEmptyProgress(): RoadmapProgressV1`
- Produces: `parseProgress(raw: string): { ok: true; value: RoadmapProgressV1 } | { ok: false; reason: string }`
- Produces: `loadProgress(storage: Pick<Storage,'getItem'>): { progress: RoadmapProgressV1; persistent: boolean; warning?: string }`
- Produces: `saveProgress(storage: Pick<Storage,'setItem'>, progress: RoadmapProgressV1): { persistent: boolean; warning?: string }`
- Produces: `sanitizeProgress(progress, knownSkillIds, knownCheckpointIds): RoadmapProgressV1`

- [ ] **Step 1: Write failing schema/storage tests**

Assert empty defaults, valid round-trip, corrupt JSON fallback, unknown skill removal during sanitize, known skill retention, and confidence validation.

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- tests/progress-store.test.ts`  
Expected: FAIL because progress modules do not exist.

- [ ] **Step 3: Implement the pure schema and storage functions**

Do not access global `window` inside these modules. Storage is always injected for testability.

- [ ] **Step 4: Run progress-store tests**

Run: `npm test -- tests/progress-store.test.ts`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/progress-types.ts src/lib/progress-store.ts tests/progress-store.test.ts
git commit -m "feat: add local roadmap progress store"
```

### Task 2: Add confidence and checkpoint controls

**Files:**
- Create: `src/components/ConfidenceControl.astro`
- Create: `src/components/CheckpointList.astro`
- Create: `src/components/ProgressNotice.astro`
- Create: `src/scripts/roadmap-progress.ts`
- Modify: `src/pages/roadmap/[skill].astro`
- Modify: `src/styles/global.css`
- Test: `tests/progress-store.test.ts`

**Interfaces:**
- Consumes: `RoadmapSkill`, `RoadmapProgressV1`
- Produces DOM events: `roadmap:confidence-change`, `roadmap:checkpoint-change`, `roadmap:progress-saved`
- Produces data attributes: `data-skill-id`, `data-confidence`, `data-checkpoint-id`

- [ ] **Step 1: Add failing pure update tests**

Add pure helpers in `progress-store.ts` and tests for:

`setConfidence(progress, skillId, state, nowIso)`  
`setCheckpoint(progress, skillId, checkpointId, checked, nowIso)`

Assert that setting the final checkpoint leaves confidence unchanged.

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- tests/progress-store.test.ts`  
Expected: FAIL for missing update helpers.

- [ ] **Step 3: Implement update helpers and UI components**

Render five confidence radio-like buttons with visible text labels. Render checkpoints as native checkboxes. Use the client script to load, update, save, and reflect local state.

- [ ] **Step 4: Add first-save privacy behavior**

On the first successful mutation, show once:

> Your roadmap progress stays on this device. No account is required and your learning status is not uploaded anywhere.

Set `privacyNoticeSeen = true` only after showing it.

If save fails, show:

> Progress works for this visit, but this browser is not allowing persistent storage.

- [ ] **Step 5: Run tests and build**

Run: `npm test && npm run build`  
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/ConfidenceControl.astro src/components/CheckpointList.astro src/components/ProgressNotice.astro src/scripts/roadmap-progress.ts src/pages/roadmap/[skill].astro src/styles/global.css src/lib/progress-store.ts tests/progress-store.test.ts
git commit -m "feat: add learner confidence and checkpoints"
```

### Task 3: Add onboarding, trails, continue, and recommendations

**Files:**
- Create: `src/components/TrailSelector.astro`
- Create: `src/components/RoadmapOnboarding.astro`
- Create: `src/lib/recommendations.ts`
- Modify: `src/pages/roadmap/index.astro`
- Modify: `src/pages/roadmap/[skill].astro`
- Modify: `src/scripts/roadmap-progress.ts`
- Test: `tests/recommendations.test.ts`

**Interfaces:**
- Produces: `type OnboardingChoice = 'brand-new' | 'basics-struggle-build' | 'build-debugging-shaky' | 'ship-fill-gaps'`
- Produces: `getOnboardingSuggestion(choice): { phase: PhaseId; skillIds: string[] }`
- Produces: `recommendNextSkill(currentSkillId: string | undefined, skills: readonly RoadmapSkill[], progress: RoadmapProgressV1): string | undefined`
- Produces: `getContinueSkill(skills, progress): string | undefined`

**Exact onboarding mapping:**
- `brand-new` → `foundations`; `terminal-filesystem`, `git-github`, `programming-fundamentals`
- `basics-struggle-build` → `build`; `project-structure`, `http-apis`, `files-persistence`
- `build-debugging-shaky` → `engineer`; `debugging`, `testing`, `state-lifecycle`
- `ship-fill-gaps` → `ship`; `deployment-runtime`, `documentation`, `open-source`

**Recommendation algorithm:**
1. Begin with the current skill's `next` IDs when available.
2. Exclude skills whose confidence is `comfortable`.
3. Score +2 when the skill belongs to a selected trail.
4. Score +1 when all prerequisites have any confidence state.
5. Score +1 when the skill is in the same phase as the current skill.
6. Break ties by canonical roadmap order.
7. If no `next` candidate remains, choose the first non-comfortable skill in selected trails whose prerequisites are touched.
8. If still none, choose the first non-comfortable skill in canonical roadmap order.

`getContinueSkill` returns `lastActiveSkill` when it exists and is not comfortable; otherwise use `recommendNextSkill(undefined,...)`.

- [ ] **Step 1: Write failing onboarding/recommendation tests**

Cover all four onboarding choices, selected-trail preference, prerequisite bonus, deterministic tie-breaking, exclusion of comfortable skills, and fallback ordering.

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- tests/recommendations.test.ts`  
Expected: FAIL.

- [ ] **Step 3: Implement recommendation helpers**

Keep all logic pure and deterministic.

- [ ] **Step 4: Add onboarding and trail controls**

Onboarding is optional and dismissible. Trail selection is multi-select. Neither hides other roadmap content.

- [ ] **Step 5: Add Continue and Recommended Next UI**

Roadmap landing shows `Continue: <skill>` when progress exists. Skill pages show one recommended next skill plus up to three alternate next directions.

- [ ] **Step 6: Run tests and build**

Run: `npm test && npm run build`  
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/TrailSelector.astro src/components/RoadmapOnboarding.astro src/lib/recommendations.ts src/pages/roadmap src/scripts/roadmap-progress.ts tests/recommendations.test.ts
git commit -m "feat: add guided roadmap progression"
```

### Task 4: Add export, import, and reset

**Files:**
- Create: `src/components/RoadmapSettings.astro`
- Modify: `src/lib/progress-store.ts`
- Modify: `src/scripts/roadmap-progress.ts`
- Modify: `src/pages/roadmap/index.astro`
- Test: `tests/progress-store.test.ts`

**Interfaces:**
- Produces: `exportProgress(progress): string`
- Produces: `importProgress(raw, knownSkillIds, knownCheckpointIds): { ok: true; progress: RoadmapProgressV1 } | { ok: false; reason: string }`
- Produces: `resetProgress(): RoadmapProgressV1`

- [ ] **Step 1: Write failing import/export tests**

Assert valid round-trip, malformed JSON rejection, future-version rejection, unknown-ID sanitization, and that a failed import does not require callers to replace current progress.

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- tests/progress-store.test.ts`  
Expected: FAIL.

- [ ] **Step 3: Implement pure import/export helpers**

JSON export must include `version: 1`.

- [ ] **Step 4: Implement settings UI**

Export triggers a JSON file download. Import reads a selected JSON file, validates before save, and leaves current progress untouched on failure. Reset requires explicit confirmation.

- [ ] **Step 5: Run tests and build**

Run: `npm test && npm run build`  
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/RoadmapSettings.astro src/lib/progress-store.ts src/scripts/roadmap-progress.ts src/pages/roadmap/index.astro tests/progress-store.test.ts
git commit -m "feat: add roadmap progress portability"
```

### Task 5: Accessibility and persistence verification

**Files:**
- Modify as needed: roadmap components and `src/styles/global.css`

**Interfaces:**
- Consumes: all Plan-2 outputs
- Produces: keyboard-usable, local-only progress UX with graceful no-storage fallback

- [ ] **Step 1: Run the full unit suite**

Run: `npm test`  
Expected: PASS.

- [ ] **Step 2: Run production build**

Run: `npm run build`  
Expected: PASS.

- [ ] **Step 3: Manually verify keyboard behavior**

Verify confidence choices, trail selection, onboarding, checkpoints, import, export, and reset without a pointer.

- [ ] **Step 4: Manually verify storage failure mode**

Run the page with storage access blocked or stubbed to throw. Confirm controls still work for the visit and the non-persistence message appears.

- [ ] **Step 5: Manually verify mobile layout**

Check roadmap landing and one skill page at a narrow viewport. No horizontal graph or clipped controls.

- [ ] **Step 6: Commit verification fixes if needed**

Use a focused commit describing only the fixes.
