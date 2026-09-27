import { describe, expect, test } from 'vitest';
import {
  STORAGE_KEY,
  createEmptyProgress,
  loadProgress,
  parseProgress,
  sanitizeProgress,
  saveProgress,
  setCheckpoint,
  setConfidence,
} from '../src/lib/progress-store';

class MemoryStorage {
  values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

describe('roadmap progress schema', () => {
  test('starts with a stable version-one empty document', () => {
    expect(createEmptyProgress()).toEqual({
      version: 1,
      selectedTrails: [],
      privacyNoticeSeen: false,
      skills: {},
    });
  });

  test('parses a valid confidence/checkpoint document', () => {
    const raw = JSON.stringify({
      version: 1,
      startingPoint: 'build',
      selectedTrails: ['web'],
      lastActiveSkill: 'http-apis',
      privacyNoticeSeen: true,
      skills: {
        'http-apis': {
          confidence: 'practicing',
          checkpoints: { 'make-get': true },
          lastTouchedAt: '2026-09-27T22:00:00.000Z',
        },
      },
    });
    const parsed = parseProgress(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) expect(parsed.value.skills['http-apis'].confidence).toBe('practicing');
  });

  test('rejects an invalid confidence state', () => {
    const parsed = parseProgress(JSON.stringify({
      version: 1,
      selectedTrails: [],
      privacyNoticeSeen: false,
      skills: { git: { confidence: 'mastered', checkpoints: {} } },
    }));
    expect(parsed.ok).toBe(false);
  });

  test('falls back safely when stored JSON is corrupt without deleting the raw value', () => {
    const storage = new MemoryStorage();
    storage.setItem(STORAGE_KEY, '{not-json');
    const loaded = loadProgress(storage);
    expect(loaded.progress).toEqual(createEmptyProgress());
    expect(loaded.persistent).toBe(true);
    expect(loaded.warning).toBeTruthy();
    expect(storage.getItem(STORAGE_KEY)).toBe('{not-json');
  });

  test('sanitizes unknown skills and checkpoint ids while preserving known state', () => {
    const parsed = parseProgress(JSON.stringify({
      version: 1,
      selectedTrails: ['web'],
      privacyNoticeSeen: true,
      skills: {
        'git-github': {
          confidence: 'applied',
          checkpoints: { 'make-commit': true, 'removed-checkpoint': true },
        },
        'removed-skill': {
          confidence: 'comfortable',
          checkpoints: {},
        },
      },
    }));
    if (!parsed.ok) throw new Error(parsed.reason);

    const sanitized = sanitizeProgress(
      parsed.value,
      new Set(['git-github']),
      new Map([['git-github', new Set(['make-commit'])]]),
    );

    expect(sanitized.skills).toEqual({
      'git-github': {
        confidence: 'applied',
        checkpoints: { 'make-commit': true },
      },
    });
  });

  test('reports non-persistent mode when storage rejects writes', () => {
    const storage = {
      getItem: () => null,
      setItem: () => { throw new Error('blocked'); },
    };
    const result = saveProgress(storage, createEmptyProgress());
    expect(result.persistent).toBe(false);
    expect(result.warning).toBeTruthy();
  });
});


describe('learner-controlled progress updates', () => {
  test('sets confidence and records the active skill without touching checkpoints', () => {
    const progress = createEmptyProgress();
    const next = setConfidence(progress, 'git-github', 'practicing', '2026-09-27T22:30:00.000Z');
    expect(next.skills['git-github']).toEqual({
      confidence: 'practicing',
      checkpoints: {},
      lastTouchedAt: '2026-09-27T22:30:00.000Z',
    });
    expect(next.lastActiveSkill).toBe('git-github');
    expect(progress.skills['git-github']).toBeUndefined();
  });

  test('checking every checkpoint does not automatically promote confidence', () => {
    let progress = setConfidence(createEmptyProgress(), 'git-github', 'practicing', '2026-09-27T22:30:00.000Z');
    progress = setCheckpoint(progress, 'git-github', 'make-commit', true, '2026-09-27T22:31:00.000Z');
    progress = setCheckpoint(progress, 'git-github', 'merge-branch', true, '2026-09-27T22:32:00.000Z');

    expect(progress.skills['git-github'].checkpoints).toEqual({
      'make-commit': true,
      'merge-branch': true,
    });
    expect(progress.skills['git-github'].confidence).toBe('practicing');
    expect(progress.lastActiveSkill).toBe('git-github');
  });
});
