# Roadmap Content and Skill Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hard-coded roadmap prose with a validated, reusable roadmap content model and ship navigable phase, trail, skill, and career-context pages.

**Architecture:** Keep roadmap curriculum data in one typed module and render it through small Astro components. Skill pages are static routes generated from stable skill IDs. Existing field notes remain the source of durable long-form explanations; roadmap records link to them instead of duplicating article content.

**Tech Stack:** Astro 7, TypeScript, Vitest, existing Markdown content collections

**Spec:** `docs/superpowers/specs/2026-09-27-open-learning-roadmap-ux-design.md`

## Global Constraints

- The roadmap is a guided spine with branching trails, not a strict course and not a dense node graph.
- Initial trails are exactly: Web, Linux / Native, AI / Agents, Technical Writing.
- Initial phases are exactly: Foundations, Build Useful Software, Engineer It, Ship It.
- Skill IDs and checkpoint IDs must be stable and independent of display text.
- Reading a page must never mark a skill complete.
- Career context stays secondary to capability-building content.
- Preserve the quiet editorial / notebook aesthetic; no XP, badges, streaks, leaderboards, or mastery scores.
- Existing Field Notes remain separate durable content and are linked by note ID.
- The site must build without user accounts or server-side state.

## Review Focus

- Duplicate skill IDs or checkpoint IDs must fail validation rather than silently collide; Task 1 tests this.
- A skill referencing a missing prerequisite, next skill, trail, or field note must be surfaced during build-time validation; Task 1 tests graph references and Task 2 verifies note resolution.
- A skill with multiple trails must render all trail labels without duplicating its curriculum state; Task 3 tests rendering data.
- Direct navigation to an unknown skill ID must produce no generated route rather than a broken page; Task 3 tests `getStaticPaths` inputs.
- Career context must remain optional so skills without career metadata still render cleanly; Task 3 tests the optional branch.

---

## File Structure

- Create `src/data/roadmap.ts` — typed phases, trails, skills, checkpoints, graph helpers.
- Create `src/data/roadmap-validation.ts` — pure validation for IDs and cross-references.
- Create `src/components/RoadmapPhase.astro` — one phase summary and its skills.
- Create `src/components/SkillCard.astro` — compact roadmap skill row/card.
- Create `src/components/TrailBadge.astro` — textual, accessible trail marker.
- Create `src/components/CareerContext.astro` — optional secondary career context.
- Create `src/pages/roadmap/[skill].astro` — static skill detail pages.
- Modify `src/pages/roadmap/index.astro` — render the new data model.
- Create `src/pages/career/index.astro` — deeper professional-practice landing page.
- Modify `src/styles/global.css` — roadmap and skill-page presentation.
- Modify `package.json` — add Vitest and test scripts.
- Create `tests/roadmap-validation.test.ts` — content-model validation tests.
- Create `tests/roadmap-routing.test.ts` — route/helper tests.

### Task 1: Establish the typed roadmap model and validation

**Files:**
- Create: `src/data/roadmap.ts`
- Create: `src/data/roadmap-validation.ts`
- Modify: `package.json`
- Test: `tests/roadmap-validation.test.ts`

**Interfaces:**
- Produces: `type PhaseId = 'foundations' | 'build' | 'engineer' | 'ship'`
- Produces: `type TrailId = 'web' | 'linux-native' | 'ai-agents' | 'technical-writing'`
- Produces: `interface RoadmapCheckpoint { id: string; label: string }`
- Produces: `interface CareerContextData { usefulFor: string[]; interviewRelevance: 'low' | 'medium' | 'high'; portfolioEvidence: string[] }`
- Produces: `interface RoadmapSkill { id: string; title: string; phase: PhaseId; summary: string; why: string; needToKnow: string[]; mentalModel: string; trails: TrailId[]; prerequisites: string[]; next: string[]; fieldNoteIds: string[]; checkpoints: RoadmapCheckpoint[]; career?: CareerContextData }`
- Produces: `interface RoadmapPhase { id: PhaseId; number: '01' | '02' | '03' | '04'; title: string; summary: string }`
- Produces: `interface RoadmapTrail { id: TrailId; title: string; summary: string }`
- Produces: `const roadmapPhases: readonly RoadmapPhase[]`
- Produces: `const roadmapTrails: readonly RoadmapTrail[]`
- Produces: `const roadmapSkills: readonly RoadmapSkill[]`
- Produces: `validateRoadmap(skills, phases, trails): string[]` returning validation errors
- Produces: `getSkillById(id: string): RoadmapSkill | undefined`
- Produces: `getSkillsForPhase(id: PhaseId): RoadmapSkill[]`
- Produces: `getSkillsForTrail(id: TrailId): RoadmapSkill[]`

