import React, { useState, useRef, useEffect } from 'react';
import { USER_ROLES } from '../../data/userProfiles';
import { 
  Trophy, Flame, UserCheck, Code2, Sun, Moon, BookOpen, 
  Layers, ShieldCheck, BookMarked, Globe, Rocket, Search, 
  ChevronDown, Cpu, Terminal, Sparkles, Compass, Award, 
  FileText, Activity, Database, Wrench, Menu, X, Shield
} from 'lucide-react';
import AccessibilityToolbar from './AccessibilityToolbar';
import { getTranslation } from '../../utils/i18n';

export default function Navbar({
  userState,
  onOpenProfileModal,
  onOpenBadgesModal,
  onOpenGlossaryModal,
  onOpenCertificateModal,
  onOpenFlashcardsModal,
  onOpenVocabularyModal,
  onOpenBackupModal,
  onOpenDeploymentModal,
  onOpenCommandPalette,
  activeTab,
  setActiveTab,
  lang,
  setLang,
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
  const t = (key) => getTranslation(lang, key);

  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState(null); // 'labs' | 'exam' | 'learn' | 'tools' | null
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const navigateTo = (tabId) => {
    setActiveTab(tabId);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  // Gruppierte Navigations-Menüs
  const labsMenuItems = [
    { id: 'labs', label: '🧪 Alle Labs & Simulatoren Explorer', desc: 'Übersicht aller 25+ Simulatoren' },
    { id: 'cpu_architecture_lab', label: '🔬 Von-Neumann CPU & Register Lab', desc: 'Hardware, Taktzyklen & Assembler' },
    { id: 'sql_optimizer_lab', label: '⚡ SQL Query Optimizer Lab', desc: 'Index Scans vs. Full Table Scans' },
    { id: 'git_graph_lab', label: '🌿 Git Branch & Rebase Visualizer', desc: 'Interaktiver SVG Commit-Graph' },
    { id: 'sql_joins', label: '📊 SQL JOINs & Venn-Diagramm', desc: 'INNER, LEFT, RIGHT, FULL Joins' },
    { id: 'datastructures', label: '🌲 Trees, BST & Graphen Lab', desc: 'Binäre Suchbäume & Dijkstra' },
    { id: 'cicd_workflow', label: '⚙️ CI/CD Workflow Pipeline Builder', desc: 'GitHub Actions & Live Runner' },
    { id: 'docker', label: '🐳 Docker & Container Lab', desc: 'Dockerfile, Images & Multi-Container' },
    { id: 'kubernetes', label: '☸️ Kubernetes Pods & Cluster', desc: 'Deployments & Ingress Services' },
    { id: 'security_lab_v2', label: '🔒 Red/Blue Security Team Lab', desc: 'OWASP Top 10 & Ethical Hacking' },
    { id: 'websockets', label: '📻 WebSockets Protocol Lab', desc: 'HTTP 101 Handshake & Realtime Frames' }
  ];

  const examMenuItems = [
    { id: 'exam', label: '🎓 IHK Abschlussprüfung (AP1 & AP2)', desc: '90-Min. Timer, Punkte & IHK Noten' },
    { id: 'oral_exam', label: '🎙️ IHK Mündliches Fachgespräch', desc: 'Präsentation & Audio-Spracherkennung' },
    { id: 'lernfelder', label: '📚 IHK Lernfelder 1 - 12b', desc: 'Offizielle Berufsschul-Lernfelder' },
    { id: 'podcast', label: '🎧 IHK Fachinformatiker Podcast', desc: 'Datenschutz, Encodings & Audio-Tipps' },
    { id: 'quiz_arena', label: '🏆 IHK Knowledge Quiz Arena', desc: 'Schnelligkeits-Quiz & Highscores' }
  ];

  const learnMenuItems = [
    { id: 'anfaenger_guide', label: '🌱 Einsteiger Kurs ohne Vorwissen', desc: 'EVA-Prinzip, CPU, Binärlogik & Web' },
    { id: 'campaign', label: '🗺️ Story Kampagne (Vom Noob zum Architekt)', desc: '5 aufeinander aufbauende Quest-Stufen' },
    { id: 'languages', label: '🐍 Programmiersprachen Academy', desc: 'Python, JavaScript, TypeScript, Java, C#' },
    { id: 'web_components', label: '🔥 Web Components Masterclass', desc: 'Custom Elements, Shadow DOM, Lit' },
    { id: 'ai_business', label: '🤖 AI & Deep Learning Masterclass', desc: 'CNNs, Transformers, RAG & Prompting' },
    { id: 'architecture', label: '🌐 Systemarchitektur & Microservices', desc: 'Clean Architecture, Scalability & Caching' }
  ];

  return (
    <header
      ref={navRef}
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Top Navbar Row */}
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* 1. Left: Brand Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => navigateTo('dashboard')}
          role="button"
          tabIndex={0}
          aria-label="Zum Dashboard"
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--gradient-cyber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)'
            }}
          >
            <Code2 size={22} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '900', letterSpacing: '-0.5px', margin: 0, color: 'var(--text-main)' }}>
              IT<span className="text-gradient">-DEVGAME</span>
            </h1>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '-3px', fontWeight: 600 }}>
              Interactive Learning Platform
            </span>
          </div>
        </div>

        {/* 2. Middle: Clean Dropdown Navigation (Desktop) */}
        <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Dashboard Direct Button */}
          <button
            onClick={() => navigateTo('dashboard')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: '700',
              background: activeTab === 'dashboard' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
              color: activeTab === 'dashboard' ? 'var(--accent-primary)' : 'var(--text-main)',
              border: activeTab === 'dashboard' ? '1px solid var(--accent-primary)' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Dashboard
          </button>

          {/* Story Kampagne Direct Button */}
          <button
            onClick={() => navigateTo('campaign')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: '700',
              background: activeTab === 'campaign' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
              color: activeTab === 'campaign' ? 'var(--accent-primary)' : 'var(--text-main)',
              border: activeTab === 'campaign' ? '1px solid var(--accent-primary)' : '1px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Compass size={15} color="var(--accent-primary)" />
            <span>Kampagne</span>
          </button>

          {/* DROPDOWN 1: Labs & Simulatoren */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('labs')}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                fontWeight: '700',
                background: activeDropdown === 'labs' || activeTab === 'labs' || activeTab.includes('lab') ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                color: activeDropdown === 'labs' || activeTab === 'labs' || activeTab.includes('lab') ? 'var(--accent-primary)' : 'var(--text-main)',
                border: activeDropdown === 'labs' ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Terminal size={15} color="var(--accent-primary)" />
              <span>Labs &amp; Tools</span>
              <ChevronDown size={14} style={{ transform: activeDropdown === 'labs' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {/* Dropdown Menu Popup */}
            {activeDropdown === 'labs' && (
              <div
                style={{
                  position: 'absolute',
                  top: '115%',
                  left: 0,
                  width: '320px',
                  background: 'var(--bg-card)',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                  padding: '8px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                {labsMenuItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: activeTab === item.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={e => e.currentTarget.style.background = activeTab === item.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent'}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-main)' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DROPDOWN 2: IHK Prüfung & Prüfungssimulation */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('exam')}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                fontWeight: '700',
                background: activeDropdown === 'exam' || activeTab === 'exam' || activeTab === 'oral_exam' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                color: activeDropdown === 'exam' || activeTab === 'exam' || activeTab === 'oral_exam' ? 'var(--accent-primary)' : 'var(--text-main)',
                border: activeDropdown === 'exam' ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Award size={15} color="var(--accent-teal)" />
              <span>IHK Prüfung</span>
              <ChevronDown size={14} style={{ transform: activeDropdown === 'exam' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {activeDropdown === 'exam' && (
              <div
                style={{
                  position: 'absolute',
                  top: '115%',
                  left: 0,
                  width: '320px',
                  background: 'var(--bg-card)',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                  padding: '8px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                {examMenuItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: activeTab === item.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={e => e.currentTarget.style.background = activeTab === item.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent'}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-main)' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DROPDOWN 3: Lernkurse & Themen */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('learn')}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                fontWeight: '700',
                background: activeDropdown === 'learn' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                color: activeDropdown === 'learn' ? 'var(--accent-primary)' : 'var(--text-main)',
                border: activeDropdown === 'learn' ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <BookOpen size={15} color="var(--accent-amber)" />
              <span>Kurse &amp; Wissen</span>
              <ChevronDown size={14} style={{ transform: activeDropdown === 'learn' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {activeDropdown === 'learn' && (
              <div
                style={{
                  position: 'absolute',
                  top: '115%',
                  left: 0,
                  width: '320px',
                  background: 'var(--bg-card)',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                  padding: '8px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                {learnMenuItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: activeTab === item.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={e => e.currentTarget.style.background = activeTab === item.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent'}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-main)' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mini-Games Button */}
          <button
            onClick={() => navigateTo('games')}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: '700',
              background: activeTab === 'games' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
              color: activeTab === 'games' ? 'var(--accent-primary)' : 'var(--text-main)',
              border: activeTab === 'games' ? '1px solid var(--accent-primary)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            🎮 Games
          </button>
        </nav>

        {/* 3. Right: Utility Tools & User Profile Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Quick Search (Command Palette) */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenCommandPalette}
            style={{ 
              gap: '6px', 
              fontWeight: 700, 
              background: 'rgba(99, 102, 241, 0.1)', 
              borderColor: 'var(--accent-primary)', 
              color: 'var(--accent-primary)',
              minHeight: '38px'
            }}
            title="Schnellsuche (Ctrl + K)"
          >
            <Search size={15} />
            <span className="desktop-only">Suche</span>
            <kbd style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', fontSize: '0.68rem', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>Ctrl+K</kbd>
          </button>

          {/* DROPDOWN 4: Utility Modals (Karteikarten, Lexikon, Backup, Vokabeln) */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('tools')}
              className="btn btn-secondary btn-sm"
              style={{
                minHeight: '38px',
                gap: '6px',
                fontWeight: 700,
                borderColor: activeDropdown === 'tools' ? 'var(--accent-primary)' : 'var(--border-color)',
                color: activeDropdown === 'tools' ? 'var(--accent-primary)' : 'var(--text-main)'
              }}
              title="Lernwerkzeuge & Einstellungen"
            >
              <Wrench size={15} />
              <span className="desktop-only">Tools</span>
              <ChevronDown size={13} style={{ transform: activeDropdown === 'tools' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {activeDropdown === 'tools' && (
              <div
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '240px',
                  background: 'var(--bg-card)',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                  padding: '8px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div
                  onClick={() => { onOpenFlashcardsModal(); setActiveDropdown(null); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Layers size={16} color="var(--accent-purple)" /> IT-Karteikarten
                </div>

                <div
                  onClick={() => { onOpenGlossaryModal(); setActiveDropdown(null); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <BookOpen size={16} color="var(--accent-primary)" /> IT-Lexikon &amp; Begriffe
                </div>

                <div
                  onClick={() => { onOpenVocabularyModal(); setActiveDropdown(null); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <BookMarked size={16} color="var(--accent-teal)" /> Vokabeltrainer
                </div>

                <div
                  onClick={() => { onOpenDeploymentModal(); setActiveDropdown(null); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Rocket size={16} color="var(--accent-amber)" /> Live Deployment Guide
                </div>

                <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />

                <div
                  onClick={() => { onOpenBackupModal(); setActiveDropdown(null); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <ShieldCheck size={16} /> Backup &amp; Wiederherstellen
                </div>

                <div
                  onClick={() => { setLang(lang === 'de' ? 'en' : 'de'); setActiveDropdown(null); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Globe size={16} /> Sprache: {lang.toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {/* XP & Level Badge */}
          <div
            onClick={onOpenBadgesModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              padding: '4px 10px',
              borderRadius: '9999px',
              cursor: 'pointer',
              minHeight: '38px'
            }}
            role="button"
            tabIndex={0}
            aria-label="Level und Erfolge anzeigen"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-amber)', fontSize: '0.82rem', fontWeight: '800' }}>
              <Flame size={15} />
              <span>{userState.xp} XP</span>
            </div>
            <div style={{ height: '12px', width: '1px', background: 'var(--border-color)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-teal)', fontSize: '0.82rem', fontWeight: '800' }}>
              <Trophy size={15} />
              <span>Lvl {userState.level}</span>
            </div>
          </div>

          {/* Dark/Light Theme Switcher */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{ minHeight: '38px', width: '38px', padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Farbschema wechseln"
          >
            {theme === 'light' ? <Moon size={16} style={{ color: 'var(--accent-primary)' }} /> : <Sun size={16} style={{ color: 'var(--accent-amber)' }} />}
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

          {/* Role Switcher Badge */}
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
              fontSize: '0.8rem',
              cursor: 'pointer',
              minHeight: '38px'
            }}
          >
            <UserCheck size={15} />
            <span className="desktop-only">{currentRole.badge}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
