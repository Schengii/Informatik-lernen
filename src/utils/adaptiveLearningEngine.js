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

/**
 * Handkuratierte Zuordnung Kategorie-Schlüssel -> passendes Lab aus LAB_REGISTRY
 * (siehe data/labRegistry.js). Die Schlüssel stammen aus zwei Quellen:
 * - `category`-Feld der Prüfungsfragen in data/examData.js (ExamSimulator)
 * - `id` der Kategorien in data/quizArenaData.js (KnowledgeQuizArena)
 *
 * Vorher verlinkte RecommendationsWidget bei einer Schwäche immer nur pauschal zurück zum
 * Prüfungssimulator bzw. zur Quiz Arena ("übe einfach nochmal"), obwohl die App für fast
 * jedes Thema ein spezialisiertes interaktives Lab hat. Diese Zuordnung macht die
 * Empfehlung konkret: "schwach in Netzwerke & Subnetting" -> direkter Link ins Subnetting-Lab.
 */
export const CATEGORY_TO_LAB_ID = {
  // ExamSimulator-Kategorien (data/examData.js)
  'Computer-Grundlagen': 'ieee754_lab',
  'Datenbanken & SQL': 'sql_joins',
  'Hardware & Ergonomie': 'cpu_architecture_lab',
  'IT-Security & DSGVO': 'owasp_exploit_lab',
  'Netzwerke & Routing': 'packet_sniffer',
  'Netzwerke & Subnetting': 'subnetting',
  'Programmierung & Algorithmen': 'algo_lab',
  'Serverdienste & IT-Betrieb': 'itsm_simulator',
  'Software-Design & Clean Code': 'design_patterns',

  // KnowledgeQuizArena-Kategorien (data/quizArenaData.js)
  ai_trends: 'transformer_attention',
  cloud_devops: 'k8s_cluster_studio',
  ihk_basics: 'anfaenger_guide'
};

/**
 * Liefert die LAB_REGISTRY-ID des zu einer Kategorie passenden Labs, falls vorhanden.
 */
export function getRecommendedLabId(categoryKey) {
  return CATEGORY_TO_LAB_ID[categoryKey] || null;
}
