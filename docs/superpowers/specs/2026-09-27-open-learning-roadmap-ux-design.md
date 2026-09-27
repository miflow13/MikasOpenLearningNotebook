# Open Learning Roadmap UX Design

Date: 2026-09-27  
Status: Approved design, pending implementation plan  
Project: Mika's Open Learning Notebook

## 1. Purpose

Transform Mika's Open Learning Notebook from a public collection of notes into a living, build-first roadmap for self-taught developers while preserving the site's personal learning-journal identity.

The resource should help a learner answer three questions quickly:

1. Where should I start?
2. What should I learn next?
3. What evidence would show that I actually understand this?

The roadmap must not present Mika as a finished authority. It should explicitly separate public curriculum structure, each visitor's private progress, and Mika's own ongoing journey.

## 2. Product principles

### 2.1 Learn by building

The core learning loop is:

> Learn enough → build something → break something → debug it → explain what happened → repeat.

The roadmap should prioritize practical competence over content completion.

### 2.2 Evidence over completion

Reading a page does not complete a skill.

Each skill may include proof checkpoints such as:

- build something with the concept,
- explain it in your own words,
- recover from a common failure,
- trace a real runtime path,
- write or interpret a useful test.

Checkpoints provide evidence. They do not automatically declare mastery.

### 2.3 Learner-controlled confidence

Each learner controls their own confidence state:

1. 🌱 Encountered
2. 🧪 Practicing
3. 🔨 Applied
4. 🧠 Can Explain
5. ✅ Comfortable

Completing all evidence checkpoints may prompt the learner to reconsider their confidence state, but the system never advances it automatically.

### 2.4 No false precision

Do not show learning percentages that imply objective mastery.

Counts such as “12 / 46 skills touched” are acceptable for orientation, but should not be presented as a skill score or proficiency percentage.

### 2.5 Intellectual honesty

The resource must distinguish:

- roadmap truth: what belongs in the learning system,
- learner progress: private local state,
- Mika's journey: public experience, current focus, limitations, and evidence.

Mika's own status is contextual, not authoritative.

## 3. Audience

Primary audience:

- self-taught developers who need structure,
- learners who know syntax but struggle to build independently,
- developers who can build but want stronger debugging, testing, architecture, or deployment fundamentals,
- people filling gaps for interviews, portfolio work, or professional readiness.

Secondary audience:

- readers following Mika's public learning journey,
- technical writers and open-source contributors interested in learning-in-public workflows.

## 4. Information architecture

Primary navigation:

1. Roadmap
2. Field Notes
3. Journey
4. Projects
5. Writing
6. Topics
7. About

The roadmap is the stable spine.

Field Notes contain durable explanations and reusable mental models.

Journey contains chronological learning logs and Mika's current public position.

Projects provide evidence of concepts surviving contact with real software.

Writing contains polished essays and articles.

Topics provide free-form exploration outside the roadmap.

## 5. Roadmap model

Use a guided spine with branching trails.

### 5.1 Core phases

#### Phase 01 — Foundations

Examples:

- terminal and filesystem basics,
- Git and GitHub,
- programming fundamentals,
- code tracing,
- runtime and entry-point basics.

#### Phase 02 — Build Useful Software

Examples:

- project structure,
- APIs,
- persistence,
- frontend/web,
- desktop/native,
- data flow.

#### Phase 03 — Engineer It

Examples:

- debugging,
- testing,
- state and lifecycle design,
- recovery and idempotency,
- architecture,
- performance.

#### Phase 04 — Ship It

Examples:

- packaging,
- deployment,
- documentation,
- open source,
- production/runtime environments,
- professional practice.

The phases give direction but do not enforce strict sequencing.

## 6. Branching trails

Trails overlay the roadmap rather than duplicating it.

Initial trails:

- Web
- Linux / Native
- AI / Agents
- Technical Writing

A skill can belong to multiple trails.

Example:

- HTTP & APIs can belong to Web and AI / Agents.
- Git can belong to every trail.
- Documentation can belong to Technical Writing and Ship It.

A learner may select multiple trails simultaneously.

Selected trails affect emphasis and recommendations but never hide the rest of the roadmap.

## 7. Homepage UX

The homepage should perform three jobs:

1. explain the resource,
2. offer a clear starting action,
3. show that Mika is still actively learning.

### 7.1 Hero

Headline:

> A living roadmap for self-taught developers.

Supporting idea:

> Learn by building real things. Track what you understand. Follow my journey while I do the same.

Primary CTA:

- Find where to start

Secondary CTA:

- Open the roadmap

### 7.2 Learning philosophy

Show the loop:

> Learn → Build → Break → Debug → Explain → Repeat

Explain that the roadmap measures evidence, not reading completion.

### 7.3 Roadmap preview

