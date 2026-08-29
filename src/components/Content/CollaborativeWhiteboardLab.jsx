import React, { useState, useMemo } from 'react';
import {
  Layers, Users, Share2, Plus, Check
} from 'lucide-react';
import {
  INITIAL_CANVAS_NODES,
  INITIAL_CANVAS_EDGES,
  exportCanvasToMermaid,
  validateTopology
} from '../../utils/collaborativeWhiteboardEngine';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function CollaborativeWhiteboardLab({ onRewardXP }) {
  const { awardXP } = useStore();
  const [nodes, setNodes] = useState(INITIAL_CANVAS_NODES);
  const [edges] = useState(INITIAL_CANVAS_EDGES);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [solved, setSolved] = useState(false);

  const topology = useMemo(() => {
    return validateTopology(nodes, edges);
  }, [nodes, edges]);

  const mermaidMarkdown = useMemo(() => {
    return exportCanvasToMermaid(nodes, edges);
  }, [nodes, edges]);

  const handleAddNode = () => {
    const newId = `node_${Date.now().toString().slice(-4)}`;
    const newNode = {
      id: newId,
      type: 'microservice',
      label: `Neuer Service (${nodes.length + 1})`,
      x: 100 + (nodes.length * 30) % 300,
      y: 100 + (nodes.length * 40) % 200,
      color: '#10b981'
    };
    setNodes([...nodes, newNode]);
    triggerHaptic('SELECTION');
  };

  const handleCopyMermaid = () => {
    navigator.clipboard.writeText(mermaidMarkdown);
    setCopied(true);
    triggerHaptic('SUCCESS');
    setTimeout(() => setCopied(false), 2000);

    if (!solved) {
      setSolved(true);
      if (onRewardXP) {
        onRewardXP(45);
      } else {
        awardXP(45, 'whiteboard_architect');
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
              <Layers size={14} /> Systemarchitektur &amp; Whiteboard
            </span>
            <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} /> Collaborative Canvas
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            🎨 Collaborative Architecture Whiteboard &amp; Diagrammer
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '750px' }}>
            Plane und visualisiere verteilte Microservice- und Cloud-Architekturen. Identifiziere Single Points of Failure und exportiere fertige Diagramme als Mermaid.js Markdown.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleAddNode}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px' }}
          >
            <Plus size={16} /> Service Hinzufügen
          </button>
          <button
            onClick={handleCopyMermaid}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 'bold' }}
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            {copied ? 'Kopiert!' : 'Mermaid Exportieren (+45 XP)'}
          </button>
        </div>
      </div>

      {/* Topology Status Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Knoten (Services / DBs)</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px', color: 'var(--accent-primary)' }}>
            {topology.nodeCount}
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Verbindungen (APIs / gRPC)</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '4px', color: '#10b981' }}>
            {topology.edgeCount}
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Topologie-Integrität</span>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', marginTop: '4px', color: topology.isValid ? '#10b981' : '#f59e0b' }}>
            {topology.isValid ? '✅ Voll Verbunden' : '⚠️ Isolierte Knoten'}
          </div>
        </div>
      </div>

      {/* Canvas & Mermaid Preview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Interactive Node Graph Canvas */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', minHeight: '320px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
            Interaktive Architektur-Leinwand:
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {nodes.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  setSelectedNodeId(n.id);
                  triggerHaptic('SELECTION');
                }}
                style={{
                  background: 'var(--bg-primary)',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  borderLeft: `4px solid ${n.color}`,
                  border: selectedNodeId === n.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{n.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>ID: {n.id}</div>
                </div>
                <span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>{n.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mermaid Export Output */}
        <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            Mermaid.js Diagramm-Definition:
          </span>
          <pre
            style={{
              margin: 0,
              padding: '14px',
              background: 'var(--bg-primary)',
              color: '#38bdf8',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              maxHeight: '260px',
              overflowY: 'auto'
            }}
          >
            {mermaidMarkdown}
          </pre>
        </div>
      </div>
    </div>
  );
}
