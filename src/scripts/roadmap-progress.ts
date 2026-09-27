import { roadmapSkills } from '../data/roadmap';
import {
  createEmptyProgress,
  loadProgress,
  sanitizeProgress,
  saveProgress,
  setCheckpoint,
  setConfidence,
  type RoadmapProgressV1,
} from '../lib/progress-store';
import type { ConfidenceState } from '../lib/progress-types';

const knownSkillIds = new Set(roadmapSkills.map((skill) => skill.id));
const knownCheckpointIds = new Map(
  roadmapSkills.map((skill) => [skill.id, new Set(skill.checkpoints.map((checkpoint) => checkpoint.id))] as const),
);

function findNotice(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-progress-notice]');
}

function announce(message: string): void {
  const notice = findNotice();
  if (!notice) return;
  notice.textContent = message;
  notice.hidden = false;
}

function renderSkill(progress: RoadmapProgressV1, skillId: string): void {
  const skillProgress = progress.skills[skillId];

  document.querySelectorAll<HTMLInputElement>(
    `[data-confidence-control][data-skill-id="${CSS.escape(skillId)}"] input[data-confidence]`,
  ).forEach((input) => {
    input.checked = input.value === skillProgress?.confidence;
  });

  document.querySelectorAll<HTMLInputElement>(
    `input[data-checkpoint-id][data-skill-id="${CSS.escape(skillId)}"]`,
  ).forEach((input) => {
    input.checked = Boolean(skillProgress?.checkpoints[input.dataset.checkpointId ?? '']);
  });

  const skill = roadmapSkills.find((item) => item.id === skillId);
  const completed = skill?.checkpoints.filter((checkpoint) => skillProgress?.checkpoints[checkpoint.id]).length ?? 0;
  document.querySelectorAll<HTMLElement>(
    `[data-checkpoint-list][data-skill-id="${CSS.escape(skillId)}"] [data-checkpoint-summary]`,
  ).forEach((summary) => {
    summary.textContent = `${completed} / ${skill?.checkpoints.length ?? 0} evidence checkpoints complete.`;
  });
}

function persist(progress: RoadmapProgressV1): RoadmapProgressV1 {
  let next = progress;
  const firstMutation = !progress.privacyNoticeSeen;

  if (firstMutation) {
    announce('Your roadmap progress stays on this device. No account is required and your learning status is not uploaded anywhere.');
    next = { ...progress, privacyNoticeSeen: true };
  }

  const result = saveProgress(window.localStorage, next);
  if (!result.persistent) {
    announce('Progress works for this visit, but this browser is not allowing persistent storage.');
  }
  return next;
}

export function initRoadmapProgress(): void {
  if (typeof window === 'undefined') return;

  const loaded = loadProgress(window.localStorage);
  let progress = sanitizeProgress(loaded.progress, knownSkillIds, knownCheckpointIds);

  if (!loaded.persistent) {
    announce('Progress works for this visit, but this browser is not allowing persistent storage.');
  } else if (loaded.warning) {
    announce('Saved roadmap progress could not be read, so this visit is using a fresh local state. Your stored value was left untouched.');
  }

  const skillIdsOnPage = new Set<string>();
  document.querySelectorAll<HTMLElement>('[data-skill-id]').forEach((element) => {
    if (element.dataset.skillId) skillIdsOnPage.add(element.dataset.skillId);
  });
  skillIdsOnPage.forEach((skillId) => renderSkill(progress, skillId));

  document.querySelectorAll<HTMLInputElement>('[data-confidence-control] input[data-confidence]').forEach((input) => {
    input.addEventListener('change', () => {
      if (!input.checked) return;
      const container = input.closest<HTMLElement>('[data-confidence-control]');
      const skillId = container?.dataset.skillId;
      if (!skillId) return;
      progress = setConfidence(progress, skillId, input.value as ConfidenceState, new Date().toISOString());
      progress = persist(progress);
      renderSkill(progress, skillId);
      document.dispatchEvent(new CustomEvent('roadmap:confidence-change', { detail: { skillId, confidence: input.value } }));
      document.dispatchEvent(new CustomEvent('roadmap:progress-saved', { detail: { skillId } }));
    });
  });

  document.querySelectorAll<HTMLInputElement>('input[data-checkpoint-id][data-skill-id]').forEach((input) => {
    input.addEventListener('change', () => {
      const skillId = input.dataset.skillId;
      const checkpointId = input.dataset.checkpointId;
      if (!skillId || !checkpointId) return;
      progress = setCheckpoint(progress, skillId, checkpointId, input.checked, new Date().toISOString());
      progress = persist(progress);
      renderSkill(progress, skillId);
      document.dispatchEvent(new CustomEvent('roadmap:checkpoint-change', { detail: { skillId, checkpointId, checked: input.checked } }));
      document.dispatchEvent(new CustomEvent('roadmap:progress-saved', { detail: { skillId } }));
    });
  });
}
