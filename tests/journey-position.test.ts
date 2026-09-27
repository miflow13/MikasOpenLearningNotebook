import { describe, expect, test } from 'vitest';
import { getDualPositionCopy } from '../src/lib/journey-position';
import type { PhaseId } from '../src/data/roadmap';

const cases: Array<PhaseId | undefined> = [
  'foundations',
  'engineer',
  'ship',
  undefined,
];

describe('shared-map position copy', () => {
  test.each(cases)('stays neutral for learner phase %s', (learnerPhase) => {
    const copy = getDualPositionCopy(learnerPhase, 'engineer');
    expect(copy.message).toBe('Different path. Same map.');
    expect(copy.mikaLabel).toContain('Engineer It');
    if (learnerPhase) expect(copy.learnerLabel).toBeTruthy();

    const rendered = JSON.stringify(copy).toLowerCase();
    for (const prohibited of ['ahead', 'behind', 'catch up', 'better', 'worse']) {
      expect(rendered).not.toContain(prohibited);
    }
  });
});
