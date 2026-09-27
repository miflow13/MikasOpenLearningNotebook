import { describe, expect, test } from 'vitest';
import { parseLearningLogDate, sortJourneyEntries } from '../src/lib/journey-timeline';

describe('journey timeline helpers', () => {
  test('parses dated learning-log ids', () => {
    expect(parseLearningLogDate('learning-log-2026-09-27')).toBe('2026-09-27');
  });

  test('returns undefined for undated learning logs', () => {
    expect(parseLearningLogDate('learning-log-reflection')).toBeUndefined();
  });

  test('sorts dated entries newest first and undated entries after them', () => {
    const entries = [
      { id: 'learning-log-2026-09-25' },
      { id: 'learning-log-reflection' },
      { id: 'learning-log-2026-09-27' },
      { id: 'learning-log-2026-09-26' },
    ];
    expect(sortJourneyEntries(entries).map((entry) => entry.id)).toEqual([
      'learning-log-2026-09-27',
      'learning-log-2026-09-26',
      'learning-log-2026-09-25',
      'learning-log-reflection',
    ]);
  });
});
