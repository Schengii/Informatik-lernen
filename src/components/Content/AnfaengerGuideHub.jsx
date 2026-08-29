import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslation } from '../../utils/i18n';
import { ANFAENGER_GUIDES } from '../../data/anfaengerGuideData';

function getLocalizedGuide(guide, lang) {
  if (lang !== 'en' || !guide.en) return guide;
  return { ...guide, ...guide.en };
}

export default function AnfaengerGuideHub() {
  const { t, lang } = useTranslation();
  const [selectedId, setSelectedId] = useState(ANFAENGER_GUIDES[0].id);

  const activeGuide = getLocalizedGuide(
    ANFAENGER_GUIDES.find(g => g.id === selectedId) || ANFAENGER_GUIDES[0],
    lang
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px', border: '2px solid var(--accent-emerald)' }}>
        <span className="badge badge-emerald" style={{ marginBottom: '10px' }}>
          🌱 {t('beginner_guide_badge')}
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={32} style={{ color: 'var(--accent-emerald)' }} /> {t('beginner_guide_heading')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          {t('beginner_guide_subheading')}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto' }}>
        {ANFAENGER_GUIDES.map((g) => {
          const localized = getLocalizedGuide(g, lang);
          return (
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
                color: selectedId === g.id ? '#ffffff' : 'var(--text-main)',
                border: selectedId === g.id ? '2px solid var(--accent-emerald)' : '2px solid var(--border-color)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {g.icon} {localized.title}
            </button>
          );
        })}
      </div>

      <div className="glass-panel" style={{ padding: '32px' }}>
        <span className="badge badge-indigo" style={{ marginBottom: '12px' }}>{activeGuide.category}</span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '16px', color: 'var(--text-main)' }}>
          {activeGuide.icon} {activeGuide.title}
        </h2>

        <div style={{ whiteSpace: 'pre-line', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '24px' }}>
          {activeGuide.content}
        </div>

        <div style={{ background: 'var(--bg-tertiary)', padding: '20px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-teal)' }}>
          <strong style={{ color: 'var(--accent-teal)', fontSize: '0.95rem', display: 'block', marginBottom: '6px' }}>💡 {t('beginner_guide_example_label')}</strong>
          <p style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
            {activeGuide.example}
          </p>
        </div>
      </div>
    </div>
  );
}
