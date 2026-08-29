import React, { useState, useMemo } from 'react';
import {
  Award, Sparkles, FileText
} from 'lucide-react';
import { calculateSalaryDeductions } from '../../utils/wisoSalaryCalcEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function WisoSalaryCalculatorLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [grossSalary, setGrossSalary] = useState(3600);
  const [taxClass, setTaxClass] = useState(1);
  const [hasChildren, setHasChildren] = useState(false);
  const [churchTax, setChurchTax] = useState(false);
  const [kvZusatz, setKvZusatz] = useState(1.7);
  const [solved, setSolved] = useState(false);

  const deductions = useMemo(() => {
    return calculateSalaryDeductions({
      grossSalaryMonthly: grossSalary,
      taxClass,
      hasChildren,
      churchTax,
      kvZusatzPercent: kvZusatz
    });
  }, [grossSalary, taxClass, hasChildren, churchTax, kvZusatz]);

  const handleClaimXP = () => {
    triggerHaptic('LEVEL_UP');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'wiso_salary_expert');
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
              <Award size={14} /> IHK WISO &amp; Wirtschaftslehre
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} /> Gehalts- &amp; Sozialversicherungs-Rechner 2026
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            💶 IHK Brutto-Netto &amp; Sozialversicherungs-Studio (2026)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Berechne die gesetzlichen Abzüge (Lohnsteuer, KV, RV, AV, PV mit Kinderlosenzuschlag), Beitragsbemessungsgrenzen und die Gesamtarbeitgeberkosten nach aktuellem Recht.
          </p>
        </div>

        <button
          onClick={handleClaimXP}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Award size={18} /> Berechnung Bestätigen (+45 XP)
        </button>
      </div>

      {/* Input Parameters & Net Salary Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Left: Input Form */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
            Gehalts- &amp; Steuerdaten eingeben:
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Monatliches Bruttogehalt: {grossSalary.toLocaleString('de-DE')} €
              </label>
              <input
                type="range"
                min="1000"
                max="12000"
                step="50"
                value={grossSalary}
                onChange={(e) => { setGrossSalary(parseFloat(e.target.value)); triggerHaptic('SELECTION'); }}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Steuerklasse:</label>
                <select
                  value={taxClass}
                  onChange={(e) => { setTaxClass(parseInt(e.target.value, 10)); triggerHaptic('SELECTION'); }}
                  style={{ width: '100%', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
                >
                  <option value={1}>Klasse I (Ledig)</option>
                  <option value={2}>Klasse II (Alleinerziehend)</option>
                  <option value={3}>Klasse III (Verheiratet - Hauptverdiener)</option>
                  <option value={4}>Klasse IV (Verheiratet - Gleich)</option>
                  <option value={5}>Klasse V (Verheiratet - Zweitverdiener)</option>
                  <option value={6}>Klasse VI (Zweitjob)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>KV-Zusatzbeitrag (%):</label>
                <input
                  type="number"
                  step="0.1"
                  value={kvZusatz}
                  onChange={(e) => setKvZusatz(parseFloat(e.target.value) || 1.7)}
                  style={{ width: '100%', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={hasChildren}
                  onChange={(e) => setHasChildren(e.target.checked)}
                />
                Hat Kinder (Kein PV-Zuschlag)
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={churchTax}
                  onChange={(e) => setChurchTax(e.target.checked)}
                />
                Kirchensteuerpflichtig
              </label>
            </div>
          </div>
        </div>

        {/* Right: Net Salary Hero Display */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Nettogehalt (Auszahlung)
          </span>
          <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#10b981', margin: '8px 0' }}>
            {deductions.netSalary.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {deductions.netRatioPercent}% vom Bruttogehalt bleiben übrig
          </div>

          <div style={{ marginTop: '20px', padding: '10px 16px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '320px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gesamtkosten Arbeitgeber (AG-Brutto):</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', marginTop: '2px' }}>
              {deductions.totalEmployerCost.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
            </div>
          </div>
        </div>
      </div>

      {/* Itemized Deductions Table */}
      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} color="var(--accent-primary)" /> Detaillierte Gehaltsabrechnung &amp; Abzugs-Posten
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Lohnsteuer:</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ef4444' }}>
              -{deductions.wageTax.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
            </div>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Krankenversicherung (AN):</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ef4444' }}>
              -{deductions.employeeKv.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
            </div>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Rentenversicherung (AN):</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ef4444' }}>
              -{deductions.employeeRv.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
            </div>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Arbeitslosenversicherung (AN):</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ef4444' }}>
              -{deductions.employeeAv.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
            </div>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Pflegeversicherung (AN):</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ef4444' }}>
              -{deductions.employeePv.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
