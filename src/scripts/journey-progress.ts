import { roadmapSkills, type PhaseId } from '../data/roadmap';
import { getDualPositionCopy } from '../lib/journey-position';
import { loadProgress, sanitizeProgress } from '../lib/progress-store';

const knownSkillIds = new Set(roadmapSkills.map((skill) => skill.id));
const knownCheckpointIds = new Map(
  roadmapSkills.map((skill) => [skill.id, new Set(skill.checkpoints.map((checkpoint) => checkpoint.id))] as const),
);

function browserStorage(): Storage | undefined {
  try { return window.localStorage; } catch { return undefined; }
}

export function initJourneyProgress(): void {
  if (typeof window === 'undefined') return;
  const container = document.querySelector<HTMLElement>('[data-dual-position][data-mika-phase]');
  if (!container) return;

  const mikaPhase = container.dataset.mikaPhase as PhaseId;
  const storage = browserStorage();
  if (!storage) return;

  const loaded = loadProgress(storage);
  const progress = sanitizeProgress(loaded.progress, knownSkillIds, knownCheckpointIds);
  const learnerPhase = progress.lastActiveSkill
    ? roadmapSkills.find((skill) => skill.id === progress.lastActiveSkill)?.phase
    : progress.startingPoint;

  if (!learnerPhase) return;

  const copy = getDualPositionCopy(learnerPhase, mikaPhase);
  const learnerCard = container.querySelector<HTMLElement>('[data-learner-position]');
  const learnerLabel = container.querySelector<HTMLElement>('[data-learner-position-label]');
  if (!learnerCard || !learnerLabel || !copy.learnerLabel) return;

  learnerLabel.textContent = copy.learnerLabel;
  learnerCard.hidden = false;
}
