export type PhaseId = 'foundations' | 'build' | 'engineer' | 'ship';
export type TrailId = 'web' | 'linux-native' | 'ai-agents' | 'technical-writing';

export interface RoadmapCheckpoint {
  id: string;
  label: string;
}

export interface CareerContextData {
  usefulFor: string[];
  interviewRelevance: 'low' | 'medium' | 'high';
  portfolioEvidence: string[];
}

export interface RoadmapSkill {
  id: string;
  title: string;
  phase: PhaseId;
  summary: string;
  why: string;
  needToKnow: string[];
  mentalModel: string;
  trails: TrailId[];
  prerequisites: string[];
  next: string[];
  fieldNoteIds: string[];
  checkpoints: RoadmapCheckpoint[];
  career?: CareerContextData;
}

export interface RoadmapPhase {
  id: PhaseId;
  number: '01' | '02' | '03' | '04';
  title: string;
  summary: string;
}

export interface RoadmapTrail {
  id: TrailId;
  title: string;
  summary: string;
}

export const roadmapPhases: readonly RoadmapPhase[] = [
  { id: 'foundations', number: '01', title: 'Foundations', summary: 'Understand the machine well enough to stop treating it like magic.' },
  { id: 'build', number: '02', title: 'Build Useful Software', summary: 'Turn syntax into software that moves data and solves a real problem.' },
  { id: 'engineer', number: '03', title: 'Engineer It', summary: 'Make software easier to reason about when it changes or fails.' },
  { id: 'ship', number: '04', title: 'Ship It', summary: 'Package, deploy, document, collaborate, and hand software to other people.' },
];

export const roadmapTrails: readonly RoadmapTrail[] = [
  { id: 'web', title: 'Web', summary: 'Web applications, APIs, interactive interfaces, and deployment.' },
  { id: 'linux-native', title: 'Linux / Native', summary: 'Desktop software, operating-system boundaries, packaging, and native UI.' },
  { id: 'ai-agents', title: 'AI / Agents', summary: 'Model-powered software, tools, evaluation, containers, and observable behavior.' },
  { id: 'technical-writing', title: 'Technical Writing', summary: 'Developer documentation, research, explanation, and product learning.' },
];

