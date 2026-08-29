import React, { useState, useRef, useEffect } from 'react';
import {
  Database, Search, Plus, GitBranch
} from 'lucide-react';
import { BPlusTreeSimulator, HashIndexSimulator } from '../../utils/dbIndexEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function DbIndexLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [indexType, setIndexType] = useState('bplus'); // 'bplus' | 'hash'
  const [searchKey, setSearchKey] = useState(25);
  const [newKey, setNewKey] = useState(45);
  const [searchResult, setSearchResult] = useState(null);
  const [rangeResult, setRangeResult] = useState(null);
  const [solved, setSolved] = useState(false);

  const btreeRef = useRef(null);
  const hashRef = useRef(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    btreeRef.current = new BPlusTreeSimulator();
    [10, 15, 20, 25, 30, 35, 40].forEach(k => btreeRef.current.insert(k));

    hashRef.current = new HashIndexSimulator(8);
    [10, 15, 20, 25, 30, 35, 40].forEach(k => hashRef.current.insert(k));

    setTick(t => t + 1);
  }, []);

  const handleSearch = () => {
    triggerHaptic('SELECTION');
    if (indexType === 'bplus' && btreeRef.current) {
      setSearchResult(btreeRef.current.search(searchKey));
    } else if (indexType === 'hash' && hashRef.current) {
      setSearchResult(hashRef.current.search(searchKey));
    }
    checkXP();
  };

  const handleRangeScan = () => {
    triggerHaptic('SELECTION');
    if (indexType === 'bplus' && btreeRef.current) {
      setRangeResult(btreeRef.current.rangeSearch(15, 35));
    } else if (indexType === 'hash' && hashRef.current) {
      setRangeResult(hashRef.current.rangeSearch(15, 35));
    }
    checkXP();
  };

  const handleInsert = () => {
    triggerHaptic('SUCCESS');
    if (btreeRef.current) btreeRef.current.insert(newKey);
    if (hashRef.current) hashRef.current.insert(newKey);
    setTick(t => t + 1);
    checkXP();
  };

  const checkXP = () => {
    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'db_index_master');
      }
    }
  };

  const btreeKeys = btreeRef.current ? btreeRef.current.keys : [];
  const hashBuckets = hashRef.current ? hashRef.current.buckets : [];

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Database size={14} /> Database Internals &amp; SQL
            </span>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <GitBranch size={14} /> B+ Tree vs. Hash Index
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            🌲 Database Index Studio (B+ Tree vs. Hash Index)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Verstehe, warum relationale Datenbanken (Postgres, MySQL InnoDB) standardmäßig B+ Trees für Range Scans (`BETWEEN`, `&gt;`, `&lt;`) verwenden, während Hash-Indizes auf reine $O(1)$ Punktabfragen beschränkt sind.
          </p>
        </div>

        <button
          onClick={handleRangeScan}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
        >
          <Search size={16} /> Range Scan Testen (`BETWEEN 15 AND 35`) (+45 XP)
        </button>
      </div>

      {/* Index Type Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => { setIndexType('bplus'); triggerHaptic('SELECTION'); setSearchResult(null); setRangeResult(null); }}
          className={`btn ${indexType === 'bplus' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '12px', textAlign: 'center' }}
        >
          <div style={{ fontWeight: 'bold' }}>1. B+ Tree Index (Standard)</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>$O(\log N)$ Suche &amp; Perfekte Range Scans</div>
        </button>

        <button
          onClick={() => { setIndexType('hash'); triggerHaptic('SELECTION'); setSearchResult(null); setRangeResult(null); }}
          className={`btn ${indexType === 'hash' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '12px', textAlign: 'center' }}
        >
          <div style={{ fontWeight: 'bold' }}>2. Hash Index</div>
          <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>$O(1)$ Punktabfragen (Keine Range Queries)</div>
        </button>
      </div>

      {/* Interactive Query Action Bar */}
      <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Key suchen:</label>
          <input
            type="number"
            value={searchKey}
            onChange={(e) => setSearchKey(parseInt(e.target.value, 10) || 0)}
            style={{ width: '80px', padding: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
          />
          <button
            onClick={handleSearch}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.82rem' }}
          >
            Suchen
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Neuer Key:</label>
          <input
            type="number"
            value={newKey}
            onChange={(e) => setNewKey(parseInt(e.target.value, 10) || 0)}
            style={{ width: '80px', padding: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
          />
          <button
            onClick={handleInsert}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '0.82rem', color: '#10b981' }}
          >
            <Plus size={14} /> Einfügen
          </button>
        </div>
      </div>

      {/* Query Result Alert */}
      {searchResult && (
        <div style={{ background: searchResult.found ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', border: `1px solid ${searchResult.found ? '#10b981' : '#ef4444'}`, borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.85rem' }}>
          {searchResult.found ? `✅ Key ${searchResult.key} gefunden in ${searchResult.stepsTaken} Schritt(en) mit Komplexität ${searchResult.timeComplexity}` : `❌ Key ${searchResult.key} nicht im Index gefunden`}
        </div>
      )}

      {rangeResult && (
        <div style={{ background: rangeResult.matches ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', border: `1px solid ${rangeResult.matches ? '#10b981' : '#ef4444'}`, borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.85rem' }}>
          {rangeResult.matches ? (
            <div>
              <strong>✅ B+ Tree Range Scan erfolgreich:</strong> Treffer <code>[{rangeResult.matches.join(', ')}]</code> ({rangeResult.timeComplexity}) via Leaf-Pointer Kette.
            </div>
          ) : (
            <div>
              <strong>❌ Hash Index Fehler:</strong> {rangeResult.reason} ({rangeResult.timeComplexity})
            </div>
          )}
        </div>
      )}

      {/* Visual Representation Grid */}
      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        {indexType === 'bplus' ? (
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
              B+ Tree Struktur (Root Routing Key &amp; Sequenzielle Leaf-Nodes):
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '12px 24px', borderRadius: '8px', border: '2px solid var(--accent-primary)', fontWeight: 'bold' }}>
                Internal Root Routing Node [20 | 35]
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ background: 'var(--bg-primary)', padding: '10px 16px', borderRadius: '8px', border: '1px solid #10b981' }}>
                  Leaf #1: <code>[{btreeKeys.filter(k => k < 20).join(', ')}]</code> ➔
                </div>
                <div style={{ background: 'var(--bg-primary)', padding: '10px 16px', borderRadius: '8px', border: '1px solid #10b981' }}>
                  Leaf #2: <code>[{btreeKeys.filter(k => k >= 20 && k < 35).join(', ')}]</code> ➔
                </div>
                <div style={{ background: 'var(--bg-primary)', padding: '10px 16px', borderRadius: '8px', border: '1px solid #10b981' }}>
                  Leaf #3: <code>[{btreeKeys.filter(k => k >= 35).join(', ')}]</code>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
              Hash Index Buckets (`hash(key) = key % 8`):
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' }}>
              {hashBuckets.map((b, bIdx) => (
                <div key={bIdx} style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.78rem', color: 'var(--accent-primary)' }}>Bucket #{bIdx}</div>
                  <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#10b981' }}>
                    {b.length > 0 ? b.map(e => e.key).join(', ') : '(leer)'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
