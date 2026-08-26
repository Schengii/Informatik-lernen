/**
 * Adaptive Learning Path Engine
 *
 * Sammelt kategorisierte Quiz-/Prüfungs-Ergebnisse (IHK-Prüfungssimulator, Quiz Arena, ...)
 * und leitet daraus konkrete Lernempfehlungen ab: Themen, in denen die Trefferquote am
 * niedrigsten ist, werden zuerst zur Wiederholung vorgeschlagen.
 */

// Eine Kategorie wird erst berücksichtigt, wenn mindestens so viele Fragen beantwortet wurden.
// Verhindert, dass ein einzelner Ausrutscher (1 von 1 falsch = 0%) das Ranking dominiert.
export const MIN_ATTEMPTS_FOR_RECOMMENDATION = 2;

/**
 * Verrechnet ein neues Quiz-/Prüfungs-Ergebnis in die bestehende Kategorie-Statistik.
 * Ergebnisse werden pro Kategorie kumuliert (nicht überschrieben), damit sich die
 * Trefferquote über mehrere Versuche hinweg stabilisiert.
 */
export function recordCategoryAttempt(categoryStats, categoryKey, { label, source, correctCount, totalCount }) {
  if (!categoryKey || !totalCount) return categoryStats || {};

  const prev = categoryStats?.[categoryKey] || { correct: 0, total: 0 };

  return {
    ...categoryStats,
    [categoryKey]: {
      label: label || prev.label || categoryKey,
      source: source || prev.source,
      correct: prev.correct + correctCount,
      total: prev.total + totalCount
    }
  };
}

/**
 * Liefert die `limit` Kategorien mit der niedrigsten Trefferquote, absteigend nach
 * Dringlichkeit sortiert (schwächste zuerst; bei Gleichstand mehr Datenpunkte zuerst).
 */
export function getWeakestCategories(categoryStats = {}, limit = 3) {
  return Object.entries(categoryStats)
    .map(([key, stats]) => ({
      key,
      label: stats.label || key,
      source: stats.source,
      correct: stats.correct,
      total: stats.total,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    }))
    .filter((entry) => entry.total >= MIN_ATTEMPTS_FOR_RECOMMENDATION)
    .sort((a, b) => a.accuracy - b.accuracy || b.total - a.total)
    .slice(0, limit);
}

/**
 * Gesamt-Trefferquote über alle erfassten Kategorien hinweg (für eine Übersichtsanzeige).
 */
export function getOverallAccuracy(categoryStats = {}) {
  const totals = Object.values(categoryStats).reduce(
    (acc, s) => ({ correct: acc.correct + s.correct, total: acc.total + s.total }),
    { correct: 0, total: 0 }
  );
  return totals.total > 0 ? Math.round((totals.correct / totals.total) * 100) : null;
}
