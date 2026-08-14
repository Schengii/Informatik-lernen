import React, { useState, useRef, useEffect } from 'react';
import { USER_ROLES } from '../../data/userProfiles';
import { 
  Trophy, Flame, UserCheck, Code2, Sun, Moon, BookOpen, 
  Layers, ShieldCheck, BookMarked, Globe, Rocket, Search, 
  ChevronDown, Cpu, Terminal, Compass, Award, 
  FileText, Activity, Database, Wrench, Sparkles, HelpCircle,
  FolderGit2, GraduationCap, CheckCircle2, Shield, Settings2, Sliders
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

  // Dropdown State (single active dropdown)
  const [activeDropdown, setActiveDropdown] = useState(null); // 'labs' | 'exam' | 'learn' | 'tools' | 'profile' | null
  const navRef = useRef(null);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const navigateTo = (tabId) => {
    setActiveTab(tabId);
    setActiveDropdown(null);
  };

  // Gruppierte Navigations-Menüs mit Badges & didaktischen Sub-Labels
  const labsMenuItems = [
    { id: 'labs', label: '🧪 Alle Labs & Simulatoren Hub', desc: 'Übersicht aller 25+ interaktiven Labs', badge: 'Hub' },
    { id: 'cpu_architecture_lab', label: '🔬 Von-Neumann CPU & Register Lab', desc: 'Hardware, Taktzyklen & Assembler', badge: 'Neu' },
    { id: 'sql_optimizer_lab', label: '⚡ SQL Query Optimizer Lab', desc: 'Index Scan vs. Full Table Scan', badge: 'Neu' },
    { id: 'git_graph_lab', label: '🌿 Git Branch & Rebase Visualizer', desc: 'Interaktiver SVG Commit-Graph', badge: 'Top' },
    { id: 'sql_joins', label: '📊 SQL JOINs & Venn-Diagramm', desc: 'INNER, LEFT, RIGHT & FULL Joins', badge: 'SQL' },
    { id: 'datastructures', label: '🌲 Trees, BST & Graphen Lab', desc: 'Binäre Suchbäume & Dijkstra Algorithmus', badge: 'Algo' },
    { id: 'cicd_workflow', label: '⚙️ CI/CD Pipeline Workflow Builder', desc: 'GitHub Actions & Automatisierung', badge: 'DevOps' },
    { id: 'docker', label: '🐳 Docker & Container Lab', desc: 'Dockerfile, Container & Port-Mapping', badge: 'Cloud' },
    { id: 'kubernetes', label: '☸️ Kubernetes Pods & Cluster', desc: 'Deployments, ReplicaSets & Ingress', badge: 'Cloud' },
    { id: 'security_lab_v2', label: '🔒 Red/Blue Security Team Lab', desc: 'OWASP Top 10, XSS & SQLi Defense', badge: 'Sec' },
    { id: 'websockets', label: '📻 WebSockets Protocol Lab', desc: 'HTTP 101 Handshake & Realtime Frames', badge: 'Net' }
  ];

  const examMenuItems = [
    { id: 'exam', label: '🎓 IHK Abschlussprüfung (AP1 & AP2)', desc: '90-Min. Timer, Punkte & IHK Noten 1-6', badge: 'Prüfung' },
    { id: 'oral_exam', label: '🎙️ IHK Mündliches Fachgespräch', desc: 'Präsentation mit Audio-Spracherkennung', badge: 'Voice' },
    { id: 'lernfelder', label: '📚 IHK Lernfelder 1 - 12b', desc: 'Offizieller Rahmenlehrplan Berufsschule', badge: 'IHK' },
    { id: 'podcast', label: '🎧 IHK Fachinformatiker Podcast', desc: 'Datenschutz, Encodings & Stefan Macke Tipps', badge: 'Audio' },
    { id: 'quiz_arena', label: '🏆 IHK Knowledge Quiz Arena', desc: 'Schnelligkeits-Quiz & Leaderboard', badge: 'Quiz' },
    { id: 'lueckentext', label: '📜 IHK Prüfungs-Lückentexte', desc: 'Prüfungsbegriffe & Fachdefinitionen üben', badge: 'Praxis' }
  ];

  const learnMenuItems = [
    { id: 'anfaenger_guide', label: '🌱 Einsteiger Kurs ohne Vorwissen', desc: 'EVA-Prinzip, CPU, Binärlogik & Web', badge: 'Start' },
    { id: 'campaign', label: '🗺️ Story Kampagne: Der IT-Aufstieg', desc: '5 aufeinander aufbauende Quest-Stufen', badge: 'Story' },
    { id: 'languages', label: '🐍 Programmiersprachen Academy', desc: 'Python, JavaScript, TypeScript, Java, C#', badge: 'Code' },
    { id: 'web_components', label: '🔥 Web Components Masterclass', desc: 'Custom Elements, Shadow DOM & Lit.dev', badge: 'Web' },
    { id: 'ai_business', label: '🤖 AI & Deep Learning Masterclass', desc: 'CNNs, Transformers, RAG & Prompting', badge: 'KI' },
    { id: 'architecture', label: '🌐 Systemarchitektur & Microservices', desc: 'Clean Architecture, Scalability & Caching', badge: 'Arch' },
    { id: 'projekte', label: '📁 Schritt-für-Schritt Praxisprojekte', desc: 'Realworld Fullstack & Backend Projekte', badge: 'Praxis' }
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
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* 1. Brand Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => navigateTo('dashboard')}
          role="button"
          tabIndex={0}
          aria-label="Zum Dashboard"
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--gradient-cyber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
            }}
          >
            <Code2 size={22} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-0.5px', margin: 0, color: 'var(--text-main)' }}>
              IT<span className="text-gradient">-DEVGAME</span>
            </h1>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginTop: '-3px', fontWeight: 600 }}>
              Interactive Learning Platform
            </span>
          </div>
        </div>

        {/* 2. Middle: Clean Dropdown Navigation (Desktop) */}
        <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {/* Dashboard Button */}
          <button
            onClick={() => navigateTo('dashboard')}
            style={{
              padding: '7px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.86rem',
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

          {/* DROPDOWN 1: Labs & Tools */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('labs')}
              style={{
                padding: '7px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.86rem',
                fontWeight: '700',
                background: activeDropdown === 'labs' || activeTab === 'labs' || activeTab.includes('lab') || activeTab === 'sql_joins' || activeTab === 'datastructures' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                color: activeDropdown === 'labs' || activeTab === 'labs' || activeTab.includes('lab') || activeTab === 'sql_joins' || activeTab === 'datastructures' ? 'var(--accent-primary)' : 'var(--text-main)',
                border: activeDropdown === 'labs' ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Terminal size={15} color="var(--accent-primary)" />
              <span>Labs &amp; Tools</span>
              <ChevronDown size={13} style={{ transform: activeDropdown === 'labs' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {activeDropdown === 'labs' && (
              <div
                className="animate-fade-in"
                style={{
                  position: 'absolute',
                  top: '120%',
                  left: 0,
                  width: '420px',
                  background: 'var(--bg-card)',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.35)',
                  padding: '10px',
                  zIndex: 300,
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
                      background: activeTab === item.id ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                      transition: 'background 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={e => e.currentTarget.style.background = activeTab === item.id ? 'rgba(99, 102, 241, 0.12)' : 'transparent'}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-main)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.desc}
                      </div>
                    </div>
                    {item.badge && (
                      <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', fontWeight: 800, whiteSpace: 'nowrap' }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DROPDOWN 2: IHK Prüfung */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('exam')}
              style={{
                padding: '7px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.86rem',
                fontWeight: '700',
                background: activeDropdown === 'exam' || activeTab === 'exam' || activeTab === 'oral_exam' || activeTab === 'lernfelder' || activeTab === 'podcast' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                color: activeDropdown === 'exam' || activeTab === 'exam' || activeTab === 'oral_exam' || activeTab === 'lernfelder' || activeTab === 'podcast' ? 'var(--accent-primary)' : 'var(--text-main)',
                border: activeDropdown === 'exam' ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <GraduationCap size={15} color="var(--accent-teal)" />
              <span>IHK Prüfung</span>
              <ChevronDown size={13} style={{ transform: activeDropdown === 'exam' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {activeDropdown === 'exam' && (
              <div
                className="animate-fade-in"
                style={{
                  position: 'absolute',
                  top: '120%',
                  left: 0,
                  width: '420px',
                  background: 'var(--bg-card)',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.35)',
                  padding: '10px',
                  zIndex: 300,
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
                      background: activeTab === item.id ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                      transition: 'background 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={e => e.currentTarget.style.background = activeTab === item.id ? 'rgba(99, 102, 241, 0.12)' : 'transparent'}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-main)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.desc}
                      </div>
                    </div>
                    {item.badge && (
                      <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(13, 148, 136, 0.15)', color: 'var(--accent-teal)', fontWeight: 800, whiteSpace: 'nowrap' }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DROPDOWN 3: Kurse & Wissen */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('learn')}
              style={{
                padding: '7px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.86rem',
                fontWeight: '700',
                background: activeDropdown === 'learn' || activeTab === 'anfaenger_guide' || activeTab === 'campaign' || activeTab === 'languages' || activeTab === 'ai_business' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                color: activeDropdown === 'learn' || activeTab === 'anfaenger_guide' || activeTab === 'campaign' || activeTab === 'languages' || activeTab === 'ai_business' ? 'var(--accent-primary)' : 'var(--text-main)',
                border: activeDropdown === 'learn' ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <BookOpen size={15} color="var(--accent-amber)" />
              <span>Kurse &amp; Wissen</span>
              <ChevronDown size={13} style={{ transform: activeDropdown === 'learn' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {activeDropdown === 'learn' && (
              <div
                className="animate-fade-in"
                style={{
                  position: 'absolute',
                  top: '120%',
                  left: 0,
                  width: '420px',
                  background: 'var(--bg-card)',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.35)',
                  padding: '10px',
                  zIndex: 300,
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
                      background: activeTab === item.id ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                      transition: 'background 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={e => e.currentTarget.style.background = activeTab === item.id ? 'rgba(99, 102, 241, 0.12)' : 'transparent'}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-main)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.desc}
                      </div>
                    </div>
                    {item.badge && (
                      <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(217, 119, 6, 0.15)', color: 'var(--accent-amber)', fontWeight: 800, whiteSpace: 'nowrap' }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mini-Games Button */}
          <button
            onClick={() => navigateTo('games')}
            style={{
              padding: '7px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.86rem',
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

        {/* 3. Right Side: Unified Search & Tools Profile Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Quick Search Button (Command Palette) */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenCommandPalette}
            style={{ 
              gap: '6px', 
              fontWeight: 700, 
              background: 'rgba(99, 102, 241, 0.1)', 
              borderColor: 'var(--accent-primary)', 
              color: 'var(--accent-primary)',
              minHeight: '36px',
              padding: '6px 10px'
            }}
            title="Schnellsuche (Ctrl + K)"
          >
            <Search size={14} />
            <span className="desktop-only" style={{ fontSize: '0.82rem' }}>Suche</span>
            <kbd style={{ background: 'var(--bg-card)', padding: '1px 4px', borderRadius: '4px', fontSize: '0.65rem', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>Ctrl+K</kbd>
          </button>

          {/* Unified TOOLS Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('tools')}
              className="btn btn-secondary btn-sm"
              style={{
                minHeight: '36px',
                padding: '6px 10px',
                gap: '5px',
                fontWeight: 700,
                fontSize: '0.82rem',
                borderColor: activeDropdown === 'tools' ? 'var(--accent-primary)' : 'var(--border-color)',
                color: activeDropdown === 'tools' ? 'var(--accent-primary)' : 'var(--text-main)'
              }}
              title="Lernwerkzeuge & Modale"
            >
              <Wrench size={14} />
              <span className="desktop-only">Tools</span>
              <ChevronDown size={12} style={{ transform: activeDropdown === 'tools' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {activeDropdown === 'tools' && (
              <div
                className="animate-fade-in"
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '260px',
                  background: 'var(--bg-card)',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.35)',
                  padding: '8px',
                  zIndex: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px'
                }}
              >
                <div
                  onClick={() => { onOpenFlashcardsModal(); setActiveDropdown(null); }}
                  style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Layers size={15} color="var(--accent-purple)" /> IT-Karteikarten (SM-2)
                </div>

                <div
                  onClick={() => { onOpenGlossaryModal(); setActiveDropdown(null); }}
                  style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <BookOpen size={15} color="var(--accent-primary)" /> IT-Lexikon (200+ Begriffe)
                </div>

                <div
                  onClick={() => { onOpenVocabularyModal(); setActiveDropdown(null); }}
                  style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <BookMarked size={15} color="var(--accent-teal)" /> Fachwort-Vokabeltrainer
                </div>

                <div
                  onClick={() => { onOpenDeploymentModal(); setActiveDropdown(null); }}
                  style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Rocket size={15} color="var(--accent-amber)" /> Live Deployment Guide
                </div>

                <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />

                <div
                  onClick={() => { onOpenBackupModal(); setActiveDropdown(null); }}
                  style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <ShieldCheck size={15} /> Backup &amp; Wiederherstellen
                </div>

                <div
                  onClick={() => { setLang(lang === 'de' ? 'en' : 'de'); setActiveDropdown(null); }}
                  style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Globe size={15} /> Sprache: {lang.toUpperCase()} (DE / EN)
                </div>
              </div>
            )}
          </div>

          {/* Unified PROFILE & LEVEL Badge */}
          <div
            onClick={onOpenBadgesModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              padding: '4px 8px',
              borderRadius: '9999px',
              cursor: 'pointer',
              minHeight: '36px'
            }}
            role="button"
            tabIndex={0}
            aria-label="Level und Erfolge anzeigen"
            title="Erfolge & XP Stats anzeigen"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--accent-amber)', fontSize: '0.8rem', fontWeight: '800' }}>
              <Flame size={14} />
              <span>{userState.xp} XP</span>
            </div>
            <div style={{ height: '12px', width: '1px', background: 'var(--border-color)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--accent-teal)', fontSize: '0.8rem', fontWeight: '800' }}>
              <Trophy size={14} />
              <span>Lvl {userState.level}</span>
            </div>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{ minHeight: '36px', width: '36px', padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Farbschema wechseln"
            title="Dark- / Light-Mode wechseln"
          >
            {theme === 'light' ? <Moon size={15} style={{ color: 'var(--accent-primary)' }} /> : <Sun size={15} style={{ color: 'var(--accent-amber)' }} />}
          </button>

          {/* Accessibility Settings Toolbar */}
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

          {/* Role Pill Button */}
          <button
            onClick={onOpenProfileModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 10px',
              borderRadius: '9999px',
              background: 'rgba(79, 70, 229, 0.1)',
              color: 'var(--accent-primary)',
              border: '1px solid var(--accent-primary)',
              fontWeight: '700',
              fontSize: '0.78rem',
              cursor: 'pointer',
              minHeight: '36px'
            }}
            title="Zielgruppen-Rolle wechseln"
          >
            <UserCheck size={14} />
            <span className="desktop-only">{currentRole.badge}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
