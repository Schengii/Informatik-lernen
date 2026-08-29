/**
 * P2P Coding Duel Engine
 * Provides coding challenges, unit test runners, and real-time state synchronization for P2P duels.
 */

export const CODE_DUEL_CHALLENGES = [
  {
    id: 'reverse_words',
    title: 'Wortreihenfolge umkehren',
    desc: 'Schreibe eine Funktion `reverseWords(str)`, die die Reihenfolge der Wörter in einem String umkehrt.',
    difficulty: 'Beginner',
    starterCode: `function reverseWords(str) {
  // Dein Code hier
  return str;
}`,
    tests: [
      { input: ['Hallo Welt'], expected: 'Welt Hallo' },
      { input: ['IHK Abschlusspruefung Fachinformatiker'], expected: 'Fachinformatiker Abschlusspruefung IHK' },
      { input: ['Code'], expected: 'Code' }
    ]
  },
  {
    id: 'valid_parentheses',
    title: 'Klammern-Prüfer (Stack)',
    desc: 'Schreibe eine Funktion `isValidParentheses(s)`, die prüft, ob alle Klammern (), [], {} korrekt geöffnet und geschlossen werden.',
    difficulty: 'Intermediate',
    starterCode: `function isValidParentheses(s) {
  // Nutze einen Stack (Array)
  return true;
}`,
    tests: [
      { input: ['()'], expected: true },
      { input: ['()[]{}'], expected: true },
      { input: ['(]'], expected: false },
      { input: ['([)]'], expected: false },
      { input: ['{[]}'], expected: true }
    ]
  },
  {
    id: 'find_duplicates',
    title: 'Duplikate finden (O(N) Zeit)',
    desc: 'Schreibe eine Funktion `findDuplicates(arr)`, die alle Zahlen zurückgibt, die mehr als einmal im Array vorkommen (sortiert).',
    difficulty: 'Intermediate',
    starterCode: `function findDuplicates(arr) {
  // Dein Code hier (nutze Set oder Map)
  return [];
}`,
    tests: [
      { input: [[1, 2, 3, 2, 4, 5, 1]], expected: [1, 2] },
      { input: [[10, 20, 30]], expected: [] },
      { input: [[5, 5, 5, 5]], expected: [5] }
    ]
  }
];

/**
 * Runs user code against test cases in a safe evaluation context
 */
export function runChallengeTests(code, challenge) {
  if (!code || !challenge) {
    return { passed: false, total: 0, passedCount: 0, results: [] };
  }

  const results = [];
  let passedCount = 0;

  try {
    // Extract function name
    const match = code.match(/function\s+([a-zA-Z0-9_]+)\s*\(/);
    const fnName = match ? match[1] : null;

    if (!fnName) {
      return {
        passed: false,
        total: challenge.tests.length,
        passedCount: 0,
        results: [{ passed: false, error: 'Keine gültige Funktionsdeklaration gefunden.' }]
      };
    }

    // eslint-disable-next-line no-new-func
    const evalFn = new Function(`${code}; return ${fnName};`)();

    for (let i = 0; i < challenge.tests.length; i++) {
      const test = challenge.tests[i];
      try {
        const actual = evalFn(...test.input);
        const passed = JSON.stringify(actual) === JSON.stringify(test.expected);
        if (passed) passedCount++;

        results.push({
          testIndex: i + 1,
          input: test.input,
          expected: test.expected,
          actual,
          passed
        });
      } catch (err) {
        results.push({
          testIndex: i + 1,
          input: test.input,
          expected: test.expected,
          error: err.message,
          passed: false
        });
      }
    }
  } catch (outerErr) {
    return {
      passed: false,
      total: challenge.tests.length,
      passedCount: 0,
      results: [{ passed: false, error: `Syntaxfehler: ${outerErr.message}` }]
    };
  }

  return {
    passed: passedCount === challenge.tests.length,
    total: challenge.tests.length,
    passedCount,
    results
  };
}

/**
 * Generates an opponent action for Bot-Duel simulation
 */
export function simulateBotProgress(botState, challenge) {
  const currentProgress = botState.progress || 0;
  const newProgress = Math.min(100, currentProgress + Math.floor(Math.random() * 8) + 4);
  const isFinished = newProgress >= 100;

  return {
    ...botState,
    progress: newProgress,
    status: isFinished ? 'FINISHED' : 'CODING',
    linesOfCode: Math.min(12, Math.floor(newProgress / 10) + 1),
    testsPassed: Math.min(challenge.tests.length, Math.floor((newProgress / 100) * challenge.tests.length))
  };
}
