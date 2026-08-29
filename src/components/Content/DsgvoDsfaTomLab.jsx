import React, { useState, useMemo } from 'react';
import {
  ShieldCheck, FileText, Check, Copy
} from 'lucide-react';
import {
  evaluateDsfaCriteria,
  generateTomCatalogue
} from '../../utils/dsgvoDsfaTomEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function DsgvoDsfaTomLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [answers, setAnswers] = useState({
    special_data: true,
    large_scale: true
  });
  const [copied, setCopied] = useState(false);
  const [solved, setSolved] = useState(false);

  const dsfa = useMemo(() => {
    return evaluateDsfaCriteria(answers);
  }, [answers]);

  const toms = useMemo(() => {
    return generateTomCatalogue({});
  }, []);

  const handleToggle = (id) => {
    setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
    triggerHaptic('SELECTION');
  };

  const handleCopy = () => {
    let report = `# IHK Datenschutz-Folgenabschätzung (DSFA nach Art. 35 DSGVO)\n\n`;
    report += `- **Risikobewertung**: ${dsfa.riskLevel}\n`;
    report += `- **DSFA-Pflichtig**: ${dsfa.isDsfaMandatory ? 'JA' : 'NEIN'}\n\n`;
    report += `## Technisch-Organisatorische Maßnahmen (TOMs nach Art. 32 DSGVO)\n\n`;
    toms.forEach(t => {
      report += `### ${t.category}\n`;
      t.measures.forEach(m => {
        report += `- ${m}\n`;
      });
      report += '\n';
    });

    navigator.clipboard.writeText(report);
    setCopied(true);
    triggerHaptic('SUCCESS');
    setTimeout(() => setCopied(false), 2000);

    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'dsgvo_tom_expert');
      }
    }
  };

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} /> Datenschutz &amp; IT-Sicherheit
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={14} /> Art. 35 DSFA &amp; Art. 32 TOMs
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            ⚖️ IHK DSGVO Datenschutz-Folgenabschätzung (DSFA) &amp; TOM-Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Prüfe die Schwellwertanalyse nach Art. 35 DSGVO (EDPB Kriterien) für IT-Projekte und generiere einen normgerechten Katalog Technisch-Organisatorischer Maßnahmen (TOMs).
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Kopiert!' : 'DSFA-Bericht Kopieren (+45 XP)'}
        </button>
      </div>

      {/* Result Status Banner */}
      <div
        style={{
          background: dsfa.isDsfaMandatory ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
          border: `1px solid ${dsfa.isDsfaMandatory ? '#ef4444' : '#10b981'}`,
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: dsfa.isDsfaMandatory ? '#ef4444' : '#10b981' }}>
            {dsfa.isDsfaMandatory ? '⚠️ DSFA-Pflicht: JA (Schwellwert überschritten)' : '✅ DSFA-Pflicht: NEIN (Reguläre Verarbeitung)'}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Risikostufe: <strong>{dsfa.riskLevel}</strong> ({dsfa.activeCriteriaCount} von 9 Schwellwertkriterien aktiv)
          </div>
        </div>
      </div>

      {/* Grid: Criteria Checklist vs TOMs Catalogue */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Checklist */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
            EDPB Schwellwertkriterien (Art. 35 Abs. 3 DSGVO):
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {dsfa.criteriaList.map((c) => (
              <label
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: answers[c.id] ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  fontSize: '0.82rem'
                }}
              >
                <input
                  type="checkbox"
                  checked={!!answers[c.id]}
                  onChange={() => handleToggle(c.id)}
                  style={{ marginTop: '2px' }}
                />
                <span>{c.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* TOMs */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
            Technisch-Organisatorische Maßnahmen (TOMs - Art. 32):
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {toms.map((t, idx) => (
              <div key={idx} style={{ background: 'var(--bg-primary)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--accent-primary)', marginBottom: '6px' }}>
                  {t.category}
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  {t.measures.map((m, mIdx) => (
                    <li key={mIdx}>{m}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
