import React, { useState } from 'react';
import { EXAM_QUESTIONS } from '../../data/examData';
import { GraduationCap, Timer, Award, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export default function ExamSimulator({ onCompleteExam }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleSelect = (qIdx, optIdx) => {
    if (!isSubmitted) {
      setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    EXAM_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / EXAM_QUESTIONS.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 60) {
      onCompleteExam(finalScore, 100);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(null);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '60px' }}>
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px', border: '2px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <span className="badge badge-indigo">IHK GAP 1 / GAP 2 Prüfungs-Trainer</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-amber)', fontWeight: 700 }}>
            <Timer size={18} /> Zeitrahmen: Ca. 15 Min
          </div>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)' }}>
          🎓 IHK Prüfungssimulator für IT-Berufe
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Simuliere echte IHK-Abschlussprüfungsfragen für Fachinformatiker. Erreiche mindestens 60% zum Bestanden-Zertifikat.
        </p>
      </div>

      {/* Exam Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {EXAM_QUESTIONS.map((q, idx) => (
          <div key={q.id} className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge badge-teal">{q.category}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>{q.difficulty}</span>
            </div>

            <p style={{ fontWeight: '800', fontSize: '1.05rem', marginBottom: '16px', color: 'var(--text-main)' }}>
              Frage {idx + 1}: {q.question}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {q.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[idx] === oIdx;
                const isCorrect = q.correct === oIdx;
                let btnBg = 'var(--bg-tertiary)';
                let btnBorder = 'var(--border-color)';
                let icon = null;

                if (isSubmitted) {
                  if (isCorrect) {
                    btnBg = 'rgba(5, 150, 105, 0.15)';
                    btnBorder = 'var(--accent-emerald)';
                    icon = <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)' }} />;
                  } else if (isSelected && !isCorrect) {
                    btnBg = 'rgba(225, 29, 72, 0.15)';
                    btnBorder = 'var(--accent-rose)';
                    icon = <XCircle size={18} style={{ color: 'var(--accent-rose)' }} />;
                  }
                } else if (isSelected) {
                  btnBg = 'rgba(79, 70, 229, 0.15)';
                  btnBorder = 'var(--accent-primary)';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(idx, oIdx)}
                    style={{
                      minHeight: '44px',
                      padding: '12px 18px',
                      borderRadius: 'var(--radius-md)',
                      background: btnBg,
                      border: `2px solid ${btnBorder}`,
                      color: 'var(--text-main)',
                      textAlign: 'left',
                      cursor: isSubmitted ? 'default' : 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <span>{opt}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {isSubmitted && (
              <div style={{ marginTop: '14px', fontSize: '0.9rem', color: 'var(--text-main)', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '6px', borderLeft: '4px solid var(--accent-primary)' }}>
                💡 <strong>Erklärung:</strong> {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        {!isSubmitted ? (
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < EXAM_QUESTIONS.length}
            style={{
              opacity: Object.keys(selectedAnswers).length < EXAM_QUESTIONS.length ? 0.5 : 1,
              width: '100%',
              minHeight: '50px',
              fontSize: '1.05rem'
            }}
          >
            <Award size={22} /> IHK Prüfung jetzt auswerten (+100 XP)
          </button>
        ) : (
          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', border: '2px solid var(--accent-primary)' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: score >= 60 ? 'var(--accent-emerald)' : 'var(--accent-rose)', marginBottom: '8px' }}>
              {score >= 60 ? '🎉 Prüfung Bestanden!' : '❌ Nicht Bestanden'}
            </h2>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
              Du hast {score}% der Punkte erreicht. ({score >= 60 ? 'Herzlichen Glückwunsch!' : 'Wiederhole das Modul zur Vorbereitung.'})
            </p>
            <button className="btn btn-secondary" onClick={handleReset} style={{ minHeight: '44px' }}>
              <RefreshCw size={18} /> Prüfung wiederholen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
