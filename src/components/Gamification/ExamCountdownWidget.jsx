import React, { useState, useEffect } from 'react';
import { Calendar, Target, Clock, ChevronRight, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';

const IHK_EXAM_PRESETS = [
  { id: 'ap1_spring', name: 'IHK AP1 Frühjahr (März)', month: 2, day: 15 },
  { id: 'ap2_summer', name: 'IHK AP2 Sommer (Mai)', month: 4, day: 10 },
  { id: 'ap2_winter', name: 'IHK AP2 Winter (November)', month: 10, day: 25 },
];

export default function ExamCountdownWidget({ setActiveTab }) {
  const { userState, setUserState } = useStore();
  const [targetDateStr, setTargetDateStr] = useState(() => {
    return userState.examTargetDate || '';
  });
  const [examType, setExamType] = useState(() => {
    return userState.examTargetType || 'ap2';
  });

  const [daysRemaining, setDaysRemaining] = useState(null);

  useEffect(() => {
    if (!targetDateStr) {
      setDaysRemaining(null);
      return;
    }
    const target = new Date(targetDateStr);
    const now = new Date();
    // Zeitanteil normalisieren
    target.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    const diffMs = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays);
  }, [targetDateStr]);

  const handleSaveDate = (newDateStr, newType = examType) => {
    setTargetDateStr(newDateStr);
    setExamType(newType);
    setUserState((prev) => ({
      ...prev,
      examTargetDate: newDateStr,
      examTargetType: newType,
    }));
  };

  const handleSelectPreset = (preset) => {
    const currentYear = new Date().getFullYear();
    let target = new Date(currentYear, preset.month, preset.day);
    if (target < new Date()) {
      target = new Date(currentYear + 1, preset.month, preset.day);
    }
    const isoDate = target.toISOString().slice(0, 10);
    handleSaveDate(isoDate, preset.id.includes('ap1') ? 'ap1' : 'ap2');
  };

  const sprintRecommendations = [
    {
      tab: 'transfer_time_lab',
      title: '⚡ Bandbreiten & Übertragungszeiten',
      desc: 'Bit/Byte Umrechnung & TCP/IP Overhead (sehr häufig in AP1 & AP2)',
      badge: 'AP1 & AP2'
    },
    {
      tab: 'cpm_network',
      title: '🔀 Netzplan (CPM) Vorwärts-/Rückwärtsrechnung',
      desc: 'Pufferzeiten (GP & FP) und kritischen Pfad ermitteln',
      badge: 'IHK Standard'
    },
    {
      tab: 'wiso_payment_lab',
      title: '💶 WISO: Zahlungsverkehr & Skonto',
      desc: 'SEPA-Verfahren, Lastschrift-Fristen & Effektivzins-Rechnung',
      badge: 'WISO Pflicht'
    },
    {
      tab: 'exam',
      title: '🎓 Vollständige Prüfungssimulation',
      desc: '90-Minuten IHK-Prüfungsmodus mit Punkteverteilung',
      badge: 'Simulation'
    }
  ];

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        marginBottom: '32px',
        border: '2px solid var(--accent-primary, #6366f1)',
        borderRadius: 'var(--radius-xl, 16px)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
        <div>
          <span className="badge badge-indigo" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Target size={14} /> IHK Prüfungstaktik &amp; T-Minus Sprint
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
            IHK Prüfungs-Countdown
          </h2>
        </div>

        {daysRemaining !== null && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: daysRemaining <= 30 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(99, 102, 241, 0.15)',
            border: `1px solid ${daysRemaining <= 30 ? '#ef4444' : 'var(--accent-primary, #6366f1)'}`,
            padding: '8px 16px',
            borderRadius: '12px'
          }}>
            <Clock size={24} color={daysRemaining <= 30 ? '#ef4444' : 'var(--accent-primary, #6366f1)'} />
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: daysRemaining <= 30 ? '#ef4444' : 'var(--accent-primary, #6366f1)' }}>
                {daysRemaining > 0 ? `T-Minus ${daysRemaining} Tage` : daysRemaining === 0 ? 'Heute Prüfungstag!' : 'Prüfung abgeschlossen!'}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                Ziel: {targetDateStr} ({examType.toUpperCase()})
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Datumseinstellung & Schnellwahl */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
        <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={16} /> Prüfungstermin:
        </label>
        <input
          type="date"
          value={targetDateStr}
          onChange={(e) => handleSaveDate(e.target.value)}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color, #ccc)',
            background: 'var(--bg-card, #fff)',
            color: 'var(--text-main, #000)'
          }}
        />

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {IHK_EXAM_PRESETS.map((p) => (
            <button
              key={p.id}
              className="btn btn-secondary btn-sm"
              onClick={() => handleSelectPreset(p)}
              style={{ fontSize: '0.78rem', padding: '4px 10px' }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* T-Minus Sprint Empfehlungen */}
      <div>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={16} color="var(--accent-amber)" /> Täglicher IHK-Power-Sprint (Priorisierte Module)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {sprintRecommendations.map((rec) => (
            <div
              key={rec.tab}
              className="glass-panel glass-panel-hover"
              onClick={() => setActiveTab && setActiveTab(rec.tab)}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>{rec.title}</span>
                  <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{rec.badge}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                  {rec.desc}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '8px' }}>
                Jetzt trainieren <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
