import React, { useState } from 'react';
import {
  Flame, ShieldCheck, Zap, Server,
  Award, ToggleLeft, ToggleRight
} from 'lucide-react';
import {
  INITIAL_SERVICES,
  CHAOS_EXPERIMENTS,
  evaluateSystemResilience
} from '../../utils/chaosEngineeringEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function ChaosEngineeringLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [services] = useState(INITIAL_SERVICES);
  const [activeExperiments, setActiveExperiments] = useState(['exp_payment_latency']);
  const [patterns, setPatterns] = useState({
    circuitBreaker: false,
    rateLimiter: false,
    retryBackoff: false,
    fallbackCache: false,
    bulkhead: false
  });
  const [hasClaimedXP, setHasClaimedXP] = useState(false);

  const toggleExperiment = (id) => {
    setActiveExperiments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    triggerHaptic('MEDIUM');
  };

  const togglePattern = (key) => {
    setPatterns((prev) => ({ ...prev, [key]: !prev[key] }));
    triggerHaptic('LIGHT');
  };

  const simulation = evaluateSystemResilience({
    services,
    activeExperiments,
    enabledPatterns: patterns
  });

  const handleClaimReward = () => {
    if (!hasClaimedXP && simulation.metrics.survived && activeExperiments.length >= 2) {
      setHasClaimedXP(true);
      triggerHaptic('LEVEL_UP');
      if (onRewardXP) onRewardXP(150, 'chaos_engineering');
      else awardXP(150, 'chaos_engineering');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              Microservices & System Resilience
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Chaos Monkey • Fault Injection • Circuit Breaker • Fallbacks
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flame size={30} color="#ef4444" />
            Chaos Engineering & Microservice Failure Studio
          </h1>
        </div>

        <div>
          {simulation.metrics.survived && activeExperiments.length >= 2 && (
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
              <Award size={18} /> {hasClaimedXP ? '150 XP Erhalten' : 'Chaos Überstanden (+150 XP)'}
            </button>
          )}
        </div>
      </div>

      {/* Telemetry Metrics Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>System Resilience Score</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '4px', color: simulation.metrics.resilienceScore > 80 ? '#10b981' : simulation.metrics.resilienceScore > 40 ? '#f59e0b' : '#ef4444' }}>
            {simulation.metrics.resilienceScore} / 100
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {simulation.metrics.survived ? '🟢 System stabil & resilient' : '🔴 Kritisches Fehlerrisiko'}
          </span>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Durchschnittliche Latenz</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '4px', color: simulation.metrics.avgLatency < 100 ? '#10b981' : simulation.metrics.avgLatency < 400 ? '#f59e0b' : '#ef4444' }}>
            {simulation.metrics.avgLatency} ms
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>P99 Request Turnaround</span>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gesamt-Fehlerrate</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '4px', color: simulation.metrics.overallErrorRate < 5 ? '#10b981' : '#ef4444' }}>
            {simulation.metrics.overallErrorRate}%
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>HTTP 5xx Server Errors</span>
        </div>
      </div>

      {/* Main Grid: Architecture Nodes + Chaos & Resilience Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)', gap: '20px' }}>
        {/* Left Column: Microservices Architecture Canvas */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Server size={20} color="#6366f1" />
            Live Microservices Topologie ({simulation.services.length} Instanzen)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {simulation.services.map((svc) => {
              const isHealthy = svc.status === 'healthy';
              const isDegraded = svc.status === 'degraded';
              const statusColor = isHealthy ? '#10b981' : isDegraded ? '#f59e0b' : '#ef4444';

              return (
                <div
                  key={svc.id}
                  style={{
                    background: 'var(--bg-primary)',
                    border: `1.5px solid ${statusColor}`,
                    borderRadius: '10px',
                    padding: '14px',
                    boxShadow: isHealthy ? 'none' : `0 0 15px ${statusColor}33`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {svc.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', background: `${statusColor}22`, color: statusColor, fontWeight: 'bold' }}>
                      {svc.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <span>Latenz:</span>
                    <strong style={{ color: svc.currentLatency > 300 ? '#ef4444' : 'var(--text-main)' }}>
                      {svc.currentLatency} ms
                    </strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <span>Fehlerrate:</span>
                    <strong style={{ color: svc.currentErrorRate > 10 ? '#ef4444' : 'var(--text-main)' }}>
                      {svc.currentErrorRate}%
                    </strong>
                  </div>

                  {svc.circuitState === 'OPEN' && (
                    <div style={{ marginTop: '8px', padding: '4px 8px', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '4px', fontSize: '0.75rem', color: '#ef4444', fontWeight: 'bold' }}>
                      ⚡ Circuit Breaker: OPEN (Fast-Fail)
                    </div>
                  )}

                  {svc.fallbackTriggered && (
                    <div style={{ marginTop: '4px', padding: '4px 8px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '4px', fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>
                      🛡️ Fallback-Cache aktiv (Stale Data)
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chaos Controls & Resilience Toggles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Fault Injections (Chaos Monkeys) */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="#ef4444" />
              Chaos Fault Injections
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CHAOS_EXPERIMENTS.map((exp) => {
                const isActive = activeExperiments.includes(exp.id);
                return (
                  <button
                    key={exp.id}
                    onClick={() => toggleExperiment(exp.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: isActive ? '2px solid #ef4444' : '1px solid var(--border-color)',
                      background: isActive ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-primary)',
                      color: isActive ? '#ef4444' : 'var(--text-main)',
                      fontWeight: isActive ? 'bold' : 'normal',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.82rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{exp.title}</span>
                      <span>{isActive ? '🔴 AKTIV' : '⚪ AUS'}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{exp.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resilience Patterns Toggles */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#10b981" />
              Resilienz-Patterns zuschalten
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { key: 'circuitBreaker', title: 'Circuit Breaker (Fast-Fail)', desc: 'Öffnet bei Fehlern und blockiert kaskadierende Hänger' },
                { key: 'fallbackCache', title: 'Fallback Cache (Stale While Revalidate)', desc: 'Liefert Cache-Daten bei Downstream-Ausfällen' },
                { key: 'rateLimiter', title: 'Token Bucket Rate Limiter', desc: 'Schützt das Gateway vor Traffic-Spitzen' },
                { key: 'bulkhead', title: 'Bulkhead Isolation', desc: 'Isoliert Worker-Pools unabhängiger Services' },
                { key: 'retryBackoff', title: 'Retry mit Exponential Backoff', desc: 'Wiederholt flüchtige Netzwerkfehler' }
              ].map((p) => {
                const isEnabled = patterns[p.key];
                return (
                  <div
                    key={p.key}
                    onClick={() => togglePattern(p.key)}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: isEnabled ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-primary)',
                      border: isEnabled ? '1.5px solid #10b981' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: isEnabled ? '#10b981' : 'var(--text-main)', display: 'block' }}>
                        {p.title}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {p.desc}
                      </span>
                    </div>
                    {isEnabled ? <ToggleRight size={26} color="#10b981" /> : <ToggleLeft size={26} color="var(--text-muted)" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
