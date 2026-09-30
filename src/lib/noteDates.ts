import type { CollectionEntry } from 'astro:content';

export const noteDates = {
  'agent-systems-local-frontier-coordination': '2026-09-25',
  'ai-skills-tools-agents-workflows': '2026-09-25',
  'code-tracing-runtime-paths': '2026-09-21',
  'content-systems-cms-data-pipelines': '2026-09-23',
  'debugging-recovery': '2026-09-08',
  'deployment-debugging-vercel-serverless': '2026-09-25',
  'desktop-pet-sdk-framework-extraction': '2026-09-16',
  'desktop-pet-sdk-runtime-backends': '2026-09-16',
  'determinism-reproducibility-calibration': '2026-09-25',
  'docker-kubernetes-containers-orchestration': '2026-09-27',
  'empirical-software-research': '2026-09-29',
  'evidence-bound-decision-systems': '2026-09-29',
  'filesystem-backed-apps': '2026-09-21',
  'firsthand-documentation-product-research': '2026-09-25',
  'focusshell-architecture-webkitgtk': '2026-09-16',
  'git-github-workflow': '2026-09-08',
  'gtk-application-lifecycle-gio-adw': '2026-09-16',
  'gtk4-pygobject-wayland': '2026-09-08',
  'idempotent-imports-deduplication': '2026-09-21',
  'issues-docs-planning': '2026-09-08',
  'javascript-typescript-react': '2026-09-08',
  'learning-log-2026-09-25': '2026-09-25',
  'learning-log-2026-09-26': '2026-09-26',
  'learning-log-2026-09-27': '2026-09-27',
  'learning-log-2026-09-29': '2026-09-29',
  'learning-principles': '2026-09-08',
  'linux-app-portability-runtime-environments': '2026-09-25',
  'linux-fedora-fundamentals': '2026-09-08',
  'open-source-contribution-workflow': '2026-09-16',
  'performance-interactive-apps': '2026-09-23',
  'pixel-art-animation-pipeline': '2026-09-08',
  'python-cli-entry-points-debugging': '2026-09-16',
  'python-functions': '2026-09-03',
  'python-project-practices': '2026-09-08',
  'ravel-agent-behavior-evaluation': '2026-09-25',
  'shipping-real-software': '2026-09-23',
  'small-local-ai-systems': '2026-09-29',
  'source-code-as-data-music-pipeline': '2026-09-21',
  'state-machines-architecture': '2026-09-08',
  'stateful-feature-lifecycle': '2026-09-20',
  'testing-packaging-release': '2026-09-08',
  'threejs-spatial-worlds': '2026-09-23',
  'web-apis-networking-sql': '2026-09-08',
} as const;

type Note = CollectionEntry<'notes'>;
type NoteId = keyof typeof noteDates;

export function noteDay(note: Pick<Note, 'id'>): string {
  const day = noteDates[note.id as NoteId];

  if (!day) {
    throw new Error(`Missing notebook date for entry: ${note.id}`);
  }

  return day;
}

export function formatNoteDay(day: string): string {
  const [year, month, date] = day.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, date)));
}

export function displayNoteTitle(note: Pick<Note, 'id' | 'data'>): string {
  const formattedDay = formatNoteDay(noteDay(note));
  return note.data.title.includes(formattedDay)
    ? note.data.title
    : `${formattedDay} — ${note.data.title}`;
}

export function compareNotesNewestFirst(a: Note, b: Note): number {
  const byDay = noteDay(b).localeCompare(noteDay(a));
  if (byDay !== 0) return byDay;

  const byOrder = b.data.order - a.data.order;
  if (byOrder !== 0) return byOrder;

  return a.data.title.localeCompare(b.data.title);
}
