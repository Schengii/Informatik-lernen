// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { triggerHaptic, HAPTIC_PATTERNS } from './haptics';

describe('Haptics Utility', () => {
  it('defines all expected haptic feedback patterns', () => {
    expect(HAPTIC_PATTERNS.LIGHT).toBeDefined();
    expect(HAPTIC_PATTERNS.SUCCESS).toBeDefined();
    expect(HAPTIC_PATTERNS.ERROR).toBeDefined();
    expect(HAPTIC_PATTERNS.LEVEL_UP).toBeDefined();
  });

  it('handles environment without navigator.vibrate gracefully', () => {
    const res = triggerHaptic('SUCCESS');
    expect(typeof res).toBe('boolean');
  });

  it('triggers navigator.vibrate when available', () => {
    const vibrateMock = vi.fn();
    Object.defineProperty(navigator, 'vibrate', {
      value: vibrateMock,
      writable: true,
      configurable: true
    });

    const success = triggerHaptic('SUCCESS');
    expect(success).toBe(true);
    expect(vibrateMock).toHaveBeenCalledWith(HAPTIC_PATTERNS.SUCCESS);
  });
});
