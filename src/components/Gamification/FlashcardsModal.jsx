import React, { useState } from 'react';
import { FLASHCARDS_DATA } from '../../data/flashcardsData';
import { Layers, RotateCcw, CheckCircle2, XCircle, X, Award, Sparkles } from 'lucide-react';

export default function FlashcardsModal({ isOpen, onClose, onRewardXP }) {
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  if (!isOpen) return null;

  const currentCard = FLASHCARDS_DATA[cardIdx];

  const handleNext = (known) => {
    setIsFlipped(false);
    if (known) {
      setCompletedCount((prev) => prev + 1);
      onRewardXP(15);
    }
    setCardIdx((prev) => (prev + 1) % FLASHCARDS_DATA.length);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          maxWidth: '650px',
          width: '100%',
          maxHeight: '88vh',
          background: 'var(--bg-card)',
          border: '2px solid var(--accent-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          boxShadow: 'var(--shadow-card)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          aria-label="Schließen"
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span className="badge badge-indigo" style={{ marginBottom: '8px' }}>
            <Layers size={14} /> Karteikarten ({cardIdx + 1} von {FLASHCARDS_DATA.length})
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '4px 0', color: 'var(--text-main)' }}>
            IT-Karteikarten Trainer
          </h2>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Klicke auf die Karte zum Umdrehen
          </span>
        </div>

        {/* Flip Card Area */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            width: '100%',
            minHeight: '220px',
            background: isFlipped ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
            border: isFlipped ? '2px solid var(--accent-teal)' : '2px solid var(--accent-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease',
            marginBottom: '24px'
          }}
        >
          <span className="badge badge-teal" style={{ marginBottom: '12px' }}>
            {currentCard.category} • {currentCard.difficulty}
          </span>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 10px' }}>
            {isFlipped ? '💡 Lösung / Erklärung:' : currentCard.front}
          </h3>
          {isFlipped && (
            <p style={{ fontSize: '1.02rem', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
              {currentCard.back}
            </p>
          )}
        </div>

        {/* Rating Buttons */}
        {isFlipped ? (
          <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
            <button
              className="btn btn-secondary"
              onClick={() => handleNext(false)}
              style={{ flex: 1, borderColor: 'var(--accent-rose)', color: 'var(--accent-rose)', minHeight: '48px' }}
            >
              <XCircle size={18} /> Nicht Gewusst
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleNext(true)}
              style={{ flex: 1, minHeight: '48px' }}
            >
              <CheckCircle2 size={18} /> Gewusst! (+15 XP)
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => setIsFlipped(true)}
            style={{ width: '100%', minHeight: '48px' }}
          >
            <RotateCcw size={18} /> Karte Umdrehen
          </button>
        )}
      </div>
    </div>
  );
}
