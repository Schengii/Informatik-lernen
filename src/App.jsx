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
import ExamSimulator from './components/Content/ExamSimulator';
import SkillMatrixWidget from './components/Gamification/SkillMatrixWidget';
import DailyChallengeWidget from './components/Gamification/DailyChallengeWidget';
import SkillTreeWidget from './components/Gamification/SkillTreeWidget';
import ActivityHeatmapWidget from './components/Gamification/ActivityHeatmapWidget';
import PomodoroTimerWidget from './components/Navigation/PomodoroTimerWidget';
import ModalContainer from './components/Navigation/ModalContainer';

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

const LanguageAcademy = lazy(() => import('./components/Content/LanguageAcademy'));
const AiPromptLab = lazy(() => import('./components/Content/AiPromptLab'));
const ToolingSetupGuide = lazy(() => import('./components/Content/ToolingSetupGuide'));
const AppWorkshop = lazy(() => import('./components/Content/AppWorkshop'));
const KnowledgeQuizArena = lazy(() => import('./components/Content/KnowledgeQuizArena'));
const CareerRoadmap = lazy(() => import('./components/Content/CareerRoadmap'));
const BigOVisualizer = lazy(() => import('./components/Content/BigOVisualizer'));
const ArchitectureVisualizer = lazy(() => import('./components/Content/ArchitectureVisualizer'));
const DesignPatternsLab = lazy(() => import('./components/Content/DesignPatternsLab'));
const TddUnitTestLab = lazy(() => import('./components/Content/TddUnitTestLab'));
const WebComponentsHub = lazy(() => import('./components/Content/WebComponentsHub'));
const FisiLernfelderHub = lazy(() => import('./components/Content/FisiLernfelderHub'));
const AiBusinessMasterclass = lazy(() => import('./components/Content/AiBusinessMasterclass'));
const ItPodcastHub = lazy(() => import('./components/Content/ItPodcastHub'));

const DockerLab = lazy(() => import('./components/Content/DockerLab'));
const CloudDevOpsLab = lazy(() => import('./components/Content/CloudDevOpsLab'));
const RedBlueTeamLab = lazy(() => import('./components/Content/RedBlueTeamLab'));
const ApiBenchStudio = lazy(() => import('./components/Content/ApiBenchStudio'));

const KubernetesLab = lazy(() => import('./components/Content/KubernetesLab'));
const RagAiSimulator = lazy(() => import('./components/Content/RagAiSimulator'));
const WasmRustLab = lazy(() => import('./components/Content/WasmRustLab'));
const KafkaEventLab = lazy(() => import('./components/Content/KafkaEventLab'));

const OauthOidcLab = lazy(() => import('./components/Content/OauthOidcLab'));
const WebSocketsLab = lazy(() => import('./components/Content/WebSocketsLab'));
const PerformanceProfilingLab = lazy(() => import('./components/Content/PerformanceProfilingLab'));
const AnfaengerGuideHub = lazy(() => import('./components/Content/AnfaengerGuideHub'));
const SubnettingLab = lazy(() => import('./components/Content/SubnettingLab'));
const GitLab = lazy(() => import('./components/Content/GitLab'));
const AlgoPlaygroundLab = lazy(() => import('./components/Content/AlgoPlaygroundLab'));
const PythonWasmLab = lazy(() => import('./components/Content/PythonWasmLab'));
const PacketTracerLab = lazy(() => import('./components/Content/PacketTracerLab'));
const LeitnerFlashcardLab = lazy(() => import('./components/Content/LeitnerFlashcardLab'));
const MonacoStudioLab = lazy(() => import('./components/Content/MonacoStudioLab'));
const CloudDesignerLab = lazy(() => import('./components/Content/CloudDesignerLab'));
const ApiMockStudioLab = lazy(() => import('./components/Content/ApiMockStudioLab'));
const CtfChallengeLab = lazy(() => import('./components/Content/CtfChallengeLab'));
const CiCdPipelineLab = lazy(() => import('./components/Content/CiCdPipelineLab'));
const DockerComposeLab = lazy(() => import('./components/Content/DockerComposeLab'));
const SystemDesignLab = lazy(() => import('./components/Content/SystemDesignLab'));
const RegexMasterLab = lazy(() => import('./components/Content/RegexMasterLab'));
const WebSocketProtocolLab = lazy(() => import('./components/Content/WebSocketProtocolLab'));
const VectorSearchLab = lazy(() => import('./components/Content/VectorSearchLab'));
const BigOBenchmarkLab = lazy(() => import('./components/Content/BigOBenchmarkLab'));
const OauthPkceStudio = lazy(() => import('./components/Content/OauthPkceStudio'));
const WasmCompilerPlaygroundLab = lazy(() => import('./components/Content/WasmCompilerPlaygroundLab'));

