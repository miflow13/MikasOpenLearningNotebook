import type { RoadmapPhase, RoadmapSkill, RoadmapTrail } from './roadmap';

export type { RoadmapPhase, RoadmapSkill, RoadmapTrail } from './roadmap';

export function validateRoadmap(
  skills: readonly RoadmapSkill[],
  phases: readonly RoadmapPhase[],
  trails: readonly RoadmapTrail[],
): string[] {
  const errors: string[] = [];
  const skillIds = new Set<string>();
  const phaseIds = new Set(phases.map((phase) => phase.id));
  const trailIds = new Set(trails.map((trail) => trail.id));

  for (const skill of skills) {
    if (skillIds.has(skill.id)) errors.push(`duplicate skill id: ${skill.id}`);
    skillIds.add(skill.id);

    if (!phaseIds.has(skill.phase)) errors.push(`unknown phase on ${skill.id}: ${skill.phase}`);

    const checkpointIds = new Set<string>();
    for (const checkpoint of skill.checkpoints) {
      if (checkpointIds.has(checkpoint.id)) {
        errors.push(`duplicate checkpoint id in ${skill.id}: ${checkpoint.id}`);
      }
      checkpointIds.add(checkpoint.id);
    }

    for (const trail of skill.trails) {
      if (!trailIds.has(trail)) errors.push(`unknown trail on ${skill.id}: ${trail}`);
    }
  }

  for (const skill of skills) {
    for (const prerequisite of skill.prerequisites) {
      if (!skillIds.has(prerequisite)) {
        errors.push(`unknown prerequisite on ${skill.id}: ${prerequisite}`);
      }
    }
    for (const next of skill.next) {
      if (!skillIds.has(next)) {
        errors.push(`unknown next skill on ${skill.id}: ${next}`);
      }
    }
  }

  return errors;
}

