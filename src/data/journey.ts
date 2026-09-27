import {
  roadmapPhases,
  roadmapTrails,
  type PhaseId,
  type TrailId,
} from './roadmap';

export interface MikaJourneyState {
  currentPhase: PhaseId;
  currentFocus: string[];
  activeTrails: TrailId[];
  currentQuestions: string[];
  recentMilestone: string;
  updatedAt: string;
}

export const mikaJourney: MikaJourneyState = {
  currentPhase: 'engineer',
  currentFocus: [
    'testing architecture',
    'containers',
    'technical documentation',
  ],
  activeTrails: ['linux-native', 'ai-agents', 'technical-writing'],
  currentQuestions: [
    'When does Kubernetes actually become necessary?',
    'How should large test suites be organized?',
    'What does good production observability look like?',
  ],
  recentMilestone: 'Shipped Oniria as a walkable 3D library project.',
  updatedAt: '2026-09-27',
};

export function validateJourneyState(state: MikaJourneyState): string[] {
  const errors: string[] = [];
  const phaseIds = new Set(roadmapPhases.map((phase) => phase.id));
  const trailIds = new Set(roadmapTrails.map((trail) => trail.id));

  if (!phaseIds.has(state.currentPhase)) {
    errors.push(`unknown current phase: ${state.currentPhase}`);
  }
  if (state.currentFocus.length < 1 || state.currentFocus.length > 4) {
    errors.push('current focus must contain 1 to 4 items');
  }
  if (state.activeTrails.length < 1) {
    errors.push('at least one active trail is required');
  }
  for (const trail of state.activeTrails) {
    if (!trailIds.has(trail)) errors.push(`unknown active trail: ${trail}`);
  }
  if (!state.recentMilestone.trim()) {
    errors.push('recent milestone is required');
  }
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(state.updatedAt);
  if (!dateMatch) {
    errors.push('updatedAt must use a real YYYY-MM-DD calendar date');
  } else {
    const [, yearText, monthText, dayText] = dateMatch;
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    const parsed = new Date(Date.UTC(year, month - 1, day));
    const validCalendarDate =
      parsed.getUTCFullYear() === year
      && parsed.getUTCMonth() === month - 1
      && parsed.getUTCDate() === day;
    if (!validCalendarDate) {
      errors.push('updatedAt must use a real YYYY-MM-DD calendar date');
    }
  }

  return errors;
}
