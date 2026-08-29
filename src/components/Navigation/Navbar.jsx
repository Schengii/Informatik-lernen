import React, { useState, useRef, useEffect } from 'react';
import { USER_ROLES, getLocalizedRole } from '../../data/userProfiles';
import { useTranslation } from '../../utils/i18n';
import {
  Trophy, Flame, Code2, Sun, Moon, BookOpen,
  Layers, ShieldCheck, BookMarked, Globe, Rocket, Search,
  ChevronDown, Terminal, Award,
  FileText, Wrench, GraduationCap, Sliders,
  Volume2, Menu, X
} from 'lucide-react';

// Badges in den Mega-Dropdowns unten sind größtenteils ohnehin englische Fachbegriffe
// (DB, API, DevOps, ...) — nur die tatsächlich deutschen Kürzel werden hier übersetzt.
const BADGE_KEYS = {
  Neu: 'badge_neu',
  Didaktik: 'badge_didaktik',
  Prüfung: 'badge_pruefung',
  WISO: 'badge_wiso',
  Doku: 'badge_doku',
  Praxis: 'badge_praxis',
  KI: 'badge_ki'
};

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
  onOpenAudioModal,
  activeTab,
  setActiveTab,
  lang,
  setLang,
  setFontSize,
  isDyslexic,
  setIsDyslexic,
  isColorblind,
  setIsColorblind,
  isHighContrast,
  setIsHighContrast,
  theme,
  setTheme
}) {
  const { t } = useTranslation();
  const currentRole = getLocalizedRole(USER_ROLES[userState.role] || USER_ROLES.anfaenger, lang);
  const translateBadge = (badge) => (BADGE_KEYS[badge] ? t(BADGE_KEYS[badge]) : badge);

  // Single Active Dropdown: 'labs' | 'exam' | 'learn' | 'tools' | 'profile_menu' | 'mobile_nav' | null
  const [activeDropdown, setActiveDropdown] = useState(null);
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
    { id: 'labs', label: '🧪 Alle Labs & Simulatoren Hub', desc: 'Zentrale Übersicht aller 60+ interaktiven Labs', badge: 'Hub' },
    { id: 'linux_vfs_lab', label: '🐧 Linux POSIX Terminal & VFS Sandbox', desc: 'In-Memory VFS mit Pipes, Chmod & SysAdmin Notfällen', badge: 'Neu' },
    { id: 'ihk_project_planner', label: '📝 IHK Projektdokumentation & NWA-Studio', desc: 'Phasen-Rechner, Nutzwertanalyse & Amortisation', badge: 'Neu' },
    { id: 'chaos_engineering', label: '🔥 Chaos Engineering & Resilience Studio', desc: 'Fault Injection, Circuit Breaker & Fallback Cache', badge: 'Neu' },
    { id: 'cicd_dag_builder', label: '⚙️ CI/CD Pipeline DAG Studio & Runner', desc: 'Directed Acyclic Graph & GitHub Actions YAML', badge: 'Neu' },
    { id: 'os_scheduler', label: '⏱️ OS Process Scheduler & Deadlock', desc: 'FCFS, SJF, Round Robin & Bankier-Algorithmus', badge: 'Flagship' },
    { id: 'packet_sniffer', label: '📡 Web-Wireshark Packet Sniffer', desc: 'Frame Dissection, Hex Dump & Display Filter', badge: 'Flagship' },
    { id: 'erd_designer', label: '🗄️ Relational ERD & 3NF Normalform-Linter', desc: 'Entity Relationships, 1NF-3NF Audit & SQL DDL', badge: 'Flagship' },
    { id: 'transformer_attention', label: '🧠 Transformer Attention & LLM Studio', desc: 'Self-Attention Heatmap, Softmax & ReAct Agent', badge: 'Flagship' },
    { id: 'cloud_canvas', label: '☁️ Cloud SLA & SPOF Architecture Canvas', desc: 'Verfügbarkeit (99.99%), Downtime & SPOF Linter', badge: 'Flagship' },
    { id: 'rack_configurator', label: '🗄️ 19" Rack- & USV/Klimarechner', desc: '42HE Schrank, USV-Laufzeit & BTU/h Kühlung', badge: 'Flagship' },
    { id: 'itsm_simulator', label: '🎧 ITIL 4 ITSM & Service Desk Studio', desc: 'Incident Queue, SLA-Matrix & CAB Risk Score', badge: 'Flagship' },
    { id: 'sm2_spaced_repetition', label: '💡 SuperMemo SM-2 Spaced Repetition', desc: 'Karteikarten & Ebbinghaus-Vergessenskurven', badge: 'Didaktik' },
    { id: 'personal_notebook', label: '📓 Developer Notizbuch & Vault', desc: 'Markdown-Notizen, Code-Snippets & Export', badge: 'Tools' },
    { id: 'wasm_compiler', label: '⚙️ WebAssembly Compiler Playground', desc: 'C/Rust In-Browser Kompilierung & Hex-Inspektor', badge: 'Flagship' },
    { id: 'zkp_crypto', label: '🔐 ZKP & Kryptographie Visualizer', desc: 'Elliptische Kurven & Zero-Knowledge Proofs', badge: 'Flagship' },
    { id: 'oauth_pkce_studio', label: '🔐 OAuth2 PKCE & OIDC Flow Studio', desc: 'RFC 7636 S256 Challenge, Token Exchange & JWT Claims', badge: 'Neu' },
    { id: 'k8s_cluster_studio', label: '☸️ Kubernetes Cluster & Topology Studio', desc: 'Control Plane, Pod Scheduling, Self-Healing & Ingress', badge: 'Neu' },
    { id: 'webrtc_peer_studio', label: '📡 WebRTC P2P & DataChannel Studio', desc: 'SDP Offer/Answer, STUN/TURN & Live Impairment Chat', badge: 'Neu' },
    { id: 'scrum_simulator', label: '📋 Scrum Sprint & Kanban Simulator', desc: 'Story Points, Burndown-Chart & Velocity', badge: 'Neu' },
    { id: 'graphql_explorer', label: '🧬 GraphQL Schema & Query Explorer', desc: 'In-Browser GraphQL Engine & AST Visualizer', badge: 'Neu' },
    { id: 'ble_sensor', label: '📡 BLE & GATT Sensor Simulator', desc: 'IoT Bluetooth Low Energy Telemetrie & Bytes', badge: 'Neu' },
    { id: 'regex_railroad', label: '🚂 RegEx Railroad & Diagramm Studio', desc: 'Syntaxbäume & Eisenbahndiagramme für RegEx', badge: 'Neu' },
    { id: 'webhook_inspector', label: '📡 Webhook Inspector & Mock Server', desc: 'HTTP Webhooks empfangen, prüfen & signieren', badge: 'Neu' },
    { id: 'voice_quiz', label: '🎙️ Podcast Voice Quiz Studio', desc: 'Sprachgesteuertes Audio-Quiz zu IHK-Themen', badge: 'Neu' },
    { id: 'tco_roi_lab', label: '📊 TCO & ROI Wirtschaftlichkeits-Rechner', desc: 'On-Prem vs. Cloud Amortisation für IHK Projekte', badge: 'Neu' },
    { id: 'git_conflict_lab', label: '🌿 Git 3-Way Merge Conflict Resolver', desc: 'Interaktives Lösen von Git-Konflikten', badge: 'Neu' },
    { id: 'custom_challenges', label: '✍️ Custom Coding Challenge Creator', desc: 'Eigene Aufgaben erstellen, testen & exportieren', badge: 'Neu' },
    { id: 'p2p_duell', label: '⚔️ IHK Quiz-Duell Arena (1v1 / P2P)', desc: 'Realtime Multiplayer Duell gegen Azubis & Bots', badge: 'Neu' },
    { id: 'sqlite_studio', label: '🗄️ SQLite & Relational DB Sandbox', desc: 'In-Browser SQL Console mit Schema & CSV Export', badge: 'Neu' },
    { id: 'coding_challenges', label: '💻 Live Coding Challenge Studio', desc: 'LeetCode-Style Aufgaben mit automatischem Test-Runner', badge: 'Neu' },
    { id: 'wiso_kalkulation', label: '📊 WISO & Handelskalkulations-Studio', desc: 'Handelskalkulation, Break-Even & Netzplan (CPM)', badge: 'Neu' },
    { id: 'ieee754_lab', label: '🔬 IEEE-754 Float & Zahlen-Studio', desc: 'Single Precision, Zweierkomplement & KV-Map', badge: 'Neu' },
    { id: 'ipv6_routing_lab', label: '🌐 IPv6 & Routing-Table Simulator', desc: 'SLAAC/EUI-64 & Longest Prefix Match (LPM)', badge: 'Neu' },
    { id: 'owasp_exploit_lab', label: '🔒 OWASP Top 10 Live Sandbox', desc: 'XSS, SQLi, CSRF & IDOR Exploit Defense', badge: 'Neu' },
    { id: 'neural_net_lab', label: '🧠 Neural Network & BPE Tokenizer', desc: 'Forward-Propagation & LLM Byte-Pair Encoding', badge: 'Neu' },
    { id: 'jwks_rotation_lab', label: '🔑 OAuth2 JWKS Key Rotation Lab', desc: 'Asymmetrische RS256 Validierung', badge: 'Security' },
    { id: 'postgres_mvcc_lab', label: '🗄️ PostgreSQL MVCC & VACUUM Lab', desc: 'xmin, xmax & Dead Tuples Bereinigung', badge: 'DB' },
    { id: 'http3_quic_lab', label: '⚡ HTTP/3 & QUIC Protocol Inspector', desc: 'UDP-Multiplexing & 0-RTT Latency', badge: 'Net' },
    { id: 'redis_caching_lab', label: '⚡ Redis Caching & Invalidation Lab', desc: 'Cache-Aside & Cache Stampede Defense', badge: 'Perf' },
    { id: 'circuit_breaker_lab', label: '🛡️ Circuit Breaker & Mesh Resilience', desc: 'Fault Tolerance & OpenTelemetry Spans', badge: 'Cloud' },
    { id: 'k8s_cni_lab', label: '☸️ Kubernetes CNI & VXLAN Overlay', desc: 'Pod-to-Pod Cross-Node Networking', badge: 'K8s' },
    { id: 'graphql_resolver_lab', label: '🧬 GraphQL AST & DataLoader Lab', desc: 'Query Parsing & N+1 Batching', badge: 'API' },
    { id: 'linux_permissions_lab', label: '🐧 Linux Permissions & Inode Rechner', desc: 'chmod, Inodes & SUID Bits', badge: 'Linux' },
    { id: 'crypto_keygen_lab', label: '🔐 RSA & Diffie-Hellman Crypto Lab', desc: 'Public-Key Primzahl-Mathematik', badge: 'Crypto' },
    { id: 'cicd_matrix_lab', label: '⚙️ CI/CD Matrix Linter & Runner', desc: 'GitHub Actions Multi-OS Matrix Testing', badge: 'DevOps' },
    { id: 'postgres_explain_lab', label: '📊 PostgreSQL Query Tree Visualizer', desc: 'JSON EXPLAIN Plan & Cost Analyzer', badge: 'DB' },
    { id: 'webrtc_signaling_lab', label: '📡 WebRTC P2P & Signaling Lab', desc: 'SDP Offer/Answer & RTCDataChannel', badge: 'WebRTC' },
    { id: 'code_debugger_lab', label: '🔍 Code Execution & Memory Debugger', desc: 'V8 Engine Call Stack, Closures & Heap', badge: 'Debug' },
    { id: 'clean_code_lab', label: '🛡️ Clean Code & Security Arena', desc: 'OWASP Top 10, Memory Leaks & Refactoring', badge: 'Code' },
    { id: 'dns_http_lab', label: '🌐 DNS & HTTP/TLS Request Inspector', desc: 'End-to-End Netzwerk-Visualisierung', badge: 'Net' },
    { id: 'sql_transaction_lab', label: '💾 SQL Transaktionen & ACID Simulator', desc: 'Dirty Reads, Phantom Reads & Deadlocks', badge: 'SQL' },
    { id: 'cpu_architecture_lab', label: '🔬 Von-Neumann CPU & Register Lab', desc: 'Hardware, Taktzyklen & Assembler', badge: 'CPU' },
    { id: 'sql_optimizer_lab', label: '⚡ SQL Query Optimizer Lab', desc: 'Index Scan vs. Full Table Scan', badge: 'SQL' },
    { id: 'git_graph_lab', label: '🌿 Git Branch & Rebase Visualizer', desc: 'Interaktiver SVG Commit-Graph', badge: 'Git' },
    { id: 'sql_joins', label: '📊 SQL JOINs & Venn-Diagramm', desc: 'INNER, LEFT, RIGHT & FULL Joins', badge: 'SQL' },
    { id: 'datastructures', label: '🌲 Trees, BST & Graphen Lab', desc: 'Binäre Suchbäume & Dijkstra Algorithmus', badge: 'Algo' },
    { id: 'docker', label: '🐳 Docker & Container Lab', desc: 'Dockerfile, Container & Port-Mapping', badge: 'Cloud' },
    { id: 'kubernetes', label: '☸️ Kubernetes Pods & Cluster', desc: 'Deployments, ReplicaSets & Ingress', badge: 'Cloud' }
  ];

  const examMenuItems = [
    { id: 'ihk_grade_calculator', label: '🎓 IHK Noten- & MEP-Rechner (AO 2020)', desc: 'Exakte Gewichtung AP1/AP2 & Ergänzungsprüfung', badge: 'Neu' },
    { id: 'exam', label: '🎓 IHK Abschlussprüfung (AP1 & AP2)', desc: '90-Min. Timer, Punkte & IHK Noten 1-6', badge: 'Prüfung' },
    { id: 'cheat_sheets', label: '📄 IHK Spickzettel & PDF Generator', desc: 'Druckfertige DIN A4 Zusammenfassungen & Formeln', badge: 'Neu' },
    { id: 'wiso_kalkulation', label: '📊 WISO- & Kalkulations-Rechner', desc: 'Handelskalkulation, Break-Even & Arbeitsrecht', badge: 'WISO' },
    { id: 'ihk_doc_generator', label: '📝 IHK Projektantrag & Doku-Generator', desc: '80h/40h Zeitplan & Amortisations-ROI', badge: 'Doku' },
    { id: 'oral_exam', label: '🎙️ IHK Mündliches Fachgespräch', desc: 'Präsentation mit Audio-Spracherkennung', badge: 'Voice' },
    { id: 'lernfelder', label: '📚 IHK Lernfelder 1 - 12b', desc: 'Offizieller Rahmenlehrplan Berufsschule', badge: 'IHK' },
    { id: 'podcast', label: '🎧 IHK Fachinformatiker Podcast', desc: 'Datenschutz, Encodings & Stefan Macke Tipps', badge: 'Audio' },
    { id: 'quiz_arena', label: '🏆 IHK Knowledge Quiz Arena', desc: 'Schnelligkeits-Quiz & Leaderboard', badge: 'Quiz' },
    { id: 'lueckentext', label: '📜 IHK Prüfungs-Lückentexte', desc: 'Prüfungsbegriffe & Fachdefinitionen üben', badge: 'Praxis' }
  ];

  const learnMenuItems = [
    { id: 'anfaenger_guide', label: '🌱 Einsteiger Kurs ohne Vorwissen', desc: 'EVA-Prinzip, CPU, Binärlogik & Web', badge: 'Start' },
    { id: 'sm2_spaced_repetition', label: '💡 SuperMemo SM-2 Karteikarten', desc: 'Spaced Repetition & Ebbinghaus-Gedächtniskurven', badge: 'Neu' },
    { id: 'personal_notebook', label: '📓 Developer Notizen & Spickzettel', desc: 'Markdown Notebook mit Tag-Suche & Export', badge: 'Neu' },
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
          maxWidth: '1440px',
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
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => navigateTo('dashboard')}
          role="button"
          tabIndex={0}
          aria-label={t('nav_to_dashboard')}
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
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginTop: '-3px', fontWeight: 600 }}>
              Interactive Learning Platform
            </span>
          </div>
        </div>

        {/* 2. Middle: Desktop Navigation (Großzügige Menüs) */}
        <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Dashboard Button */}
          <button
            onClick={() => navigateTo('dashboard')}
            style={{
              padding: '9px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.92rem',
              fontWeight: '700',
              background: activeTab === 'dashboard' ? 'rgba(99, 102, 241, 0.14)' : 'transparent',
              color: activeTab === 'dashboard' ? 'var(--accent-primary)' : 'var(--text-main)',
              border: activeTab === 'dashboard' ? '1px solid var(--accent-primary)' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {t('nav_dashboard')}
          </button>

          {/* DROPDOWN 1: Labs & Tools */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('labs')}
              style={{
                padding: '9px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                fontWeight: '700',
                background: activeDropdown === 'labs' || activeTab === 'labs' || activeTab.includes('lab') || activeTab === 'wiso_kalkulation' || activeTab === 'ieee754_lab' || activeTab === 'ipv6_routing_lab' || activeTab === 'owasp_exploit_lab' || activeTab === 'neural_net_lab' ? 'rgba(99, 102, 241, 0.14)' : 'transparent',
                color: activeDropdown === 'labs' || activeTab === 'labs' || activeTab.includes('lab') || activeTab === 'wiso_kalkulation' || activeTab === 'ieee754_lab' || activeTab === 'ipv6_routing_lab' || activeTab === 'owasp_exploit_lab' || activeTab === 'neural_net_lab' ? 'var(--accent-primary)' : 'var(--text-main)',
                border: activeDropdown === 'labs' ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Terminal size={17} color="var(--accent-primary)" />
              <span>{t('nav_labs_tools')}</span>
              <ChevronDown size={14} style={{ transform: activeDropdown === 'labs' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {activeDropdown === 'labs' && (
              <div
                className="animate-fade-in nav-dropdown-popover"
                style={{
                  position: 'absolute',
                  top: '125%',
                  left: 0,
                  width: 'min(480px, calc(100vw - 32px))',
                  maxHeight: '78vh',
                  overflowY: 'auto',
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 24px 48px -12px rgba(0,0,0,0.4)',
                  padding: '12px',
                  zIndex: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                {labsMenuItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: activeTab === item.id ? 'rgba(99, 102, 241, 0.14)' : 'transparent',
                      transition: 'background 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={e => e.currentTarget.style.background = activeTab === item.id ? 'rgba(99, 102, 241, 0.14)' : 'transparent'}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.94rem', color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-main)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '3px', lineHeight: '1.4' }}>
                        {item.desc}
                      </div>
                    </div>
                    {item.badge && (
                      <span style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', fontWeight: 800, whiteSpace: 'nowrap' }}>
                        {translateBadge(item.badge)}
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
                padding: '9px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                fontWeight: '700',
                background: activeDropdown === 'exam' || activeTab === 'exam' || activeTab === 'oral_exam' || activeTab === 'lernfelder' || activeTab === 'podcast' || activeTab === 'cheat_sheets' ? 'rgba(99, 102, 241, 0.14)' : 'transparent',
                color: activeDropdown === 'exam' || activeTab === 'exam' || activeTab === 'oral_exam' || activeTab === 'lernfelder' || activeTab === 'podcast' || activeTab === 'cheat_sheets' ? 'var(--accent-primary)' : 'var(--text-main)',
                border: activeDropdown === 'exam' ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <GraduationCap size={17} color="var(--accent-teal)" />
              <span>{t('nav_exam')}</span>
              <ChevronDown size={14} style={{ transform: activeDropdown === 'exam' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {activeDropdown === 'exam' && (
              <div
                className="animate-fade-in nav-dropdown-popover"
                style={{
                  position: 'absolute',
                  top: '125%',
                  left: 0,
                  width: 'min(480px, calc(100vw - 32px))',
                  maxHeight: '78vh',
                  overflowY: 'auto',
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 24px 48px -12px rgba(0,0,0,0.4)',
                  padding: '12px',
                  zIndex: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                {examMenuItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: activeTab === item.id ? 'rgba(99, 102, 241, 0.14)' : 'transparent',
                      transition: 'background 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={e => e.currentTarget.style.background = activeTab === item.id ? 'rgba(99, 102, 241, 0.14)' : 'transparent'}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.94rem', color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-main)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '3px', lineHeight: '1.4' }}>
                        {item.desc}
                      </div>
                    </div>
                    {item.badge && (
                      <span style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(13, 148, 136, 0.15)', color: 'var(--accent-teal)', fontWeight: 800, whiteSpace: 'nowrap' }}>
                        {translateBadge(item.badge)}
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
                padding: '9px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                fontWeight: '700',
                background: activeDropdown === 'learn' || activeTab === 'anfaenger_guide' || activeTab === 'campaign' || activeTab === 'languages' || activeTab === 'ai_business' ? 'rgba(99, 102, 241, 0.14)' : 'transparent',
                color: activeDropdown === 'learn' || activeTab === 'anfaenger_guide' || activeTab === 'campaign' || activeTab === 'languages' || activeTab === 'ai_business' ? 'var(--accent-primary)' : 'var(--text-main)',
                border: activeDropdown === 'learn' ? '1px solid var(--accent-primary)' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <BookOpen size={17} color="var(--accent-amber)" />
              <span>{t('nav_learn')}</span>
              <ChevronDown size={14} style={{ transform: activeDropdown === 'learn' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {activeDropdown === 'learn' && (
              <div
                className="animate-fade-in nav-dropdown-popover"
                style={{
                  position: 'absolute',
                  top: '125%',
                  left: 0,
                  width: 'min(480px, calc(100vw - 32px))',
                  maxHeight: '78vh',
                  overflowY: 'auto',
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 24px 48px -12px rgba(0,0,0,0.4)',
                  padding: '12px',
                  zIndex: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                {learnMenuItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: activeTab === item.id ? 'rgba(99, 102, 241, 0.14)' : 'transparent',
                      transition: 'background 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={e => e.currentTarget.style.background = activeTab === item.id ? 'rgba(99, 102, 241, 0.14)' : 'transparent'}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '0.94rem', color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-main)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '3px', lineHeight: '1.4' }}>
                        {item.desc}
                      </div>
                    </div>
                    {item.badge && (
                      <span style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(217, 119, 6, 0.15)', color: 'var(--accent-amber)', fontWeight: 800, whiteSpace: 'nowrap' }}>
                        {translateBadge(item.badge)}
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
              padding: '9px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.92rem',
              fontWeight: '700',
              background: activeTab === 'games' ? 'rgba(99, 102, 241, 0.14)' : 'transparent',
              color: activeTab === 'games' ? 'var(--accent-primary)' : 'var(--text-main)',
              border: activeTab === 'games' ? '1px solid var(--accent-primary)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            {t('nav_games')}
          </button>
        </nav>

        {/* 3. Right: Unified TOOLS & PROFIL & SETTINGS Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              minHeight: '40px',
              padding: '8px 14px'
            }}
            title={t('nav_search_title')}
          >
            <Search size={16} />
            <span className="desktop-only" style={{ fontSize: '0.88rem' }}>{t('nav_search')}</span>
            <kbd style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', fontSize: '0.7rem', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>Ctrl+K</kbd>
          </button>

          {/* DROPDOWN: Tools & Lernwerkzeuge */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('tools')}
              className="btn btn-secondary btn-sm"
              style={{
                minHeight: '40px',
                padding: '8px 14px',
                gap: '6px',
                fontWeight: 700,
                fontSize: '0.88rem',
                borderColor: activeDropdown === 'tools' ? 'var(--accent-primary)' : 'var(--border-color)',
                color: activeDropdown === 'tools' ? 'var(--accent-primary)' : 'var(--text-main)'
              }}
              title={t('nav_tools_title')}
            >
              <Wrench size={16} />
              <span className="desktop-only">{t('nav_tools')}</span>
              <ChevronDown size={14} style={{ transform: activeDropdown === 'tools' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {activeDropdown === 'tools' && (
              <div
                className="animate-fade-in"
                style={{
                  position: 'absolute',
                  top: '125%',
                  right: 0,
                  width: 'min(300px, calc(100vw - 32px))',
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 24px 48px -12px rgba(0,0,0,0.4)',
                  padding: '10px',
                  zIndex: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div
                  onClick={() => { onOpenFlashcardsModal(); setActiveDropdown(null); }}
                  style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Layers size={17} color="var(--accent-purple)" /> {t('nav_flashcards')}
                </div>

                <div
                  onClick={() => { onOpenGlossaryModal(); setActiveDropdown(null); }}
                  style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <BookOpen size={17} color="var(--accent-primary)" /> {t('nav_lexicon')}
                </div>

                <div
                  onClick={() => { onOpenVocabularyModal(); setActiveDropdown(null); }}
                  style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <BookMarked size={17} color="var(--accent-teal)" /> {t('nav_vocab_trainer')}
                </div>

                <div
                  onClick={() => { onOpenDeploymentModal(); setActiveDropdown(null); }}
                  style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Rocket size={17} color="var(--accent-amber)" /> {t('nav_deployment_guide')}
                </div>

                <div
                  onClick={() => { onOpenAudioModal(); setActiveDropdown(null); }}
                  style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Volume2 size={17} color="var(--accent-teal)" /> {t('nav_audio_settings')}
                </div>

                <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />

                <div
                  onClick={() => { onOpenBackupModal(); setActiveDropdown(null); }}
                  style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <ShieldCheck size={17} /> {t('nav_backup')}
                </div>

                <div
                  onClick={() => { setLang(lang === 'de' ? 'en' : 'de'); setActiveDropdown(null); }}
                  style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Globe size={17} /> {t('nav_language')}: {lang.toUpperCase()} (DE / EN)
                </div>
              </div>
            )}
          </div>

          {/* DROPDOWN: ALL-IN-ONE PROFIL & EINSTELLUNGEN Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown('profile_menu')}
              className="btn btn-secondary btn-sm"
              style={{
                minHeight: '40px',
                padding: '6px 12px',
                gap: '8px',
                fontWeight: 700,
                borderRadius: '9999px',
                borderColor: activeDropdown === 'profile_menu' ? 'var(--accent-primary)' : 'var(--border-color)',
                background: 'var(--bg-tertiary)'
              }}
              title={t('nav_profile_settings_title')}
            >
              {/* XP & Level Summary */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-amber)', fontSize: '0.85rem', fontWeight: '800' }}>
                <Flame size={15} />
                <span>{userState.xp} XP</span>
              </div>
              <div style={{ height: '14px', width: '1px', background: 'var(--border-color)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-teal)', fontSize: '0.85rem', fontWeight: '800' }}>
                <Trophy size={15} />
                <span>Lvl {userState.level}</span>
              </div>
              <ChevronDown size={14} style={{ transform: activeDropdown === 'profile_menu' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', color: 'var(--text-muted)' }} />
            </button>

            {activeDropdown === 'profile_menu' && (
              <div
                className="animate-fade-in nav-dropdown-popover"
                style={{
                  position: 'absolute',
                  top: '125%',
                  right: 0,
                  width: 'min(330px, calc(100vw - 40px))',
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 24px 48px -12px rgba(0,0,0,0.4)',
                  padding: '14px',
                  zIndex: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                {/* User Header in Dropdown */}
                <div style={{ padding: '8px 10px', background: 'var(--bg-tertiary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--text-main)' }}>
                      {userState.userName || 'Dev Explorer'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
                      {currentRole.title.split('(')[0]}
                    </div>
                  </div>
                  <button
                    onClick={() => { onOpenProfileModal(); setActiveDropdown(null); }}
                    style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', background: 'rgba(79, 70, 229, 0.15)', color: 'var(--accent-primary)', border: 'none', cursor: 'pointer' }}
                  >
                    {t('nav_change_role')}
                  </button>
                </div>

                {/* Badges & Stats Action */}
                <div
                  onClick={() => { onOpenBadgesModal(); setActiveDropdown(null); }}
                  style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={17} color="var(--accent-amber)" /> {t('nav_badges')}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    {userState.unlockedBadges?.length || 0} {t('nav_unlocked_suffix')}
                  </span>
                </div>

                <div
                  onClick={() => { onOpenCertificateModal(); setActiveDropdown(null); }}
                  style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <FileText size={17} color="var(--accent-teal)" /> {t('nav_create_certificate')}
                </div>

                <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />

                {/* Theme Switcher Row */}
                <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                    {theme === 'light' ? <Sun size={17} color="var(--accent-amber)" /> : <Moon size={17} color="var(--accent-primary)" />} {t('nav_color_scheme')}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => setTheme('light')}
                      style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid var(--border-color)', background: theme === 'light' ? 'var(--accent-primary)' : 'var(--bg-tertiary)', color: theme === 'light' ? 'var(--on-accent-text)' : 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      {t('nav_light')}
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid var(--border-color)', background: theme === 'dark' ? 'var(--accent-primary)' : 'var(--bg-tertiary)', color: theme === 'dark' ? 'var(--on-accent-text)' : 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      {t('nav_dark')}
                    </button>
                  </div>
                </div>

                {/* Accessibility Controls Inside Unified Dropdown */}
                <div style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sliders size={13} /> {t('nav_accessibility_wcag')}
                  </div>

                  {/* Font Size Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                    <span>{t('a11y_font_size')}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => setFontSize(prev => Math.max(prev - 5, 85))} style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', cursor: 'pointer' }}>A-</button>
                      <button onClick={() => setFontSize(100)} style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', cursor: 'pointer' }}>100%</button>
                      <button onClick={() => setFontSize(prev => Math.min(prev + 5, 130))} style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', cursor: 'pointer' }}>A+</button>
                    </div>
                  </div>

                  {/* Accessibility Toggles */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <span>{t('nav_dyslexia_font')}</span>
                      <input type="checkbox" checked={isDyslexic} onChange={e => setIsDyslexic(e.target.checked)} style={{ cursor: 'pointer' }} />
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <span>{t('nav_colorblind_mode')}</span>
                      <input type="checkbox" checked={isColorblind} onChange={e => setIsColorblind(e.target.checked)} style={{ cursor: 'pointer' }} />
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                      <span>{t('nav_high_contrast')}</span>
                      <input type="checkbox" checked={isHighContrast} onChange={e => setIsHighContrast(e.target.checked)} style={{ cursor: 'pointer' }} />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button (For Small Screens) */}
          <button
            className="mobile-only btn btn-secondary btn-sm"
            onClick={() => toggleDropdown('mobile_nav')}
            style={{ minHeight: '40px', width: '40px', padding: 0, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label={t('nav_open_navigation')}
          >
            {activeDropdown === 'mobile_nav' ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Responsive Hamburger Drawer for Small Screens */}
      {activeDropdown === 'mobile_nav' && (
        <div
          className="mobile-only animate-fade-in"
          style={{
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            padding: '16px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
              {t('nav_mobile_navigation')}
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('dashboard')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_dashboard')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('campaign')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_campaign')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('labs')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_all_labs')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('wiso_kalkulation')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_wiso')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('ieee754_lab')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_ieee')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('ipv6_routing_lab')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_ipv6')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('owasp_exploit_lab')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_owasp')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('neural_net_lab')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_neural')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('cheat_sheets')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_cheat_sheets')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('exam')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_exam')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('oral_exam')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_oral_exam')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('anfaenger_guide')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_beginner')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('languages')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_languages')}</button>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('games')} style={{ justifyContent: 'flex-start' }}>{t('nav_mobile_games')}</button>
          </div>
        </div>
      )}
    </header>
  );
}