- [ ] **Step 1: Add Vitest and the test scripts**

Update `package.json` with `vitest` as a dev dependency and scripts:

`"test": "vitest run"` and `"test:watch": "vitest"`.

- [ ] **Step 2: Write failing validation tests**

Create tests asserting:

```ts
expect(validateRoadmap(validSkills, phases, trails)).toEqual([]);
expect(validateRoadmap(duplicateSkillIds, phases, trails)).toContain('duplicate skill id: git-github');
expect(validateRoadmap(duplicateCheckpointIds, phases, trails)).toContain('duplicate checkpoint id in git-github: make-commit');
expect(validateRoadmap(missingPrerequisite, phases, trails)).toContain('unknown prerequisite on testing: missing-skill');
expect(validateRoadmap(missingNext, phases, trails)).toContain('unknown next skill on git-github: missing-skill');
expect(validateRoadmap(missingTrail, phases, trails)).toContain('unknown trail on http-apis: missing-trail');
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm install && npm test -- tests/roadmap-validation.test.ts`  
Expected: FAIL because the roadmap modules do not exist.

- [ ] **Step 4: Implement the model and validation**

Create the interfaces and pure validation functions above.

Seed the model with these stable skill IDs in this roadmap order:

`terminal-filesystem`, `git-github`, `programming-fundamentals`, `runtime-code-tracing`, `project-structure`, `http-apis`, `files-persistence`, `frontend-web`, `desktop-native`, `debugging`, `testing`, `state-lifecycle`, `recovery-idempotency`, `architecture-boundaries`, `performance`, `packaging-release`, `deployment-runtime`, `documentation`, `open-source`, `professional-practice`.

Populate concise curriculum metadata grounded in the existing field notes and approved spec. Every skill must have at least one checkpoint and a stable checkpoint ID.

- [ ] **Step 5: Run validation tests**

Run: `npm test -- tests/roadmap-validation.test.ts`  
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/data/roadmap.ts src/data/roadmap-validation.ts tests/roadmap-validation.test.ts
git commit -m "feat: add validated roadmap content model"
```

### Task 2: Verify field-note references and phase/trail helpers

**Files:**
- Modify: `src/data/roadmap-validation.ts`
- Create: `tests/roadmap-routing.test.ts`
- Modify: `src/pages/roadmap/index.astro`

**Interfaces:**
- Consumes: roadmap model from Task 1
- Produces: `validateFieldNoteRefs(skills: readonly RoadmapSkill[], availableNoteIds: ReadonlySet<string>): string[]`
- Produces: `getRoadmapOrder(skillId: string): number`

- [ ] **Step 1: Write failing helper tests**

Assert phase filtering preserves roadmap order, multi-trail skills appear in each relevant trail, and missing field-note IDs return `unknown field note on <skill>: <note-id>`.

- [ ] **Step 2: Run the tests to verify failure**

Run: `npm test -- tests/roadmap-routing.test.ts`  
Expected: FAIL because the new helper functions do not exist.

- [ ] **Step 3: Implement field-note validation and ordering helpers**

Keep these functions pure. Do not import Astro content APIs into `src/data`.

- [ ] **Step 4: Replace hard-coded phase/trail arrays in `src/pages/roadmap/index.astro`**

Load notes with `getCollection('notes')`, validate the roadmap against their IDs, and throw one descriptive build-time error if validation returns errors.

Render phase and trail data from `roadmap.ts`.

- [ ] **Step 5: Run tests and build**

Run: `npm test && npm run build`  
Expected: all tests PASS and Astro build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/data/roadmap-validation.ts src/pages/roadmap/index.astro tests/roadmap-routing.test.ts
git commit -m "feat: connect roadmap model to field notes"
```

