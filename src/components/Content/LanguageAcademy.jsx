import React, { useState } from 'react';
import { PROGRAMMING_LANGUAGES } from '../../data/languageData';
import { Code2, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function LanguageAcademy() {
  const [selectedLangId, setSelectedLangId] = useState(PROGRAMMING_LANGUAGES[0].id);

  const activeLang = PROGRAMMING_LANGUAGES.find(l => l.id === selectedLangId) || PROGRAMMING_LANGUAGES[0];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px', border: '2px solid var(--accent-primary)' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Code2 size={32} style={{ color: 'var(--accent-primary)' }} /> Sprachen & Frameworks Academy
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Lerne neue Programmiersprachen & moderne Web-Frameworks (Python, Java, C#, React, Node.js).
        </p>
      </div>

      {/* Language Selector Pills */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
        {PROGRAMMING_LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setSelectedLangId(lang.id)}
            style={{
              minHeight: '48px',
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              fontWeight: '700',
              fontSize: '0.95rem',
              background: selectedLangId === lang.id ? 'var(--accent-primary)' : 'var(--bg-card)',
              color: selectedLangId === lang.id ? '#ffffff' : 'var(--text-main)',
              border: selectedLangId === lang.id ? '2px solid var(--accent-primary)' : '2px solid var(--border-color)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{lang.icon}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Language Details */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span className="badge badge-teal">{activeLang.category}</span>
          <span className="badge badge-indigo">{activeLang.difficulty}</span>
        </div>

        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px', color: 'var(--text-main)' }}>
          {activeLang.icon} {activeLang.name}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '20px' }}>
          {activeLang.description}
        </p>

        {/* Key Features */}
        <div style={{ marginBottom: '24px' }}>
          <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
            Vorteile & Features:
          </strong>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {activeLang.keyFeatures.map((feat, idx) => (
              <span key={idx} className="badge badge-indigo" style={{ fontSize: '0.85rem' }}>
                ✓ {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Syntax Code Window */}
        <div className="code-window" style={{ marginTop: '20px' }}>
          <div className="code-header">
            <span>Syntax Beispiel ({activeLang.name})</span>
            <span>Standard Syntax</span>
          </div>
          <pre className="code-body">
            <code>{activeLang.syntaxExample}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
