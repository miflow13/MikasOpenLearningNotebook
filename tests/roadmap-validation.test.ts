import { describe, expect, test } from 'vitest';
import {
  validateRoadmap,
  type RoadmapPhase,
  type RoadmapSkill,
  type RoadmapTrail,
} from '../src/data/roadmap-validation';

const phases: RoadmapPhase[] = [
  { id: 'foundations', number: '01', title: 'Foundations', summary: 'Start here.' },
];

const trails: RoadmapTrail[] = [
  { id: 'web', title: 'Web', summary: 'Build for the web.' },
];

const skill = (overrides: Partial<RoadmapSkill> = {}): RoadmapSkill => ({
  id: 'git-github',
  title: 'Git & GitHub',
  phase: 'foundations',
  summary: 'Version control.',
  why: 'Recover mistakes and collaborate.',
  needToKnow: ['commits'],
  mentalModel: 'working tree → commit',
  trails: ['web'],
  prerequisites: [],
  next: [],
  fieldNoteIds: [],
  checkpoints: [{ id: 'make-commit', label: 'Make a commit' }],
  ...overrides,
});

describe('validateRoadmap', () => {
  test('accepts valid roadmap data', () => {
    expect(validateRoadmap([skill()], phases, trails)).toEqual([]);
  });

  test('rejects duplicate skill ids', () => {
    expect(validateRoadmap([skill(), skill()], phases, trails))
      .toContain('duplicate skill id: git-github');
  });

  test('rejects duplicate checkpoint ids within a skill', () => {
    const duplicate = skill({
      checkpoints: [
        { id: 'make-commit', label: 'Make a commit' },
        { id: 'make-commit', label: 'Make another commit' },
      ],
    });
    expect(validateRoadmap([duplicate], phases, trails))
      .toContain('duplicate checkpoint id in git-github: make-commit');
  });

  test('rejects unknown prerequisites', () => {
    expect(validateRoadmap([skill({ id: 'testing', prerequisites: ['missing-skill'] })], phases, trails))
      .toContain('unknown prerequisite on testing: missing-skill');
  });

  test('rejects unknown next skills', () => {
    expect(validateRoadmap([skill({ next: ['missing-skill'] })], phases, trails))
      .toContain('unknown next skill on git-github: missing-skill');
  });

  test('rejects unknown trails', () => {
    expect(validateRoadmap([skill({ id: 'http-apis', trails: ['missing-trail' as never] })], phases, trails))
      .toContain('unknown trail on http-apis: missing-trail');
  });
});