Show the four phases with concise topic examples.

### 7.4 Mika's public pin

Show:

- current phase,
- current focus areas,
- active trails,
- last updated date,
- link to Journey.

Suggested copy:

> I'm still learning too.

### 7.5 Trails

Show selectable or explorable trail cards.

### 7.6 Latest content

Show a small number of current Field Notes, Journey entries, or Project updates.

### 7.7 Trust statement

Explain that the roadmap is not a claim of mastery and is being refined through projects, primary documentation, and continued study.

## 8. Onboarding

Offer a short optional “Where should I start?” flow.

Do not use a test score, expertise badge, or diagnostic grade.

Prompt:

- I'm brand new to programming.
- I know the basics, but I struggle to build things.
- I can build things, but debugging or architecture is shaky.
- I already ship projects and want to fill gaps.

The answer should only:

- highlight a suggested starting phase,
- recommend 2–3 first skills,
- save a local starting-point preference.

Learners can ignore or change the suggestion at any time.

## 9. Roadmap landing page

The roadmap landing page should show:

- title and philosophy,
- local progress summary,
- selected trails,
- “Continue” action,
- the four phases,
- current phase expanded,
- other phases collapsed by default.

### 9.1 Continue behavior

“Continue” should resume the learner's most recently active unfinished skill.

It must not simply advance to the numerically next item.

### 9.2 Phase display

Each phase should show:

- phase title,
- short description,
- learner activity count,
- core skills,
- trail markers on relevant skills.

Avoid giant graph visualizations.

## 10. Skill page UX

Each skill page should use a consistent hierarchy.

### 10.1 Header

Show:

- skill name,
- roadmap phase,
- trail membership,
- learner confidence control.

### 10.2 Why this matters

Explain the practical reason the concept belongs in the roadmap.

### 10.3 What you actually need to know

Keep scope explicit and beginner-oriented.

Avoid implying that every subtopic must be mastered before progressing.

### 10.4 Mental model

Use a concise explanation, diagram, or example where helpful.

### 10.5 Evidence checkpoints

Each checkpoint is checkable and saved locally.

Examples:

- create a repository,
- make and inspect commits,
- recover a changed file,
- explain the staging area,
- reproduce a bug with a failing test.

### 10.6 Field Notes

Link to durable notes relevant to the skill.

### 10.7 Next directions

Show 2–4 sensible next skills.

One may be labeled “Recommended next.”

Recommendation inputs:

- prerequisite completion,
- selected trails,
- learner confidence state,
- recent activity.

No AI is required.

### 10.8 Career context

Keep career information secondary.

Show concise context such as:

- commonly useful for,
- interview relevance,
- useful portfolio evidence.

Deeper career guidance belongs in its own section.

### 10.9 From Mika's Notebook

This section appears after the learner-focused material.

It may show:

- Mika's current relationship with the topic,
- projects where she used it,
- what changed her understanding,
- what she still does not understand well,
- links to related Journey entries.

On mobile, this section may be collapsible.

## 11. Local progress model

No account is required.

No learner progress should be uploaded to a server.

Use browser-local persistence.

### 11.1 Stored data

Store only information needed for roadmap behavior, such as:

- schema/version number,
- starting-point preference,
- selected trails,
- recent active skill,
- per-skill confidence state,
- per-checkpoint completion.

### 11.2 Stable identifiers

Each skill and checkpoint must have a stable internal ID independent of display text.

Changing a label must not erase progress.

### 11.3 Privacy copy

On first progress save, show a small one-time notice:

> Your roadmap progress stays on this device. No account is required and your learning status is not uploaded anywhere.

Do not repeatedly show the notice.

### 11.4 Progress tools

Provide:

- Export progress as JSON,
- Import progress from JSON,
- Reset roadmap after confirmation.

### 11.5 Migration behavior

The stored schema must include a version field.

Future roadmap changes should preserve known skill IDs and gracefully ignore unknown fields or skills.

## 12. Journey UX

Journey is where Mika's own progress becomes prominent.

The goal is emotional context without comparison pressure.

Core message:

> You are not behind. I'm still on the map too.

### 12.1 Public map pin

Show one primary “Mika is here” pin.

The pin represents her current learning frontier, not completion of all earlier material.

Show:

- current phase,
- 2–4 active focuses,
- active trails,
- recent milestone,
- last updated date.

### 12.2 Public journey timeline

Show a chronological timeline of:

- projects,
- breakthroughs,
- bugs,
- learning logs,
- interviews,
- open-source contributions,
- milestones.

### 12.3 Open questions

Maintain a visible section for what Mika is still figuring out.

This should normalize uncertainty and make the resource feel alive.

### 12.4 Dual-map language

Where useful, show:

- Your private position
- Mika's public position

Use language such as:

