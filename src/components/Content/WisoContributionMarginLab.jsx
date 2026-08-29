import React, { useState, useMemo } from 'react';
import {
  TrendingUp, Award
} from 'lucide-react';
import { calculateContributionMargin } from '../../utils/wisoContributionMarginEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function WisoContributionMarginLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [units, setUnits] = useState(5000);
  const [price, setPrice] = useState(120);
  const [varCost, setVarCost] = useState(45);
  const [prodFix, setProdFix] = useState(80000);
  const [divFix] = useState(60000);
  const [compFix] = useState(90000);
  const [solved, setSolved] = useState(false);

  const calc = useMemo(() => {
    return calculateContributionMargin({
      unitsSold: units,
      unitPrice: price,
      variableUnitCost: varCost,
      productFixedCosts: prodFix,
      divisionFixedCosts: divFix,
      companyFixedCosts: compFix
    });
  }, [units, price, varCost, prodFix, divFix, compFix]);

  const handleClaim = () => {
    triggerHaptic('LEVEL_UP');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'wiso_deckungsbeitrag_expert');
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
              <Award size={14} /> IHK WISO &amp; Kostenrechnung
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={14} /> Mehrstufige Deckungsbeitragsrechnung
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            📊 Deckungsbeitrags- &amp; Break-Even-Point Studio (DB I, II, III)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Kalkuliere Stückdeckungsbeitrag (db = p - kv), mehrstufige Fixkostendeckung (Erzeugnis-, Bereichs- &amp; Unternehmensfixkosten) und die Gewinnschwelle.
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Award size={16} /> Kalkulation Bestätigen (+45 XP)
        </button>
      </div>

      {/* Break Even Hero Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Break-Even-Point (Menge)</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '4px' }}>
            {calc.breakEvenUnits.toLocaleString('de-DE')} Stück
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Sicherheitskoeffizient</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10b981', marginTop: '4px' }}>
            {calc.safetyMarginPercent}%
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Betriebsergebnis (Gewinn)</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: calc.isProfitable ? '#10b981' : '#ef4444', marginTop: '4px' }}>
            {calc.operatingResult.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
        </div>
      </div>

      {/* Inputs vs Multi-Stage Result Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Sliders Input Form */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
            Kalkulationsparameter:
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Absatzmenge: {units.toLocaleString('de-DE')} Stück
              </label>
              <input
                type="range"
                min="500"
                max="15000"
                step="250"
                value={units}
                onChange={(e) => { setUnits(parseInt(e.target.value, 10)); triggerHaptic('SELECTION'); }}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Stückpreis (p):</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  style={{ width: '100%', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Var. Kosten (kv):</label>
                <input
                  type="number"
                  value={varCost}
                  onChange={(e) => setVarCost(parseFloat(e.target.value) || 0)}
                  style={{ width: '100%', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Erzeugnisfixkosten (K_fe):</label>
              <input
                type="number"
                value={prodFix}
                onChange={(e) => setProdFix(parseFloat(e.target.value) || 0)}
                style={{ width: '100%', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
              />
            </div>
          </div>
        </div>

        {/* Multi-Stage Margin Ladder */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
            Mehrstufige Deckungsbeitragsleiter:
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-primary)', borderRadius: '6px' }}>
              <span>Umsatzerlöse ({units} x {price} €)</span>
              <strong>{calc.totalRevenue.toLocaleString('de-DE')} €</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-primary)', borderRadius: '6px', color: '#ef4444' }}>
              <span>- Variable Kosten gesamt</span>
              <span>-{calc.totalVarCosts.toLocaleString('de-DE')} €</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '6px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
              <span>= Deckungsbeitrag I (DB I)</span>
              <span>{calc.db1Total.toLocaleString('de-DE')} €</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-primary)', borderRadius: '6px', color: '#ef4444' }}>
              <span>- Erzeugnisfixkosten</span>
              <span>-{prodFix.toLocaleString('de-DE')} €</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '6px', fontWeight: 'bold', color: '#10b981' }}>
              <span>= Deckungsbeitrag II (DB II)</span>
              <span>{calc.db2Total.toLocaleString('de-DE')} €</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-primary)', borderRadius: '6px', color: '#ef4444' }}>
              <span>- Bereichs- &amp; Unternehmensfixkosten</span>
              <span>-{(divFix + compFix).toLocaleString('de-DE')} €</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: calc.isProfitable ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${calc.isProfitable ? '#10b981' : '#ef4444'}`, borderRadius: '6px', fontWeight: 'bold', color: calc.isProfitable ? '#10b981' : '#ef4444', fontSize: '0.95rem' }}>
              <span>= Betriebsergebnis</span>
              <span>{calc.operatingResult.toLocaleString('de-DE')} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
