import { describe, it, expect } from 'vitest';
import {
  recordCategoryAttempt,
  getWeakestCategories,
  getOverallAccuracy,
  MIN_ATTEMPTS_FOR_RECOMMENDATION
} from './adaptiveLearningEngine';

describe('adaptiveLearningEngine', () => {
  it('kumuliert mehrere Versuche derselben Kategorie statt sie zu überschreiben', () => {
    let stats = {};
    stats = recordCategoryAttempt(stats, 'netzwerke', {
      label: 'Netzwerke & Subnetting', source: 'exam', correctCount: 1, totalCount: 2
    });
    stats = recordCategoryAttempt(stats, 'netzwerke', {
      label: 'Netzwerke & Subnetting', source: 'exam', correctCount: 3, totalCount: 4
    });

    expect(stats.netzwerke.correct).toBe(4);
    expect(stats.netzwerke.total).toBe(6);
    expect(stats.netzwerke.label).toBe('Netzwerke & Subnetting');
  });

  it('ignoriert Aufrufe ohne gültige Kategorie oder ohne beantwortete Fragen', () => {
    const stats = recordCategoryAttempt({}, 'sql', { correctCount: 0, totalCount: 0 });
    expect(stats).toEqual({});
  });

  it('blendet Kategorien mit zu wenigen Versuchen aus der Empfehlung aus', () => {
    const stats = {
      sql: { label: 'SQL', correct: 0, total: 1 } // unter MIN_ATTEMPTS_FOR_RECOMMENDATION
    };
    expect(MIN_ATTEMPTS_FOR_RECOMMENDATION).toBeGreaterThan(1);
    expect(getWeakestCategories(stats)).toEqual([]);
  });

  it('sortiert die schwächsten Kategorien nach Trefferquote aufsteigend', () => {
    const stats = {
      sql: { label: 'SQL', correct: 4, total: 5 }, // 80%
      security: { label: 'IT-Security', correct: 1, total: 5 }, // 20%
      networking: { label: 'Netzwerke', correct: 3, total: 6 } // 50%
    };

    const weakest = getWeakestCategories(stats, 2);
    expect(weakest.map((c) => c.key)).toEqual(['security', 'networking']);
    expect(weakest[0].accuracy).toBe(20);
  });

  it('berechnet die Gesamt-Trefferquote über alle Kategorien', () => {
    const stats = {
      a: { correct: 2, total: 4 },
      b: { correct: 3, total: 6 }
    };
    expect(getOverallAccuracy(stats)).toBe(50);
    expect(getOverallAccuracy({})).toBeNull();
  });
});
