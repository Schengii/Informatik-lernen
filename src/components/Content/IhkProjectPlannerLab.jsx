import React, { useState } from 'react';
import {
  FileText, CheckCircle, AlertTriangle, Calculator,
  TrendingUp, Download, Copy,
  BarChart3, Award
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import {
  IHK_PROFESSIONS,
  DEFAULT_PHASES,
  validatePhasePlanning,
  calculateNWA,
  calculateEconomicFeasibility,
  generateDocumentationMarkdown
} from '../../utils/ihkProjectPlannerEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function IhkProjectPlannerLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [activeTab, setActiveTab] = useState('phases'); // 'phases' | 'nwa' | 'econ' | 'preview'
  const [professionId, setProfessionId] = useState('fiae');
  const [studentName, setStudentName] = useState('Alex Dev');
  const [company, setCompany] = useState('Cloud Solutions GmbH');
  const [projectTitle, setProjectTitle] = useState('Entwicklung eines Event-Driven Microservice Backends');

  // Phases State
  const [phases, setPhases] = useState(() => {
    const prof = IHK_PROFESSIONS.fiae;
    return DEFAULT_PHASES.map((p, idx) => ({ ...p, hours: prof.recommendedPhases[idx] }));
  });

  // Nutzwertanalyse State
  const [criteria] = useState([
    { id: 'c1', name: 'Performance & Latenz', weight: 35, isKnockout: false, minScore: 5 },
    { id: 'c2', name: 'OpenSource / Keine Lizenzgebühren', weight: 25, isKnockout: false, minScore: 5 },
    { id: 'c3', name: 'DSGVO & Datensouveränität', weight: 25, isKnockout: true, minScore: 6 },
    { id: 'c4', name: 'Wartbarkeit & Community Support', weight: 15, isKnockout: false, minScore: 5 }
  ]);

  const [options, setOptions] = useState([
    { id: 'opt1', name: 'Option A: Cloud SaaS Solution', scores: { c1: 9, c2: 3, c3: 4, c4: 8 } },
    { id: 'opt2', name: 'Option B: Self-Hosted Docker/K8s', scores: { c1: 8, c2: 10, c3: 9, c4: 8 } },
    { id: 'opt3', name: 'Option C: Eigenentwicklung Core', scores: { c1: 6, c2: 8, c3: 9, c4: 5 } }
  ]);

  // Economic State
  const [hourlyRate, setHourlyRate] = useState(65);
  const [materialCosts, setMaterialCosts] = useState(1500);
  const [annualSavings, setAnnualSavings] = useState(9600);

  const [hasCopied, setHasCopied] = useState(false);
  const [hasClaimedXP, setHasClaimedXP] = useState(false);

  const currentProf = IHK_PROFESSIONS[professionId] || IHK_PROFESSIONS.fiae;
  const phaseValidation = validatePhasePlanning(professionId, phases);
  const nwaResult = calculateNWA(criteria, options);
  const econResult = calculateEconomicFeasibility({
    hourlyRate,
    hours: phaseValidation.totalHours,
    materialCosts,
    annualSavings
  });

  const handleProfessionChange = (id) => {
    setProfessionId(id);
    const prof = IHK_PROFESSIONS[id];
    setPhases(DEFAULT_PHASES.map((p, idx) => ({ ...p, hours: prof.recommendedPhases[idx] })));
    triggerHaptic('LIGHT');
  };

  const updatePhaseHours = (index, val) => {
    const next = [...phases];
    next[index].hours = Math.max(0, parseInt(val, 10) || 0);
    setPhases(next);
  };

  const updateScore = (optId, critId, val) => {
    setOptions((prev) =>
      prev.map((opt) => {
        if (opt.id !== optId) return opt;
        return {
          ...opt,
          scores: { ...opt.scores, [critId]: Math.min(10, Math.max(0, parseInt(val, 10) || 0)) }
        };
      })
    );
  };

  const handleClaimReward = () => {
    if (!hasClaimedXP && phaseValidation.isValid) {
      setHasClaimedXP(true);
      triggerHaptic('SUCCESS');
      if (onRewardXP) onRewardXP(150, 'ihk_project_planner');
      else awardXP(150, 'ihk_project_planner');
    }
  };

  const markdownDoc = generateDocumentationMarkdown({
    projectTitle,
    studentName,
    company,
    professionId,
    phases,
    nwa: { ...nwaResult, criteria },
    econ: econResult
  });

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdownDoc);
    setHasCopied(true);
    triggerHaptic('SUCCESS');
    setTimeout(() => setHasCopied(false), 2500);
  };

  const chartData = nwaResult.results.map((r) => ({
    name: r.name.replace('Option ', ''),
    score: r.weightedScore,
    isFailed: r.isKnockoutFailed
  }));

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '6px 12px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              IHK Abschlussprüfung Teil B (AO 2020)
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Phasenprüfer • Nutzwertanalyse • Amortisation • Doku-Export
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={30} color="#6366f1" />
            IHK Projektdokumentation & Nutzwertanalyse-Studio
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {phaseValidation.isValid && (
            <button
              onClick={handleClaimReward}
              disabled={hasClaimedXP}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: hasClaimedXP ? 'rgba(16, 185, 129, 0.2)' : 'var(--accent-primary, #6366f1)',
                color: hasClaimedXP ? '#10b981' : '#fff',
                border: 'none', padding: '9px 16px', borderRadius: '8px', cursor: hasClaimedXP ? 'default' : 'pointer', fontWeight: 'bold'
              }}
            >
              <Award size={18} /> {hasClaimedXP ? '150 XP Erhalten' : 'Plan Validieren & +150 XP'}
            </button>
          )}
        </div>
      </div>

      {/* Profession Selector */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
          Ausbildungsberuf nach AO 2020 auswählen:
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {Object.values(IHK_PROFESSIONS).map((prof) => {
            const isSelected = prof.id === professionId;
            return (
              <button
                key={prof.id}
                onClick={() => handleProfessionChange(prof.id)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid #6366f1' : '1px solid var(--border-color)',
                  background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-primary)',
                  color: isSelected ? '#6366f1' : 'var(--text-main)',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>{prof.title.split(' ')[0]} {prof.title.split(' ')[1]}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Vorgabe: {prof.maxHours} Stunden</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px' }}>
        {[
          { id: 'phases', label: '1. Zeitplanung & Phasen', icon: Calculator },
          { id: 'nwa', label: '2. Nutzwertanalyse (NWA)', icon: BarChart3 },
          { id: 'econ', label: '3. Wirtschaftlichkeit & ROI', icon: TrendingUp },
          { id: 'preview', label: '4. Doku-Vorschau & Export', icon: Download }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); triggerHaptic('LIGHT'); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '8px',
                border: 'none',
                background: isActive ? 'var(--accent-primary, #6366f1)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-muted)',
                fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem'
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Phasen & Zeitplanung */}
      {activeTab === 'phases' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)', gap: '20px' }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px' }}>
              Projektphasen definieren ({phaseValidation.totalHours} / {currentProf.maxHours}h)
            </h2>

            {/* Validation Banner */}
            {phaseValidation.isValid ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <CheckCircle size={18} /> Perfekt: Genau {currentProf.maxHours} Stunden nach IHK-Richtlinie geplant.
              </div>
            ) : (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <AlertTriangle size={18} /> {phaseValidation.errors[0]}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {phases.map((phase, idx) => (
                <div key={phase.id} style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 100px 70px', gap: '14px', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 'bold', fontSize: '0.95rem', display: 'block' }}>{phase.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{phase.desc}</span>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={phase.hours}
                      onChange={(e) => updatePhaseHours(idx, e.target.value)}
                      style={{
                        width: '100%', padding: '6px 10px',
                        background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                        color: 'var(--text-main)', borderRadius: '6px', fontWeight: 'bold', textAlign: 'center'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {((phase.hours / (phaseValidation.totalHours || 1)) * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines Sidebar */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '12px' }}>
              IHK-Prüfungsregeln (AO 2020)
            </h3>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', paddingLeft: '18px' }}>
              <li><strong>Analyse & Konzeption:</strong> ~15–20% (Ist-/Soll-Analyse, Lastenheft, Wirtschaftlichkeit).</li>
              <li><strong>Entwurf:</strong> ~15–20% (Architektur, Datenmodell, Mockups, Pflichtenheft).</li>
              <li><strong>Realisierung:</strong> ~40–50% (Programmierung, Konfiguration, Integration).</li>
              <li><strong>Qualitätssicherung:</strong> ~10–15% (Unit-Tests, Abnahmetests, Lasttests).</li>
              <li><strong>Dokumentation:</strong> ~10–15% (Entwickler- & Benutzerdoku, Fazit).</li>
            </ul>

            {phaseValidation.warnings.length > 0 && (
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#f59e0b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={16} /> Empfehlungen:
                </span>
                {phaseValidation.warnings.map((w, i) => (
                  <p key={i} style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '4px', margin: 0 }}>
                    • {w}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Nutzwertanalyse */}
      {activeTab === 'nwa' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)', gap: '20px' }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px' }}>
              Nutzwertanalyse Matrix (Bewertung 0 - 10)
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {options.map((opt) => (
                <div key={opt.id} style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--text-main)' }}>
                      {opt.name}
                    </span>
                    <span style={{ fontSize: '0.9rem', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', padding: '4px 10px', borderRadius: '8px', fontWeight: 'bold' }}>
                      Nutzwert: {nwaResult.results.find((r) => r.id === opt.id)?.weightedScore} / 10
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    {criteria.map((crit) => (
                      <div key={crit.id} style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{crit.name} ({crit.weight}%)</span>
                          <span style={{ fontWeight: 'bold' }}>{opt.scores[crit.id] ?? 0}/10</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={opt.scores[crit.id] ?? 0}
                          onChange={(e) => updateScore(opt.id, crit.id, e.target.value)}
                          style={{ width: '100%' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NWA Ranking & Chart */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '12px' }}>
              NWA Ergebnis & Ranking
            </h3>

            {nwaResult.winner ? (
              <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '8px', marginBottom: '16px' }}>
                <span style={{ fontWeight: 'bold', color: '#10b981', fontSize: '0.85rem' }}>🏆 Empfohlene Lösung:</span>
                <p style={{ fontWeight: '800', fontSize: '1.05rem', margin: '4px 0 0 0', color: 'var(--text-main)' }}>
                  {nwaResult.winner.name} ({nwaResult.winner.weightedScore}/10 Punkte)
                </p>
              </div>
            ) : null}

            <div style={{ height: '220px', width: '100%', marginTop: '10px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" domain={[0, 10]} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#6366f1" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.isFailed ? '#ef4444' : index === 0 ? '#10b981' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Wirtschaftlichkeit & Amortisation */}
      {activeTab === 'econ' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)', gap: '20px' }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px' }}>
              Kosten-Nutzen & Amortisations-Rechner
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Stundensatz Azubi / Entwickler (€/h)
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  style={{
                    width: '100%', padding: '10px', background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Sachmittel- & Lizenzkosten (€)
                </label>
                <input
                  type="number"
                  value={materialCosts}
                  onChange={(e) => setMaterialCosts(e.target.value)}
                  style={{
                    width: '100%', padding: '10px', background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Erwartete jährliche Einsparung / Nutzen (€/Jahr)
              </label>
              <input
                type="number"
                value={annualSavings}
                onChange={(e) => setAnnualSavings(e.target.value)}
                style={{
                  width: '100%', padding: '10px', background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px'
                }}
              />
            </div>
          </div>

          {/* Economic Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gesamt-Investition</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '6px', color: '#6366f1' }}>
                {econResult.totalInvestment.toLocaleString('de-DE')} €
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {econResult.laborCosts} € Personal + {econResult.materialCosts} € Sachmittel
              </span>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Amortisationszeit</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '6px', color: '#10b981' }}>
                {econResult.amortizationMonths} Monate
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Break-Even nach ~{(econResult.amortizationMonths / 12).toFixed(1)} Jahren
              </span>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', gridColumn: 'span 2' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>3-Jahres Return on Investment (ROI)</span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '6px', color: '#f59e0b' }}>
                +{econResult.roiPercentage}%
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Nettogewinn nach 3 Jahren: {econResult.net3YearBenefit.toLocaleString('de-DE')} €
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Preview & Export */}
      {activeTab === 'preview' && (
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Projekttitel</label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                style={{ width: '100%', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Name Azubi / Verfasser</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                style={{ width: '100%', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Ausbildungsbetrieb</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{ width: '100%', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '6px', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              Druckfertige Markdown-Dokumentation
            </h2>
            <button
              onClick={copyMarkdown}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: hasCopied ? '#10b981' : 'var(--accent-primary, #6366f1)',
                color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              <Copy size={16} /> {hasCopied ? 'Kopiert!' : 'Markdown Kopieren'}
            </button>
          </div>

          <textarea
            readOnly
            value={markdownDoc}
            rows={18}
            style={{
              width: '100%', padding: '14px', background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)', color: 'var(--text-main)',
              borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: '1.5'
            }}
          />
        </div>
      )}
    </div>
  );
}
