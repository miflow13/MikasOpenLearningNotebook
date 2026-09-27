import { roadmapPhases, roadmapTrails } from '../data/roadmap';
import type { ConfidenceState, RoadmapProgressV1, SkillProgress } from './progress-types';

export type { ConfidenceState, RoadmapProgressV1, SkillProgress } from './progress-types';

export const STORAGE_KEY = 'mika-open-roadmap-progress-v1';

const CONFIDENCE_STATES: readonly ConfidenceState[] = ['encountered', 'practicing', 'applied', 'can-explain', 'comfortable'];
const phaseIds = new Set(roadmapPhases.map((phase) => phase.id));
const trailIds = new Set(roadmapTrails.map((trail) => trail.id));

type ReadStorage = Pick<Storage, 'getItem'>;
type WriteStorage = Pick<Storage, 'setItem'>;

export function createEmptyProgress(): RoadmapProgressV1 {
  return {
    version: 1,
    selectedTrails: [],
    privacyNoticeSeen: false,
    skills: {},
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isConfidence(value: unknown): value is ConfidenceState {
  return typeof value === 'string' && CONFIDENCE_STATES.includes(value as ConfidenceState);
}

export function parseProgress(raw: string):
  | { ok: true; value: RoadmapProgressV1 }
  | { ok: false; reason: string } {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { ok: false, reason: 'progress is not valid JSON' };
  }

  if (!isRecord(value) || value.version !== 1) {
    return { ok: false, reason: 'unsupported roadmap progress version' };
  }
  if (!Array.isArray(value.selectedTrails) || !value.selectedTrails.every((trail) => typeof trail === 'string' && trailIds.has(trail as never))) {
    return { ok: false, reason: 'invalid selected trails' };
  }
  if (typeof value.privacyNoticeSeen !== 'boolean') {
    return { ok: false, reason: 'invalid privacy notice state' };
  }
  if (value.startingPoint !== undefined && (typeof value.startingPoint !== 'string' || !phaseIds.has(value.startingPoint as never))) {
    return { ok: false, reason: 'invalid starting point' };
  }
  if (value.lastActiveSkill !== undefined && typeof value.lastActiveSkill !== 'string') {
    return { ok: false, reason: 'invalid last active skill' };
  }
  if (!isRecord(value.skills)) {
    return { ok: false, reason: 'invalid skills progress' };
  }

  const skills: Record<string, SkillProgress> = {};
  for (const [skillId, rawSkill] of Object.entries(value.skills)) {
    if (!isRecord(rawSkill) || !isRecord(rawSkill.checkpoints)) {
      return { ok: false, reason: `invalid skill progress: ${skillId}` };
    }
    if (rawSkill.confidence !== undefined && !isConfidence(rawSkill.confidence)) {
      return { ok: false, reason: `invalid confidence state: ${skillId}` };
    }
    if (rawSkill.lastTouchedAt !== undefined && typeof rawSkill.lastTouchedAt !== 'string') {
      return { ok: false, reason: `invalid last touched time: ${skillId}` };
    }
    const checkpoints: Record<string, boolean> = {};
    for (const [checkpointId, checked] of Object.entries(rawSkill.checkpoints)) {
      if (typeof checked !== 'boolean') {
        return { ok: false, reason: `invalid checkpoint state: ${skillId}/${checkpointId}` };
      }
      checkpoints[checkpointId] = checked;
    }
    skills[skillId] = {
      ...(rawSkill.confidence !== undefined ? { confidence: rawSkill.confidence } : {}),
      checkpoints,
      ...(rawSkill.lastTouchedAt !== undefined ? { lastTouchedAt: rawSkill.lastTouchedAt } : {}),
    };
  }

  return {
    ok: true,
    value: {
      version: 1,
      ...(value.startingPoint !== undefined ? { startingPoint: value.startingPoint as RoadmapProgressV1['startingPoint'] } : {}),
      selectedTrails: value.selectedTrails as RoadmapProgressV1['selectedTrails'],
      ...(value.lastActiveSkill !== undefined ? { lastActiveSkill: value.lastActiveSkill } : {}),
      privacyNoticeSeen: value.privacyNoticeSeen,
      skills,
    },
  };
}

export function loadProgress(storage: ReadStorage): {
  progress: RoadmapProgressV1;
  persistent: boolean;
  warning?: string;
} {
  let raw: string | null;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch {
    return { progress: createEmptyProgress(), persistent: false, warning: 'Browser storage is unavailable.' };
  }
  if (raw === null) return { progress: createEmptyProgress(), persistent: true };

  const parsed = parseProgress(raw);
  if (!parsed.ok) {
    return { progress: createEmptyProgress(), persistent: true, warning: parsed.reason };
  }
  return { progress: parsed.value, persistent: true };
}

export function saveProgress(storage: WriteStorage, progress: RoadmapProgressV1): {
  persistent: boolean;
  warning?: string;
} {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return { persistent: true };
  } catch {
    return { persistent: false, warning: 'Browser storage is unavailable.' };
  }
}

export function sanitizeProgress(
  progress: RoadmapProgressV1,
  knownSkillIds: ReadonlySet<string>,
  knownCheckpointIds: ReadonlyMap<string, ReadonlySet<string>>,
): RoadmapProgressV1 {
  const skills: Record<string, SkillProgress> = {};
  for (const [skillId, skillProgress] of Object.entries(progress.skills)) {
    if (!knownSkillIds.has(skillId)) continue;
    const knownForSkill = knownCheckpointIds.get(skillId) ?? new Set<string>();
    const checkpoints = Object.fromEntries(
      Object.entries(skillProgress.checkpoints).filter(([checkpointId]) => knownForSkill.has(checkpointId)),
    );
    skills[skillId] = {
      ...(skillProgress.confidence ? { confidence: skillProgress.confidence } : {}),
      checkpoints,
      ...(skillProgress.lastTouchedAt ? { lastTouchedAt: skillProgress.lastTouchedAt } : {}),
    };
  }

  return {
    ...progress,
    ...(progress.lastActiveSkill && !knownSkillIds.has(progress.lastActiveSkill) ? { lastActiveSkill: undefined } : {}),
    skills,
  };
}
