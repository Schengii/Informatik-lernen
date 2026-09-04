// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initialProfileState, calculateLevel, saveUserState, loadUserState, flushUserState } from './storage';

describe('Storage Utilities & Game Logic', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    flushUserState();
    vi.useRealTimers();
  });

  it('calculates the correct level based on XP', () => {
    expect(calculateLevel(0)).toBe(1);
    expect(calculateLevel(50)).toBe(2);
    expect(calculateLevel(199)).toBe(2);
    expect(calculateLevel(200)).toBe(3);
  });

  it('loads initial state if localStorage is empty', () => {
    const state = loadUserState();
    expect(state).toEqual(initialProfileState);
  });

  it('saves immediately when options.immediate is true', () => {
    const newState = { ...initialProfileState, xp: 500, userName: 'TestUser' };
    saveUserState(newState, { immediate: true });

    const loadedState = loadUserState();
    expect(loadedState.xp).toBe(500);
    expect(loadedState.userName).toBe('TestUser');
    expect(loadedState.level).toBe(1); // loadUserState doesn't recalculate level, store handles it
  });

  it('debounces the default (non-immediate) write and applies it after the delay', () => {
    vi.useFakeTimers();
    const newState = { ...initialProfileState, xp: 500, userName: 'TestUser' };
    saveUserState(newState);

    // Direkt nach dem Aufruf ist noch nichts persistiert - das Schreiben ist gebündelt.
    expect(loadUserState().xp).toBe(0);

    vi.advanceTimersByTime(500);

    expect(loadUserState().xp).toBe(500);
    expect(loadUserState().userName).toBe('TestUser');
  });

  it('coalesces mehrere schnelle Aufrufe zu genau einem Schreibvorgang', () => {
    vi.useFakeTimers();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    saveUserState({ ...initialProfileState, xp: 10 });
    saveUserState({ ...initialProfileState, xp: 20 });
    saveUserState({ ...initialProfileState, xp: 30 });

    vi.advanceTimersByTime(500);

    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(loadUserState().xp).toBe(30); // nur der letzte Zustand gewinnt
    setItemSpy.mockRestore();
  });

  it('flushUserState() erzwingt ein sofortiges Schreiben eines ausstehenden Speichervorgangs', () => {
    vi.useFakeTimers();
    saveUserState({ ...initialProfileState, xp: 42 });

    expect(loadUserState().xp).toBe(0);
    flushUserState();
    expect(loadUserState().xp).toBe(42);
  });
});
