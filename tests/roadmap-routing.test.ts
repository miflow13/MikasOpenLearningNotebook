import { describe, expect, test } from 'vitest';
import {
  getRoadmapOrder,
  getSkillsForPhase,
  getSkillsForTrail,
  roadmapSkills,
  type RoadmapSkill,
} from '../src/data/roadmap';
import { validateFieldNoteRefs } from '../src/data/roadmap-validation';

describe('roadmap helpers', () => {
  test('phase filtering preserves canonical roadmap order', () => {
    const foundations = getSkillsForPhase('foundations');
    const ids = foundations.map((skill) => skill.id);
    expect(ids).toEqual([
      'terminal-filesystem',
      'git-github',
      'programming-fundamentals',
      'runtime-code-tracing',
    ]);
    expect(ids.map(getRoadmapOrder)).toEqual([...ids.map(getRoadmapOrder)].sort((a, b) => a - b));
  });

  test('a multi-trail skill appears in every selected trail without duplication', () => {
    const web = getSkillsForTrail('web').map((skill) => skill.id);
    const ai = getSkillsForTrail('ai-agents').map((skill) => skill.id);
    expect(web).toContain('http-apis');
    expect(ai).toContain('http-apis');
    expect(web.filter((id) => id === 'http-apis')).toHaveLength(1);
    expect(ai.filter((id) => id === 'http-apis')).toHaveLength(1);
  });

  test('roadmap order follows the source skill list', () => {
    expect(roadmapSkills.map((skill) => getRoadmapOrder(skill.id)))
      .toEqual(roadmapSkills.map((_, index) => index));
  });
});

describe('field-note reference validation', () => {
  test('returns a descriptive error for a missing field note', () => {
    const skill: RoadmapSkill = {
      ...roadmapSkills[0],
      id: 'testing-missing-note',
      fieldNoteIds: ['missing-note'],
    };
    expect(validateFieldNoteRefs([skill], new Set(['some-other-note'])))
      .toEqual(['unknown field note on testing-missing-note: missing-note']);
  });

  test('accepts known field notes', () => {
    const skill = roadmapSkills.find((item) => item.id === 'git-github')!;
    expect(validateFieldNoteRefs([skill], new Set(skill.fieldNoteIds))).toEqual([]);
  });
});
