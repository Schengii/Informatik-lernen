import React from 'react';
import { USER_ROLES } from '../../data/userProfiles';
import { Trophy, Flame, UserCheck, Code2, Sun, Moon, BookOpen, Award, Layers, ShieldCheck, BookMarked, Compass, Activity, Swords } from 'lucide-react';
import AccessibilityToolbar from './AccessibilityToolbar';

export default function Navbar({
  userState,
  onOpenProfileModal,
  onOpenBadgesModal,
  onOpenGlossaryModal,
  onOpenCertificateModal,
  onOpenFlashcardsModal,
  onOpenVocabularyModal,
  onOpenBackupModal,
  activeTab,
  setActiveTab,
  fontSize,
  setFontSize,
  isDyslexic,
  setIsDyslexic,
  isColorblind,
  setIsColorblind,
  isHighContrast,
  setIsHighContrast,
  isReducedMotion,
  setIsReducedMotion,
  theme,
  setTheme
}) {
  const currentRole = USER_ROLES[userState.role] || USER_ROLES.anfaenger;

  return (
    <header
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Brand Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => setActiveTab('dashboard')}
          role="button"
          tabIndex={0}
          aria-label="Zum Dashboard"
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'var(--gradient-cyber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
            }}
          >
            <Code2 size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px', margin: 0 }}>
              IT<span className="text-gradient">-DEVGAME</span>
            </h1>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '-2px' }}>
              Informatik & Code Plattform
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="desktop-only" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'wissen', label: 'Wissen' },
            { id: 'roadmaps', label: '🧭 Roadmaps' },
            { id: 'languages', label: '🐍 Sprachen' },
            { id: 'quiz_arena', label: '🏆 Quiz Arena' },
            { id: 'big_o', label: '📊 Big-O' },
            { id: 'games', label: 'Games' },
            { id: 'exam', label: '🎓 IHK' },
            { id: 'ai', label: '🤖 KI-Lab' },
            { id: 'tooling', label: '🛠️ Tools' },
            { id: 'app_workshop', label: '📱 App-Shop' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                minHeight: '40px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: '700',
                background: activeTab === tab.id ? 'var(--bg-tertiary)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* User Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* IT Vokabeltrainer Button */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenVocabularyModal}
            style={{ gap: '6px', fontWeight: 700, borderColor: 'var(--accent-teal)', color: 'var(--accent-teal)' }}
            title="IT-Vokabeltrainer & Fachbegriffe"
          >
            <BookMarked size={16} />
            <span className="desktop-only">Vokabeln</span>
          </button>

          {/* IT Lexikon Button */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenGlossaryModal}
            style={{ gap: '6px', fontWeight: 700, borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}
            title="IT-Lexikon & Fachbegriffe"
          >
            <BookOpen size={16} />
            <span className="desktop-only">Lexikon</span>
          </button>

          {/* Flashcards Button */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenFlashcardsModal}
            style={{ gap: '6px', fontWeight: 700, borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }}
            title="IT-Karteikarten Trainer"
          >
            <Layers size={16} />
            <span className="desktop-only">Karteikarten</span>
          </button>

          {/* Certificate Button */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenCertificateModal}
            style={{ gap: '6px', fontWeight: 700, borderColor: 'var(--accent-amber)', color: 'var(--accent-amber)' }}
            title="Zertifikat anzeigen"
          >
            <Award size={16} />
            <span className="desktop-only">Zertifikat</span>
          </button>

          {/* Backup Button */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenBackupModal}
            style={{ gap: '6px', fontWeight: 700, borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
            title="Daten sichern / Wiederherstellen"
          >
            <ShieldCheck size={16} />
            <span className="desktop-only">Backup</span>
          </button>

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
              cursor: 'pointer',
              minHeight: '40px'
            }}
            role="button"
            tabIndex={0}
            aria-label="Level und Erfolge anzeigen"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-amber)', fontSize: '0.85rem', fontWeight: '700' }}>
              <Flame size={16} />
              <span>{userState.xp} XP</span>
            </div>
            <div style={{ height: '14px', width: '1px', background: 'var(--border-color)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-teal)', fontSize: '0.85rem', fontWeight: '700' }}>
              <Trophy size={16} />
              <span>Lvl {userState.level}</span>
            </div>
          </div>

          {/* Theme Switcher */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{ minHeight: '40px', width: '40px', padding: 0, borderRadius: '50%' }}
            aria-label="Farbschema wechseln"
          >
            {theme === 'light' ? <Moon size={18} style={{ color: 'var(--accent-primary)' }} /> : <Sun size={18} style={{ color: 'var(--accent-amber)' }} />}
          </button>

          {/* Accessibility Toolbar */}
          <AccessibilityToolbar
            fontSize={fontSize}
            setFontSize={setFontSize}
            isDyslexic={isDyslexic}
            setIsDyslexic={setIsDyslexic}
            isColorblind={isColorblind}
            setIsColorblind={setIsColorblind}
            isHighContrast={isHighContrast}
            setIsHighContrast={setIsHighContrast}
            isReducedMotion={isReducedMotion}
            setIsReducedMotion={setIsReducedMotion}
            theme={theme}
            setTheme={setTheme}
          />

          {/* Role Switch Button */}
          <button
            onClick={onOpenProfileModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '9999px',
              background: 'rgba(79, 70, 229, 0.1)',
              color: 'var(--accent-primary)',
              border: '1px solid var(--accent-primary)',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer',
              minHeight: '40px'
            }}
          >
            <UserCheck size={16} />
            <span className="desktop-only">{currentRole.badge}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
