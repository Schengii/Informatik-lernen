import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import Navbar from './components/Navigation/Navbar';
import MobileNav from './components/Navigation/MobileNav';
import TopicReader from './components/Content/TopicReader';
import ClozeTester from './components/Content/ClozeTester';
import VideoHub from './components/Content/VideoHub';
import ProjectViewer from './components/Projects/ProjectViewer';
import DsgvoFooterModal from './components/Footer/DsgvoFooterModal';
import DifficultyFilterBar from './components/Navigation/DifficultyFilterBar';
import SkillMatrixWidget from './components/Gamification/SkillMatrixWidget';
import DailyChallengeWidget from './components/Gamification/DailyChallengeWidget';
import SkillTreeWidget from './components/Gamification/SkillTreeWidget';
import ActivityHeatmapWidget from './components/Gamification/ActivityHeatmapWidget';
import RecommendationsWidget from './components/Gamification/RecommendationsWidget';
import PomodoroTimerWidget from './components/Navigation/PomodoroTimerWidget';
import ModalContainer from './components/Navigation/ModalContainer';
import FirstVisitTourOverlay from './components/Onboarding/FirstVisitTourOverlay';

// Lazy Loaded Games & Labs for Maximum Initial Load Speed & Low Bundle Size
const SqlDungeon = lazy(() => import('./components/Games/SqlDungeon'));
const SecurityLab = lazy(() => import('./components/Games/SecurityLab'));
const CodePuzzle = lazy(() => import('./components/Games/CodePuzzle'));
const LogicGatesGame = lazy(() => import('./components/Games/LogicGatesGame'));
const WebSandbox = lazy(() => import('./components/Games/WebSandbox'));
const RegexLab = lazy(() => import('./components/Games/RegexLab'));
const CliTerminalLab = lazy(() => import('./components/Games/CliTerminalLab'));
const BossBattleGame = lazy(() => import('./components/Games/BossBattleGame'));
const CodeTypingSpeedrun = lazy(() => import('./components/Games/CodeTypingSpeedrun'));

// Neue Labs, Simulatoren & Kampagnen Hub
const LabsDashboard = lazy(() => import('./components/Content/LabsDashboard'));

import { USER_ROLES, getLocalizedRole } from './data/userProfiles';
import { useTranslation } from './utils/i18n';
import { TOPICS } from './data/topicsData';
import { findLabEntry } from './data/labRegistry';

import { BookOpen, Sparkles, ArrowRight, CheckCircle, Sprout, Compass } from 'lucide-react';

const LabLoadingFallback = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '16px' }}>
    <div style={{ width: '40px', height: '40px', border: '3px solid rgba(99, 102, 241, 0.2)', borderTop: '3px solid var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem', fontWeight: '600' }}>Modul wird geladen...</span>
  </div>
);