### Task 3: Add reusable roadmap components and skill detail routes

**Files:**
- Create: `src/components/RoadmapPhase.astro`
- Create: `src/components/SkillCard.astro`
- Create: `src/components/TrailBadge.astro`
- Create: `src/components/CareerContext.astro`
- Create: `src/pages/roadmap/[skill].astro`
- Modify: `src/pages/roadmap/index.astro`
- Modify: `src/styles/global.css`
- Test: `tests/roadmap-routing.test.ts`

**Interfaces:**
- Consumes: `RoadmapSkill`, `RoadmapPhase`, `RoadmapTrail`
- Produces: static route `/roadmap/<skill-id>/` for every skill
- Produces: skill page sections in this order: header, why this matters, what you need to know, mental model, evidence checkpoints, field notes, next directions, career context, From Mika's Notebook integration area reserved for Plan 3

- [ ] **Step 1: Add failing route-data tests**

Assert the route source list contains every and only `roadmapSkills.map(skill => skill.id)`.

Assert a skill with two trails returns both labels and a skill without `career` returns `undefined` without error.

- [ ] **Step 2: Run route tests to verify failure**

Run: `npm test -- tests/roadmap-routing.test.ts`  
Expected: FAIL for route-data helper assertions not yet implemented.

- [ ] **Step 3: Add `getStaticPaths` and components**

Use stable skill IDs as route params. Resolve field notes by ID. Do not add client-side progress behavior in this plan; controls may render static labels only until Plan 2.

- [ ] **Step 4: Refactor the roadmap landing page to use the new components**

The landing page must show the four phases and trail cards without duplicating the underlying skill records.

- [ ] **Step 5: Add responsive styles**

Preserve the current notebook typography and restrained borders. Ensure trail labels have readable text, not emoji-only meaning.

- [ ] **Step 6: Run tests and build**

Run: `npm test && npm run build`  
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/RoadmapPhase.astro src/components/SkillCard.astro src/components/TrailBadge.astro src/components/CareerContext.astro src/pages/roadmap src/styles/global.css tests/roadmap-routing.test.ts
git commit -m "feat: add roadmap skill pages"
```

### Task 4: Add the professional-practice landing area

**Files:**
- Create: `src/pages/career/index.astro`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: roadmap skills with `career` metadata
- Produces: `/career/` page grouping professional-practice guidance into job-reading, portfolio evidence, interviews, collaboration, documentation, unfamiliar-code debugging, and production systems

- [ ] **Step 1: Implement the career landing page**

Keep the copy explicit that this section supports capability-building rather than promising employment outcomes. Where Mika lacks firsthand team experience, label the source of guidance rather than implying direct experience.

- [ ] **Step 2: Add a secondary navigation link**

Add `career` to the site navigation after `projects` and before `writing`.

- [ ] **Step 3: Verify build and responsive layout**

Run: `npm run build`  
Expected: successful build with `/career/` emitted.

- [ ] **Step 4: Commit**

```bash
git add src/pages/career/index.astro src/components/SiteHeader.astro src/styles/global.css
git commit -m "feat: add professional practice area"
```

### Task 5: Final Plan-1 verification

**Files:**
- No new files expected

**Interfaces:**
- Consumes: all Plan-1 outputs
- Produces: a static, data-driven roadmap that works with JavaScript disabled

- [ ] **Step 1: Run all tests**

Run: `npm test`  
Expected: PASS.

- [ ] **Step 2: Run production build**

Run: `npm run build`  
Expected: PASS with roadmap skill routes and career route generated.

- [ ] **Step 3: Review generated pages**

Verify the roadmap index, one Foundations skill, one multi-trail skill, one skill without career metadata, and the career page.

- [ ] **Step 4: Commit any verification-only fixes**

Use a focused commit message describing only the fixes made.
