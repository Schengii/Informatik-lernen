import React, { useState, useMemo } from 'react';
import {
  Globe, Zap, Play
} from 'lucide-react';
import { benchmarkProtocols } from '../../utils/apiProtocolBenchmarkEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function ApiProtocolBenchmarkLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [requestCount, setRequestCount] = useState(1000);
  const [latency, setLatency] = useState(25);
  const [solved, setSolved] = useState(false);

  const benchmark = useMemo(() => {
    return benchmarkProtocols({ requestCount, networkLatencyMs: latency });
  }, [requestCount, latency]);

  const handleRun = () => {
    triggerHaptic('LEVEL_UP');
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'api_benchmark_master');
      }
    }
  };

  const { rest, grpc, graphql } = benchmark.protocols;

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} /> Netzwerk &amp; Protokolle
            </span>
            <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} /> Live Benchmark Arena
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            ⚡ REST vs. gRPC vs. GraphQL Benchmark Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Vergleiche Latenzen, Binär- vs. Text-Serialisierung (Protobuf vs. JSON) und Durchsatzraten bei 1.000 simulierten API-Requests.
          </p>
        </div>

        <button
          onClick={handleRun}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Play size={16} /> Benchmark Starten (+45 XP)
        </button>
      </div>

      {/* Sliders Control Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Anzahl Anfragen: {requestCount.toLocaleString()} Requests
          </label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={requestCount}
            onChange={(e) => { setRequestCount(parseInt(e.target.value, 10)); triggerHaptic('SELECTION'); }}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Netzwerk-Grundlatenz: {latency} ms (RTT)
          </label>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={latency}
            onChange={(e) => { setLatency(parseInt(e.target.value, 10)); triggerHaptic('SELECTION'); }}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Protocol Cards Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* REST */}
        <div style={{ background: 'var(--bg-secondary)', padding: '22px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{rest.name}</span>
            <span className="badge badge-indigo">{rest.badge}</span>
          </div>

          <div style={{ margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Durchsatz:</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#3b82f6' }}>{rest.throughputReqSec.toLocaleString()} Req/s</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Payload-Größe (pro Req):</span>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{rest.payloadBytes} Bytes (JSON)</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gesamtdauer (1k Reqs):</span>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{rest.totalDurationMs} ms</div>
            </div>
          </div>
        </div>

        {/* gRPC */}
        <div style={{ background: 'var(--bg-secondary)', padding: '22px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', borderTop: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{grpc.name}</span>
            <span className="badge badge-emerald">{grpc.badge}</span>
          </div>

          <div style={{ margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Durchsatz:</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10b981' }}>{grpc.throughputReqSec.toLocaleString()} Req/s</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Payload-Größe (pro Req):</span>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{grpc.payloadBytes} Bytes (Protobuf)</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gesamtdauer (1k Reqs):</span>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{grpc.totalDurationMs} ms</div>
            </div>
          </div>
        </div>

        {/* GraphQL */}
        <div style={{ background: 'var(--bg-secondary)', padding: '22px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{graphql.name}</span>
            <span className="badge badge-amber">{graphql.badge}</span>
          </div>

          <div style={{ margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Durchsatz:</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#f59e0b' }}>{graphql.throughputReqSec.toLocaleString()} Req/s</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Payload-Größe (pro Req):</span>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{graphql.payloadBytes} Bytes (JSON selective)</div>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gesamtdauer (1k Reqs):</span>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{graphql.totalDurationMs} ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
