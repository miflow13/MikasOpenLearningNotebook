import type { PhaseId, TrailId } from '../data/roadmap';

export type ConfidenceState = 'encountered' | 'practicing' | 'applied' | 'can-explain' | 'comfortable';

export interface SkillProgress {
  confidence?: ConfidenceState;
  checkpoints: Record<string, boolean>;
  lastTouchedAt?: string;
}

export interface RoadmapProgressV1 {
  version: 1;
  startingPoint?: PhaseId;
  selectedTrails: TrailId[];
  lastActiveSkill?: string;
  privacyNoticeSeen: boolean;
  skills: Record<string, SkillProgress>;
}
