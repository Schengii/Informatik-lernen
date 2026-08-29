import { describe, it, expect } from 'vitest';
import {
  CODE_DUEL_CHALLENGES,
  runChallengeTests,
  simulateBotProgress
} from './p2pCodeDuelEngine';

describe('P2P Code Duel Engine', () => {
  it('correctly validates a working solution for reverse_words', () => {
    const challenge = CODE_DUEL_CHALLENGES[0];
    const workingCode = `function reverseWords(str) {
      return str.split(' ').reverse().join(' ');
    }`;

    const res = runChallengeTests(workingCode, challenge);
    expect(res.passed).toBe(true);
    expect(res.passedCount).toBe(challenge.tests.length);
  });

  it('fails tests for incomplete or wrong solution', () => {
    const challenge = CODE_DUEL_CHALLENGES[0];
    const wrongCode = `function reverseWords(str) {
      return str;
    }`;

    const res = runChallengeTests(wrongCode, challenge);
    expect(res.passed).toBe(false);
    expect(res.passedCount).toBeLessThan(challenge.tests.length);
  });

  it('handles syntax errors gracefully without crashing', () => {
    const challenge = CODE_DUEL_CHALLENGES[0];
    const brokenCode = `function reverseWords(str) { return `;

    const res = runChallengeTests(brokenCode, challenge);
    expect(res.passed).toBe(false);
    expect(res.results[0].error).toBeDefined();
  });

  it('simulates bot progress incrementally until finished', () => {
    const challenge = CODE_DUEL_CHALLENGES[0];
    let bot = { progress: 0, status: 'CODING', testsPassed: 0 };

    bot = simulateBotProgress(bot, challenge);
    expect(bot.progress).toBeGreaterThan(0);

    // Simulate to completion
    for (let i = 0; i < 25; i++) {
      bot = simulateBotProgress(bot, challenge);
    }
    expect(bot.progress).toBe(100);
    expect(bot.status).toBe('FINISHED');
  });
});
