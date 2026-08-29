import React, { useState, useMemo } from 'react';
import {
  TrendingUp, Award, Scale
} from 'lucide-react';
import { calculateLeverageEffect } from '../../utils/wisoLeverageEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function WisoLeverageLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [eigenkapital, setEigenkapital] = useState(500000);
  const [fremdkapital, setFremdkapital] = useState(500000);
  const [gkrPercent, setGkrPercent] = useState(8.0);
  const [fkZinsPercent, setFkZinsPercent] = useState(4.0);
  const [solved, setSolved] = useState(false);

  const levData = useMemo(() => {
    return calculateLeverageEffect({
      eigenkapital,
      fremdkapital,
      gesamtkapitalRentabilitaetPercent: gkrPercent,
      fremdkapitalZinsPercent: fkZinsPercent
    });
  }, [eigenkapital, fremdkapital, gkrPercent, fkZinsPercent]);

  const handleClaim = () => {
    triggerHaptic('LEVEL_UP');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'wiso_leverage_master');
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
              <Scale size={14} /> IHK WISO Finanzierung &amp; Investition
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={14} /> Rentabilitäten &amp; Leverage-Effekt
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            📈 IHK Rentabilitäts- &amp; Leverage-Effekt Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Berechne Eigenkapital- (EKR), Gesamtkapital- (GKR) und Umsatzrentabilität. Simuliere den Hebel von Fremdkapital: $EKR = GKR + (GKR - i) \times \frac(FK)(EK)$.
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Award size={16} /> Rentabilität Bestätigen (+45 XP)
        </button>
      </div>

      {/* Hero Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Eigenkapitalrendite (EKR):</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: levData.ekrPercent >= levData.gkrPercent ? '#10b981' : '#ef4444', marginTop: '4px' }}>
            {levData.ekrPercent}%
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gesamtkapitalrendite (GKR):</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '4px' }}>
            {levData.gkrPercent}%
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verschuldungsgrad (FK / EK):</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--text-main)', marginTop: '4px' }}>
            {levData.verschuldungsgrad}
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Jahresüberschuss (Reingewinn):</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10b981', marginTop: '4px' }}>
            {levData.reingewinn.toLocaleString('de-DE')} €
          </div>
        </div>
      </div>

      {/* Leverage Assessment Banner */}
      <div
        style={{
          background: levData.leverageStatus === 'POSITIVE' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          border: `1px solid ${levData.leverageStatus === 'POSITIVE' ? '#10b981' : '#ef4444'}`,
          borderRadius: '10px',
          padding: '14px 18px',
          marginBottom: '24px',
          fontSize: '0.88rem',
          lineHeight: '1.5'
        }}
      >
        <strong>{levData.leverageStatus === 'POSITIVE' ? '🚀 Hebelwirkung wirksam:' : '⚠️ Zinsfalle / Negativer Leverage:'}</strong>
        <p style={{ margin: '4px 0 0 0' }}>{levData.leverageExplanation}</p>
      </div>

      {/* Interactive Controls Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
            Kapitalstruktur:
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Eigenkapital (EK): {eigenkapital.toLocaleString('de-DE')} €
              </label>
              <input
                type="range"
                min="100000"
                max="2000000"
                step="50000"
                value={eigenkapital}
                onChange={(e) => setEigenkapital(parseInt(e.target.value, 10))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Fremdkapital (FK): {fremdkapital.toLocaleString('de-DE')} €
              </label>
              <input
                type="range"
                min="0"
                max="3000000"
                step="50000"
                value={fremdkapital}
                onChange={(e) => setFremdkapital(parseInt(e.target.value, 10))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
            Ertrags- &amp; Zinskonditionen:
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Gesamtkapitalrendite (GKR): {gkrPercent}%
              </label>
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={gkrPercent}
                onChange={(e) => setGkrPercent(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Fremdkapital-Zinssatz (i): {fkZinsPercent}%
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={fkZinsPercent}
                onChange={(e) => setFkZinsPercent(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
