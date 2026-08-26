import React from 'react';
import { Target, TrendingUp, ArrowRight, Trophy } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { getWeakestCategories, getOverallAccuracy, getRecommendedLabId } from '../../utils/adaptiveLearningEngine';
import { LAB_REGISTRY } from '../../data/labRegistry';

const labTitleById = Object.fromEntries(LAB_REGISTRY.map((lab) => [lab.id, lab.title]));

const SOURCE_TAB = {
  exam: 'exam',
  quiz_arena: 'quiz_arena'
};

const SOURCE_LABEL = {
  exam: 'IHK Prüfungssimulator',
  quiz_arena: 'Quiz Arena'
};

/**
 * Adaptive Lernempfehlungen: wertet die in `userState.categoryStats` gesammelten
 * Quiz-/Prüfungs-Ergebnisse aus (siehe adaptiveLearningEngine.js) und schlägt die
 * Themen mit der aktuell niedrigsten Trefferquote zur gezielten Wiederholung vor.
 */
export default function RecommendationsWidget({ onNavigate }) {
  const { userState } = useStore();
  const categoryStats = userState.categoryStats || {};
  const weakestCategories = getWeakestCategories(categoryStats, 3);
  const overallAccuracy = getOverallAccuracy(categoryStats);

  if (weakestCategories.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', border: '2px solid var(--accent-teal)' }}>
        <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
          <Target size={14} /> Adaptive Lernempfehlungen
        </span>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
          Absolviere ein paar Runden im <strong>IHK Prüfungssimulator</strong> oder in der <strong>Quiz Arena</strong> —
          sobald genug Antworten pro Thema vorliegen, zeigen wir dir hier automatisch, wo sich Wiederholen am meisten lohnt.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', border: '2px solid var(--accent-teal)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Target size={14} /> Adaptive Lernempfehlungen
        </span>
        {overallAccuracy !== null && (
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Trophy size={15} /> Gesamt-Trefferquote: <strong style={{ color: 'var(--text-main)' }}>{overallAccuracy}%</strong>
          </span>
        )}
      </div>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '6px', color: 'var(--text-main)' }}>
        Diese Themen solltest du als Nächstes wiederholen
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
        Basierend auf deinen bisherigen Ergebnissen im Prüfungssimulator und der Quiz Arena.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
        {weakestCategories.map((cat) => {
          const recommendedLabId = getRecommendedLabId(cat.key);
          return (
          <div
            key={cat.key}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)' }}>{cat.label}</span>
              <span
                style={{
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  color: cat.accuracy < 40 ? 'var(--accent-rose)' : 'var(--accent-amber)',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat.accuracy}%
              </span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={13} /> {cat.correct}/{cat.total} richtig · {SOURCE_LABEL[cat.source] || 'Quiz'}
            </span>
            {onNavigate && recommendedLabId && (
              <button
                onClick={() => onNavigate(recommendedLabId)}
                className="btn btn-secondary btn-sm"
                style={{ alignSelf: 'flex-start', fontSize: '0.78rem', padding: '5px 10px', gap: '4px' }}
                title={labTitleById[recommendedLabId]}
              >
                Passendes Lab üben <ArrowRight size={13} />
              </button>
            )}
            {onNavigate && !recommendedLabId && SOURCE_TAB[cat.source] && (
              <button
                onClick={() => onNavigate(SOURCE_TAB[cat.source])}
                className="btn btn-secondary btn-sm"
                style={{ alignSelf: 'flex-start', fontSize: '0.78rem', padding: '5px 10px', gap: '4px' }}
              >
                Jetzt wiederholen <ArrowRight size={13} />
              </button>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
}
