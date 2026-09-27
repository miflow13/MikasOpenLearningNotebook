import {
  roadmapSkills,
  roadmapTrails,
  type CareerContextData,
  type RoadmapSkill,
} from './roadmap';

export function getSkillRouteIds(): string[] {
  return roadmapSkills.map((skill) => skill.id);
}

export function getTrailLabelsForSkill(skill: RoadmapSkill): string[] {
  return skill.trails.map((trailId) => {
    const trail = roadmapTrails.find((item) => item.id === trailId);
    return trail?.title ?? trailId;
  });
}

export function getCareerContextForSkill(skill: RoadmapSkill): CareerContextData | undefined {
  return skill.career;
}

export function getCareerSkills(): RoadmapSkill[] {
  return roadmapSkills.filter((skill) => skill.career !== undefined);
}
