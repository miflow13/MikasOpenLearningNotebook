# Public Journey and Homepage Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Mika's public learning frontier a first-class Journey feature and integrate that living context into the homepage without turning Mika's progress into a benchmark for learners.

**Architecture:** Store Mika's public state in one typed data module. Render it through small Astro components on Journey and the homepage. Reuse chronological learning-log content for the timeline and consume learner-local state from Plan 2 only when available in the browser; the public Journey remains fully useful without learner progress.

**Tech Stack:** Astro 7, TypeScript, Vitest, existing Markdown content collections, Plan-2 progress store for optional dual-position UI

**Spec:** `docs/superpowers/specs/2026-09-27-open-learning-roadmap-ux-design.md`

## Global Constraints

- Journey makes Mika's progress prominent; the main Roadmap remains learner-first.
- Show exactly one primary public “Mika is here” pin.
- The pin means current learning frontier, not completion of all earlier phases.
- Mika's public state must be editable in one central file.
- Public state fields are: current phase, 2–4 active focuses, active trails, open questions, recent milestone, updated date.
- Dual-position copy must avoid competition language; use “Different path. Same map.” where appropriate.
- The homepage order is: hero, start action, Mika pin, roadmap phases, trails, latest notebook content on mobile.
- The homepage primary CTA is “Find where to start”; secondary CTA is “Open the roadmap”.
- The Journey should normalize uncertainty by visibly showing open questions.
- Preserve the restrained notebook/editorial aesthetic.

## Review Focus

- A public Journey state with an invalid phase or trail must fail validation at build time; Task 1 tests this.
- More than four active focuses must fail validation rather than overflow the intended pin design; Task 1 tests this.
- No learner progress in localStorage must still render Journey and homepage correctly; Task 3 verifies progressive enhancement.
- A learner in the same phase as Mika must not produce “ahead/behind” or comparison language; Task 3 tests copy selection.
- Learning logs with non-date-sortable IDs must not break the timeline; Task 2 defines date extraction fallback and tests it.

---

## File Structure

- Create `src/data/journey.ts` — Mika's public frontier state and validation.
- Create `src/components/JourneyMap.astro` — four-phase map with one Mika pin.
- Create `src/components/MikaCurrentPin.astro` — compact current-focus card.
- Create `src/components/JourneyTimeline.astro` — chronological learning-log timeline.
- Create `src/components/OpenQuestions.astro` — current unanswered questions.
- Create `src/components/DualPosition.astro` — optional learner/Mika position view enhanced by Plan 2.
- Modify `src/pages/journey/index.astro` — new Journey hierarchy.
- Modify `src/pages/index.astro` — new homepage hierarchy and CTA order.
- Modify `src/styles/global.css` — journey map, pin, timeline, mobile ordering.
- Create `tests/journey-state.test.ts`
- Create `tests/journey-timeline.test.ts`

### Task 1: Centralize and validate Mika's public state

**Files:**
- Create: `src/data/journey.ts`
- Test: `tests/journey-state.test.ts`

**Interfaces:**
- Consumes: `PhaseId` and `TrailId` from `src/data/roadmap.ts`
- Produces: `interface MikaJourneyState { currentPhase: PhaseId; currentFocus: string[]; activeTrails: TrailId[]; currentQuestions: string[]; recentMilestone: string; updatedAt: string }`
- Produces: `const mikaJourney: MikaJourneyState`
- Produces: `validateJourneyState(state: MikaJourneyState): string[]`

**Initial public state:**
- `currentPhase: 'engineer'`
- `currentFocus: ['testing architecture', 'containers', 'technical documentation']`
- `activeTrails: ['linux-native', 'ai-agents', 'technical-writing']`
- `currentQuestions` includes:
  - `When does Kubernetes actually become necessary?`
  - `How should large test suites be organized?`
  - `What does good production observability look like?`
- `recentMilestone: 'Shipped Oniria as a walkable 3D library project.'`
- `updatedAt: '2026-09-27'`

- [ ] **Step 1: Write failing Journey-state tests**

Assert the initial state validates, an unknown phase fails, an unknown trail fails, zero focuses fails, five focuses fails, and an invalid ISO date fails.

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- tests/journey-state.test.ts`  
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement Journey state and validation**

Validation rules:
- 1–4 current-focus entries,
- at least one active trail,
- non-empty recent milestone,
- `updatedAt` must match `YYYY-MM-DD`,
- phase/trail values must exist in roadmap definitions.

- [ ] **Step 4: Run tests**

Run: `npm test -- tests/journey-state.test.ts`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/journey.ts tests/journey-state.test.ts
git commit -m "feat: add public journey state"
```

### Task 2: Build the Journey map, pin, timeline, and open questions

**Files:**
- Create: `src/components/JourneyMap.astro`
- Create: `src/components/MikaCurrentPin.astro`
- Create: `src/components/JourneyTimeline.astro`
- Create: `src/components/OpenQuestions.astro`
- Modify: `src/pages/journey/index.astro`
- Modify: `src/styles/global.css`
- Test: `tests/journey-timeline.test.ts`

**Interfaces:**
- Consumes: `mikaJourney`, `roadmapPhases`, learning-log notes
- Produces: `parseLearningLogDate(id: string): string | undefined`
- Produces: `sortJourneyEntries(entries): entries` newest first, with undated entries after dated entries
- Produces: one visual pin attached to `mikaJourney.currentPhase`

- [ ] **Step 1: Write failing timeline tests**

