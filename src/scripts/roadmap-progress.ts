import { roadmapSkills, type TrailId } from '../data/roadmap';
import {
  createEmptyProgress,
  exportProgress,
  importProgress,
  loadProgress,
  resetProgress,
  sanitizeProgress,
  saveProgress,
  setCheckpoint,
  setConfidence,
  setSelectedTrails,
  setStartingPoint,
  type RoadmapProgressV1,
} from '../lib/progress-store';
import {
  getContinueSkill,
  getOnboardingSuggestion,
  recommendNextSkill,
  type OnboardingChoice,
} from '../lib/recommendations';
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

function browserStorage(): Storage | undefined {
  try { return window.localStorage; } catch { return undefined; }
}

function persist(progress: RoadmapProgressV1, storage: Storage | undefined): RoadmapProgressV1 {
  let next = progress;
  if (!progress.privacyNoticeSeen) {
    announce('Your roadmap progress stays on this device. No account is required and your learning status is not uploaded anywhere.');
    next = { ...progress, privacyNoticeSeen: true };
  }
  const result = storage
    ? saveProgress(storage, next)
    : { persistent: false, warning: 'Browser storage is unavailable.' };
  if (!result.persistent) {
    announce('Progress works for this visit, but this browser is not allowing persistent storage.');
  }
  return next;
}

