import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { ANFAENGER_GUIDES } from '../../data/anfaengerGuides';

/** Stellt **fetten** Text hervor, ohne HTML einzuschleusen. */
function RichText({ text }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>));
}

/** Kurzer Selbsttest je Kapitel; wird über `key` bei Kapitelwechsel zurückgesetzt. */
function GuideQuiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;
  const correct = quiz.filter((q, i) => answers[i] === q.korrekt).length;

  return (
    <div style={{ marginTop: '24px' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-main)' }}>✅ Selbsttest</h3>
      {quiz.map((q, qi) => {
        const selected = answers[qi];
        const isDone = selected !== undefined;
        return (
          <div key={qi} style={{ marginBottom: '18px' }}>
            <p style={{ fontWeight: 700, margin: '0 0 8px', color: 'var(--text-main)' }}>{qi + 1}. {q.frage}</p>
            <div role="group" aria-label={`Antworten zu Frage ${qi + 1}`} style={{ display: 'grid', gap: '8px' }}>
              {q.optionen.map((opt, oi) => {
                const isRight = oi === q.korrekt;
                const isPicked = selected === oi;
                let border = 'var(--border-color)';
                if (isDone && isRight) border = 'var(--accent-emerald)';
                else if (isDone && isPicked) border = 'var(--accent-rose, #e11d48)';
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={isDone}
                    onClick={() => setAnswers((prev) => ({ ...prev, [qi]: oi }))}
                    style={{
                      textAlign: 'left',
                      minHeight: '44px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${border}`,
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      cursor: isDone ? 'default' : 'pointer'
                    }}
                  >
                    {isDone && isRight && <CheckCircle2 size={16} style={{ marginRight: 6, verticalAlign: 'text-bottom', color: 'var(--accent-emerald)' }} />}
                    {isDone && isPicked && !isRight && <XCircle size={16} style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />}
                    {opt}
                  </button>
                );
              })}
            </div>
            <div aria-live="polite">
              {isDone && (
                <p style={{ margin: '8px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {selected === q.korrekt ? 'Richtig! ' : 'Nicht ganz. '}
                  {q.erklaerung}
                </p>
              )}
            </div>
          </div>
        );
      })}
      {answered === quiz.length && (
        <p style={{ fontWeight: 800, color: 'var(--accent-emerald)' }}>
          Ergebnis: {correct} von {quiz.length} richtig.
        </p>
      )}
    </div>
  );
}

export default function AnfaengerGuideHub() {
  const [selectedId, setSelectedId] = useState(ANFAENGER_GUIDES[0].id);

  const activeIndex = Math.max(0, ANFAENGER_GUIDES.findIndex((g) => g.id === selectedId));
  const activeGuide = ANFAENGER_GUIDES[activeIndex];
  const nextGuide = ANFAENGER_GUIDES[activeIndex + 1];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px', border: '2px solid var(--accent-emerald)' }}>
        <span className="badge badge-emerald" style={{ marginBottom: '10px' }}>
          🌱 Für absolute Einsteiger & jedes Alter
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={32} style={{ color: 'var(--accent-emerald)' }} /> Informatik-Grundlagen anschaulich erklärt
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Keine Vorkenntnisse erforderlich! Lerne Schritt für Schritt, wie Computer, Netzwerke & Code funktionieren.
          {' '}{ANFAENGER_GUIDES.length} Kapitel mit Selbsttest.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto' }}>
        {ANFAENGER_GUIDES.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedId(g.id)}
            style={{
              minHeight: '48px',
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '0.95rem',
              background: selectedId === g.id ? 'var(--accent-emerald)' : 'var(--bg-card)',
              color: selectedId === g.id ? 'var(--text-on-accent)' : 'var(--text-main)',
              border: selectedId === g.id ? '2px solid var(--accent-emerald)' : '2px solid var(--border-color)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {g.icon} {g.title}
          </button>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: '32px' }}>
        <span className="badge badge-indigo" style={{ marginBottom: '12px' }}>{activeGuide.category}</span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '16px', color: 'var(--text-main)' }}>
          {activeGuide.icon} {activeGuide.title}
        </h2>

        <div style={{ whiteSpace: 'pre-line', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '24px' }}>
          <RichText text={activeGuide.content} />
        </div>

        <div style={{ background: 'var(--bg-tertiary)', padding: '20px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-teal)' }}>
          <strong style={{ color: 'var(--accent-teal)', fontSize: '0.95rem', display: 'block', marginBottom: '6px' }}>💡 Anschauliches Praxis-Beispiel:</strong>
          <p style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-main)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
            {activeGuide.example}
          </p>
        </div>

        {activeGuide.quiz?.length > 0 && <GuideQuiz key={activeGuide.id} quiz={activeGuide.quiz} />}

        {activeGuide.source?.url && /^https:\/\//.test(activeGuide.source.url) && (
          <p style={{ margin: '20px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Quelle:{' '}
            <a href={activeGuide.source.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>
              {activeGuide.source.label || activeGuide.source.url}
            </a>
          </p>
        )}

        {nextGuide && (
          <button
            type="button"
            onClick={() => setSelectedId(nextGuide.id)}
            style={{
              marginTop: '24px',
              minHeight: '48px',
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              background: 'var(--accent-emerald)',
              color: 'var(--text-on-accent)',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Weiter: {nextGuide.title} <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