// Neue Labs, Simulatoren & Kampagnen Hub
const DataStructuresLab = lazy(() => import('./components/Content/DataStructuresLab'));
const CiCdWorkflowLab = lazy(() => import('./components/Content/CiCdWorkflowLab'));
const LabsDashboard = lazy(() => import('./components/Content/LabsDashboard'));
const IhkOralExamSimulator = lazy(() => import('./components/Content/IhkOralExamSimulator'));
const SqlJoinVisualizerLab = lazy(() => import('./components/Content/SqlJoinVisualizerLab'));
const CampaignQuestHub = lazy(() => import('./components/Content/CampaignQuestHub'));
const GitBranchGraphLab = lazy(() => import('./components/Content/GitBranchGraphLab'));
const CpuArchitectureLab = lazy(() => import('./components/Content/CpuArchitectureLab'));
const SqlQueryOptimizerLab = lazy(() => import('./components/Content/SqlQueryOptimizerLab'));

// Next-Gen High-Value Labs & Generatoren
const CodeExecutionDebuggerLab = lazy(() => import('./components/Content/CodeExecutionDebuggerLab'));
const IhkProjectDocumentationGenerator = lazy(() => import('./components/Content/IhkProjectDocumentationGenerator'));
const CleanCodeReviewLab = lazy(() => import('./components/Content/CleanCodeReviewLab'));
const DnsHttpLifecycleLab = lazy(() => import('./components/Content/DnsHttpLifecycleLab'));
const SqlTransactionLab = lazy(() => import('./components/Content/SqlTransactionLab'));
const CiCdMatrixLinterLab = lazy(() => import('./components/Content/CiCdMatrixLinterLab'));
const PostgresExplainVisualizerLab = lazy(() => import('./components/Content/PostgresExplainVisualizerLab'));
const WebRtcSignalingLab = lazy(() => import('./components/Content/WebRtcSignalingLab'));
const GraphqlResolverLab = lazy(() => import('./components/Content/GraphqlResolverLab'));
const LinuxPermissionsLab = lazy(() => import('./components/Content/LinuxPermissionsLab'));
const CryptoKeygenLab = lazy(() => import('./components/Content/CryptoKeygenLab'));
const RedisCachingLab = lazy(() => import('./components/Content/RedisCachingLab'));
const CircuitBreakerLab = lazy(() => import('./components/Content/CircuitBreakerLab'));
const K8sCniOverlayLab = lazy(() => import('./components/Content/K8sCniOverlayLab'));
const JwksRotationLab = lazy(() => import('./components/Content/JwksRotationLab'));
const PostgresMvccLab = lazy(() => import('./components/Content/PostgresMvccLab'));
const Http3QuicLab = lazy(() => import('./components/Content/Http3QuicLab'));

// Brandneue Fach-Labs & PDF-Spickzettel Generator
const WisoKalkulationLab = lazy(() => import('./components/Content/WisoKalkulationLab'));
const Ieee754FloatingPointLab = lazy(() => import('./components/Content/Ieee754FloatingPointLab'));
const Ipv6RoutingLab = lazy(() => import('./components/Content/Ipv6RoutingLab'));
const OwaspExploitLab = lazy(() => import('./components/Content/OwaspExploitLab'));
const NeuralNetVisualizerLab = lazy(() => import('./components/Content/NeuralNetVisualizerLab'));
const IhkCheatSheetPdfGenerator = lazy(() => import('./components/Content/IhkCheatSheetPdfGenerator'));

