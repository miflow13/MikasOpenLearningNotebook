import { describe, expect, test } from 'vitest';
import {
  mikaJourney,
  validateJourneyState,
  type MikaJourneyState,
} from '../src/data/journey';

const valid = (): MikaJourneyState => ({
  currentPhase: 'engineer',
  currentFocus: ['testing architecture', 'containers', 'technical documentation'],
  activeTrails: ['linux-native', 'ai-agents', 'technical-writing'],
  currentQuestions: [
    'When does Kubernetes actually become necessary?',
    'How should large test suites be organized?',
    'What does good production observability look like?',
  ],
  recentMilestone: 'Shipped Oniria as a walkable 3D library project.',
  updatedAt: '2026-09-27',
});

describe('Mika public journey state', () => {
  test('the initial public state is valid', () => {
    expect(validateJourneyState(mikaJourney)).toEqual([]);
  });

  test('rejects an unknown phase', () => {
    expect(validateJourneyState({ ...valid(), currentPhase: 'unknown' as never }))
      .toContain('unknown current phase: unknown');
  });

  test('rejects an unknown trail', () => {
    expect(validateJourneyState({ ...valid(), activeTrails: ['missing' as never] }))
      .toContain('unknown active trail: missing');
  });

  test('requires between one and four active focus items', () => {
    expect(validateJourneyState({ ...valid(), currentFocus: [] }))
      .toContain('current focus must contain 1 to 4 items');
    expect(validateJourneyState({ ...valid(), currentFocus: ['1', '2', '3', '4', '5'] }))
      .toContain('current focus must contain 1 to 4 items');
  });

  test('requires an ISO calendar date', () => {
    expect(validateJourneyState({ ...valid(), updatedAt: 'September 27' }))
      .toContain('updatedAt must use YYYY-MM-DD');
  });
});
