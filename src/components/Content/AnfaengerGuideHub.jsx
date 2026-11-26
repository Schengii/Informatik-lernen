import React, { useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { ANFAENGER_GUIDES } from '../../data/anfaengerGuides';
import { ANFAENGER_THEORIE } from '../../data/anfaengerTheorie';
import MarkdownView from '../Shared/MarkdownView';
import SelfTestQuiz from '../Shared/SelfTestQuiz';
import DeepDive from '../Shared/DeepDive';
import { GUIDE_DEEPDIVES } from '../../data/vertiefungData';

/** Stellt **fetten** Text hervor, ohne HTML einzuschleusen. */
function RichText({ text }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>));
}

const ALL_CHAPTERS = [...ANFAENGER_GUIDES, ...ANFAENGER_THEORIE];
const NAV_GROUPS = [
  { label: 'Teil 1: Grundkurs (kompakt, mit Vertiefung)', chapters: ANFAENGER_GUIDES },
  { label: 'Teil 2: Theorie-Lesebuch (ausführlich zum Nachlesen)', chapters: ANFAENGER_THEORIE }
];

export default function AnfaengerGuideHub() {
  const [selectedId, setSelectedId] = useState(ALL_CHAPTERS[0].id);

  const activeIndex = Math.max(0, ALL_CHAPTERS.findIndex((g) => g.id === selectedId));
  const activeGuide = ALL_CHAPTERS[activeIndex];
  const nextGuide = ALL_CHAPTERS[activeIndex + 1];

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
          {' '}{ALL_CHAPTERS.length} Kapitel mit Selbsttest: erst der kompakte Grundkurs, dann das ausführliche Theorie-Lesebuch mit Glossar.
        </p>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.label} style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{group.label}</div>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {group.chapters.map((g) => (
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
        </div>
      ))}

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

        {activeGuide.theorie && (
          <article
            aria-label={`Theorie: ${activeGuide.title}`}
            style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', lineHeight: 1.7, fontSize: '1.02rem', color: 'var(--text-main)' }}
          >
            {activeGuide.readTime && (
              <span className="badge badge-teal" style={{ marginBottom: '8px' }}>📖 Lesezeit: {activeGuide.readTime}</span>
            )}
            <MarkdownView markdown={activeGuide.theorie} />
          </article>
        )}

        <DeepDive deepDive={GUIDE_DEEPDIVES[activeGuide.id]} />

        {activeGuide.quiz?.length > 0 && <SelfTestQuiz key={activeGuide.id} quiz={activeGuide.quiz} />}

        {activeGuide.source?.url && /^https:\/\//.test(activeGuide.source.url) && (
          <p style={{ margin: '20px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Quelle:{' '}
            <a href={activeGuide.source.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>
              {activeGuide.source.label || activeGuide.source.url}
            </a>
          </p>
        )}

        {activeGuide.sources?.some((s) => /^https:\/\//.test(s.url)) && (
          <div style={{ margin: '20px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>Quellen und weiterführende Links:</strong>
            <ul style={{ margin: '6px 0 0', paddingLeft: '20px' }}>
              {activeGuide.sources.filter((s) => /^https:\/\//.test(s.url)).map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>{s.label || s.url}</a>
                </li>
              ))}
            </ul>
          </div>
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