// Next-Gen Multiplayer & Coding Studios
const P2pQuizDuellLab = lazy(() => import('./components/Content/P2pQuizDuellLab'));
const SqliteWasmStudioLab = lazy(() => import('./components/Content/SqliteWasmStudioLab'));
const LiveCodingChallengeStudio = lazy(() => import('./components/Content/LiveCodingChallengeStudio'));
const CustomChallengeCreatorLab = lazy(() => import('./components/Content/CustomChallengeCreatorLab'));
const GitMergeConflictLab = lazy(() => import('./components/Content/GitMergeConflictLab'));
const TcoRoiCalculatorLab = lazy(() => import('./components/Content/TcoRoiCalculatorLab'));
const RegexRailroadVisualizerLab = lazy(() => import('./components/Content/RegexRailroadVisualizerLab'));
const WebhookInspectorLab = lazy(() => import('./components/Content/WebhookInspectorLab'));
const VoiceQuizStudioLab = lazy(() => import('./components/Content/VoiceQuizStudioLab'));
const AgileScrumSimulatorLab = lazy(() => import('./components/Content/AgileScrumSimulatorLab'));
const GraphqlExplorerStudioLab = lazy(() => import('./components/Content/GraphqlExplorerStudioLab'));
const BleSensorSimulatorLab = lazy(() => import('./components/Content/BleSensorSimulatorLab'));

// v3.8.0 Flagship Simulatoren, Architecture & IHK Power Studios
const OsProcessSchedulerLab = lazy(() => import('./components/Content/OsProcessSchedulerLab'));
const PacketSnifferLab = lazy(() => import('./components/Content/PacketSnifferLab'));
const ErdDesignerLab = lazy(() => import('./components/Content/ErdDesignerLab'));
const TransformerAttentionLab = lazy(() => import('./components/Content/TransformerAttentionLab'));
const CloudArchitectureCanvasLab = lazy(() => import('./components/Content/CloudArchitectureCanvasLab'));
const IhkGradeCalculatorLab = lazy(() => import('./components/Content/IhkGradeCalculatorLab'));
const RackConfiguratorLab = lazy(() => import('./components/Content/RackConfiguratorLab'));
const ItsmSimulatorLab = lazy(() => import('./components/Content/ItsmSimulatorLab'));
const Sm2SpacedRepetitionLab = lazy(() => import('./components/Content/Sm2SpacedRepetitionLab'));
const PersonalNotebookLab = lazy(() => import('./components/Content/PersonalNotebookLab'));

// v3.9.0 Cryptography & WebAssembly
const ZkpCryptoVisualizerLab = lazy(() => import('./components/Content/ZkpCryptoVisualizerLab'));

// v3.10.0 Next-Gen OAuth PKCE, K8s Topology & WebRTC Mesh Studios
const OauthPkceStudioLab = lazy(() => import('./components/Content/OauthPkceStudioLab'));
const KubernetesClusterStudioLab = lazy(() => import('./components/Content/KubernetesClusterStudioLab'));
const WebRtcPeerStudioLab = lazy(() => import('./components/Content/WebRtcPeerStudioLab'));

// v3.11.0 Next-Gen Memory, Pool, Dunning & Service Mesh
const LinuxMemoryLab = lazy(() => import('./components/Content/LinuxMemoryLab'));
const PostgresPoolLab = lazy(() => import('./components/Content/PostgresPoolLab'));
const WisoDunningLab = lazy(() => import('./components/Content/WisoDunningLab'));
const ServiceMeshLab = lazy(() => import('./components/Content/ServiceMeshLab'));

// v3.12.0 Next-Gen Container, Contribution Margin & Token Exchange
const LinuxContainerLab = lazy(() => import('./components/Content/LinuxContainerLab'));
const WisoContributionMarginLab = lazy(() => import('./components/Content/WisoContributionMarginLab'));
const OauthTokenExchangeLab = lazy(() => import('./components/Content/OauthTokenExchangeLab'));

