import React from 'react';
import { Award, Cpu, Globe, Code, Database, Wifi, Shield } from 'lucide-react';

export default function SkillMatrixWidget({ userState }) {
  const completedCount = userState.completedTopics.length;

  const skills = [
    { name: 'Hardware & Binärsysteme', icon: Cpu, progress: Math.min(100, (completedCount >= 1 ? 100 : 35)), color: 'var(--accent-teal)' },
    { name: 'Webentwicklung & HTML/CSS', icon: Globe, progress: Math.min(100, (completedCount >= 2 ? 100 : 40)), color: 'var(--accent-primary)' },
    { name: 'Programmierung & JavaScript', icon: Code, progress: Math.min(100, (completedCount >= 3 ? 100 : 25)), color: 'var(--accent-purple)' },
    { name: 'Datenbanken & SQL Queries', icon: Database, progress: Math.min(100, (completedCount >= 4 ? 100 : 20)), color: 'var(--accent-amber)' },
    { name: 'Netzwerke & OSI-Modell', icon: Wifi, progress: Math.min(100, (completedCount >= 5 ? 100 : 15)), color: 'var(--accent-primary)' },
    { name: 'Cybersecurity & OWASP', icon: Shield, progress: Math.min(100, (completedCount >= 6 ? 100 : 10)), color: 'var(--accent-rose)' }
  ];

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
          <Award size={22} style={{ color: 'var(--accent-primary)' }} /> Deine Skill-Matrix & Kompetenzen
        </h3>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Absolvierte Lektionen: {completedCount}
        </span>
      </div>

      <div className="grid-responsive" style={{ gap: '16px' }}>
        {skills.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}>
                  <Icon size={16} style={{ color: s.color }} /> {s.name}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: s.color }}>{s.progress}%</span>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${s.progress}%`,
                    height: '100%',
                    background: s.color,
                    borderRadius: '4px',
                    transition: 'width 0.5s ease-in-out'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
