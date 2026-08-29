// Haptic feedback utility using the HTML5 Web Vibration API
// Safe across all platforms (graceful no-op if unsupported or running on desktop)

export const HAPTIC_PATTERNS = {
  LIGHT: [15],
  MEDIUM: [30],
  SUCCESS: [20, 50, 40],
  WARNING: [40, 60, 40],
  ERROR: [80, 50, 80],
  LEVEL_UP: [30, 40, 30, 40, 60],
  ACHIEVEMENT: [40, 60, 40, 80, 100]
};

export function triggerHaptic(type = 'LIGHT') {
  if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.vibrate) {
    return false;
  }
  try {
    const pattern = HAPTIC_PATTERNS[type] || HAPTIC_PATTERNS.LIGHT;
    navigator.vibrate(pattern);
    return true;
  } catch {
    return false;
  }
}
