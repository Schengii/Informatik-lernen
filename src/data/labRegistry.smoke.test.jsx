// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import { LAB_REGISTRY } from './labRegistry';

// Cleanup between renders is handled globally by vitest.setup.js - without it, every
// render() here would pile up in the same jsdom document across all 100+ mounts, causing
// stale DOM from an earlier (possibly failing) lab to leak into and fail a later, perfectly
// fine one.

// Regression test for the app's single most common bug class (see README changelog):
// a lab component that references an unimported icon, or that calls a browser API
// without a feature guard, crashed the *entire* app the moment a user opened it - because
// there was no automated check that mounted each lab even once. This test mounts every
// entry in LAB_REGISTRY exactly once with minimal dummy props and fails with the specific
// lab's id/title if it throws during render or its first effect flush, instead of only
// being discovered by a real user clicking into it.
class SmokeTestErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <div data-testid="lab-smoke-error">{String(this.state.error?.message || this.state.error)}</div>;
    }
    return this.props.children;
  }
}

// Neutral dummy context passed into `specialProps`/`onRewardXP` wiring so labs that need
// e.g. `userState` don't crash on missing fields.
const DUMMY_CTX = {
  userState: {
    xp: 0,
    level: 1,
    role: 'anfaenger',
    completedTopics: [],
    unlockedBadges: [],
    categoryStats: {},
    srsFlashcards: {}
  },
  awardXP: () => false,
  setActiveTab: () => {}
};

function buildDummyProps(entry) {
  if (entry.specialProps) return entry.specialProps(DUMMY_CTX);
  if (entry.rewardAchievementId) return { onRewardXP: () => {} };
  return {};
}

describe('LAB_REGISTRY smoke test - every lab mounts without throwing', () => {
  for (const entry of LAB_REGISTRY) {
    if (entry.skipSmokeTest) {
      it.skip(`mounts "${entry.id}" (${entry.skipSmokeTest})`, () => {});
      continue;
    }

    it(`mounts "${entry.id}" (${entry.title})`, async () => {
      const LabComponent = entry.component;
      const props = buildDummyProps(entry);

      render(
        <SmokeTestErrorBoundary>
          <React.Suspense fallback={<div data-testid="lab-smoke-loading" />}>
            <LabComponent {...props} />
          </React.Suspense>
        </SmokeTestErrorBoundary>
      );

      await waitFor(
        () => {
          expect(screen.queryByTestId('lab-smoke-loading')).toBeNull();
        },
        { timeout: 5000 }
      );

      expect(screen.queryByTestId('lab-smoke-error')).toBeNull();
    });
  }
});
