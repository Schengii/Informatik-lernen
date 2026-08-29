import { describe, it, expect } from 'vitest';
import { ANFAENGER_GUIDES } from '../data/anfaengerGuideData';
import { QUIZ_ARENA_CATEGORIES, getLocalizedQuizCategory } from '../data/quizArenaData';
import { TRANSLATIONS } from './i18n';

// Locks in the first i18n-content pilot (see i18n.js header comment): every string a
// German-speaking user sees in these two spots must have a real English counterpart,
// not just fall back silently to the German text.
describe('i18n content pilot: AnfaengerGuideHub', () => {
  it('every guide has a complete English translation', () => {
    for (const guide of ANFAENGER_GUIDES) {
      expect(guide.en, `guide "${guide.id}" is missing an "en" translation`).toBeTruthy();
      expect(guide.en.title).toBeTruthy();
      expect(guide.en.category).toBeTruthy();
      expect(guide.en.content).toBeTruthy();
      expect(guide.en.example).toBeTruthy();
    }
  });
});

describe('i18n content pilot: Quiz Arena (ihk_basics category)', () => {
  const beginnerCategory = QUIZ_ARENA_CATEGORIES.find((c) => c.id === 'ihk_basics');

  it('the beginner category has a complete English translation with matching question count', () => {
    expect(beginnerCategory.en).toBeTruthy();
    expect(beginnerCategory.en.title).toBeTruthy();
    expect(beginnerCategory.en.questions.length).toBe(beginnerCategory.questions.length);
    beginnerCategory.en.questions.forEach((q, idx) => {
      expect(q.q).toBeTruthy();
      expect(q.options.length).toBe(beginnerCategory.questions[idx].options.length);
      expect(q.explanation).toBeTruthy();
      // The correct-answer index must match its German counterpart, or scoring would
      // silently break for English-speaking users.
      expect(q.correct).toBe(beginnerCategory.questions[idx].correct);
    });
  });

  it('getLocalizedQuizCategory returns the English variant only for lang="en"', () => {
    const localized = getLocalizedQuizCategory(beginnerCategory, 'en');
    expect(localized.title).toBe(beginnerCategory.en.title);
    expect(getLocalizedQuizCategory(beginnerCategory, 'de')).toBe(beginnerCategory);
  });
});

// Every new key added for this pilot must exist in both languages - otherwise `t(key)`
// silently falls back to German (see getTranslation in ./i18n.js), defeating the point.
describe('i18n content pilot: new translation keys', () => {
  const newKeys = [
    'beginner_guide_badge', 'beginner_guide_heading', 'beginner_guide_subheading', 'beginner_guide_example_label',
    'quiz_arena_heading', 'quiz_arena_subheading', 'quiz_arena_explanation_label', 'quiz_arena_evaluate_button',
    'quiz_arena_result_label', 'quiz_arena_passed', 'quiz_arena_retry_hint', 'quiz_arena_retry_button'
  ];

  it.each(newKeys)('key "%s" is defined in both de and en', (key) => {
    expect(TRANSLATIONS.de[key]).toBeTruthy();
    expect(TRANSLATIONS.en[key]).toBeTruthy();
  });
});