Assert:
- `learning-log-2026-09-27` parses to `2026-09-27`,
- valid dated entries sort newest first,
- an entry named `learning-log-reflection` does not throw and sorts after dated entries.

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- tests/journey-timeline.test.ts`  
Expected: FAIL.

- [ ] **Step 3: Implement timeline helpers**

Keep parsing/sorting pure and independent from Astro.

- [ ] **Step 4: Build Journey components**

Journey page order:
1. introductory copy,
2. Journey map with one Mika pin,
3. current-focus card,
4. chronological timeline,
5. open questions,
6. explanation of journal → field note → project → roadmap.

The pin card must explicitly say the phase is where Mika is currently focusing, not proof that earlier phases are “complete”.

- [ ] **Step 5: Add responsive and accessible styles**

Use semantic lists and headings. Phase labels remain text-visible. Do not rely on pin color alone.

- [ ] **Step 6: Run tests and build**

Run: `npm test && npm run build`  
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/JourneyMap.astro src/components/MikaCurrentPin.astro src/components/JourneyTimeline.astro src/components/OpenQuestions.astro src/pages/journey/index.astro src/styles/global.css tests/journey-timeline.test.ts
git commit -m "feat: add public learning journey map"
```

### Task 3: Add optional dual-position context without comparison pressure

**Files:**
- Create: `src/components/DualPosition.astro`
- Modify: `src/scripts/roadmap-progress.ts`
- Modify: `src/pages/journey/index.astro`
- Test: `tests/journey-state.test.ts`

**Interfaces:**
- Consumes: Mika phase from `mikaJourney.currentPhase`
- Consumes: learner `startingPoint` and/or most recently active skill phase from Plan 2 when available
- Produces: `getDualPositionCopy(learnerPhase: PhaseId | undefined, mikaPhase: PhaseId): { learnerLabel?: string; mikaLabel: string; message: 'Different path. Same map.' }`

- [ ] **Step 1: Add failing copy tests**

Assert same-phase, earlier-phase, later-phase, and missing learner phase all return neutral copy with no occurrence of `ahead`, `behind`, `catch up`, `better`, or `worse`.

- [ ] **Step 2: Run tests to verify failure**

Run: `npm test -- tests/journey-state.test.ts`  
Expected: FAIL.

- [ ] **Step 3: Implement neutral copy helper and component**

Without learner state, render only Mika's public position. With learner state, show both labels and:

> Different path. Same map.

Do not calculate distance between phases.

- [ ] **Step 4: Wire progressive enhancement**

The Journey page must render valid HTML with JavaScript disabled. Client script enhances the learner half only after local progress loads.

- [ ] **Step 5: Run tests and build**

Run: `npm test && npm run build`  
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/DualPosition.astro src/scripts/roadmap-progress.ts src/pages/journey/index.astro tests/journey-state.test.ts
git commit -m "feat: add shared-map journey context"
```

### Task 4: Rebuild the homepage hierarchy around orientation and companionship

**Files:**
- Modify: `src/pages/index.astro`
- Reuse: `src/components/MikaCurrentPin.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: roadmap phases, roadmap trails, `mikaJourney`, latest notes/blog entries
- Produces homepage sections in this order:
  1. hero,
  2. learning philosophy,
  3. roadmap preview,
  4. Mika current pin,
  5. trails,
  6. latest notebook content,
  7. trust statement

- [ ] **Step 1: Update hero actions**

Primary CTA copy: `Find where to start` linking to the roadmap onboarding anchor.  
Secondary CTA copy: `Open the roadmap`.

- [ ] **Step 2: Add learning philosophy section**

Show:

> Learn → Build → Break → Debug → Explain → Repeat

Explain evidence over reading completion in one concise paragraph.

- [ ] **Step 3: Reuse MikaCurrentPin on the homepage**

Show current phase, active focuses, active trails, updated date, and `Follow my journey →`.

- [ ] **Step 4: Add trail preview and trust statement**

Trail preview uses canonical trail data from Plan 1.

Trust copy states that the roadmap is a living resource built while Mika learns and that areas of limited firsthand experience are marked.

- [ ] **Step 5: Adjust mobile order**

At narrow widths, ensure the first major sections appear in this order: Hero → start action → Mika pin → roadmap → trails → latest content.

- [ ] **Step 6: Run build**

Run: `npm run build`  
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro src/styles/global.css
git commit -m "feat: center roadmap and journey on homepage"
```

### Task 5: Final Journey/homepage verification

**Files:**
- Modify as needed: Journey/homepage components and styles

**Interfaces:**
- Consumes: all Plan-3 outputs
- Produces: a public “still learning too” experience that does not require or rank learner progress

- [ ] **Step 1: Run the full unit suite**

Run: `npm test`  
Expected: PASS.

- [ ] **Step 2: Run production build**

Run: `npm run build`  
Expected: PASS.

- [ ] **Step 3: Verify no-comparison language**

Search rendered/source copy for `ahead`, `behind`, and `catch up`. Confirm none are used to compare Mika and the learner.

- [ ] **Step 4: Verify JavaScript-disabled behavior**

Journey map, Mika pin, timeline, open questions, roadmap preview, and trust statement must remain visible without client-side scripts.

- [ ] **Step 5: Verify mobile hierarchy**

At narrow width, Mika's pin appears before the full roadmap preview and no horizontal map scrolling is required.

- [ ] **Step 6: Commit verification fixes if needed**

Use a focused commit describing only the fixes.
