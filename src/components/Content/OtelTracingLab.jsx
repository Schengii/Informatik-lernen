import React, { useState, useMemo } from 'react';
import {
  Activity, Radio, Copy, Check
} from 'lucide-react';
import { simulateDistributedTrace } from '../../utils/otelTracingEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function OtelTracingLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [scenario, setScenario] = useState('checkout'); // 'checkout' | 'error'
  const [selectedSpan, setSelectedSpan] = useState(null);
  const [copied, setCopied] = useState(false);
  const [solved, setSolved] = useState(false);

  const traceData = useMemo(() => {
    return simulateDistributedTrace(scenario);
  }, [scenario]);

  const handleCopyHeader = () => {
    navigator.clipboard.writeText(`traceparent: ${traceData.traceparent}`);
    setCopied(true);
    triggerHaptic('SUCCESS');
    setTimeout(() => setCopied(false), 2000);
    checkXP();
  };

  const handleSelectSpan = (span) => {
    setSelectedSpan(span);
    triggerHaptic('SELECTION');
    checkXP();
  };

  const checkXP = () => {
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'otel_tracing_master');
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
              <Radio size={14} /> Observability &amp; APM
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={14} /> OpenTelemetry (OTel) Distributed Tracing
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            📡 OpenTelemetry (OTel) Tracing &amp; W3C Traceparent Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Verfolge verteilte Microservice-Aufrufe mit Spans, visualisiere die Waterfall-Latenz und untersuche die W3C Context-Propagation (`traceparent`-Header).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleCopyHeader}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Kopiert!' : 'W3C Header Kopieren (+45 XP)'}
          </button>
        </div>
      </div>

      {/* Scenario Selector & Traceparent Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Trace-Szenario:</span>
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <button
              onClick={() => { setScenario('checkout'); setSelectedSpan(null); triggerHaptic('SELECTION'); }}
              className={`btn ${scenario === 'checkout' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 14px', fontSize: '0.84rem' }}
            >
              ✅ Checkout (Erfolgreich)
            </button>
            <button
              onClick={() => { setScenario('error'); setSelectedSpan(null); triggerHaptic('SELECTION'); }}
              className={`btn ${scenario === 'error' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 14px', fontSize: '0.84rem', color: '#ef4444' }}
            >
              ❌ Inventory Timeout (Fehler)
            </button>
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>W3C `traceparent` HTTP Header:</span>
          <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--accent-primary)', marginTop: '6px', wordBreak: 'break-all' }}>
            <code>{traceData.traceparent}</code>
          </div>
        </div>
      </div>

      {/* Gantt Waterfall Trace Visualizer */}
      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
          Gantt Waterfall Spans ({traceData.totalDurationMs} ms Gesamtlaufzeit):
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {traceData.spans.map((span) => {
            const leftPercent = (span.startTimeMs / traceData.totalDurationMs) * 100;
            const widthPercent = Math.max(8, (span.durationMs / traceData.totalDurationMs) * 100);
            const isSelected = selectedSpan?.id === span.id;

            return (
              <div
                key={span.id}
                onClick={() => handleSelectSpan(span)}
                style={{
                  background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-primary)',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 'bold', color: span.status === 'ERROR' ? '#ef4444' : 'var(--text-main)' }}>
                    {span.service}: <span style={{ color: 'var(--text-muted)' }}>{span.name}</span>
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    +{span.startTimeMs}ms ({span.durationMs}ms)
                  </span>
                </div>

                {/* Timeline Bar */}
                <div style={{ background: 'var(--border-color)', height: '8px', borderRadius: '4px', width: '100%', position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                      height: '100%',
                      background: span.status === 'ERROR' ? '#ef4444' : 'var(--accent-primary)',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Span Attributes Inspector */}
      {selectedSpan && (
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
            Span Attribute &amp; Tags ({selectedSpan.name}):
          </span>

          <pre
            style={{
              margin: 0,
              padding: '14px',
              background: '#090d16',
              color: '#38bdf8',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              lineHeight: '1.4'
            }}
          >
            {JSON.stringify(
              {
                spanId: selectedSpan.id,
                parentSpanId: selectedSpan.parentSpanId,
                service: selectedSpan.service,
                durationMs: selectedSpan.durationMs,
                status: selectedSpan.status,
                attributes: selectedSpan.attributes
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
