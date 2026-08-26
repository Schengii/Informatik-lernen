import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Play } from 'lucide-react';
import { LAB_REGISTRY } from '../../data/labRegistry';

// LAB_MODULES ist jetzt ein Alias für die zentrale Registry (siehe src/data/labRegistry.js).
// Vorher pflegte diese Datei ihre eigene, unabhängige Kopie der Lab-Liste - eine von vier
// Stellen, die laut Changelog wiederholt auseinanderliefen (tote Links, nie verlinkte Labs).
export const LAB_MODULES = LAB_REGISTRY;

export default function LabsDashboard({ onSelectLab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Alle Labs' },
    { id: 'ihk', name: '🎓 IHK Prüfung & Karriere' },
    { id: 'algorithms', name: 'Algorithmen & Datenstrukturen' },
    { id: 'devops', name: 'DevOps & Git' },
    { id: 'cloud', name: 'Cloud & Container' },
    { id: 'security', name: 'Security & Auth' },
    { id: 'ai', name: 'Künstliche Intelligenz' },
    { id: 'databases', name: 'Datenbanken & SQL' },
    { id: 'code', name: 'Programmierung & Tools' },
    { id: 'hardware', name: 'Hardware & Elektrotechnik' }
  ];

  const filteredLabs = useMemo(() => {
    return LAB_MODULES.filter(lab => {
      const matchesSearch = 
        lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCat = selectedCategory === 'all' || lab.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <span className="badge badge-indigo" style={{ marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} /> Praxisorientiertes Lernen
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '4px 0', color: 'var(--text-main)' }}>
          🧪 Interaktive Laboratorien & Simulatoren Hub
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Erkunde über {LAB_MODULES.length} spezialisierte IT-Simulatoren – von Datenstrukturen und Kubernetes bis hin zu RAG Vector AI und Git-Branching.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Suche nach Tags (#DevOps, #KI), Themen oder Labs..."
            style={{
              width: '100%',
              padding: '12px 12px 12px 38px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-primary)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              fontSize: '0.92rem'
            }}
          />
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`btn ${selectedCategory === c.id ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.82rem', padding: '6px 14px', whiteSpace: 'nowrap' }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredLabs.map((lab) => {
          const Icon = lab.icon;
          return (
            <div
              key={lab.id}
              style={{
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '22px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${lab.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color={lab.color} />
                  </div>
                  {lab.badge && (
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                      {lab.badge}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '0 0 8px 0', color: 'var(--text-main)' }}>
                  {lab.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                  {lab.desc}
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {lab.tags.map(t => (
                    <span key={t} style={{ background: '#0f172a', color: '#94a3b8', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => onSelectLab(lab.id)}
                style={{ width: '100%', gap: '8px', justifyContent: 'center' }}
              >
                <Play size={16} /> Laboratorium Starten
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
