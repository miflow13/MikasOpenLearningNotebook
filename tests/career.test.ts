import { describe, expect, test } from 'vitest';
import { careerSections } from '../src/data/career';

describe('career professional-practice sections', () => {
  test('covers the approved professional-practice areas in a stable order', () => {
    expect(careerSections.map((section) => section.id)).toEqual([
      'job-reading',
      'portfolio-evidence',
      'interviews',
      'collaboration',
      'documentation',
      'unfamiliar-code',
      'production-systems',
    ]);
  });

  test('keeps every section capability-focused instead of outcome-promising', () => {
    for (const section of careerSections) {
      expect(section.title.length).toBeGreaterThan(0);
      expect(section.summary.length).toBeGreaterThan(20);
      expect(section.actions.length).toBeGreaterThan(0);
    }
  });
});