import { USER_ROLES } from './data/userProfiles';
import { TOPICS } from './data/topicsData';

import { BookOpen, Sparkles, ArrowRight, CheckCircle, Sprout, Compass } from 'lucide-react';

const LabLoadingFallback = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '16px' }}>
    <div style={{ width: '40px', height: '40px', border: '3px solid rgba(99, 102, 241, 0.2)', borderTop: '3px solid var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <span style={{ color: 'var(--text-muted)', fontSize: '0.92rem', fontWeight: '600' }}>Modul wird geladen...</span>
  </div>
);

export default function App() {
  const { 
    userState, handleSelectRole, awardXP, handleCompleteTopic, refreshStateFromStorage,
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

  const currentRole = USER_ROLES[userState.role] || USER_ROLES.anfaenger;

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
                        <Sparkles size={14} /> Aktuelles Level &amp; Zielgruppe: {currentRole.title}
                      </span>
                      <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '8px 0', color: 'var(--text-main)' }}>
                        Willkommen zurück, <span className="text-gradient">Developer</span>!
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
                        <Compass size={18} /> Story Kampagne
                      </button>

                      <button
                        className="btn btn-secondary"
                        onClick={() => setIsRoleModalOpen(true)}
                        style={{ minHeight: '48px', fontSize: '0.95rem' }}
                      >
                        Profil / Level
                      </button>

                      <button
                        className="btn btn-secondary"
                        onClick={() => setActiveTab('anfaenger_guide')}
                        style={{ minHeight: '48px', fontSize: '0.95rem', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' }}
                      >
                        <Sprout size={18} /> Einsteiger Kurs
                      </button>
                    </div>
                  </div>
                </div>

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

            {/* NEUE FACH-LABS */}
            {activeTab === 'wiso_kalkulation' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <WisoKalkulationLab />
              </Suspense>
            )}

            {activeTab === 'ieee754_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <Ieee754FloatingPointLab />
              </Suspense>
            )}

            {activeTab === 'ipv6_routing_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <Ipv6RoutingLab />
              </Suspense>
            )}

            {activeTab === 'owasp_exploit_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <OwaspExploitLab />
              </Suspense>
            )}

            {activeTab === 'neural_net_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <NeuralNetVisualizerLab />
              </Suspense>
            )}

            {activeTab === 'cheat_sheets' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <IhkCheatSheetPdfGenerator />
              </Suspense>
            )}

            {activeTab === 'p2p_duell' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <P2pQuizDuellLab />
              </Suspense>
            )}

            {activeTab === 'sqlite_studio' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <SqliteWasmStudioLab />
              </Suspense>
            )}

            {activeTab === 'coding_challenges' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <LiveCodingChallengeStudio />
              </Suspense>
            )}

            {activeTab === 'custom_challenges' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CustomChallengeCreatorLab />
              </Suspense>
            )}

            {activeTab === 'git_conflict_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <GitMergeConflictLab />
              </Suspense>
            )}

            {activeTab === 'tco_roi_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <TcoRoiCalculatorLab />
              </Suspense>
            )}

            {activeTab === 'regex_railroad' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <RegexRailroadVisualizerLab />
              </Suspense>
            )}

            {activeTab === 'webhook_inspector' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <WebhookInspectorLab />
              </Suspense>
            )}

            {activeTab === 'voice_quiz' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <VoiceQuizStudioLab />
              </Suspense>
            )}

            {activeTab === 'scrum_simulator' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <AgileScrumSimulatorLab />
              </Suspense>
            )}

            {activeTab === 'graphql_explorer' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <GraphqlExplorerStudioLab />
              </Suspense>
            )}

            {activeTab === 'ble_sensor' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <BleSensorSimulatorLab />
              </Suspense>
            )}

            {/* v3.8.0 FLAGSHIP LABS */}
            {activeTab === 'os_scheduler' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <OsProcessSchedulerLab />
              </Suspense>
            )}

            {activeTab === 'packet_sniffer' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <PacketSnifferLab />
              </Suspense>
            )}

            {activeTab === 'erd_designer' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <ErdDesignerLab />
              </Suspense>
            )}

            {activeTab === 'transformer_attention' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <TransformerAttentionLab />
              </Suspense>
            )}

            {activeTab === 'cloud_canvas' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CloudArchitectureCanvasLab />
              </Suspense>
            )}

            {activeTab === 'ihk_grade_calculator' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <IhkGradeCalculatorLab />
              </Suspense>
            )}

            {activeTab === 'rack_configurator' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <RackConfiguratorLab />
              </Suspense>
            )}

            {activeTab === 'itsm_simulator' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <ItsmSimulatorLab />
              </Suspense>
            )}

            {activeTab === 'sm2_spaced_repetition' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <Sm2SpacedRepetitionLab />
              </Suspense>
            )}

            {activeTab === 'personal_notebook' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <PersonalNotebookLab />
              </Suspense>
            )}

            {/* LABS & SIMULATOREN DASHBOARD */}
            {activeTab === 'labs' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <LabsDashboard
                  onSelectLab={(labId) => setActiveTab(labId)}
                  userState={userState}
                />
              </Suspense>
            )}

            {/* CAMPAIGN QUEST HUB */}
            {activeTab === 'campaign' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CampaignQuestHub
                  userState={userState}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onRewardXP={(xp) => awardXP(xp, 'campaign_step')}
                />
              </Suspense>
            )}

            {/* IHK ORAL EXAM */}
            {activeTab === 'oral_exam' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <IhkOralExamSimulator onRewardXP={(xp) => awardXP(xp, 'oral_exam_master')} />
              </Suspense>
            )}

            {/* SQL JOINS VISUALIZER */}
            {activeTab === 'sql_joins' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <SqlJoinVisualizerLab onRewardXP={(xp) => awardXP(xp, 'sql_join_master')} />
              </Suspense>
            )}

            {/* GIT BRANCH GRAPH LAB */}
            {activeTab === 'git_graph_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <GitBranchGraphLab onRewardXP={(xp) => awardXP(xp, 'git_graph_master')} />
              </Suspense>
            )}

            {/* VON-NEUMANN CPU ARCHITECTURE LAB */}
            {activeTab === 'cpu_architecture_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CpuArchitectureLab onRewardXP={(xp) => awardXP(xp, 'cpu_master')} />
              </Suspense>
            )}

            {/* SQL QUERY OPTIMIZER LAB */}
            {activeTab === 'sql_optimizer_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <SqlQueryOptimizerLab onRewardXP={(xp) => awardXP(xp, 'sql_optimizer_master')} />
              </Suspense>
            )}

            {/* DATA STRUCTURES */}
            {activeTab === 'datastructures' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <DataStructuresLab onRewardXP={(xp) => awardXP(xp, 'trees_graphs_master')} />
              </Suspense>
            )}

            {/* CI/CD WORKFLOW */}
            {activeTab === 'cicd_workflow' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CiCdWorkflowLab onRewardXP={(xp) => awardXP(xp, 'cicd_workflow_master')} />
              </Suspense>
            )}

            {/* ANFAENGER GUIDE */}
            {activeTab === 'anfaenger_guide' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <AnfaengerGuideHub />
              </Suspense>
            )}

            {/* SUBNETTING LAB */}
            {activeTab === 'subnetting' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <SubnettingLab onRewardXP={(xp) => awardXP(xp, 'subnetting_master')} />
              </Suspense>
            )}

            {/* GIT BRANCHING LAB */}
            {activeTab === 'git_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <GitLab onRewardXP={(xp) => awardXP(xp, 'git_master')} />
              </Suspense>
            )}

            {/* ALGORITHMS PLAYGROUND */}
            {activeTab === 'algo_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <AlgoPlaygroundLab onRewardXP={(xp) => awardXP(xp, 'algo_master')} />
              </Suspense>
            )}

            {/* PYTHON WASM LAB */}
            {activeTab === 'python_wasm' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <PythonWasmLab onRewardXP={(xp) => awardXP(xp, 'python_wasm_master')} />
              </Suspense>
            )}

            {/* PACKET TRACER LAB */}
            {activeTab === 'packet_tracer' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <PacketTracerLab onRewardXP={(xp) => awardXP(xp, 'packet_tracer_master')} />
              </Suspense>
            )}

            {/* LEITNER FLASHCARDS */}
            {activeTab === 'leitner' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <LeitnerFlashcardLab onRewardXP={(xp) => awardXP(xp, 'leitner_master')} />
              </Suspense>
            )}

            {/* MONACO STUDIO */}
            {activeTab === 'monaco_studio' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <MonacoStudioLab onRewardXP={(xp) => awardXP(xp, 'monaco_master')} />
              </Suspense>
            )}

            {/* CLOUD DESIGNER */}
            {activeTab === 'cloud_designer' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CloudDesignerLab onRewardXP={(xp) => awardXP(xp, 'cloud_designer_master')} />
              </Suspense>
            )}

            {/* API MOCK STUDIO */}
            {activeTab === 'api_mock_studio' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <ApiMockStudioLab onRewardXP={(xp) => awardXP(xp, 'api_mock_master')} />
              </Suspense>
            )}

            {/* CTF LAB */}
            {activeTab === 'ctf_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CtfChallengeLab onRewardXP={(xp) => awardXP(xp, 'ctf_master')} />
              </Suspense>
            )}

            {/* CI/CD PIPELINE */}
            {activeTab === 'cicd_pipeline' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CiCdPipelineLab onRewardXP={(xp) => awardXP(xp, 'cicd_master')} />
              </Suspense>
            )}

            {/* DOCKER COMPOSE */}
            {activeTab === 'docker_compose' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <DockerComposeLab onRewardXP={(xp) => awardXP(xp, 'docker_compose_master')} />
              </Suspense>
            )}

            {/* SYSTEM DESIGN */}
            {activeTab === 'system_design' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <SystemDesignLab onRewardXP={(xp) => awardXP(xp, 'system_design_master')} />
              </Suspense>
            )}

            {/* REGEX MASTER */}
            {activeTab === 'regex_master' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <RegexMasterLab onRewardXP={(xp) => awardXP(xp, 'regex_master')} />
              </Suspense>
            )}

            {/* WEBSOCKET PROTOCOL */}
            {activeTab === 'websocket_protocol' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <WebSocketProtocolLab onRewardXP={(xp) => awardXP(xp, 'websocket_protocol_master')} />
              </Suspense>
            )}

            {/* VECTOR SEARCH */}
            {activeTab === 'vector_search' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <VectorSearchLab onRewardXP={(xp) => awardXP(xp, 'vector_search_master')} />
              </Suspense>
            )}

            {/* BIG-O BENCHMARK */}
            {activeTab === 'bigo_benchmark' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <BigOBenchmarkLab onRewardXP={(xp) => awardXP(xp, 'bigo_benchmark_master')} />
              </Suspense>
            )}

            {/* OAUTH PKCE */}
            {activeTab === 'oauth_pkce_studio' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <OauthPkceStudio onRewardXP={(xp) => awardXP(xp, 'oauth_pkce_master')} />
              </Suspense>
            )}

            {/* WASM RUST */}
            {activeTab === 'wasm_rust_studio' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <WasmRustStudio onRewardXP={(xp) => awardXP(xp, 'wasm_rust_master')} />
              </Suspense>
            )}

            {/* ADVANCED SPECIAL LABS */}
            {activeTab === 'jwks_rotation_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <JwksRotationLab />
              </Suspense>
            )}

            {activeTab === 'postgres_mvcc_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <PostgresMvccLab />
              </Suspense>
            )}

            {activeTab === 'http3_quic_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <Http3QuicLab />
              </Suspense>
            )}

            {activeTab === 'redis_caching_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <RedisCachingLab />
              </Suspense>
            )}

            {activeTab === 'circuit_breaker_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CircuitBreakerLab />
              </Suspense>
            )}

            {activeTab === 'k8s_cni_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <K8sCniOverlayLab />
              </Suspense>
            )}

            {activeTab === 'graphql_resolver_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <GraphqlResolverLab />
              </Suspense>
            )}

            {activeTab === 'linux_permissions_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <LinuxPermissionsLab />
              </Suspense>
            )}

            {activeTab === 'crypto_keygen_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CryptoKeygenLab />
              </Suspense>
            )}

            {activeTab === 'cicd_matrix_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CiCdMatrixLinterLab />
              </Suspense>
            )}

            {activeTab === 'postgres_explain_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <PostgresExplainVisualizerLab />
              </Suspense>
            )}

            {activeTab === 'webrtc_signaling_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <WebRtcSignalingLab />
              </Suspense>
            )}

            {activeTab === 'code_debugger_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CodeExecutionDebuggerLab />
              </Suspense>
            )}

            {activeTab === 'clean_code_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CleanCodeReviewLab />
              </Suspense>
            )}

            {activeTab === 'dns_http_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <DnsHttpLifecycleLab />
              </Suspense>
            )}

            {activeTab === 'sql_transaction_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <SqlTransactionLab />
              </Suspense>
            )}

            {activeTab === 'ihk_doc_generator' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <IhkProjectDocumentationGenerator />
              </Suspense>
            )}

            {/* OAUTH & OIDC */}
            {(activeTab === 'oauth' || activeTab === 'oauth_oidc') && (
              <Suspense fallback={<LabLoadingFallback />}>
                <OauthOidcLab />
              </Suspense>
            )}

            {/* WEBSOCKETS */}
            {activeTab === 'websockets' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <WebSocketsLab />
              </Suspense>
            )}

            {/* PERFORMANCE */}
            {activeTab === 'perf_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <PerformanceProfilingLab />
              </Suspense>
            )}

            {/* KUBERNETES */}
            {activeTab === 'kubernetes' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <KubernetesLab />
              </Suspense>
            )}

            {/* RAG VECTOR AI */}
            {activeTab === 'rag_ai' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <RagAiSimulator />
              </Suspense>
            )}

            {/* WASM COMPILER */}
            {activeTab === 'wasm_compiler' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <WasmCompilerPlaygroundLab />
              </Suspense>
            )}

            {/* ZKP CRYPTO */}
            {activeTab === 'zkp_crypto' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <ZkpCryptoVisualizerLab />
              </Suspense>
            )}

            {/* OAUTH PKCE & OIDC STUDIO */}
            {(activeTab === 'oauth_pkce_studio' || activeTab === 'oauth_pkce') && (
              <Suspense fallback={<LabLoadingFallback />}>
                <OauthPkceStudioLab />
              </Suspense>
            )}

            {/* KUBERNETES CLUSTER STUDIO */}
            {(activeTab === 'k8s_cluster_studio' || activeTab === 'k8s_cluster') && (
              <Suspense fallback={<LabLoadingFallback />}>
                <KubernetesClusterStudioLab />
              </Suspense>
            )}

            {/* WEBRTC PEER STUDIO */}
            {(activeTab === 'webrtc_peer_studio' || activeTab === 'webrtc_peer') && (
              <Suspense fallback={<LabLoadingFallback />}>
                <WebRtcPeerStudioLab />
              </Suspense>
            )}

            {/* LINUX MEMORY & PAGE FAULT */}
            {activeTab === 'linux_memory_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <LinuxMemoryLab onRewardXP={(xp) => awardXP(xp, 'linux_memory_master')} />
              </Suspense>
            )}

            {/* POSTGRES CONNECTION POOL & ISOLATION */}
            {activeTab === 'postgres_pool_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <PostgresPoolLab onRewardXP={(xp) => awardXP(xp, 'postgres_pool_master')} />
              </Suspense>
            )}

            {/* IHK WISO DUNNING & SKONTO */}
            {activeTab === 'wiso_dunning_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <WisoDunningLab onRewardXP={(xp) => awardXP(xp, 'wiso_dunning_master')} />
              </Suspense>
            )}

            {/* SERVICE MESH MTLS & ENVOY */}
            {activeTab === 'service_mesh_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <ServiceMeshLab onRewardXP={(xp) => awardXP(xp, 'service_mesh_master')} />
              </Suspense>
            )}

            {/* LINUX CONTAINERS & CGROUPS */}
            {activeTab === 'linux_container_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <LinuxContainerLab onRewardXP={(xp) => awardXP(xp, 'linux_container_master')} />
              </Suspense>
            )}

            {/* IHK WISO DECKUNGSBEITRAG & BEP */}
            {activeTab === 'wiso_contribution_margin' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <WisoContributionMarginLab onRewardXP={(xp) => awardXP(xp, 'wiso_contribution_margin_master')} />
              </Suspense>
            )}

            {/* OAUTH TOKEN EXCHANGE RFC 8693 */}
            {activeTab === 'oauth_token_exchange_lab' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <OauthTokenExchangeLab onRewardXP={(xp) => awardXP(xp, 'oauth_token_exchange_master')} />
              </Suspense>
            )}

            {/* KAFKA */}
            {activeTab === 'kafka' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <KafkaEventLab />
              </Suspense>
            )}

            {/* DOCKER */}
            {activeTab === 'docker' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <DockerLab />
              </Suspense>
            )}

            {/* CLOUD DEVOPS */}
            {activeTab === 'cloud_devops' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CloudDevOpsLab />
              </Suspense>
            )}

            {/* RED / BLUE TEAM */}
            {activeTab === 'security_lab_v2' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <RedBlueTeamLab />
              </Suspense>
            )}

            {/* API BENCH */}
            {activeTab === 'api_studio' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <ApiBenchStudio />
              </Suspense>
            )}

            {/* AI BUSINESS */}
            {activeTab === 'ai_business' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <AiBusinessMasterclass />
              </Suspense>
            )}

            {/* PODCAST */}
            {activeTab === 'podcast' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <ItPodcastHub />
              </Suspense>
            )}

            {/* IHK LERNFELDER */}
            {activeTab === 'lernfelder' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <FisiLernfelderHub />
              </Suspense>
            )}

            {/* WEB COMPONENTS */}
            {activeTab === 'web_components' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <WebComponentsHub />
              </Suspense>
            )}

            {/* TDD */}
            {activeTab === 'tdd' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <TddUnitTestLab onRewardXP={(xp) => awardXP(xp, 'tdd_master')} />
              </Suspense>
            )}

            {/* ARCHITECTURE */}
            {activeTab === 'architecture' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <ArchitectureVisualizer />
              </Suspense>
            )}

            {/* DESIGN PATTERNS */}
            {activeTab === 'design_patterns' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <DesignPatternsLab />
              </Suspense>
            )}

            {/* ROADMAPS */}
            {activeTab === 'roadmaps' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <CareerRoadmap userState={userState} />
              </Suspense>
            )}

            {/* BIG-O */}
            {activeTab === 'big_o' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <BigOVisualizer />
              </Suspense>
            )}

            {/* QUIZ ARENA */}
            {activeTab === 'quiz_arena' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <KnowledgeQuizArena onRewardXP={(xp) => awardXP(xp, 'quiz_master')} />
              </Suspense>
            )}

            {/* LANGUAGES */}
            {activeTab === 'languages' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <LanguageAcademy />
              </Suspense>
            )}

            {/* AI PROMPT */}
            {activeTab === 'ai' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <AiPromptLab />
              </Suspense>
            )}

            {/* TOOLING */}
            {activeTab === 'tooling' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <ToolingSetupGuide />
              </Suspense>
            )}

            {/* APP WORKSHOP */}
            {activeTab === 'app_workshop' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <AppWorkshop onCompleteWorkshop={(xp) => awardXP(xp, 'app_builder')} />
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

            {/* IHK EXAM */}
            {activeTab === 'exam' && (
              <Suspense fallback={<LabLoadingFallback />}>
                <ExamSimulator onCompleteExam={(_score, xp) => awardXP(xp, 'exam_passed')} />
              </Suspense>
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
    </div>
  );
}
