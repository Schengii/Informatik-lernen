import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle,
  FileCode,
  Award,
  TrendingDown,
  Percent
} from 'lucide-react';
import {
  calculateErrorBudget,
  evaluateBurnAlerts,
  generatePromqlBurnAlertYaml,
  STANDARD_SRE_BURN_WINDOWS
} from '../../utils/sreSloBurnEngine';
import { useStore } from '../../store/useStore';

export default function SreSloBurnLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [completed, setCompleted] = useState(false);

  // SLO Configuration
  const [serviceName] = useState('PaymentGateway');
  const [targetPercent] = useState(99.9);
  const [totalRequests] = useState(1000000);
  const [failedRequests, setFailedRequests] = useState(420);

  // Short & Long Lookback Burn Rates
  const [burnRateShort, setBurnRateShort] = useState(15.2);
  const [burnRateLong, setBurnRateLong] = useState(14.8);

  const budget = calculateErrorBudget({
    name: serviceName,
    targetPercent,
    periodDays: 30,
    totalRequests,
    failedRequests
  });

  const alerts = evaluateBurnAlerts(burnRateShort, burnRateLong, STANDARD_SRE_BURN_WINDOWS);
  const promqlYaml = generatePromqlBurnAlertYaml(serviceName, targetPercent);

  const handleSimulateCriticalIncident = () => {
    setBurnRateShort(16.5);
    setBurnRateLong(15.1);
    setFailedRequests(850);

    if (!completed) {
      setCompleted(true);
      if (onRewardXP) onRewardXP(65);
      else awardXP(65, 'sre_slo_burn_master');
    }
  };

  const handleSimulateTransientSpike = () => {
    setBurnRateShort(22.0);
    setBurnRateLong(2.4); // Long window hasn't burned enough -> No Page!
  };

  const handleResetNormal = () => {
    setBurnRateShort(0.8);
    setBurnRateLong(0.9);
    setFailedRequests(210);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px', border: '2px solid var(--accent-rose)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-rose" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Activity size={14} /> Site Reliability Engineering (SRE)
              </span>
              <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Bell size={14} /> Google SRE Multi-Burn-Rate
              </span>
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: '800', margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingDown size={28} style={{ color: 'var(--accent-rose)' }} />
              Prometheus PromQL Alerting &amp; SRE Error-Budget Burn Rate Studio
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '6px', maxWidth: '820px' }}>
              Berechnung von Service Level Objectives (SLOs), Error Budgets und multi-window burn rate alerts nach dem Google SRE Workbook. 
              Verhindert Pager-Müdigkeit durch gleichzeitige Überprüfung von Short- und Long-Lookback-Zeitfenstern.
            </p>
          </div>

          <div>
            {completed && (
              <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} /> +65 XP erhalten
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Metrics Dashboard & Simulator */}
      <div className="grid-responsive" style={{ gap: '20px', marginBottom: '24px' }}>
        {/* Left: Error Budget State */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Percent size={18} style={{ color: 'var(--accent-teal)' }} /> SLO &amp; Error Budget Status (30 Tage)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ziel-Verfügbarkeit (SLO):</span>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent-teal)' }}>{targetPercent}%</div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ist-Verfügbarkeit:</span>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: budget.currentAvailability >= targetPercent ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                {budget.currentAvailability}%
              </div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verbrauchtes Budget:</span>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: budget.budgetConsumedPercent > 90 ? 'var(--accent-rose)' : 'var(--accent-amber)' }}>
                {budget.budgetConsumedPercent}%
              </div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verbleibende Fehler:</span>
              <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)' }}>
                {budget.remainingFailures} / {budget.totalAllowedFailures}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Fehlgeschlagene Requests (5xx / Timeouts): {failedRequests}
            </label>
            <input
              type="range"
              min="0"
              max={budget.totalAllowedFailures * 1.5}
              value={failedRequests}
              onChange={(e) => setFailedRequests(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={handleSimulateCriticalIncident} className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '8px 12px' }}>
              🚨 Kritischer Ausfall (14.4x Burn)
            </button>
            <button onClick={handleSimulateTransientSpike} className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '8px 12px' }}>
              ⚡ Kurzer Spike (Kein Page!)
            </button>
            <button onClick={handleResetNormal} className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '8px 12px' }}>
              ✅ Normalbetrieb
            </button>
          </div>
        </div>

        {/* Right: Multi-Window Alerting Status */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} style={{ color: 'var(--accent-rose)' }} /> Multi-Window Burn-Rate Alerting Status
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {alerts.map((al) => (
              <div
                key={al.id}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  background: al.isFiring ? 'rgba(239, 68, 68, 0.12)' : 'var(--bg-secondary)',
                  border: `1px solid ${al.isFiring ? 'var(--accent-rose)' : 'var(--border-color)'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {al.isFiring ? (
                      <AlertTriangle size={18} style={{ color: 'var(--accent-rose)' }} />
                    ) : (
                      <CheckCircle size={18} style={{ color: 'var(--accent-emerald)' }} />
                    )}
                    <strong style={{ fontSize: '0.95rem', color: al.isFiring ? 'var(--accent-rose)' : 'var(--text-main)' }}>
                      {al.severity === 'PAGE' ? '📟 PAGER-ALERT (On-Call aufwecken)' : '🎫 TICKET-ALERT (Jira Ticket)'} ({al.burnRateThreshold}x)
                    </strong>
                  </div>
                  <span className={`badge ${al.isFiring ? 'badge-rose' : 'badge-emerald'}`} style={{ fontSize: '0.72rem' }}>
                    {al.isFiring ? 'FIRING' : 'OK'}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {al.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PromQL Alerting Rules Manifest */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileCode size={18} style={{ color: 'var(--accent-teal)' }} /> Prometheus Alerting Rule YAML (Production Ready)
        </h2>
        <div className="code-window">
          <pre className="code-body" style={{ maxHeight: '250px', overflowY: 'auto' }}>
            <code>{promqlYaml}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
