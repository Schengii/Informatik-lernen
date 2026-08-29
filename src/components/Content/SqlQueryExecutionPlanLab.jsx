import React, { useState, useMemo } from 'react';
import {
  Database, Play, AlertTriangle,
  Layers, Sparkles, HardDrive
} from 'lucide-react';
import {
  generateExecutionPlan,
  SAMPLE_SCHEMAS,
  SAMPLE_QUERIES
} from '../../utils/sqlQueryExecutionEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function SqlQueryExecutionPlanLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [selectedQueryId, setSelectedQueryId] = useState('user_lookup_email');
  const [customSql, setCustomSql] = useState(SAMPLE_QUERIES[0].sql);
  const [solved, setSolved] = useState(false);

  const plan = useMemo(() => {
    return generateExecutionPlan(customSql, SAMPLE_SCHEMAS.ecommerce);
  }, [customSql]);

  const handleSelectPreset = (q) => {
    setSelectedQueryId(q.id);
    setCustomSql(q.sql);
    triggerHaptic('SELECTION');
  };

  const handleAnalyze = () => {
    triggerHaptic(plan.rating === 'GOOD' ? 'SUCCESS' : 'WARNING');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'sql_plan_master');
      }
    }
  };

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} /> Relationale Datenbanken &amp; RDBMS
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} /> Query Cost Optimizer
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            SQL Query Execution Plan &amp; Cost Optimizer Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Visualisiere den physischen Ausführungsplan deiner SQL-Abfragen: Index Scans vs. Full Table Scans, Hash Joins, I/O-Kosten und B-Tree Optimierungsempfehlungen.
          </p>
        </div>

        <button
          onClick={handleAnalyze}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontWeight: 'bold' }}
        >
          <Play size={18} /> Plan Ausführen &amp; Analysieren
        </button>
      </div>

      {/* Preset Query Selector */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {SAMPLE_QUERIES.map(q => (
          <button
            key={q.id}
            onClick={() => handleSelectPreset(q)}
            className={`btn ${selectedQueryId === q.id ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.84rem', padding: '8px 14px' }}
          >
            {q.title}
          </button>
        ))}
      </div>

      {/* SQL Editor & Schema Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* SQL Editor */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-muted)' }}>
            SQL Abfrage (Editierbar):
          </label>
          <textarea
            value={customSql}
            onChange={(e) => setCustomSql(e.target.value)}
            rows={8}
            style={{
              width: '100%',
              padding: '12px',
              fontFamily: 'monospace',
              fontSize: '0.88rem',
              background: 'var(--bg-primary)',
              color: '#38bdf8',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Database Schema Reference */}
        <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <HardDrive size={18} color="var(--accent-primary)" />
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Datenbank-Schema &amp; Indizes</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', maxHeight: '170px', overflowY: 'auto' }}>
            {Object.entries(SAMPLE_SCHEMAS.ecommerce.tables).map(([tName, tData]) => (
              <div key={tName} style={{ background: 'var(--bg-primary)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <strong>{tName}</strong> ({tData.rowCount.toLocaleString()} Zeilen)
                <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginTop: '2px' }}>
                  Indizes: {tData.indexes.map(i => i.name).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Execution Plan Metrics Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Gesamt-Kosten (I/O Units)</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px', color: plan.totalCost > 20000 ? '#ef4444' : '#10b981' }}>
            {plan.totalCost.toLocaleString('de-DE')}
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Geschätzte Zeilen (Row Output)</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px', color: 'var(--text-main)' }}>
            {plan.estimatedRows.toLocaleString('de-DE')}
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Cache Hit Wahrscheinlichkeit</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px', color: '#06b6d4' }}>
            {plan.cacheHitProbability}%
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Effizienz-Rating</span>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', marginTop: '4px', color: plan.rating === 'GOOD' ? '#10b981' : plan.rating === 'WARNING' ? '#f59e0b' : '#ef4444' }}>
            {plan.rating === 'GOOD' ? '🟢 Optimal' : plan.rating === 'WARNING' ? '🟡 Optimierbar' : '🔴 Flaschenhals'}
          </div>
        </div>
      </div>

      {/* Plan Tree Visualizer */}
      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="var(--accent-primary)" /> Physischer Ausführungsbaum (Plan Tree)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {plan.nodes.map((node, idx) => {
            const isSeq = node.nodeType.includes('Seq Scan');
            return (
              <div
                key={node.id || idx}
                style={{
                  background: 'var(--bg-primary)',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  borderLeft: `4px solid ${isSeq ? '#ef4444' : '#10b981'}`,
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{node.nodeType}</span>
                    {node.table && (
                      <span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                        on {node.table}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {node.details}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: isSeq ? '#ef4444' : '#10b981' }}>
                    Cost: {node.cost} Units
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Rows: {node.estimatedRows.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations & Warnings */}
      {plan.recommendations && plan.recommendations.length > 0 && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#ef4444', fontWeight: 'bold' }}>
            <AlertTriangle size={18} /> Performance-Warnungen &amp; Index-Empfehlungen
          </div>
          {plan.recommendations.map((rec, i) => (
            <p key={i} style={{ margin: '4px 0', fontSize: '0.85rem', color: 'var(--text-main)' }}>
              • {rec.message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
