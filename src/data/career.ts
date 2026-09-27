export interface CareerSection {
  id: 'job-reading' | 'portfolio-evidence' | 'interviews' | 'collaboration' | 'documentation' | 'unfamiliar-code' | 'production-systems';
  title: string;
  summary: string;
  actions: string[];
  grounding: 'firsthand' | 'mixed' | 'externally-grounded';
}

export const careerSections: readonly CareerSection[] = [
  {
    id: 'job-reading',
    title: 'Read job descriptions without treating every noun as a gap',
    summary: 'Translate hiring language into concrete capabilities, then separate real gaps from tools or vocabulary you can learn on the job.',
    actions: ['Identify the underlying capability behind each requirement.', 'Mark which requirements you already have evidence for.', 'Choose a small number of real gaps to study instead of chasing every keyword.'],
    grounding: 'mixed',
  },
  {
    id: 'portfolio-evidence',
    title: 'Turn projects into evidence',
    summary: 'A portfolio is stronger when it shows a problem, your decisions, the failures you handled, and how you verified the result.',
    actions: ['Describe the problem before the stack.', 'Name one meaningful trade-off you made.', 'Show testing, debugging, deployment, or user evidence where it exists.'],
    grounding: 'firsthand',
  },
  {
    id: 'interviews',
    title: 'Explain how you think',
    summary: 'Interview preparation should make your real reasoning easier to communicate, not train you to perform certainty you do not have.',
    actions: ['Practice explaining one project from problem to verification.', 'Say what you would investigate when you do not know an answer.', 'Trace unfamiliar code or a bug out loud from evidence.'],
    grounding: 'mixed',
  },
  {
    id: 'collaboration',
    title: 'Work in reviewable changes',
    summary: 'Professional collaboration depends on making changes another person can understand, test, question, and safely merge.',
    actions: ['Keep branches and pull requests scoped.', 'Write a clear change story and verification notes.', 'Treat review feedback as a claim to verify, not an instruction to obey blindly.'],
    grounding: 'mixed',
  },
  {
    id: 'documentation',
    title: 'Leave a usable trail',
    summary: 'Documentation makes software easier to install, operate, debug, and maintain when the original author is not present.',
    actions: ['Test setup instructions from a clean starting point.', 'Document known failure modes and recovery paths.', 'Distinguish firsthand verification from sourced information.'],
    grounding: 'firsthand',
  },
  {
    id: 'unfamiliar-code',
    title: 'Debug code you did not write',
    summary: 'Professional work often begins in an existing system, so runtime tracing and evidence gathering matter more than knowing every file beforehand.',
    actions: ['Find the real entry point before editing.', 'Reproduce the behavior before proposing a fix.', 'Trace data and control flow until you can name the boundary that owns the problem.'],
    grounding: 'firsthand',
  },
  {
    id: 'production-systems',
    title: 'Learn what changes after localhost',
    summary: 'Production-minded work means understanding runtime environments, logs, configuration, persistence, observability, and failure outside your own machine.',
    actions: ['Deploy projects into environments you do not control locally.', 'Use logs and runtime evidence to diagnose failures.', 'Study production practices from primary documentation and experienced practitioners where firsthand experience is still limited.'],
    grounding: 'externally-grounded',
  },
];
