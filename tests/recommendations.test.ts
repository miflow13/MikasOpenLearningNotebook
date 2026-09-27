import { describe, expect, test } from 'vitest';
import { roadmapSkills } from '../src/data/roadmap';
import { createEmptyProgress, setConfidence } from '../src/lib/progress-store';
import {
  getContinueSkill,
  getOnboardingSuggestion,
  recommendNextSkill,
} from '../src/lib/recommendations';

describe('roadmap onboarding', () => {
  test.each([
    ['brand-new', 'foundations', ['terminal-filesystem', 'git-github', 'programming-fundamentals']],
    ['basics-struggle-build', 'build', ['project-structure', 'http-apis', 'files-persistence']],
    ['build-debugging-shaky', 'engineer', ['debugging', 'testing', 'state-lifecycle']],
    ['ship-fill-gaps', 'ship', ['deployment-runtime', 'documentation', 'open-source']],
  ] as const)('%s maps to the approved starting point', (choice, phase, skillIds) => {
    expect(getOnboardingSuggestion(choice)).toEqual({ phase, skillIds });
  });
});

describe('deterministic next-skill recommendations', () => {
  test('prefers a current-skill next candidate on a selected trail', () => {
    let progress = createEmptyProgress();
    progress = { ...progress, selectedTrails: ['technical-writing'] };
    expect(recommendNextSkill('git-github', roadmapSkills, progress)).toBe('open-source');
  });

  test('gives a prerequisite bonus when all prerequisites have been touched', () => {
    let progress = createEmptyProgress();
    progress = { ...progress, selectedTrails: [] };
    progress = setConfidence(progress, 'programming-fundamentals', 'encountered', '2026-09-27T22:00:00.000Z');
    expect(recommendNextSkill(undefined, roadmapSkills, progress)).toBe('terminal-filesystem');
    progress = setConfidence(progress, 'terminal-filesystem', 'encountered', '2026-09-27T22:01:00.000Z');
    expect(recommendNextSkill('terminal-filesystem', roadmapSkills, progress)).toBe('git-github');
  });

  test('never recommends a comfortable skill', () => {
    let progress = createEmptyProgress();
    progress = setConfidence(progress, 'git-github', 'comfortable', '2026-09-27T22:00:00.000Z');
    expect(recommendNextSkill('terminal-filesystem', roadmapSkills, progress)).toBe('programming-fundamentals');
  });

  test('breaks recommendation ties by canonical roadmap order', () => {
    const progress = createEmptyProgress();
    expect(recommendNextSkill(undefined, roadmapSkills, progress)).toBe('terminal-filesystem');
  });

  test('continues the last active unfinished skill', () => {
    let progress = createEmptyProgress();
    progress = setConfidence(progress, 'http-apis', 'practicing', '2026-09-27T22:00:00.000Z');
    expect(getContinueSkill(roadmapSkills, progress)).toBe('http-apis');
  });

  test('skips the last active skill once it is comfortable', () => {
    let progress = createEmptyProgress();
    progress = setConfidence(progress, 'terminal-filesystem', 'comfortable', '2026-09-27T22:00:00.000Z');
    expect(getContinueSkill(roadmapSkills, progress)).not.toBe('terminal-filesystem');
  });
});