> Different path. Same map.

Do not imply the learner should catch up to Mika.

## 13. Mika progress data model

Mika's public state should be easy to update without editing many pages.

Suggested fields:

- currentPhase
- currentFocus[]
- activeTrails[]
- currentQuestions[]
- recentMilestone
- updatedAt

This should live in one central data file or content record.

## 14. Career and professional practice

Use light career context on skill pages.

Create a deeper career/professional-practice area for topics such as:

- reading job descriptions,
- identifying real skill gaps,
- portfolio evidence,
- explaining projects in interviews,
- technical interview preparation,
- code review,
- issue and PR etiquette,
- working with unfamiliar code,
- communicating uncertainty,
- documentation habits,
- production systems.

Where Mika lacks direct professional-team experience, distinguish:

- personal/project/client/open-source experience,
- externally grounded information,
- areas where she is still seeking firsthand experience.

## 15. Visual design

Preserve the current quiet editorial / notebook aesthetic.

Prefer:

- typography,
- rules,
- annotations,
- restrained cards,
- subtle paper/workbench cues,
- readable hierarchy,
- progressive disclosure.

Avoid:

- gamified XP,
- confetti,
- streak pressure,
- giant gradient SaaS hero sections,
- leaderboard behavior,
- false mastery scores,
- dense node graphs.

The mechanics can be sophisticated without looking like a course platform.

## 16. Mobile behavior

Mobile priority order on the homepage:

1. Hero
2. Find where to start
3. Mika's current pin
4. Roadmap phases
5. Trails
6. Latest notebook content

On skill pages:

- keep the learner's confidence control visible,
- keep evidence checkpoints easy to tap,
- collapse lower-priority Mika context if needed,
- avoid horizontal graph navigation.

## 17. Accessibility

Requirements:

- all progress controls keyboard accessible,
- all status states have text labels, not emoji-only meaning,
- roadmap sections use semantic headings,
- phase expand/collapse controls expose state correctly,
- color is never the only progress signal,
- touch targets remain usable on mobile,
- local-progress notices are readable by screen readers.

## 18. Error handling and resilience

### 18.1 localStorage unavailable

If browser storage is unavailable:

- the roadmap remains fully usable,
- controls should degrade to non-persistent state,
- show a concise message that progress will not persist.

### 18.2 Invalid import

If imported JSON is malformed or incompatible:

- do not overwrite existing progress,
- explain the error,
- leave current state untouched.

### 18.3 Removed or renamed skills

If a stored skill ID no longer exists:

- preserve unrelated progress,
- ignore unknown IDs,
- do not fail the entire load.

## 19. Testing strategy

### 19.1 Pure progress logic

Test independently from the UI:

- confidence updates,
- checkpoint updates,
- selected trails,
- recent activity,
- recommendation selection,
- export/import,
- schema migrations,
- invalid data handling.

### 19.2 UI behavior

Test:

- phase expansion,
- confidence control keyboard behavior,
- checkpoint persistence,
- onboarding choices,
- trail selection,
- continue behavior,
- first-save privacy notice,
- reset confirmation.

### 19.3 Content integrity

Validate:

- unique stable skill IDs,
- unique checkpoint IDs within each skill,
- valid phase references,
- valid trail references,
- valid prerequisite references,
- valid next-skill references.

### 19.4 Responsive checks

Verify:

- roadmap landing page,
- skill page,
- Journey pin,
- onboarding,
- export/import/reset controls

at mobile and desktop widths.

## 20. Suggested implementation boundaries

Keep content data separate from learner state.

Suggested conceptual units:

- roadmap content model,
- progress store,
- recommendation logic,
- onboarding preference,
- Journey/Mika public state,
- presentational Astro components.

The progress store should not own roadmap content.

Recommendation logic should consume roadmap metadata and learner state without mutating either.

Mika's public Journey state should be editable independently from learner-progress code.

## 21. Out of scope for this version

Do not add:

- user accounts,
- cloud sync,
- social profiles,
- leaderboards,
- AI tutoring,
- automated skill assessment,
- public learner progress,
- badges or XP,
- course certificates,
- employment outcome claims.

These can be revisited only if the simpler system proves useful.

## 22. Success criteria

The redesign is successful if a first-time visitor can:

1. understand the purpose of the site within a few seconds,
2. find a plausible starting point without taking a test,
3. follow one or more learning trails,
4. save confidence states and proof checkpoints locally,
5. resume where they left off,
6. understand what evidence would demonstrate a skill,
7. see Mika's current public learning position without treating it as a benchmark,
8. distinguish durable roadmap guidance from Mika's personal journey,
9. use the site fully without creating an account,
10. export or restore local progress.

The resource should feel like a companion for self-taught developers, not a course platform and not a claim that the author has already finished the journey.
