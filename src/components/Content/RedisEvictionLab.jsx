import React, { useState, useRef, useEffect } from 'react';
import {
  Database, Shield, Play, Plus
} from 'lucide-react';
import { RedisCacheSimulator } from '../../utils/redisEvictionEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function RedisEvictionLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [policy, setPolicy] = useState('allkeys-lru');
  const [newKey, setNewKey] = useState('session:token_99');
  const [newVal, setNewVal] = useState('payload_xyz');
  const [queryKey, setQueryKey] = useState('session:token_99');
  const [evictedLog, setEvictedLog] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [solved, setSolved] = useState(false);

  const simRef = useRef(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    simRef.current = new RedisCacheSimulator(4, policy);
    simRef.current.set('user:42', 'Max Mustermann', 120);
    simRef.current.set('cart:88', '2x Server RAM', 60);
    simRef.current.set('jwt:auth', 'Bearer eyJhbG...', 30);
    setTick(t => t + 1);
  }, [policy]);

  const handleSet = (e) => {
    e?.preventDefault();
    if (!newKey.trim() || !simRef.current) return;

    triggerHaptic('SELECTION');
    const res = simRef.current.set(newKey.trim(), newVal.trim() || 'data');
    if (res.evicted) {
      setEvictedLog(`Verdrängt (Evicted): ${res.evicted}`);
      triggerHaptic('WARNING');
    } else {
      setEvictedLog(null);
      triggerHaptic('SUCCESS');
    }
    setTick(t => t + 1);
  };

  const handleGet = (e) => {
    e?.preventDefault();
    if (!queryKey.trim() || !simRef.current) return;

    triggerHaptic('SELECTION');
    const res = simRef.current.get(queryKey.trim());
    setQueryResult(res);

    if (res.found) {
      triggerHaptic('SUCCESS');
    } else if (res.penetrationBlocked) {
      triggerHaptic('WARNING');
    }

    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'redis_cache_master');
      }
    }
    setTick(t => t + 1);
  };

  const entries = simRef.current ? simRef.current.getEntries() : [];
  const stats = simRef.current ? simRef.current.getStats() : { hits: 0, misses: 0, hitRatio: 0, occupiedSlots: 0, maxSlots: 4 };

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} /> High-Performance Caching
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={14} /> Redis Eviction &amp; Bloom Filter
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            ⚡ Redis Cache Eviction &amp; Penetration Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Visualisiere Verdrängungsstrategien (`allkeys-lru`, `allkeys-lfu`, `volatile-ttl`), Zugriffshäufigkeiten und den integrierten Bloom Filter gegen Cache-Penetration.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
            style={{ padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.85rem' }}
          >
            <option value="allkeys-lru">Strategie: allkeys-lru (Least Recently Used)</option>
            <option value="allkeys-lfu">Strategie: allkeys-lfu (Least Frequently Used)</option>
            <option value="volatile-ttl">Strategie: volatile-ttl (Kürzeste TTL)</option>
          </select>
        </div>
      </div>

      {/* Metrics Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cache Slots Belegung</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '2px' }}>
            {stats.occupiedSlots} / {stats.maxSlots} Slots
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cache Hit Ratio</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#10b981', marginTop: '2px' }}>
            {stats.hitRatio}% ({stats.hits} Hits / {stats.misses} Misses)
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bloom Filter Status</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#06b6d4', marginTop: '2px' }}>
            🛡️ 32-Bit Filter Aktiv
          </div>
        </div>
      </div>

      {/* Live Cache Memory Slots Grid */}
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
          Redis Memory Slots (In-Memory Key-Value Store):
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {entries.map((entry) => (
            <div
              key={entry.key}
              style={{
                background: 'var(--bg-secondary)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                borderLeft: '4px solid var(--accent-primary)'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '0.95rem', fontFamily: 'monospace', color: 'var(--text-main)' }}>
                {entry.key}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Wert: {entry.value}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
                <span>Zugriffe: {entry.freq}x</span>
                <span>TTL: {entry.ttl}s</span>
              </div>
            </div>
          ))}

          {Array.from({ length: Math.max(0, stats.maxSlots - entries.length) }).map((_, i) => (
            <div
              key={`empty_${i}`}
              style={{
                background: 'var(--bg-secondary)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px dashed var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.82rem'
              }}
            >
              (Freier Slot)
            </div>
          ))}
        </div>

        {evictedLog && (
          <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#ef4444', fontWeight: 'bold' }}>
            ⚠️ {evictedLog}
          </div>
        )}
      </div>

      {/* Action Forms Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Set Key */}
        <form onSubmit={handleSet} style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            Schreiben (SET Key Value):
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Key (z. B. session:token_99)"
              style={{ padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', fontFamily: 'monospace' }}
            />
            <input
              type="text"
              value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              placeholder="Wert"
              style={{ padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
            />
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px' }}>
              <Plus size={16} /> SET Ausführen
            </button>
          </div>
        </form>

        {/* Get Key & Bloom Filter Test */}
        <form onSubmit={handleGet} style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            Lesen &amp; Penetration Test (GET Key):
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              value={queryKey}
              onChange={(e) => setQueryKey(e.target.value)}
              placeholder="Key abfragen..."
              style={{ padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', fontFamily: 'monospace' }}
            />
            <button type="submit" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px' }}>
              <Play size={16} /> GET Abfrage
            </button>

            {queryResult && (
              <div style={{ marginTop: '6px', fontSize: '0.82rem', padding: '8px 12px', borderRadius: '6px', background: queryResult.found ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: queryResult.found ? '#10b981' : '#ef4444', border: `1px solid ${queryResult.found ? '#10b981' : '#ef4444'}` }}>
                {queryResult.found
                  ? `✅ Cache HIT: "${queryResult.value}"`
                  : queryResult.penetrationBlocked
                    ? '🛡️ Bloom Filter Block: Key existiert nicht (Penetration abgewehrt, kein DB-Zugriff nötig)'
                    : '❌ Cache MISS: Nicht im Cache, Fallback zur Datenbank'}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
