export function parseLearningLogDate(id: string): string | undefined {
  const match = /^learning-log-(\d{4}-\d{2}-\d{2})$/.exec(id);
  return match?.[1];
}

export function sortJourneyEntries<T extends { id: string }>(entries: readonly T[]): T[] {
  return [...entries].sort((a, b) => {
    const aDate = parseLearningLogDate(a.id);
    const bDate = parseLearningLogDate(b.id);
    if (aDate && bDate) return bDate.localeCompare(aDate);
    if (aDate) return -1;
    if (bDate) return 1;
    return a.id.localeCompare(b.id);
  });
}
