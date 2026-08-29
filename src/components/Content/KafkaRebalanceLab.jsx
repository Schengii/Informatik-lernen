import React, { useState, useRef, useEffect } from 'react';
import {
  Layers, Users, Plus, Trash2
} from 'lucide-react';
import { KafkaConsumerGroupSimulator } from '../../utils/kafkaRebalanceEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function KafkaRebalanceLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [partitions, setPartitions] = useState(4);
  const [protocol, setProtocol] = useState('cooperative-sticky');
  const [solved, setSolved] = useState(false);

  const simRef = useRef(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    simRef.current = new KafkaConsumerGroupSimulator(partitions, protocol);
    simRef.current.addConsumer('consumer-svc-1');
    simRef.current.addConsumer('consumer-svc-2');
    setTick(t => t + 1);
  }, [partitions, protocol]);

  const handleAddConsumer = () => {
    if (!simRef.current) return;
    const count = simRef.current.getState().consumers.length;
    simRef.current.addConsumer(`consumer-svc-${count + 1}`);
    triggerHaptic('SUCCESS');
    setTick(t => t + 1);

    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'kafka_rebalance_master');
      }
    }
  };

  const handleRemoveConsumer = (id) => {
    if (!simRef.current) return;
    simRef.current.removeConsumer(id);
    triggerHaptic('WARNING');
    setTick(t => t + 1);
  };

  const state = simRef.current ? simRef.current.getState() : { consumers: [], generationId: 0 };

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={14} /> Event-Driven Architecture
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} /> Kafka Consumer Group
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            📨 Apache Kafka Partition Rebalance &amp; Consumer Group Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Simuliere dynamisches Partition Rebalancing bei Consumer Join/Crash. Vergleiche Eager (Stop-the-World) mit Cooperative Sticky Rebalancing.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleAddConsumer}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', fontWeight: 'bold' }}
          >
            <Plus size={16} /> Consumer Hinzufügen (+45 XP)
          </button>
        </div>
      </div>

      {/* Configuration Controls Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Topic Partitionen: {partitions}</label>
          <input
            type="range"
            min="2"
            max="8"
            value={partitions}
            onChange={(e) => setPartitions(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Rebalance Protokoll:</label>
          <select
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
            style={{ width: '100%', padding: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
          >
            <option value="cooperative-sticky">Cooperative Sticky (Incremental, Non-blocking)</option>
            <option value="eager">Eager (Stop-the-World, Full Revoke)</option>
          </select>
        </div>

        <div>
          <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Consumer Generation ID:</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '4px' }}>
            Gen #{state.generationId}
          </div>
        </div>
      </div>

      {/* Partitions Overview */}
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
          Topic Partitions (Kafka Broker Storage):
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(110px, 1fr))`, gap: '10px' }}>
          {Array.from({ length: partitions }).map((_, pIdx) => {
            const assignedConsumer = state.consumers.find(c => c.assignedPartitions.includes(pIdx));
            return (
              <div
                key={pIdx}
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '12px',
                  borderRadius: '10px',
                  border: assignedConsumer ? '1px solid #10b981' : '1px dashed #ef4444',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Partition #{pIdx}</div>
                <div style={{ fontSize: '0.75rem', color: assignedConsumer ? '#10b981' : '#ef4444', marginTop: '4px' }}>
                  {assignedConsumer ? assignedConsumer.id : 'Unzugewiesen'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Consumer Pods Grid */}
      <div>
        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
          Aktive Consumer Pods (Consumer Group `order-processing-group`):
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {state.consumers.map((c) => (
            <div
              key={c.id}
              style={{
                background: 'var(--bg-secondary)',
                padding: '18px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                borderLeft: '4px solid var(--accent-primary)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{c.id}</span>
                <button
                  onClick={() => handleRemoveConsumer(c.id)}
                  className="btn btn-ghost"
                  style={{ padding: '4px', color: '#ef4444' }}
                  title="Consumer stoppen / killen"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div style={{ marginTop: '12px', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Zugewiesene Partitionen:</span>
                <div style={{ marginTop: '6px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {c.assignedPartitions.length > 0 ? (
                    c.assignedPartitions.map(p => (
                      <span key={p} className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                        P#{p}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: '#ef4444' }}>(Keine Partitionen)</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
