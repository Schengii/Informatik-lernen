import React, { useState, useMemo } from 'react';
import {
  Landmark, Award
} from 'lucide-react';
import {
  calculateLoanSchedule,
  IHK_COLLATERAL_TYPES
} from '../../utils/wisoLoanCollateralEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function WisoLoanCollateralLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [loanAmount] = useState(100000);
  const [ratePercent] = useState(4.5);
  const [years] = useState(5);
  const [loanType, setLoanType] = useState('annuity');
  const [solved, setSolved] = useState(false);

  const loanData = useMemo(() => {
    return calculateLoanSchedule({
      loanAmount,
      interestRatePercent: ratePercent,
      years,
      loanType
    });
  }, [loanAmount, ratePercent, years, loanType]);

  const handleClaim = () => {
    triggerHaptic('LEVEL_UP');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'wiso_kredit_master');
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
              <Award size={14} /> IHK WISO Finanzierung
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Landmark size={14} /> Darlehensarten &amp; Kreditsicherheiten
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            🏦 IHK Darlehensarten- &amp; Kreditsicherheiten-Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Berechne Tilgungspläne für Annuitäten-, Raten- und Fälligkeitsdarlehen. Vergleiche Personal- (Bürgschaft, Zession) mit Realsicherheiten (Grundschuld, Sicherungsübereignung).
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Award size={16} /> Tilgungsplan Bestätigen (+45 XP)
        </button>
      </div>

      {/* Loan Type Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => { setLoanType('annuity'); triggerHaptic('SELECTION'); }}
          className={`btn ${loanType === 'annuity' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '12px', textAlign: 'center' }}
        >
          <div style={{ fontWeight: 'bold' }}>1. Annuitätendarlehen</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Konstante Gesamtrate</div>
        </button>

        <button
          onClick={() => { setLoanType('installment'); triggerHaptic('SELECTION'); }}
          className={`btn ${loanType === 'installment' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '12px', textAlign: 'center' }}
        >
          <div style={{ fontWeight: 'bold' }}>2. Ratendarlehen</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Konstante Tilgung, fallende Rate</div>
        </button>

        <button
          onClick={() => { setLoanType('bullet'); triggerHaptic('SELECTION'); }}
          className={`btn ${loanType === 'bullet' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '12px', textAlign: 'center' }}
        >
          <div style={{ fontWeight: 'bold' }}>3. Fälligkeitsdarlehen</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Endfällige Tilgung am Schluss</div>
        </button>
      </div>

      {/* Hero Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Darlehensbetrag:</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '4px' }}>
            {loanData.principal.toLocaleString('de-DE')} €
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gesamte Zinslast:</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ef4444', marginTop: '4px' }}>
            {loanData.totalInterestPaid.toLocaleString('de-DE')} €
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gesamtaufwand (Kosten):</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10b981', marginTop: '4px' }}>
            {loanData.totalCost.toLocaleString('de-DE')} €
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '24px', overflowX: 'auto' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
          Jährlicher Tilgungsplan ({loanType.toUpperCase()}):
        </span>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Jahr</th>
              <th style={{ padding: '10px' }}>Restschuld Beginn</th>
              <th style={{ padding: '10px' }}>Zinsen ({ratePercent}%)</th>
              <th style={{ padding: '10px' }}>Tilgung</th>
              <th style={{ padding: '10px' }}>Jahresrate gesamt</th>
              <th style={{ padding: '10px' }}>Restschuld Ende</th>
            </tr>
          </thead>
          <tbody>
            {loanData.schedule.map((row) => (
              <tr key={row.year} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>Jahr #{row.year}</td>
                <td style={{ padding: '10px' }}>{row.startDebt.toLocaleString('de-DE')} €</td>
                <td style={{ padding: '10px', color: '#ef4444' }}>{row.zinsen.toLocaleString('de-DE')} €</td>
                <td style={{ padding: '10px', color: '#10b981' }}>{row.tilgung.toLocaleString('de-DE')} €</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{row.rateTotal.toLocaleString('de-DE')} €</td>
                <td style={{ padding: '10px' }}>{row.endDebt.toLocaleString('de-DE')} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* IHK Collateral Reference Grid */}
      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
          IHK Prüfungswissen: Systematik der Kreditsicherheiten:
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {IHK_COLLATERAL_TYPES.map((col, idx) => (
            <div key={idx} style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.88rem' }}>{col.name}</span>
                <span className={`badge ${col.category === 'Personalsicherheit' ? 'badge-indigo' : 'badge-emerald'}`} style={{ fontSize: '0.7rem' }}>
                  {col.category}
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: col.akzessorisch ? '#10b981' : '#f59e0b', marginTop: '4px' }}>
                {col.akzessorisch ? 'Akzessorisch (an Forderung gekoppelt)' : 'Nicht-akzessorisch (abstrakt/selbstständig)'}
              </div>
              <p style={{ margin: '8px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {col.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
