import React from 'react';
import { USER_ROLES } from '../../data/userProfiles';
import { Trophy, Flame, UserCheck, Code2, Sparkles } from 'lucide-react';

export default function Navbar({ userState, onOpenProfileModal, onOpenBadgesModal, activeTab, setActiveTab }) {
  const currentRole = USER_ROLES[userState.role] || USER_ROLES.anfaenger;

  return (
    <header style={{
      background: 'rgba(10, 13, 20, 0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--gradient-cyber)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
          }}>
            <Code2 size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
              IT<span className="text-gradient">-DEVGAME</span>
            </h1>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '-2px' }}>
              Informatik & Code Plattform
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="desktop-only" style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'wissen', label: 'Fachkunde & Wissen' },
            { id: 'games', label: 'Mini-Games' },
            { id: 'lueckentext', label: 'Lückentexte' },
            { id: 'videos', label: 'Video-Tutorials' },
            { id: 'projekte', label: 'Praxis-Projekte' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                fontWeight: '600',
                background: activeTab === tab.id ? 'var(--bg-tertiary)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                border: activeTab === tab.id ? '1px solid var(--border-highlight)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* User Stats & Profile Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* XP & Level Badge */}
          <div 
            onClick={onOpenBadgesModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              padding: '6px 12px',
              borderRadius: '9999px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-amber)', fontSize: '0.85rem', fontWeight: '700' }}>
              <Flame size={16} />
              <span>{userState.xp} XP</span>
            </div>
            <div style={{ height: '14px', width: '1px', background: 'var(--border-color)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: '700' }}>
              <Trophy size={16} />
              <span>Lvl {userState.level}</span>
            </div>
          </div>

          {/* Role Switch Button */}
          <button
            onClick={onOpenProfileModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '9999px',
              background: `${currentRole.color}20`,
              color: currentRole.color,
              border: `1px solid ${currentRole.color}50`,
              fontWeight: '600',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            <UserCheck size={16} />
            <span>{currentRole.badge}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
