import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { BookOpen, Check, X } from 'lucide-react';
import { LEITNER_FLASHCARDS } from '../../data/flashcardsData';
import { triggerHaptic } from '../../utils/haptics';

export default function LeitnerFlashcardLab({ onRewardXP }) {
  const [cards] = useState(LEITNER_FLASHCARDS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = cards[currentIdx];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15]);
  const opacity = useTransform(x, [-150, 0, 150], [0.6, 1, 0.6]);

  const handleRate = (remembered) => {
    const updated = [...cards];
    if (remembered) {
      updated[currentIdx].box = Math.min(5, updated[currentIdx].box + 1);
      triggerHaptic('SUCCESS');
      if (onRewardXP) onRewardXP(15);
    } else {
      updated[currentIdx].box = 1; // Drop back to Box 1 for review
      triggerHaptic('WARNING');
    }

    setShowAnswer(false);
    x.set(0);
    setCurrentIdx((currentIdx + 1) % cards.length);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      handleRate(true); // Swipe Right = Gewusst
    } else if (info.offset.x < -100) {
      handleRate(false); // Swipe Left = Nicht gewusst
    } else {
      x.set(0);
    }
  };

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '8px' }}>
            <BookOpen size={14} /> Adaptives Spaced Repetition Lernen
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '4px 0', color: 'var(--text-main)' }}>
            🧠 Leitner Spaced Repetition Flashcard Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Wiederhole schwere IHK-Fragen in optimierten Zeitabständen (Box 1 - 5).
            <span style={{ marginLeft: '8px', color: '#6366f1', fontWeight: '600' }}>
              💡 Tipp: Touch-Swipe nach rechts (Gewusst) oder links (Wiederholen)!
            </span>
          </p>
        </div>
      </div>

      {/* Card Box Status Indicators */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {[1, 2, 3, 4, 5].map((boxNum) => (
          <div key={boxNum} style={{ flex: 1, padding: '12px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Box {boxNum}</span>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-indigo)' }}>
              {cards.filter((c) => c.box === boxNum).length}
            </div>
          </div>
        ))}
      </div>

      {/* Flashcard Main View with Motion Drag */}
      <motion.div
        style={{ x, rotate, opacity, cursor: 'grab' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        onClick={() => { setShowAnswer(!showAnswer); triggerHaptic('LIGHT'); }}
      >
        <div
          style={{
            background: 'var(--bg-primary)',
            padding: '40px 24px',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            minHeight: '220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed var(--accent-indigo)',
            marginBottom: '24px',
            userSelect: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }}
        >
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Karte {currentIdx + 1} von {cards.length} (Klick zum Umdrehen / Wischen)
          </span>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-main)', margin: '8px 0' }}>
            {showAnswer ? currentCard.a : currentCard.q}
          </h3>
          <span style={{ fontSize: '0.85rem', color: showAnswer ? '#10b981' : '#6366f1', marginTop: '8px', fontWeight: '600' }}>
            {showAnswer ? '✅ Antwort' : '❓ Frage (Klicken für Antwort)'}
          </span>
        </div>
      </motion.div>

      {/* Rating Buttons */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <button
          className="btn btn-secondary"
          onClick={() => handleRate(false)}
          style={{ borderColor: '#ef4444', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <X size={16} /> Nicht gewusst (Swipe Links)
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleRate(true)}
          style={{ background: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Check size={16} /> Gewusst (Swipe Rechts)
        </button>
      </div>
    </div>
  );
}
