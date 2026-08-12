import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Flame, Award } from 'lucide-react';

export default function DailyChallengeWidget({ onCompleteChallenge }) {
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const quest = {
    title: '⚡ Tages-Quest: Subnetting & IP-Adressen',
    question: 'Welches Subnetz bietet genau 254 nutzbare Host-IPs?',
    options: ['/24 (255.255.255.0)', '/16 (255.255.0.0)', '/28 (255.255.255.240)', '/30 (255.255.255.252)'],
    correct: 0,
    xpReward: 35
  };

  const handleAnswer = (optIdx) => {
    if (!answered) {
      setSelectedOpt(optIdx);
      setAnswered(true);
      if (optIdx === quest.correct) {
        onCompleteChallenge(quest.xpReward);
      }
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', border: '2px solid var(--accent-amber)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={14} /> Tages-Challenge (+{quest.xpReward} XP)
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
          🔥 Täglicher Streak Bonus
        </span>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)' }}>
        {quest.title}
      </h3>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
        {quest.question}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {quest.options.map((opt, idx) => {
          const isSelected = selectedOpt === idx;
          const isCorrect = idx === quest.correct;
          let bg = 'var(--bg-tertiary)';
          let border = 'var(--border-color)';

          if (answered) {
            if (isCorrect) {
              bg = 'rgba(5, 150, 105, 0.15)';
              border = 'var(--accent-emerald)';
            } else if (isSelected && !isCorrect) {
              bg = 'rgba(225, 29, 72, 0.15)';
              border = 'var(--accent-rose)';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              style={{
                minHeight: '44px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: bg,
                border: `2px solid ${border}`,
                color: 'var(--text-main)',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: answered ? 'default' : 'pointer',
                textAlign: 'left'
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ marginTop: '14px', fontSize: '0.9rem', color: selectedOpt === quest.correct ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={18} />
          {selectedOpt === quest.correct ? `Richtig! +${quest.xpReward} XP wurden gutgeschrieben.` : 'Falsch. Die richtige Antwort ist /24 (255.255.255.0).'}
        </div>
      )}
    </div>
  );
}
