import type { PhaseId, RoadmapSkill } from '../data/roadmap';
import type { RoadmapProgressV1 } from './progress-types';

export type OnboardingChoice =
  | 'brand-new'
  | 'basics-struggle-build'
  | 'build-debugging-shaky'
  | 'ship-fill-gaps';

const ONBOARDING: Record<OnboardingChoice, { phase: PhaseId; skillIds: string[] }> = {
  'brand-new': {
    phase: 'foundations',
    skillIds: ['terminal-filesystem', 'git-github', 'programming-fundamentals'],
  },
  'basics-struggle-build': {
    phase: 'build',
    skillIds: ['project-structure', 'http-apis', 'files-persistence'],
  },
  'build-debugging-shaky': {
    phase: 'engineer',
    skillIds: ['debugging', 'testing', 'state-lifecycle'],
  },
  'ship-fill-gaps': {
    phase: 'ship',
    skillIds: ['deployment-runtime', 'documentation', 'open-source'],
  },
};

export function getOnboardingSuggestion(choice: OnboardingChoice): { phase: PhaseId; skillIds: string[] } {
  const suggestion = ONBOARDING[choice];
  return { phase: suggestion.phase, skillIds: [...suggestion.skillIds] };
}

function isComfortable(skillId: string, progress: RoadmapProgressV1): boolean {
  return progress.skills[skillId]?.confidence === 'comfortable';
}

function prerequisitesTouched(skill: RoadmapSkill, progress: RoadmapProgressV1): boolean {
  return skill.prerequisites.every((id) => Boolean(progress.skills[id]?.confidence));
}

function canonicalIndex(skills: readonly RoadmapSkill[], skillId: string): number {
  return skills.findIndex((skill) => skill.id === skillId);
}

function rankCandidates(
  candidates: readonly RoadmapSkill[],
  skills: readonly RoadmapSkill[],
  progress: RoadmapProgressV1,
  current?: RoadmapSkill,
): RoadmapSkill[] {
  return [...candidates].sort((a, b) => {
    const score = (skill: RoadmapSkill) => {
      let value = 0;
      if (skill.trails.some((trail) => progress.selectedTrails.includes(trail))) value += 2;
      if (prerequisitesTouched(skill, progress)) value += 1;
      if (current && skill.phase === current.phase) value += 1;
      return value;
    };

    const difference = score(b) - score(a);
    if (difference !== 0) return difference;
    return canonicalIndex(skills, a.id) - canonicalIndex(skills, b.id);
  });
}

export function recommendNextSkill(
  currentSkillId: string | undefined,
  skills: readonly RoadmapSkill[],
  progress: RoadmapProgressV1,
): string | undefined {
  const current = currentSkillId ? skills.find((skill) => skill.id === currentSkillId) : undefined;

  if (current) {
    const nextCandidates = current.next
      .map((id) => skills.find((skill) => skill.id === id))
      .filter((skill): skill is RoadmapSkill => Boolean(skill))
      .filter((skill) => !isComfortable(skill.id, progress));

    if (nextCandidates.length > 0) {
      return rankCandidates(nextCandidates, skills, progress, current)[0]?.id;
    }
  }

  if (progress.selectedTrails.length > 0) {
    const trailCandidates = skills.filter((skill) =>
      skill.id !== currentSkillId
      && !isComfortable(skill.id, progress)
      && skill.trails.some((trail) => progress.selectedTrails.includes(trail))
      && prerequisitesTouched(skill, progress)
    );
    if (trailCandidates.length > 0) {
      return rankCandidates(trailCandidates, skills, progress, current)[0]?.id;
    }
  }

  return skills.find((skill) =>
    skill.id !== currentSkillId && !isComfortable(skill.id, progress)
  )?.id;
}

export function getContinueSkill(
  skills: readonly RoadmapSkill[],
  progress: RoadmapProgressV1,
): string | undefined {
  if (progress.lastActiveSkill && !isComfortable(progress.lastActiveSkill, progress)) {
    const exists = skills.some((skill) => skill.id === progress.lastActiveSkill);
    if (exists) return progress.lastActiveSkill;
  }
  return recommendNextSkill(undefined, skills, progress);
}
