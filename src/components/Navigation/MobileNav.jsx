import React from 'react';
import { Home, BookOpen, Gamepad2, FileText, Video, FolderGit2 } from 'lucide-react';

export default function MobileNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'wissen', label: 'Wissen', icon: BookOpen },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'lueckentext', label: 'Lücken', icon: FileText },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'projekte', label: 'Projekte', icon: FolderGit2 }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(10, 13, 20, 0.96)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border-color)',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 4px',
      zIndex: 1000
    }} className="mobile-nav-bar">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              color: isActive ? 'var(--accent-cyan)' : 'var(--text-dim)',
              fontSize: '0.7rem',
              fontWeight: isActive ? '700' : '500',
              cursor: 'pointer',
              gap: '3px',
              flex: 1
            }}
          >
            <Icon size={20} color={isActive ? 'var(--accent-cyan)' : 'var(--text-dim)'} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
