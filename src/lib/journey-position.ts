import { roadmapPhases, type PhaseId } from '../data/roadmap';

function phaseLabel(phaseId: PhaseId): string {
  const phase = roadmapPhases.find((item) => item.id === phaseId);
  return phase ? `Phase ${phase.number} · ${phase.title}` : phaseId;
}

export function getDualPositionCopy(
  learnerPhase: PhaseId | undefined,
  mikaPhase: PhaseId,
): {
  learnerLabel?: string;
  mikaLabel: string;
  message: 'Different path. Same map.';
} {
  return {
    ...(learnerPhase ? { learnerLabel: phaseLabel(learnerPhase) } : {}),
    mikaLabel: phaseLabel(mikaPhase),
    message: 'Different path. Same map.',
  };
}