export default function App() {
  const { 
    userState, handleSelectRole, awardXP, handleCompleteTopic, refreshStateFromStorage, completeTour,
    lang, setLang, theme, setTheme, fontSize, setFontSize,
    isDyslexic, setIsDyslexic, isColorblind, setIsColorblind,
    isHighContrast, setIsHighContrast,
    difficultyFilter, setDifficultyFilter
  } = useStore();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(!userState.role);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isFlashcardsModalOpen, setIsFlashcardsModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isVocabularyModalOpen, setIsVocabularyModalOpen] = useState(false);
  const [isDeploymentModalOpen, setIsDeploymentModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname === '/' ? 'dashboard' : location.pathname.substring(1);
  const setActiveTab = (tab) => navigate(`/${tab}`);

  // Global Ctrl + K / Cmd + K Keydown Shortcut Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Topic Reader state
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // Active Mini-Game Selector
  const [activeGameId, setActiveGameId] = useState('sql');

  // Apply Theme & Accessibility Classes to <body>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.fontSize = `${fontSize}%`;

    if (isDyslexic) {
      document.body.classList.add('dyslexia-mode');
    } else {
      document.body.classList.remove('dyslexia-mode');
    }

    if (isColorblind) {
      document.body.classList.add('colorblind-mode');
    } else {
      document.body.classList.remove('colorblind-mode');
    }

    if (isHighContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
  }, [theme, fontSize, isDyslexic, isColorblind, isHighContrast]);

  // Hält das <html lang="..."> Attribut (wichtig für Screenreader/Barrierefreiheit)
  // synchron mit der im Store gewählten Sprache.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const { t } = useTranslation();
  const currentRole = getLocalizedRole(USER_ROLES[userState.role] || USER_ROLES.anfaenger, lang);

  // Filter Topics by Difficulty
  const filteredTopics = TOPICS.filter((t) => {
    if (difficultyFilter === 'all') return true;
    return t.difficultyLevel === difficultyFilter;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', color: 'var(--text-main)' }}>
      {/* Top Navbar */}
      <Navbar
        userState={userState}
        onOpenProfileModal={() => setIsRoleModalOpen(true)}
        onOpenBadgesModal={() => setIsBadgesModalOpen(true)}
        onOpenGlossaryModal={() => setIsGlossaryModalOpen(true)}
        onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
        onOpenFlashcardsModal={() => setIsFlashcardsModalOpen(true)}
        onOpenVocabularyModal={() => setIsVocabularyModalOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
        onOpenDeploymentModal={() => setIsDeploymentModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAudioModal={() => setIsAudioModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        setFontSize={setFontSize}
        isDyslexic={isDyslexic}
        setIsDyslexic={setIsDyslexic}
        isColorblind={isColorblind}
        setIsColorblind={setIsColorblind}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '24px 20px 40px 20px', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ width: '100%' }}
          >
            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Hero Welcome Banner */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '36px',
                    borderRadius: 'var(--radius-xl)',
                    background: 'var(--bg-card)',
                    border: '2px solid var(--accent-primary)',
                    boxShadow: 'var(--shadow-card)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                      <span className="badge badge-indigo" style={{ marginBottom: '12px' }}>
                        <Sparkles size={14} /> {t('dash_current_role')} {currentRole.title}
                      </span>
                      <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '8px 0', color: 'var(--text-main)' }}>
                        {t('dash_welcome')} <span className="text-gradient">{t('dash_welcome_name')}</span>!
                      </h1>
                      <p style={{ color: 'var(--text-muted)', maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                        {currentRole.description}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => setActiveTab('campaign')}
                        style={{ minHeight: '48px', fontSize: '0.95rem', background: 'var(--gradient-cyber)', gap: '8px' }}
                      >
                        <Compass size={18} /> {t('dash_story_campaign')}
                      </button>

                      <button
                        className="btn btn-secondary"
                        onClick={() => setIsRoleModalOpen(true)}
                        style={{ minHeight: '48px', fontSize: '0.95rem' }}
                      >
                        {t('dash_profile_level')}
                      </button>

                      <button
                        className="btn btn-secondary"
                        onClick={() => setActiveTab('anfaenger_guide')}
                        style={{ minHeight: '48px', fontSize: '0.95rem', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' }}
                      >
                        <Sprout size={18} /> {t('dash_beginner_course')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Adaptive Lernempfehlungen basierend auf Prüfungssimulator & Quiz Arena */}
                <RecommendationsWidget onNavigate={setActiveTab} />

                {/* 365-Tage GitHub-Style Aktivitäts-Heatmap */}
                <ActivityHeatmapWidget />

                {/* Daily Challenge Widget */}
                <DailyChallengeWidget onCompleteChallenge={(xp) => awardXP(xp, 'daily_master')} />

                {/* RPG Skill Tree Widget */}
                <SkillTreeWidget userState={userState} onRewardXP={(xp) => awardXP(xp)} />

                {/* Skill Matrix Visualizer */}
                <SkillMatrixWidget userState={userState} />

                {/* Feature Modules Quick Access Grid */}
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '20px', color: 'var(--text-main)' }}>
                    Empfohlene Lernbereiche &amp; neue Studios
                  </h2>

                  <div className="grid-responsive" style={{ marginBottom: '40px' }}>
                    {/* Scrum Sprint Simulator Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('scrum_simulator')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📋</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Scrum Sprint Simulator</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Story Points, Kanban-Board &amp; Recharts Burndown-Charts.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-teal)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Sprint Planen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* GraphQL Explorer Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('graphql_explorer')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🧬</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>GraphQL Schema Explorer</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        In-Browser Query Engine mit AST-Visualisierung &amp; JSON-Output.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        GraphQL Testen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* BLE Sensor Lab Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('ble_sensor')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📡</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>BLE Sensor &amp; GATT Studio</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Bluetooth Low Energy Telemetrie, GATT Services &amp; Byte-Decoder.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Sensor Verbinden <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* RegEx Railroad Studio Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('regex_railroad')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🚂</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>RegEx Railroad Studio</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Visuelle Eisenbahndiagramme &amp; Token-Syntaxbäume für RegEx.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-pink)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Diagramme Öffnen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* REST Webhook Inspector Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('webhook_inspector')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📡</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Webhook &amp; Mock Server</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        HTTP Webhooks live empfangen, verifizieren &amp; inspizieren.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Inspector Starten <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Podcast Voice Quiz Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('voice_quiz')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎙️</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Podcast Voice Quiz</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        IHK-Fachfragen frei per Sprachaufnahme &amp; Mikrofon beantworten.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Voice Quiz Starten <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* TCO & ROI Calculator Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('tco_roi_lab')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📊</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>TCO &amp; ROI Simulator</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Wirtschaftlichkeitsanalyse (On-Prem vs. Cloud) für IHK-Projekte.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        TCO Berechnen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Git 3-Way Merge Conflict Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('git_conflict_lab')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌿</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Git Merge Conflict Resolver</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Interaktives Lösen von 3-Way Git Merge-Konflikten im Code.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-orange)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Konflikte Lösen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Custom Challenge Creator Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('custom_challenges')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✍️</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Challenge Creator Studio</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Eigene Code-Rätsel mit Testfällen erstellen, testen &amp; exportieren.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-teal)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Aufgaben Erstellen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* P2P Quiz Duell Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('p2p_duell')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⚔️</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>IHK Quiz-Duell Arena</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        1v1 Echtzeit-Multiplayer gegen Azubis oder smarte KI-Bots.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-amber)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Duell Starten <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* SQLite Relational DB Studio Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('sqlite_studio')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🗄️</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>SQL Relational Database</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        In-Browser SQL Konsole mit Tabellen-Schema und CSV Export.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-teal)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        SQL Sandbox Öffnen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Live Coding Challenge Studio Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('coding_challenges')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💻</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Live Coding Challenge Studio</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        LeetCode &amp; Exercism Style Code-Rätsel mit Test-Runner.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Challenges Lösen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* WISO & Kalkulation Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('wiso_kalkulation')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📊</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>WISO &amp; Kalkulations-Studio</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Handelskalkulation, Break-Even &amp; Netzplantechnik (Kritischer Pfad).
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Studio Öffnen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* IEEE 754 Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('ieee754_lab')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔬</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>IEEE-754 Float &amp; Zahlen-Lab</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        32-Bit Bit-Manipulation, Zweierkomplement &amp; KV-Diagramme.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-teal)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Zahlen-Lab Öffnen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* IPv6 Routing Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('ipv6_routing_lab')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌐</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>IPv6 &amp; Routing Simulator</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        SLAAC / EUI-64 Rechner &amp; Longest Prefix Match Router.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Router Öffnen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* OWASP Top 10 Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('owasp_exploit_lab')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔒</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>OWASP Top 10 Live Sandbox</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        XSS, SQL Injection, CSRF &amp; IDOR Exploit Defense.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-amber)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Security Sandbox <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Neural Net & BPE Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('neural_net_lab')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🧠</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Neural Net &amp; BPE Tokenizer</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Forward-Propagation, Gewichte &amp; Byte-Pair Encoding.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        AI Studio Öffnen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* PDF Cheat Sheet Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('cheat_sheets')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📄</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>IHK Spickzettel &amp; PDF-Export</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Druckfertige DIN A4 Formelsammlungen für IHK-Klausuren.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        PDFs Generieren <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* OS Process Scheduler Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('os_scheduler')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⏱️</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>OS Scheduler &amp; Deadlock</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        FCFS, SJF, Round Robin Gantt &amp; Bankier-Algorithmus.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-teal)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Scheduler Öffnen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Packet Sniffer Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('packet_sniffer')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📡</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Web-Wireshark Sniffer</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Frame Dissection, Hex Dump Sync &amp; Display Filter.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Sniffer Starten <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Relational ERD Designer Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('erd_designer')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🗄️</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Relational ERD &amp; 3NF Linter</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Visuelle ER-Modelle, 1NF–3NF Audit &amp; SQL DDL Export.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ERD Gestalten <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Transformer Attention Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('transformer_attention')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🧠</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Transformer Attention Studio</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Self-Attention Heatmap, Softmax, Temperature &amp; ReAct.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-pink)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        LLM Lab Öffnen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Cloud Canvas Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('cloud_canvas')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>☁️</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Cloud SLA &amp; SPOF Canvas</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Topologie-Designer, Ausfallzeiten &amp; Kostenrechner.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Topologie Planen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* IHK Grade Calculator Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('ihk_grade_calculator')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎓</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>IHK Noten- &amp; MEP-Rechner</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        AO 2020 Gewichtung, AP1/AP2 &amp; Ergänzungsprüfung.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Noten Berechnen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* 19" Rack Configurator Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('rack_configurator')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🗄️</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>19" Rack- &amp; USV-Planer</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        42HE Schrank, USV-Laufzeit &amp; RZ-Klimatisierung (BTU).
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-indigo)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Rack Bestücken <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* ITIL ITSM Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('itsm_simulator')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎧</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>ITIL 4 ITSM &amp; CAB Studio</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Service Desk, SLA-Matrix &amp; Change Advisory Board.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-amber)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Tickets Bearbeiten <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* SM-2 Spaced Repetition Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('sm2_spaced_repetition')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💡</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>SuperMemo SM-2 Mastery</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Spaced Repetition &amp; Ebbinghaus-Vergessenskurven.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-teal)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Karteikarten Lernen <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Personal Notebook Card */}
                    <div
                      className="glass-panel glass-panel-hover"
                      onClick={() => setActiveTab('personal_notebook')}
                      style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📓</div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>Developer Notizbuch</h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        Persönliche Markdown-Notizen, Code-Vault &amp; Export.
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Notizen Öffnen <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Generisch aus LAB_REGISTRY gerendertes Lab (siehe src/data/labRegistry.js) */}
            {(() => {
              const labEntry = findLabEntry(activeTab);
              if (!labEntry) return null;
              const LabComponent = labEntry.component;
              const extraProps = labEntry.specialProps
                ? labEntry.specialProps({ userState, awardXP, setActiveTab })
                : labEntry.rewardAchievementId
                ? { onRewardXP: (xp) => awardXP(xp, labEntry.rewardAchievementId) }
                : {};
              return (
                <Suspense fallback={<LabLoadingFallback />}>
                  <LabComponent {...extraProps} />
                </Suspense>
              );
            })()}

            {/* LABS & SIMULATOREN DASHBOARD */}
            {activeTab === 'labs' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <LabsDashboard
                  onSelectLab={(labId) => setActiveTab(labId)}
                  userState={userState}
                />
              </Suspense>
            )}

            {/* WISSEN & FACHKUNDE */}
            {activeTab === 'wissen' && (
              <div>
                {selectedTopicId ? (
                  <TopicReader
                    topicId={selectedTopicId}
                    onBack={() => setSelectedTopicId(null)}
                    onCompleteTopic={handleCompleteTopic}
                    isCompleted={userState.completedTopics.includes(selectedTopicId)}
                  />
                ) : (
                  <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
                      <BookOpen size={30} style={{ color: 'var(--accent-primary)' }} /> Fachkunde &amp; Wissensmodule
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '1.05rem' }}>
                      Gefiltert nach Vorwissen, Alter und Erfahrung.
                    </p>

                    <DifficultyFilterBar
                      activeFilter={difficultyFilter}
                      onSelectFilter={(filterId) => setDifficultyFilter(filterId)}
                    />

                    <div className="grid-responsive">
                      {filteredTopics.map((topic) => {
                        const isDone = userState.completedTopics.includes(topic.id);
                        return (
                          <div
                            key={topic.id}
                            className="glass-panel glass-panel-hover"
                            onClick={() => setSelectedTopicId(topic.id)}
                            style={{ padding: '24px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                              <span className="badge badge-indigo">{topic.difficultyLevel || topic.category}</span>
                              {isDone && <CheckCircle size={20} style={{ color: 'var(--accent-emerald)' }} />}
                            </div>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>
                              {topic.icon} {topic.title}
                            </h3>
                            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                              {topic.summary}
                            </p>
                            <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              Artikel Lesen <ArrowRight size={16} />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GAMES */}
            {activeTab === 'games' && (
              <div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '6px' }}>
                  {[
                    { id: 'sql', label: '🗄️ SQL Dungeon' },
                    { id: 'security', label: '🛡️ Cyber Defense Lab' },
                    { id: 'boss', label: '⚔️ Code Duel Boss Battle' },
                    { id: 'typing_speedrun', label: '⌨️ Code Speedrun WPM' },
                    { id: 'cli', label: '💻 Terminal CLI Lab' },
                    { id: 'regex', label: '🔍 RegEx Lab' },
                    { id: 'puzzle', label: '🧩 Code Bug Hunter' },
                    { id: 'logic', label: '⚡ Logikgatter Simulator' },
                    { id: 'sandbox', label: '🌐 Live Web Sandbox' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setActiveGameId(g.id)}
                      style={{
                        minHeight: '44px',
                        padding: '10px 20px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '700',
                        fontSize: '0.92rem',
                        background: activeGameId === g.id ? 'var(--accent-primary)' : 'var(--bg-card)',
                        color: activeGameId === g.id ? '#ffffff' : 'var(--text-main)',
                        border: activeGameId === g.id ? '2px solid var(--accent-primary)' : '2px solid var(--border-color)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>

                <Suspense fallback={<LabLoadingFallback />}>
                  {activeGameId === 'sql' && <SqlDungeon onCompleteGame={(_id, xp) => awardXP(xp, 'sql_master')} />}
                  {activeGameId === 'security' && <SecurityLab onCompleteGame={(_id, xp) => awardXP(xp, 'security_expert')} />}
                  {activeGameId === 'boss' && <BossBattleGame onCompleteGame={(_id, xp) => awardXP(xp, 'boss_slayer')} />}
                  {activeGameId === 'typing_speedrun' && <CodeTypingSpeedrun onCompleteGame={(_id, xp) => awardXP(xp, 'typing_god')} />}
                  {activeGameId === 'cli' && <CliTerminalLab onCompleteGame={(_id, xp) => awardXP(xp, 'cli_master')} />}
                  {activeGameId === 'regex' && <RegexLab onCompleteGame={(_id, xp) => awardXP(xp, 'regex_master')} />}
                  {activeGameId === 'puzzle' && <CodePuzzle onCompleteGame={(_id, xp) => awardXP(xp)} />}
                  {activeGameId === 'logic' && <LogicGatesGame onCompleteGame={(_id, xp) => awardXP(xp, 'logic_genius')} />}
                  {activeGameId === 'sandbox' && <WebSandbox onCompleteGame={(_id, xp) => awardXP(xp, 'web_builder')} />}
                </Suspense>
              </div>
            )}

            {/* LÜCKENTEXT */}
            {activeTab === 'lueckentext' && (
              <ClozeTester userState={userState} onCompleteCloze={(_id, xp) => awardXP(xp, 'cloze_wizard')} />
            )}

            {/* VIDEOS */}
            {activeTab === 'videos' && (
              <VideoHub onCompleteVideo={(_id, xp) => awardXP(xp)} />
            )}

            {/* PROJEKTE */}
            {activeTab === 'projekte' && (
              <ProjectViewer onCompleteProject={(_id, xp) => awardXP(xp)} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Pomodoro Focus Timer */}
      <PomodoroTimerWidget />

      {/* Footer with DSGVO Privacy & Impressum */}
      <DsgvoFooterModal />

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Centralized Modals Container */}
      <ModalContainer
        isRoleModalOpen={isRoleModalOpen}
        setIsRoleModalOpen={setIsRoleModalOpen}
        isBadgesModalOpen={isBadgesModalOpen}
        setIsBadgesModalOpen={setIsBadgesModalOpen}
        isGlossaryModalOpen={isGlossaryModalOpen}
        setIsGlossaryModalOpen={setIsGlossaryModalOpen}
        isCertificateModalOpen={isCertificateModalOpen}
        setIsCertificateModalOpen={setIsCertificateModalOpen}
        isFlashcardsModalOpen={isFlashcardsModalOpen}
        setIsFlashcardsModalOpen={setIsFlashcardsModalOpen}
        isBackupModalOpen={isBackupModalOpen}
        setIsBackupModalOpen={setIsBackupModalOpen}
        isVocabularyModalOpen={isVocabularyModalOpen}
        setIsVocabularyModalOpen={setIsVocabularyModalOpen}
        isDeploymentModalOpen={isDeploymentModalOpen}
        setIsDeploymentModalOpen={setIsDeploymentModalOpen}
        isCommandPaletteOpen={isCommandPaletteOpen}
        setIsCommandPaletteOpen={setIsCommandPaletteOpen}
        isAudioModalOpen={isAudioModalOpen}
        setIsAudioModalOpen={setIsAudioModalOpen}
        userState={userState}
        handleSelectRole={handleSelectRole}
        refreshStateFromStorage={refreshStateFromStorage}
        setActiveTab={setActiveTab}
      />

      {/* Einmalige Erste-Schritte-Tour, erst nachdem eine Rolle gewählt wurde */}
      {userState.role && !userState.hasSeenTour && !isRoleModalOpen && (
        <FirstVisitTourOverlay onComplete={completeTour} />
      )}
    </div>
  );
}