export const roadmapSkills: readonly RoadmapSkill[] = [
  {
    id: 'terminal-filesystem',
    title: 'Terminal & Filesystem',
    phase: 'foundations',
    summary: 'Navigate, inspect, and change files without depending on a graphical file manager.',
    why: 'Most developer tooling eventually exposes paths, processes, files, and commands.',
    needToKnow: ['paths and working directories', 'basic shell commands', 'files versus directories', 'permissions at a beginner level'],
    mentalModel: 'The terminal is a text interface to the same filesystem your desktop shows graphically.',
    trails: ['web', 'linux-native', 'ai-agents', 'technical-writing'],
    prerequisites: [],
    next: ['git-github', 'programming-fundamentals'],
    fieldNoteIds: ['linux-fedora-fundamentals'],
    checkpoints: [
      { id: 'navigate-tree', label: 'Navigate a project tree and explain where you are.' },
      { id: 'inspect-files', label: 'Create, move, inspect, and remove files from the terminal.' },
    ],
  },
  {
    id: 'git-github',
    title: 'Git & GitHub Workflow',
    phase: 'foundations',
    summary: 'Track changes, experiment safely, and collaborate through commits and branches.',
    why: 'Version control makes experimentation recoverable and gives software work a history.',
    needToKnow: ['working tree and staging', 'commits', 'branches', 'remotes', 'push and pull', 'basic recovery'],
    mentalModel: 'Working files → stage selected changes → commit a snapshot → synchronize with a remote.',
    trails: ['web', 'linux-native', 'ai-agents', 'technical-writing'],
    prerequisites: ['terminal-filesystem'],
    next: ['project-structure', 'open-source'],
    fieldNoteIds: ['git-github-workflow', 'open-source-contribution-workflow'],
    checkpoints: [
      { id: 'make-commit', label: 'Create and inspect a meaningful commit.' },
      { id: 'merge-branch', label: 'Create and merge a branch.' },
      { id: 'recover-file', label: 'Recover an accidentally changed file without guessing.' },
      { id: 'explain-staging', label: 'Explain the staging area in your own words.' },
    ],
    career: {
      usefulFor: ['almost every collaborative software role'],
      interviewRelevance: 'medium',
      portfolioEvidence: ['a repository with clear commits and pull-request history'],
    },
  },
  {
    id: 'programming-fundamentals',
    title: 'Programming Fundamentals',
    phase: 'foundations',
    summary: 'Use data, control flow, functions, and program structure deliberately.',
    why: 'Frameworks get easier when the language underneath them is not mysterious.',
    needToKnow: ['values and types', 'conditionals and loops', 'functions', 'collections', 'errors', 'basic decomposition'],
    mentalModel: 'Programs transform input and state through a sequence of explicit decisions.',
    trails: ['web', 'linux-native', 'ai-agents'],
    prerequisites: [],
    next: ['runtime-code-tracing', 'project-structure'],
    fieldNoteIds: ['python-functions', 'javascript-typescript-react'],
    checkpoints: [
      { id: 'write-small-program', label: 'Write a small program without copying it line-for-line.' },
      { id: 'explain-flow', label: 'Trace and explain its control flow.' },
    ],
  },
  {
    id: 'runtime-code-tracing',
    title: 'Runtime & Code Tracing',
    phase: 'foundations',
    summary: 'Follow what actually runs instead of reasoning only from filenames or assumptions.',
    why: 'Many debugging mistakes start with changing code that never executes.',
    needToKnow: ['entry points', 'call paths', 'runtime versus source layout', 'logs and traces'],
    mentalModel: 'Source code is a map; runtime behavior is the route actually traveled.',
    trails: ['web', 'linux-native', 'ai-agents', 'technical-writing'],
    prerequisites: ['programming-fundamentals'],
    next: ['debugging', 'project-structure'],
    fieldNoteIds: ['code-tracing-runtime-paths', 'python-cli-entry-points-debugging'],
    checkpoints: [
      { id: 'find-entry-point', label: 'Identify the real entry point of an unfamiliar small project.' },
      { id: 'trace-call-path', label: 'Trace one user action through the functions it actually calls.' },
    ],
  },
  {
    id: 'project-structure',
    title: 'Project Structure & Boundaries',
    phase: 'build',
    summary: 'Organize code so responsibilities have names and places to live.',
    why: 'A project becomes easier to change when unrelated responsibilities are not tangled together.',
    needToKnow: ['modules', 'entry points', 'configuration boundaries', 'dependency direction', 'small focused files'],
    mentalModel: 'A module should have one job, a clear interface, and as few reasons to change as practical.',
    trails: ['web', 'linux-native', 'ai-agents'],
    prerequisites: ['programming-fundamentals'],
    next: ['http-apis', 'files-persistence', 'architecture-boundaries'],
    fieldNoteIds: ['python-project-practices', 'desktop-pet-sdk-framework-extraction'],
    checkpoints: [
      { id: 'explain-boundaries', label: 'Explain what each major module in one of your projects owns.' },
      { id: 'extract-responsibility', label: 'Move one tangled responsibility behind a clearer boundary.' },
    ],
  },
  {
    id: 'http-apis',
    title: 'HTTP & APIs',
    phase: 'build',
    summary: 'Move data between systems through requests, responses, authentication, and failures.',
    why: 'Modern software rarely lives entirely inside one process.',
    needToKnow: ['HTTP methods', 'status codes', 'JSON', 'request/response flow', 'authentication concepts', 'failure handling'],
    mentalModel: 'An API is a contract for asking another system to perform work or return data.',
    trails: ['web', 'ai-agents', 'technical-writing'],
    prerequisites: ['programming-fundamentals'],
    next: ['files-persistence', 'debugging', 'deployment-runtime'],
    fieldNoteIds: ['web-apis-networking-sql', 'content-systems-cms-data-pipelines'],
    checkpoints: [
      { id: 'make-get', label: 'Make a GET request and inspect the response.' },
      { id: 'send-write', label: 'Send data with a write request and handle a failure.' },
      { id: 'explain-contract', label: 'Explain the API contract your code depends on.' },
    ],
    career: {
      usefulFor: ['full-stack roles', 'backend roles', 'developer documentation'],
      interviewRelevance: 'high',
      portfolioEvidence: ['an integration that documents authentication, errors, and data flow'],
    },
  },
  {
    id: 'files-persistence',
    title: 'Files, Persistence & Data Flow',
    phase: 'build',
    summary: 'Keep data beyond one function call or process lifetime and reason about where it travels.',
    why: 'State becomes real when it must survive restarts, edits, missing files, and partial failure.',
    needToKnow: ['serialization', 'paths', 'read/write lifecycle', 'durable versus in-memory state', 'basic database concepts'],
    mentalModel: 'Persistence is a boundary between temporary program state and data you expect to survive.',
    trails: ['web', 'linux-native', 'ai-agents'],
    prerequisites: ['project-structure'],
    next: ['state-lifecycle', 'recovery-idempotency'],
    fieldNoteIds: ['filesystem-backed-apps', 'web-apis-networking-sql'],
    checkpoints: [
      { id: 'persist-state', label: 'Persist data and restore it after a restart.' },
      { id: 'handle-missing-data', label: 'Handle missing or unavailable persisted data without crashing the workflow.' },
    ],
  },
  {
    id: 'frontend-web',
    title: 'Frontend & Web Interfaces',
    phase: 'build',
    summary: 'Build interfaces where state, rendering, events, and network data meet.',
    why: 'User-facing web work teaches the feedback loop between state and visible behavior.',
    needToKnow: ['HTML semantics', 'CSS layout', 'JavaScript state', 'component thinking', 'client/server boundaries'],
    mentalModel: 'The UI is a projection of state plus user events, not a pile of independent pixels.',
    trails: ['web'],
    prerequisites: ['programming-fundamentals'],
    next: ['state-lifecycle', 'performance'],
    fieldNoteIds: ['javascript-typescript-react'],
    checkpoints: [
      { id: 'build-interface', label: 'Build an interface whose state changes from user input.' },
      { id: 'trace-render', label: 'Explain what causes one visible update to render.' },
    ],
  },
  {
    id: 'desktop-native',
    title: 'Desktop & Native Application Basics',
    phase: 'build',
    summary: 'Work with application lifecycle, native toolkits, operating-system behavior, and desktop constraints.',
    why: 'Native apps make platform boundaries impossible to ignore.',
    needToKnow: ['application lifecycle', 'event loops', 'native widgets', 'platform APIs', 'runtime backends'],
    mentalModel: 'Your app participates in an operating system lifecycle; it does not own the whole environment.',
    trails: ['linux-native'],
    prerequisites: ['project-structure'],
    next: ['state-lifecycle', 'packaging-release'],
    fieldNoteIds: ['gtk4-pygobject-wayland', 'gtk-application-lifecycle-gio-adw', 'desktop-pet-sdk-runtime-backends'],
    checkpoints: [
      { id: 'lifecycle-path', label: 'Trace startup, interaction, and shutdown in a desktop app.' },
      { id: 'platform-boundary', label: 'Identify one behavior owned by the toolkit or OS rather than your app.' },
    ],
  },
  {
    id: 'debugging',
    title: 'Debugging by Evidence',
    phase: 'engineer',
    summary: 'Reproduce failures, narrow hypotheses, and change code only after you know what is happening.',
    why: 'Independent developers spend more time locating causes than typing fixes.',
    needToKnow: ['reproduction', 'observability', 'hypothesis testing', 'minimal changes', 'verification'],
    mentalModel: 'Debugging is an evidence loop: observe → hypothesize → test → narrow → fix → verify.',
    trails: ['web', 'linux-native', 'ai-agents'],
    prerequisites: ['runtime-code-tracing'],
    next: ['testing', 'recovery-idempotency', 'performance'],
    fieldNoteIds: ['debugging-recovery', 'code-tracing-runtime-paths'],
    checkpoints: [
      { id: 'reproduce-first', label: 'Reproduce a bug before changing production code.' },
      { id: 'isolate-cause', label: 'Collect evidence that rules out at least one plausible cause.' },
      { id: 'verify-fix', label: 'Verify the fix against the original reproduction.' },
    ],
    career: {
      usefulFor: ['every engineering role', 'support-heavy technical writing'],
      interviewRelevance: 'high',
      portfolioEvidence: ['a bug write-up that shows reproduction, evidence, fix, and regression protection'],
    },
  },
  {
    id: 'testing',
    title: 'Testing at Useful Boundaries',
    phase: 'engineer',
    summary: 'Protect behavior with tests that fail for meaningful reasons.',
    why: 'Tests let you change software without relying entirely on memory and manual checking.',
    needToKnow: ['unit versus integration boundaries', 'regression tests', 'test-first thinking', 'asserting behavior', 'test limitations'],
    mentalModel: 'A useful test is executable evidence about behavior you care about.',
    trails: ['web', 'linux-native', 'ai-agents'],
    prerequisites: ['debugging'],
    next: ['recovery-idempotency', 'architecture-boundaries'],
    fieldNoteIds: ['testing-packaging-release'],
    checkpoints: [
      { id: 'test-existing-behavior', label: 'Write a test for behavior that already matters.' },
      { id: 'reproduce-bug-test', label: 'Reproduce a bug with a failing test before fixing it.' },
      { id: 'explain-limit', label: 'Explain something your test does not prove.' },
    ],
    career: {
      usefulFor: ['software engineering roles', 'maintaining production systems'],
      interviewRelevance: 'medium',
      portfolioEvidence: ['tests protecting a non-trivial project behavior'],
    },
  },
  {
    id: 'state-lifecycle',
    title: 'State & Feature Lifecycle',
    phase: 'engineer',
    summary: 'Model how features move between states and what must happen at each transition.',
    why: 'Many difficult bugs are really unclear lifecycle or ownership bugs.',
    needToKnow: ['state transitions', 'ownership', 'entry/exit behavior', 'pending work', 'shutdown and cleanup'],
    mentalModel: 'State is not just stored data; it is the set of valid situations and transitions your system permits.',
    trails: ['web', 'linux-native', 'ai-agents'],
    prerequisites: ['project-structure'],
    next: ['recovery-idempotency', 'architecture-boundaries'],
    fieldNoteIds: ['state-machines-architecture', 'stateful-feature-lifecycle'],
    checkpoints: [
      { id: 'draw-state-model', label: 'Model a non-trivial feature as explicit states and transitions.' },
      { id: 'trace-cleanup', label: 'Explain what cleanup or persistence belongs to a transition.' },
    ],
  },
  {
    id: 'recovery-idempotency',
    title: 'Recovery & Idempotency',
    phase: 'engineer',
    summary: 'Design retries and failure recovery without duplicating effects or destroying valid in-memory work.',
    why: 'Real systems fail halfway through operations.',
    needToKnow: ['retry safety', 'dirty state', 'idempotent operations', 'partial failure', 'deduplication'],
    mentalModel: 'A recoverable operation can be attempted again without accidentally doing the meaningful effect twice.',
    trails: ['web', 'linux-native', 'ai-agents'],
    prerequisites: ['debugging'],
    next: ['architecture-boundaries', 'deployment-runtime'],
    fieldNoteIds: ['idempotent-imports-deduplication', 'debugging-recovery', 'stateful-feature-lifecycle'],
    checkpoints: [
      { id: 'make-retry-safe', label: 'Make one failed operation safe to retry.' },
      { id: 'preserve-valid-state', label: 'Preserve valid in-memory progress across a persistence failure.' },
    ],
  },
  {
    id: 'architecture-boundaries',
    title: 'Architecture & Boundaries',
    phase: 'engineer',
    summary: 'Separate responsibilities so parts can change without forcing unrelated changes everywhere.',
    why: 'Architecture becomes useful when it reduces the cost of understanding and modifying software.',
    needToKnow: ['cohesion', 'interfaces', 'dependency direction', 'adapters', 'pure versus framework-bound logic'],
    mentalModel: 'Good boundaries make each unit understandable from its interface before you read its internals.',
    trails: ['web', 'linux-native', 'ai-agents'],
    prerequisites: ['project-structure'],
    next: ['performance', 'packaging-release'],
    fieldNoteIds: ['desktop-pet-sdk-framework-extraction', 'state-machines-architecture'],
    checkpoints: [
      { id: 'identify-responsibilities', label: 'Identify responsibilities that should change independently.' },
      { id: 'extract-adapter', label: 'Move framework-specific behavior behind a smaller interface.' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance as Observable Behavior',
    phase: 'engineer',
    summary: 'Measure where time and resources go before choosing an optimization.',
    why: 'Performance work without measurement often optimizes the wrong thing.',
    needToKnow: ['measurement', 'render/update frequency', 'resource loading', 'caching concepts', 'trade-offs'],
    mentalModel: 'Performance is a user-visible behavior produced by measurable work over time.',
    trails: ['web', 'linux-native'],
    prerequisites: ['debugging'],
    next: ['deployment-runtime'],
    fieldNoteIds: ['performance-interactive-apps', 'threejs-spatial-worlds'],
    checkpoints: [
      { id: 'measure-first', label: 'Capture evidence of a performance problem before changing code.' },
      { id: 'compare-after', label: 'Compare the same measurement after an optimization.' },
    ],
  },
  {
    id: 'packaging-release',
    title: 'Packaging & Release',
    phase: 'ship',
    summary: 'Turn a development checkout into something another person can install or run predictably.',
    why: 'Software is not really shipped if only its author can start it.',
    needToKnow: ['dependencies', 'build artifacts', 'versioning', 'release checks', 'platform packaging basics'],
    mentalModel: 'A release is a reproducible boundary between source development and a consumable artifact.',
    trails: ['linux-native', 'web', 'ai-agents'],
    prerequisites: ['testing'],
    next: ['deployment-runtime', 'documentation'],
    fieldNoteIds: ['testing-packaging-release', 'linux-app-portability-runtime-environments'],
    checkpoints: [
      { id: 'clean-install', label: 'Install or run a release from a clean starting point.' },
      { id: 'release-check', label: 'Write and follow a repeatable pre-release verification checklist.' },
    ],
  },
  {
    id: 'deployment-runtime',
    title: 'Deployment & Runtime Environments',
    phase: 'ship',
    summary: 'Understand why software behaves differently once it leaves your machine.',
    why: 'Deployment exposes assumptions about environment, configuration, networking, and persistence.',
    needToKnow: ['environment variables', 'build versus runtime', 'logs', 'serverless/container concepts', 'environment-specific failures'],
    mentalModel: 'Deployment moves the same software into a different set of runtime constraints.',
    trails: ['web', 'ai-agents', 'linux-native'],
    prerequisites: ['debugging'],
    next: ['documentation', 'professional-practice'],
    fieldNoteIds: ['deployment-debugging-vercel-serverless', 'linux-app-portability-runtime-environments'],
    checkpoints: [
      { id: 'ship-environment', label: 'Deploy software into an environment you do not control locally.' },
      { id: 'diagnose-runtime', label: 'Diagnose one environment-specific failure from logs or configuration evidence.' },
    ],
    career: {
      usefulFor: ['full-stack roles', 'platform-adjacent roles', 'self-hosted product documentation'],
      interviewRelevance: 'high',
      portfolioEvidence: ['a deployed project with documented configuration and troubleshooting'],
    },
  },
  {
    id: 'documentation',
    title: 'Documentation & Product Learning',
    phase: 'ship',
    summary: 'Explain setup, behavior, decisions, and troubleshooting from the reader’s point of view.',
    why: 'Documentation is part of whether another person can successfully use software.',
    needToKnow: ['audience and task', 'firsthand verification', 'setup flows', 'troubleshooting', 'information hierarchy'],
    mentalModel: 'Good documentation is a tested path from a reader’s question to successful action.',
    trails: ['technical-writing', 'web', 'linux-native', 'ai-agents'],
    prerequisites: ['runtime-code-tracing'],
    next: ['open-source', 'professional-practice'],
    fieldNoteIds: ['firsthand-documentation-product-research', 'issues-docs-planning'],
    checkpoints: [
      { id: 'document-clean-setup', label: 'Document setup from a clean starting point and follow it yourself.' },
      { id: 'verify-claim', label: 'Verify a technical claim firsthand or cite its authoritative source.' },
    ],
    career: {
      usefulFor: ['technical writing', 'developer relations', 'engineering teams'],
      interviewRelevance: 'high',
      portfolioEvidence: ['a tested installation guide or troubleshooting article grounded in a real project'],
    },
  },
  {
    id: 'open-source',
    title: 'Open Source Collaboration',
    phase: 'ship',
    summary: 'Contribute changes through issues, branches, pull requests, review, and maintainer context.',
    why: 'Open source provides real collaborative constraints without requiring a full-time engineering role first.',
    needToKnow: ['issue context', 'small scoped changes', 'PR descriptions', 'review feedback', 'maintainer expectations'],
    mentalModel: 'A contribution is both code and a change story another person must be able to review safely.',
    trails: ['web', 'linux-native', 'ai-agents', 'technical-writing'],
    prerequisites: ['git-github'],
    next: ['professional-practice'],
    fieldNoteIds: ['open-source-contribution-workflow', 'issues-docs-planning'],
    checkpoints: [
      { id: 'make-pr', label: 'Open a pull request with a clear problem, change, and verification story.' },
      { id: 'respond-review', label: 'Respond to review feedback by verifying it before changing code.' },
    ],
    career: {
      usefulFor: ['collaborative engineering roles', 'technical writing in open-source products'],
      interviewRelevance: 'medium',
      portfolioEvidence: ['merged contributions or thoughtful review participation'],
    },
  },
  {
    id: 'professional-practice',
    title: 'Professional Practice',
    phase: 'ship',
    summary: 'Translate technical capability into collaborative, explainable, production-minded work.',
    why: 'Professional readiness includes communication, uncertainty management, and working inside other people’s constraints.',
    needToKnow: ['reading job requirements', 'portfolio evidence', 'project explanation', 'code review habits', 'communicating uncertainty'],
    mentalModel: 'Professional practice is how technical work becomes understandable and dependable to other people.',
    trails: ['technical-writing', 'web', 'linux-native', 'ai-agents'],
    prerequisites: ['git-github', 'debugging'],
    next: [],
    fieldNoteIds: ['shipping-real-software', 'firsthand-documentation-product-research'],
    checkpoints: [
      { id: 'explain-project', label: 'Explain one project in terms of problem, decisions, trade-offs, and verification.' },
      { id: 'identify-gap', label: 'Read a job description and distinguish real skill gaps from unfamiliar wording.' },
    ],
    career: {
      usefulFor: ['job search', 'interviews', 'working with engineering teams'],
      interviewRelevance: 'high',
      portfolioEvidence: ['project case studies with concrete decisions, failures, and outcomes'],
    },
  },
];

export function getSkillById(id: string): RoadmapSkill | undefined {
  return roadmapSkills.find((skill) => skill.id === id);
}

export function getSkillsForPhase(id: PhaseId): RoadmapSkill[] {
  return roadmapSkills.filter((skill) => skill.phase === id);
}

export function getSkillsForTrail(id: TrailId): RoadmapSkill[] {
  return roadmapSkills.filter((skill) => skill.trails.includes(id));
}

