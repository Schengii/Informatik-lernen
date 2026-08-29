import React, { useState, useMemo } from 'react';
import {
  Activity, Bell, Copy, Check, ShieldAlert
} from 'lucide-react';
import {
  evaluatePromqlQuery,
  evaluateAlertRule,
  generateAlertRuleYaml
} from '../../utils/promqlAlertEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

const SAMPLE_VALUES = [0.12, 0.25, 0.38, 0.42, 0.55, 0.61, 0.68];

export default function PromqlAlertLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [metricName] = useState('http_request_duration_seconds');
  const [expr, setExpr] = useState('histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) > 0.5');
  const [threshold, setThreshold] = useState(0.5);
  const [currentVal, setCurrentVal] = useState(0.68);
  const [copied, setCopied] = useState(false);
  const [solved, setSolved] = useState(false);

  const queryResult = useMemo(() => {
    return evaluatePromqlQuery(metricName, SAMPLE_VALUES, 5);
  }, [metricName]);

  const alertEval = useMemo(() => {
    return evaluateAlertRule({ alertName: 'HighResponseLatencyP95', threshold, severity: 'critical' }, currentVal);
  }, [threshold, currentVal]);

  const yamlOutput = useMemo(() => {
    return generateAlertRuleYaml('HighResponseLatencyP95', expr, 2, 'critical', 'p95 Response-Time übersteigt Schwellwert');
  }, [expr]);

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlOutput);
    setCopied(true);
    triggerHaptic('SELECTION');
    setTimeout(() => setCopied(false), 2000);

    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'promql_alert_master');
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
              <Activity size={14} /> Observability &amp; Monitoring
            </span>
            <span className="badge badge-rose" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Bell size={14} /> Prometheus Alerting &amp; PromQL
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            📊 Prometheus PromQL &amp; Alerting Rule Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Simuliere PromQL Zeitreihen-Abfragen (`histogram_quantile`, `rate`), teste Alerting-Schwellwerte (FIRING vs. INACTIVE) und generiere produktionsreife Alert-Regeln.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Kopiert!' : 'Alert YAML Kopieren (+45 XP)'}
        </button>
      </div>

      {/* Live Alert Status Banner */}
      <div
        style={{
          background: alertEval.state === 'FIRING' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
          border: `1px solid ${alertEval.state === 'FIRING' ? '#ef4444' : '#10b981'}`,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldAlert size={24} color={alertEval.state === 'FIRING' ? '#ef4444' : '#10b981'} />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.05rem', color: alertEval.state === 'FIRING' ? '#ef4444' : '#10b981' }}>
              Status: {alertEval.state} ({alertEval.severity.toUpperCase()})
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {alertEval.summary}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Simulierter Messwert:</span>
          <input
            type="number"
            step="0.05"
            value={currentVal}
            onChange={(e) => setCurrentVal(parseFloat(e.target.value) || 0)}
            style={{ width: '80px', padding: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      {/* Grid: Metrics Stats & YAML Generator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* PromQL Query & Metrics */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            PromQL Abfrage &amp; Histogramm-Metriken:
          </span>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>PromQL Expression:</label>
            <input
              type="text"
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              style={{ width: '100%', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.8rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>p95 Latenz (5m Window)</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981' }}>{queryResult.p95}s</div>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Durchschnitt</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{queryResult.avg}s</div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              Alert Schwellwert (Threshold): {threshold}s
            </label>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.05"
              value={threshold}
              onChange={(e) => { setThreshold(parseFloat(e.target.value)); triggerHaptic('SELECTION'); }}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Prometheus YAML Alert Rule Output */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            Generierte Prometheus Alerting Rule (YAML):
          </span>

          <pre
            style={{
              margin: 0,
              padding: '14px',
              background: '#090d16',
              color: '#38bdf8',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              lineHeight: '1.4',
              maxHeight: '260px',
              overflowY: 'auto'
            }}
          >
            {yamlOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}