function renderSkill(progress: RoadmapProgressV1, skillId: string): void {
  const skillProgress = progress.skills[skillId];
  document.querySelectorAll<HTMLInputElement>(
    `[data-confidence-control][data-skill-id="${CSS.escape(skillId)}"] input[data-confidence]`,
  ).forEach((input) => { input.checked = input.value === skillProgress?.confidence; });

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

function renderRecommendedNext(progress: RoadmapProgressV1): void {
  document.querySelectorAll<HTMLElement>('[data-recommended-next][data-current-skill]').forEach((container) => {
    const currentSkillId = container.dataset.currentSkill;
    const base = container.dataset.roadmapBase ?? '/';
    const recommendedId = recommendNextSkill(currentSkillId, roadmapSkills, progress);
    const recommended = roadmapSkills.find((skill) => skill.id === recommendedId);
    container.replaceChildren();
    if (!recommended || recommended.id === currentSkillId) return;

    const label = document.createElement('p');
    label.className = 'kicker';
    label.textContent = 'recommended next';
    const link = document.createElement('a');
    link.href = `${base}roadmap/${recommended.id}/`;
    link.textContent = recommended.title;
    const description = document.createElement('p');
    description.className = 'small';
    description.textContent = recommended.summary;
    container.append(label, link, description);
  });
}

function renderRoadmapWorkspace(progress: RoadmapProgressV1): void {
  const workspace = document.querySelector<HTMLElement>('[data-roadmap-workspace]');
  if (!workspace) return;
  const base = workspace.dataset.roadmapBase ?? '/';

  const touched = Object.values(progress.skills).filter((skill) =>
    Boolean(skill.confidence) || Object.values(skill.checkpoints).some(Boolean)
  ).length;
  const summary = workspace.querySelector<HTMLElement>('[data-progress-summary]');
  if (summary) summary.textContent = `${touched} / ${roadmapSkills.length} skills touched`;

  const continueId = getContinueSkill(roadmapSkills, progress);
  const continueSkill = roadmapSkills.find((skill) => skill.id === continueId);
  const continueLink = workspace.querySelector<HTMLAnchorElement>('[data-continue-link]');
  if (continueLink && continueSkill) {
    continueLink.href = `${base}roadmap/${continueSkill.id}/`;
    continueLink.textContent = `Continue: ${continueSkill.title} →`;
    continueLink.hidden = false;
  }

  workspace.querySelectorAll<HTMLInputElement>('[data-trail-input]').forEach((input) => {
    input.checked = progress.selectedTrails.includes(input.value as TrailId);
  });

  const activePhase = progress.lastActiveSkill
    ? roadmapSkills.find((skill) => skill.id === progress.lastActiveSkill)?.phase
    : progress.startingPoint;
  document.querySelectorAll<HTMLElement>('[data-roadmap-phase]').forEach((phase) => {
    phase.classList.toggle('is-current-phase', phase.dataset.roadmapPhase === activePhase);
  });
}

function showOnboardingSuggestion(choice: OnboardingChoice, base: string): { phase: RoadmapProgressV1['startingPoint'] } {
  const suggestion = getOnboardingSuggestion(choice);
  const result = document.querySelector<HTMLElement>('[data-onboarding-result]');
  if (result) {
    result.replaceChildren();
    const heading = document.createElement('p');
    heading.innerHTML = `<strong>Suggested start:</strong> ${suggestion.phase}`;
    const list = document.createElement('ul');
    suggestion.skillIds.forEach((id) => {
      const skill = roadmapSkills.find((item) => item.id === id);
      if (!skill) return;
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `${base}roadmap/${skill.id}/`;
      link.textContent = skill.title;
      li.append(link);
      list.append(li);
    });
    const note = document.createElement('p');
    note.className = 'small';
    note.textContent = 'This is only a suggestion. You can move anywhere on the roadmap.';
    result.append(heading, list, note);
  }
  return { phase: suggestion.phase };
}

function setSettingsStatus(message: string): void {
  const status = document.querySelector<HTMLElement>('[data-settings-status]');
  if (status) status.textContent = message;
}

export function initRoadmapProgress(): void {
  if (typeof window === 'undefined') return;

  const storage = browserStorage();
  const loaded = storage
    ? loadProgress(storage)
    : { progress: createEmptyProgress(), persistent: false, warning: 'Browser storage is unavailable.' };
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
  renderRoadmapWorkspace(progress);
  renderRecommendedNext(progress);

  document.querySelectorAll<HTMLInputElement>('[data-confidence-control] input[data-confidence]').forEach((input) => {
    input.addEventListener('change', () => {
      if (!input.checked) return;
      const skillId = input.closest<HTMLElement>('[data-confidence-control]')?.dataset.skillId;
      if (!skillId) return;
      progress = setConfidence(progress, skillId, input.value as ConfidenceState, new Date().toISOString());
      progress = persist(progress, storage);
      renderSkill(progress, skillId);
      renderRecommendedNext(progress);
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
      progress = persist(progress, storage);
      renderSkill(progress, skillId);
      renderRecommendedNext(progress);
      document.dispatchEvent(new CustomEvent('roadmap:checkpoint-change', { detail: { skillId, checkpointId, checked: input.checked } }));
      document.dispatchEvent(new CustomEvent('roadmap:progress-saved', { detail: { skillId } }));
    });
  });

  document.querySelectorAll<HTMLInputElement>('[data-onboarding-choice]').forEach((input) => {
    input.addEventListener('change', () => {
      if (!input.checked) return;
      const workspace = document.querySelector<HTMLElement>('[data-roadmap-workspace]');
      const base = workspace?.dataset.roadmapBase ?? '/';
      const { phase } = showOnboardingSuggestion(input.value as OnboardingChoice, base);
      if (!phase) return;
      progress = setStartingPoint(progress, phase);
      progress = persist(progress, storage);
      renderRoadmapWorkspace(progress);
    });
  });

  document.querySelectorAll<HTMLInputElement>('[data-trail-input]').forEach((input) => {
    input.addEventListener('change', () => {
      const selected = Array.from(document.querySelectorAll<HTMLInputElement>('[data-trail-input]:checked'))
        .map((item) => item.value as TrailId);
      progress = setSelectedTrails(progress, selected);
      progress = persist(progress, storage);
      renderRoadmapWorkspace(progress);
      renderRecommendedNext(progress);
    });
  });

  document.querySelector<HTMLButtonElement>('[data-export-progress]')?.addEventListener('click', () => {
    const blob = new Blob([exportProgress(progress)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mika-open-roadmap-progress.json';
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setSettingsStatus('Progress exported as JSON.');
  });

  document.querySelector<HTMLInputElement>('[data-import-progress]')?.addEventListener('change', async (event) => {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const imported = importProgress(await file.text(), knownSkillIds, knownCheckpointIds);
    input.value = '';
    if (!imported.ok) {
      setSettingsStatus(`Import failed: ${imported.reason}. Your current progress was not changed.`);
      return;
    }

    progress = imported.progress;
    const saved = storage
      ? saveProgress(storage, progress)
      : { persistent: false, warning: 'Browser storage is unavailable.' };
    skillIdsOnPage.forEach((skillId) => renderSkill(progress, skillId));
    renderRoadmapWorkspace(progress);
    renderRecommendedNext(progress);
    setSettingsStatus(saved.persistent
      ? 'Progress imported successfully.'
      : 'Progress imported for this visit, but this browser is not allowing persistent storage.');
  });

  document.querySelector<HTMLButtonElement>('[data-reset-progress]')?.addEventListener('click', () => {
    if (!window.confirm('Reset all local roadmap progress on this browser?')) return;
    progress = resetProgress();
    const saved = storage
      ? saveProgress(storage, progress)
      : { persistent: false, warning: 'Browser storage is unavailable.' };
    skillIdsOnPage.forEach((skillId) => renderSkill(progress, skillId));
    renderRoadmapWorkspace(progress);
    renderRecommendedNext(progress);
    const onboardingResult = document.querySelector<HTMLElement>('[data-onboarding-result]');
    if (onboardingResult) onboardingResult.replaceChildren();
    document.querySelectorAll<HTMLInputElement>('[data-onboarding-choice]').forEach((input) => { input.checked = false; });
    setSettingsStatus(saved.persistent
      ? 'Roadmap progress reset.'
      : 'Progress reset for this visit, but this browser is not allowing persistent storage.');
  });

}
