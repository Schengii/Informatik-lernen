import React, { useState, useMemo } from 'react';
import {
  Boxes, Award
} from 'lucide-react';
import { analyzeAbcXyzMaterials } from '../../utils/wisoAbcXyzEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

const INITIAL_MATERIALS = [
  { id: 'M1', name: 'Nvidia RTX A6000 GPU', annualQuantity: 40, unitPrice: 4500, variationCoeff: 0.1 },
  { id: 'M2', name: 'Server Mainboard Dual-Socket', annualQuantity: 80, unitPrice: 850, variationCoeff: 0.2 },
  { id: 'M3', name: 'DDR5 ECC RAM 64GB', annualQuantity: 300, unitPrice: 180, variationCoeff: 0.15 },
  { id: 'M4', name: '10G SFP+ Transceiver', annualQuantity: 500, unitPrice: 35, variationCoeff: 0.3 },
  { id: 'M5', name: 'Cat.6A Patchkabel 1m', annualQuantity: 2500, unitPrice: 4, variationCoeff: 0.08 },
  { id: 'M6', name: 'Käfigmuttern M6 (100er Pack)', annualQuantity: 800, unitPrice: 12, variationCoeff: 0.45 }
];

export default function WisoAbcXyzLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [materials] = useState(INITIAL_MATERIALS);
  const [solved, setSolved] = useState(false);

  const analysis = useMemo(() => {
    return analyzeAbcXyzMaterials(materials);
  }, [materials]);

  const handleClaim = () => {
    triggerHaptic('LEVEL_UP');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'wiso_abc_xyz_master');
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
              <Award size={14} /> IHK WISO &amp; Beschaffung
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Boxes size={14} /> ABC- / XYZ-Materialanalyse
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            📦 ABC- / XYZ-Materialanalyse &amp; Beschaffungsmatrix
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Kombiniere Wertanteil (Lorenz-Kurve: A &le; 80%, B &le; 95%, C &gt; 95%) mit Bedarfsvorhersage (X &le; 0.15, Y &le; 0.35, Z &gt; 0.35) für optimale Lagerhaltungs- und Beschaffungsstrategien.
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Award size={16} /> Analyse Bestätigen (+45 XP)
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gesamter Jahreswert:</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '4px' }}>
            {analysis.totalValue.toLocaleString('de-DE')} €
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>A-Güter (Hoher Wert):</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#ef4444', marginTop: '4px' }}>
            {analysis.aCount} Artikel
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>B- &amp; C-Güter:</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10b981', marginTop: '4px' }}>
            {analysis.bCount} (B) / {analysis.cCount} (C)
          </div>
        </div>
      </div>

      {/* Materials Table */}
      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Material</th>
              <th style={{ padding: '10px' }}>Jahresmenge</th>
              <th style={{ padding: '10px' }}>Stückpreis</th>
              <th style={{ padding: '10px' }}>Jahreswert (€)</th>
              <th style={{ padding: '10px' }}>Kumulativ (%)</th>
              <th style={{ padding: '10px' }}>Klasse</th>
              <th style={{ padding: '10px' }}>Beschaffungs-Strategie</th>
            </tr>
          </thead>
          <tbody>
            {analysis.items.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{item.name}</td>
                <td style={{ padding: '12px 10px' }}>{item.annualQuantity.toLocaleString('de-DE')} Stk</td>
                <td style={{ padding: '12px 10px' }}>{item.unitPrice.toLocaleString('de-DE')} €</td>
                <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{item.annualValue.toLocaleString('de-DE')} €</td>
                <td style={{ padding: '12px 10px' }}>{item.cumulativePercent}%</td>
                <td style={{ padding: '12px 10px' }}>
                  <span className={`badge ${item.abcClass === 'A' ? 'badge-rose' : item.abcClass === 'B' ? 'badge-indigo' : 'badge-emerald'}`}>
                    {item.matrixClass}
                  </span>
                </td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  {item.recommendation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
