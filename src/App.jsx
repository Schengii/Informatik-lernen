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
const SkillMatrixWidget = lazy(() => import('./components/Gamification/SkillMatrixWidget'));
import DailyChallengeWidget from './components/Gamification/DailyChallengeWidget';
import SkillTreeWidget from './components/Gamification/SkillTreeWidget';
import ActivityHeatmapWidget from './components/Gamification/ActivityHeatmapWidget';
import PomodoroTimerWidget from './components/Navigation/PomodoroTimerWidget';
import ModalContainer from './components/Navigation/ModalContainer';
import ErrorBoundary from './components/ErrorBoundary';

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

// v3.13.0 Next-Gen eBPF, Postgres Flamegraph, ABC/XYZ & WireGuard ZTNA
const EbpfXdpLab = lazy(() => import('./components/Content/EbpfXdpLab'));
const PostgresFlamegraphLab = lazy(() => import('./components/Content/PostgresFlamegraphLab'));
const WisoAbcXyzLab = lazy(() => import('./components/Content/WisoAbcXyzLab'));
const WireguardZtnaLab = lazy(() => import('./components/Content/WireguardZtnaLab'));

// v3.14.0 Next-Gen PromQL, Event-Sourcing, Loan & SFU
const PromqlAlertLab = lazy(() => import('./components/Content/PromqlAlertLab'));
const EventSourcingLab = lazy(() => import('./components/Content/EventSourcingLab'));
const WisoLoanCollateralLab = lazy(() => import('./components/Content/WisoLoanCollateralLab'));
const WebrtcSfuLab = lazy(() => import('./components/Content/WebrtcSfuLab'));

// v3.15.0 Next-Gen BPFtrace, Postgres WAL, Andler & OpenTelemetry
const BpftraceLab = lazy(() => import('./components/Content/BpftraceLab'));
const PostgresWalLab = lazy(() => import('./components/Content/PostgresWalLab'));
const WisoAndlerLab = lazy(() => import('./components/Content/WisoAndlerLab'));
const OpentelemetryTracingLab = lazy(() => import('./components/Content/OpentelemetryTracingLab'));

// v3.16.0 Next-Gen VXLAN, Partitioning, Interest & Kafka Rebalance
const LinuxBridgeVxlanLab = lazy(() => import('./components/Content/LinuxBridgeVxlanLab'));
const PostgresPartitioningLab = lazy(() => import('./components/Content/PostgresPartitioningLab'));
const WisoInterestCalculationsLab = lazy(() => import('./components/Content/WisoInterestCalculationsLab'));
const KafkaRebalanceLab = lazy(() => import('./components/Content/KafkaRebalanceLab'));

// v3.17.0 Next-Gen BGP Anycast, Postgres Fulltext, NPV & gRPC Protobuf
const BgpAnycastLab = lazy(() => import('./components/Content/BgpAnycastLab'));
const TlsHandshakeLab = lazy(() => import('./components/Content/TlsHandshakeLab'));
const JwtAttackLab = lazy(() => import('./components/Content/JwtAttackLab'));
const CorsPitfallsLab = lazy(() => import('./components/Content/CorsPitfallsLab'));
const PostgresFulltextLab = lazy(() => import('./components/Content/PostgresFulltextLab'));
const WisoCapitalValueLab = lazy(() => import('./components/Content/WisoCapitalValueLab'));
const GrpcProtobufLab = lazy(() => import('./components/Content/GrpcProtobufLab'));

// v3.18.0 IHK Power Labs: NWA, RAID, VLSM & Projektantrag
const NwaScoringLab = lazy(() => import('./components/Content/NwaScoringLab'));
const RaidCalculatorLab = lazy(() => import('./components/Content/RaidCalculatorLab'));
const VlsmSubnetLab = lazy(() => import('./components/Content/VlsmSubnetLab'));
const IhkProjectProposalLab = lazy(() => import('./components/Content/IhkProjectProposalLab'));
// v3.30.0 IHK CPM, UML & IaC Studios
const CpmNetworkLab = lazy(() => import('./components/Content/CpmNetworkLab'));
const UmlDiagramLab = lazy(() => import('./components/Content/UmlDiagramLab'));
const TerraformLab = lazy(() => import('./components/Content/TerraformLab'));
// v3.31.0 IHK Audio Fachgespräch, Ansible & Web Worker
const IhkOralDefenseStudioLab = lazy(() => import('./components/Content/IhkOralDefenseStudioLab'));
const AnsiblePlaybookLab = lazy(() => import('./components/Content/AnsiblePlaybookLab'));
const ComputationWorkerLab = lazy(() => import('./components/Content/ComputationWorkerLab'));
// v3.32.0 IHK Präsentations-Timer & GitHub Actions CI/CD
const IhkPresentationTimerLab = lazy(() => import('./components/Content/IhkPresentationTimerLab'));
const GithubActionsWorkflowLab = lazy(() => import('./components/Content/GithubActionsWorkflowLab'));
// v3.33.0 IHK Projekt-Gantt & WebAssembly SIMD Studio
const IhkProjectGanttLab = lazy(() => import('./components/Content/IhkProjectGanttLab'));
const WasmSimdStudioLab = lazy(() => import('./components/Content/WasmSimdStudioLab'));
// v3.34.0 IHK Wirtschaftlichkeit, WebAuthn Passkeys & Systemd Cgroups
const IhkWirtschaftlichkeitLab = lazy(() => import('./components/Content/IhkWirtschaftlichkeitLab'));
const WebAuthnPasskeyLab = lazy(() => import('./components/Content/WebAuthnPasskeyLab'));
const SystemdServiceLab = lazy(() => import('./components/Content/SystemdServiceLab'));
// v3.35.0 TLS 1.3 Replay, IHK Risikoanalyse, eBPF Cilium & Postgres Index Types
const TlsReplayLab = lazy(() => import('./components/Content/TlsReplayLab'));
const IhkRiskAnalysisLab = lazy(() => import('./components/Content/IhkRiskAnalysisLab'));
const EbpfCiliumLab = lazy(() => import('./components/Content/EbpfCiliumLab'));
const PostgresIndexTypesLab = lazy(() => import('./components/Content/PostgresIndexTypesLab'));
// v3.36.0 DNSSEC, IHK Burndown, Linux Btrfs CoW & OpenAPI Contract
const DnssecValidationLab = lazy(() => import('./components/Content/DnssecValidationLab'));
const IhkAgileBurndownLab = lazy(() => import('./components/Content/IhkAgileBurndownLab'));
const LinuxCowSnapshotLab = lazy(() => import('./components/Content/LinuxCowSnapshotLab'));
const OpenApiContractLab = lazy(() => import('./components/Content/OpenApiContractLab'));
import DashboardQuickAccessGrid from './components/Content/DashboardQuickAccessGrid';

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
    theme, setTheme, fontSize, setFontSize,
    isDyslexic, setIsDyslexic, isColorblind, setIsColorblind,
    isHighContrast, setIsHighContrast,
    isReducedMotion, setIsReducedMotion,
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

    if (isReducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [theme, fontSize, isDyslexic, isColorblind, isHighContrast, isReducedMotion]);

  // Daten-getriebene Lab-Routing-Tabelle: bildet activeTab (bzw. mehrere
  // Alias-IDs desselben Labs) auf genau EIN gerendertes Lab-Element ab.
  // Ersetzt ~150 vormals einzeln geschriebene
  //   {activeTab === 'x' && (<Suspense ...><Component .../></Suspense>)}
  // Blöcke durch eine einzige Stelle, an der neue Labs ergänzt werden -
  // damit sind Copy-Paste-Fehler wie vertauschte Props/Datenfelder
  // strukturell ausgeschlossen. Komplexere Tabs (Dashboard, Wissen, Games,
  // Lückentext, Videos, Projekte) bleiben bewusst als eigene JSX-Blöcke
  // weiter unten erhalten, da sie mehr als ein einzelnes Lab rendern.
  const activeLabElement = (() => {
    switch (true) {
      case activeTab === 'wiso_kalkulation':
        return <WisoKalkulationLab />;
      case activeTab === 'ieee754_lab':
        return <Ieee754FloatingPointLab />;
      case activeTab === 'ipv6_routing_lab':
        return <Ipv6RoutingLab />;
      case activeTab === 'owasp_exploit_lab':
        return <OwaspExploitLab />;
      case activeTab === 'neural_net_lab':
        return <NeuralNetVisualizerLab />;
      case activeTab === 'cheat_sheets':
        return <IhkCheatSheetPdfGenerator />;
      case activeTab === 'p2p_duell':
        return <P2pQuizDuellLab />;
      case activeTab === 'sqlite_studio':
        return <SqliteWasmStudioLab />;
      case activeTab === 'coding_challenges':
        return <LiveCodingChallengeStudio />;
      case activeTab === 'custom_challenges':
        return <CustomChallengeCreatorLab />;
      case activeTab === 'git_conflict_lab':
        return <GitMergeConflictLab />;
      case activeTab === 'tco_roi_lab':
        return <TcoRoiCalculatorLab />;
      case activeTab === 'regex_railroad':
        return <RegexRailroadVisualizerLab />;
      case activeTab === 'webhook_inspector':
        return <WebhookInspectorLab />;
      case activeTab === 'voice_quiz':
        return <VoiceQuizStudioLab />;
      case activeTab === 'scrum_simulator':
        return <AgileScrumSimulatorLab />;
      case activeTab === 'graphql_explorer':
        return <GraphqlExplorerStudioLab />;
      case activeTab === 'ble_sensor':
        return <BleSensorSimulatorLab />;
      case activeTab === 'os_scheduler':
        return <OsProcessSchedulerLab />;
      case activeTab === 'packet_sniffer':
        return <PacketSnifferLab />;
      case activeTab === 'erd_designer':
        return <ErdDesignerLab />;
      case activeTab === 'transformer_attention':
        return <TransformerAttentionLab />;
      case activeTab === 'cloud_canvas':
        return <CloudArchitectureCanvasLab />;
      case activeTab === 'ihk_grade_calculator':
        return <IhkGradeCalculatorLab />;
      case activeTab === 'rack_configurator':
        return <RackConfiguratorLab />;
      case activeTab === 'itsm_simulator':
        return <ItsmSimulatorLab />;
      case activeTab === 'sm2_spaced_repetition':
        return <Sm2SpacedRepetitionLab />;
      case activeTab === 'personal_notebook':
        return <PersonalNotebookLab />;
      case activeTab === 'labs':
        return (
          <LabsDashboard
            onSelectLab={(labId) => setActiveTab(labId)}
            userState={userState}
          />
        );
      case activeTab === 'campaign':
        return (
          <CampaignQuestHub
            userState={userState}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onRewardXP={(xp) => awardXP(xp, 'campaign_step')}
          />
        );
      case activeTab === 'oral_exam':
        return <IhkOralExamSimulator onRewardXP={(xp) => awardXP(xp, 'oral_exam_master')} />;
      case activeTab === 'sql_joins':
        return <SqlJoinVisualizerLab onRewardXP={(xp) => awardXP(xp, 'sql_join_master')} />;
      case activeTab === 'git_graph_lab':
        return <GitBranchGraphLab onRewardXP={(xp) => awardXP(xp, 'git_graph_master')} />;
      case activeTab === 'cpu_architecture_lab':
        return <CpuArchitectureLab onRewardXP={(xp) => awardXP(xp, 'cpu_master')} />;
      case activeTab === 'sql_optimizer_lab':
        return <SqlQueryOptimizerLab onRewardXP={(xp) => awardXP(xp, 'sql_optimizer_master')} />;
      case activeTab === 'datastructures':
        return <DataStructuresLab onRewardXP={(xp) => awardXP(xp, 'trees_graphs_master')} />;
      case activeTab === 'cicd_workflow':
        return <CiCdWorkflowLab onRewardXP={(xp) => awardXP(xp, 'cicd_workflow_master')} />;
      case activeTab === 'anfaenger_guide':
        return <AnfaengerGuideHub />;
      case activeTab === 'subnetting':
        return <SubnettingLab onRewardXP={(xp) => awardXP(xp, 'subnetting_master')} />;
      case activeTab === 'git_lab':
        return <GitLab onRewardXP={(xp) => awardXP(xp, 'git_master')} />;
      case activeTab === 'algo_lab':
        return <AlgoPlaygroundLab onRewardXP={(xp) => awardXP(xp, 'algo_master')} />;
      case activeTab === 'python_wasm':
        return <PythonWasmLab onRewardXP={(xp) => awardXP(xp, 'python_wasm_master')} />;
      case activeTab === 'packet_tracer':
        return <PacketTracerLab onRewardXP={(xp) => awardXP(xp, 'packet_tracer_master')} />;
      case activeTab === 'leitner':
        return <LeitnerFlashcardLab onRewardXP={(xp) => awardXP(xp, 'leitner_master')} />;
      case activeTab === 'monaco_studio':
        return <MonacoStudioLab onRewardXP={(xp) => awardXP(xp, 'monaco_master')} />;
      case activeTab === 'cloud_designer':
        return <CloudDesignerLab onRewardXP={(xp) => awardXP(xp, 'cloud_designer_master')} />;
      case activeTab === 'api_mock_studio':
        return <ApiMockStudioLab onRewardXP={(xp) => awardXP(xp, 'api_mock_master')} />;
      case activeTab === 'ctf_lab':
        return <CtfChallengeLab onRewardXP={(xp) => awardXP(xp, 'ctf_master')} />;
      case activeTab === 'cicd_pipeline':
        return <CiCdPipelineLab onRewardXP={(xp) => awardXP(xp, 'cicd_master')} />;
      case activeTab === 'docker_compose':
        return <DockerComposeLab onRewardXP={(xp) => awardXP(xp, 'docker_compose_master')} />;
      case activeTab === 'system_design':
        return <SystemDesignLab onRewardXP={(xp) => awardXP(xp, 'system_design_master')} />;
      case activeTab === 'regex_master':
        return <RegexMasterLab onRewardXP={(xp) => awardXP(xp, 'regex_master')} />;
      case activeTab === 'websocket_protocol':
        return <WebSocketProtocolLab onRewardXP={(xp) => awardXP(xp, 'websocket_protocol_master')} />;
      case activeTab === 'vector_search':
        return <VectorSearchLab onRewardXP={(xp) => awardXP(xp, 'vector_search_master')} />;
      case activeTab === 'bigo_benchmark':
        return <BigOBenchmarkLab onRewardXP={(xp) => awardXP(xp, 'bigo_benchmark_master')} />;
      case activeTab === 'wasm_rust_studio':
        return <WasmRustLab onRewardXP={(xp) => awardXP(xp, 'wasm_rust_master')} />;
      case activeTab === 'jwks_rotation_lab':
        return <JwksRotationLab />;
      case activeTab === 'postgres_mvcc_lab':
        return <PostgresMvccLab />;
      case activeTab === 'http3_quic_lab':
        return <Http3QuicLab />;
      case activeTab === 'redis_caching_lab':
        return <RedisCachingLab />;
      case activeTab === 'circuit_breaker_lab':
        return <CircuitBreakerLab />;
      case activeTab === 'k8s_cni_lab':
        return <K8sCniOverlayLab />;
      case activeTab === 'graphql_resolver_lab':
        return <GraphqlResolverLab />;
      case activeTab === 'linux_permissions_lab':
        return <LinuxPermissionsLab />;
      case activeTab === 'crypto_keygen_lab':
        return <CryptoKeygenLab />;
      case activeTab === 'cicd_matrix_lab':
        return <CiCdMatrixLinterLab />;
      case activeTab === 'postgres_explain_lab':
        return <PostgresExplainVisualizerLab />;
      case activeTab === 'webrtc_signaling_lab':
        return <WebRtcSignalingLab />;
      case activeTab === 'code_debugger_lab':
        return <CodeExecutionDebuggerLab />;
      case activeTab === 'clean_code_lab':
        return <CleanCodeReviewLab />;
      case activeTab === 'dns_http_lab':
        return <DnsHttpLifecycleLab />;
      case activeTab === 'sql_transaction_lab':
        return <SqlTransactionLab />;
      case activeTab === 'ihk_doc_generator':
        return <IhkProjectDocumentationGenerator />;
      case activeTab === 'oauth' || activeTab === 'oauth_oidc':
        return <OauthOidcLab />;
      case activeTab === 'websockets':
        return <WebSocketsLab />;
      case activeTab === 'perf_lab':
        return <PerformanceProfilingLab />;
      case activeTab === 'kubernetes':
        return <KubernetesLab />;
      case activeTab === 'rag_ai':
        return <RagAiSimulator />;
      case activeTab === 'wasm_compiler':
        return <WasmCompilerPlaygroundLab />;
      case activeTab === 'zkp_crypto':
        return <ZkpCryptoVisualizerLab />;
      case activeTab === 'oauth_pkce_studio' || activeTab === 'oauth_pkce':
        return <OauthPkceStudioLab />;
      case activeTab === 'k8s_cluster_studio' || activeTab === 'k8s_cluster':
        return <KubernetesClusterStudioLab />;
      case activeTab === 'webrtc_peer_studio' || activeTab === 'webrtc_peer':
        return <WebRtcPeerStudioLab />;
      case activeTab === 'linux_memory_lab':
        return <LinuxMemoryLab onRewardXP={(xp) => awardXP(xp, 'linux_memory_master')} />;
      case activeTab === 'postgres_pool_lab':
        return <PostgresPoolLab onRewardXP={(xp) => awardXP(xp, 'postgres_pool_master')} />;
      case activeTab === 'wiso_dunning_lab':
        return <WisoDunningLab onRewardXP={(xp) => awardXP(xp, 'wiso_dunning_master')} />;
      case activeTab === 'service_mesh_lab':
        return <ServiceMeshLab onRewardXP={(xp) => awardXP(xp, 'service_mesh_master')} />;
      case activeTab === 'linux_container_lab':
        return <LinuxContainerLab onRewardXP={(xp) => awardXP(xp, 'linux_container_master')} />;
      case activeTab === 'wiso_contribution_margin':
        return <WisoContributionMarginLab onRewardXP={(xp) => awardXP(xp, 'wiso_contribution_margin_master')} />;
      case activeTab === 'oauth_token_exchange_lab':
        return <OauthTokenExchangeLab onRewardXP={(xp) => awardXP(xp, 'oauth_token_exchange_master')} />;
      case activeTab === 'ebpf_xdp_lab':
        return <EbpfXdpLab onRewardXP={(xp) => awardXP(xp, 'ebpf_xdp_master')} />;
      case activeTab === 'postgres_flamegraph_lab':
        return <PostgresFlamegraphLab onRewardXP={(xp) => awardXP(xp, 'postgres_flamegraph_master')} />;
      case activeTab === 'wiso_abc_xyz':
        return <WisoAbcXyzLab onRewardXP={(xp) => awardXP(xp, 'wiso_abc_xyz_master')} />;
      case activeTab === 'wireguard_ztna_lab':
        return <WireguardZtnaLab onRewardXP={(xp) => awardXP(xp, 'wireguard_ztna_master')} />;
      case activeTab === 'promql_alert_lab':
        return <PromqlAlertLab onRewardXP={(xp) => awardXP(xp, 'promql_alert_master')} />;
      case activeTab === 'event_sourcing_lab':
        return <EventSourcingLab onRewardXP={(xp) => awardXP(xp, 'event_sourcing_master')} />;
      case activeTab === 'wiso_loan_collateral':
        return <WisoLoanCollateralLab onRewardXP={(xp) => awardXP(xp, 'wiso_loan_collateral_master')} />;
      case activeTab === 'webrtc_sfu_lab':
        return <WebrtcSfuLab onRewardXP={(xp) => awardXP(xp, 'webrtc_sfu_master')} />;
      case activeTab === 'bpftrace_lab':
        return <BpftraceLab onRewardXP={(xp) => awardXP(xp, 'bpftrace_master')} />;
      case activeTab === 'postgres_wal_lab':
        return <PostgresWalLab onRewardXP={(xp) => awardXP(xp, 'postgres_wal_master')} />;
      case activeTab === 'wiso_andler':
        return <WisoAndlerLab onRewardXP={(xp) => awardXP(xp, 'wiso_andler_master')} />;
      case activeTab === 'opentelemetry_tracing_lab':
        return <OpentelemetryTracingLab onRewardXP={(xp) => awardXP(xp, 'opentelemetry_tracing_master')} />;
      case activeTab === 'linux_bridge_vxlan_lab':
        return <LinuxBridgeVxlanLab onRewardXP={(xp) => awardXP(xp, 'linux_bridge_vxlan_master')} />;
      case activeTab === 'postgres_partitioning_lab':
        return <PostgresPartitioningLab onRewardXP={(xp) => awardXP(xp, 'postgres_partitioning_master')} />;
      case activeTab === 'wiso_interest':
        return <WisoInterestCalculationsLab onRewardXP={(xp) => awardXP(xp, 'wiso_interest_master')} />;
      case activeTab === 'kafka_rebalance_lab':
        return <KafkaRebalanceLab onRewardXP={(xp) => awardXP(xp, 'kafka_rebalance_master')} />;
      case activeTab === 'bgp_anycast_lab':
        return <BgpAnycastLab onRewardXP={(xp) => awardXP(xp, 'bgp_anycast_master')} />;
      case activeTab === 'tls_handshake_lab':
        return <TlsHandshakeLab onRewardXP={(xp) => awardXP(xp, 'tls_handshake_master')} />;
      case activeTab === 'jwt_attack_lab':
        return <JwtAttackLab onRewardXP={(xp) => awardXP(xp, 'jwt_attack_defender')} />;
      case activeTab === 'cors_pitfalls_lab':
        return <CorsPitfallsLab onRewardXP={(xp) => awardXP(xp, 'cors_defender')} />;
      case activeTab === 'postgres_fulltext_lab':
        return <PostgresFulltextLab onRewardXP={(xp) => awardXP(xp, 'postgres_fulltext_master')} />;
      case activeTab === 'wiso_capital_value':
        return <WisoCapitalValueLab onRewardXP={(xp) => awardXP(xp, 'wiso_capital_value_master')} />;
      case activeTab === 'grpc_protobuf_lab':
        return <GrpcProtobufLab onRewardXP={(xp) => awardXP(xp, 'grpc_protobuf_master')} />;
      case activeTab === 'nwa_scoring_lab' || activeTab === 'nwa_scoring':
        return <NwaScoringLab onRewardXP={(xp) => awardXP(xp, 'nwa_master')} />;
      case activeTab === 'raid_calculator_lab' || activeTab === 'raid_calculator':
        return <RaidCalculatorLab onRewardXP={(xp) => awardXP(xp, 'raid_master')} />;
      case activeTab === 'vlsm_subnet_lab' || activeTab === 'vlsm_subnet':
        return <VlsmSubnetLab onRewardXP={(xp) => awardXP(xp, 'vlsm_master')} />;
      case activeTab === 'ihk_project_proposal_lab' || activeTab === 'ihk_project_proposal':
        return <IhkProjectProposalLab onRewardXP={(xp) => awardXP(xp, 'ihk_proposal_master')} />;
      case activeTab === 'cpm_network_lab' || activeTab === 'cpm_network':
        return <CpmNetworkLab onRewardXP={(xp) => awardXP(xp, 'cpm_master')} />;
      case activeTab === 'uml_diagram_lab' || activeTab === 'uml_diagram':
        return <UmlDiagramLab onRewardXP={(xp) => awardXP(xp, 'uml_master')} />;
      case activeTab === 'terraform_lab' || activeTab === 'terraform':
        return <TerraformLab onRewardXP={(xp) => awardXP(xp, 'terraform_master')} />;
      case activeTab === 'oral_defense_studio' || activeTab === 'oral_defense':
        return <IhkOralDefenseStudioLab onRewardXP={(xp) => awardXP(xp, 'oral_defense_master')} />;
      case activeTab === 'ansible_playbook_lab' || activeTab === 'ansible_playbook':
        return <AnsiblePlaybookLab onRewardXP={(xp) => awardXP(xp, 'ansible_master')} />;
      case activeTab === 'computation_worker_lab' || activeTab === 'computation_worker':
        return <ComputationWorkerLab onRewardXP={(xp) => awardXP(xp, 'worker_master')} />;
      case activeTab === 'presentation_timer_lab' || activeTab === 'presentation_timer' || activeTab === 'ihk_presentation_timer':
        return <IhkPresentationTimerLab onRewardXP={(xp) => awardXP(xp, 'presentation_master')} />;
      case activeTab === 'github_actions_lab' || activeTab === 'github_actions' || activeTab === 'github_actions_workflow_lab':
        return <GithubActionsWorkflowLab onRewardXP={(xp) => awardXP(xp, 'github_actions_master')} />;
      case activeTab === 'ihk_project_gantt_lab' || activeTab === 'ihk_project_gantt' || activeTab === 'ihk_gantt':
        return <IhkProjectGanttLab onRewardXP={(xp) => awardXP(xp, 'ihk_gantt_master')} />;
      case activeTab === 'wasm_simd_studio_lab' || activeTab === 'wasm_simd_studio' || activeTab === 'wasm_simd':
        return <WasmSimdStudioLab onRewardXP={(xp) => awardXP(xp, 'wasm_simd_master')} />;
      case activeTab === 'ihk_wirtschaftlichkeit_lab' || activeTab === 'ihk_wirtschaftlichkeit' || activeTab === 'amortisation_lab':
        return <IhkWirtschaftlichkeitLab onRewardXP={(xp) => awardXP(xp, 'ihk_wirtschaftlichkeit_master')} />;
      case activeTab === 'webauthn_passkey_lab' || activeTab === 'webauthn_passkey' || activeTab === 'passkey_lab':
        return <WebAuthnPasskeyLab onRewardXP={(xp) => awardXP(xp, 'passkey_master')} />;
      case activeTab === 'systemd_service_lab' || activeTab === 'systemd_service' || activeTab === 'systemd_lab':
        return <SystemdServiceLab onRewardXP={(xp) => awardXP(xp, 'systemd_master')} />;
      case activeTab === 'tls_replay_lab' || activeTab === 'tls_replay' || activeTab === '0rtt_replay_lab':
        return <TlsReplayLab onRewardXP={(xp) => awardXP(xp, 'tls_replay_master')} />;
      case activeTab === 'ihk_risk_analysis_lab' || activeTab === 'ihk_risk_analysis' || activeTab === 'risikoanalyse_lab':
        return <IhkRiskAnalysisLab onRewardXP={(xp) => awardXP(xp, 'ihk_risk_master')} />;
      case activeTab === 'ebpf_cilium_lab' || activeTab === 'ebpf_cilium' || activeTab === 'cilium_mesh_lab':
        return <EbpfCiliumLab onRewardXP={(xp) => awardXP(xp, 'cilium_master')} />;
      case activeTab === 'postgres_index_types_lab' || activeTab === 'postgres_index_types' || activeTab === 'postgres_index_lab':
        return <PostgresIndexTypesLab onRewardXP={(xp) => awardXP(xp, 'postgres_index_master')} />;
      case activeTab === 'dnssec_validation_lab' || activeTab === 'dnssec_validation' || activeTab === 'dnssec_lab':
        return <DnssecValidationLab onRewardXP={(xp) => awardXP(xp, 'dnssec_master')} />;
      case activeTab === 'ihk_burndown_lab' || activeTab === 'ihk_burndown' || activeTab === 'agile_burndown_lab':
        return <IhkAgileBurndownLab onRewardXP={(xp) => awardXP(xp, 'ihk_burndown_master')} />;
      case activeTab === 'linux_cow_snapshot_lab' || activeTab === 'linux_cow_snapshot' || activeTab === 'btrfs_cow_lab':
        return <LinuxCowSnapshotLab onRewardXP={(xp) => awardXP(xp, 'linux_cow_master')} />;
      case activeTab === 'openapi_contract_lab' || activeTab === 'openapi_contract' || activeTab === 'openapi_lab':
        return <OpenApiContractLab onRewardXP={(xp) => awardXP(xp, 'openapi_contract_master')} />;
      case activeTab === 'kafka':
        return <KafkaEventLab />;
      case activeTab === 'docker':
        return <DockerLab />;
      case activeTab === 'cloud_devops':
        return <CloudDevOpsLab />;
      case activeTab === 'security_lab_v2':
        return <RedBlueTeamLab />;
      case activeTab === 'api_studio':
        return <ApiBenchStudio />;
      case activeTab === 'ai_business':
        return <AiBusinessMasterclass />;
      case activeTab === 'podcast':
        return <ItPodcastHub />;
      case activeTab === 'lernfelder':
        return <FisiLernfelderHub />;
      case activeTab === 'web_components':
        return <WebComponentsHub />;
      case activeTab === 'tdd':
        return <TddUnitTestLab onRewardXP={(xp) => awardXP(xp, 'tdd_master')} />;
      case activeTab === 'architecture':
        return <ArchitectureVisualizer />;
      case activeTab === 'design_patterns':
        return <DesignPatternsLab />;
      case activeTab === 'roadmaps':
        return <CareerRoadmap userState={userState} />;
      case activeTab === 'big_o':
        return <BigOVisualizer />;
      case activeTab === 'quiz_arena':
        return <KnowledgeQuizArena onRewardXP={(xp) => awardXP(xp, 'quiz_master')} />;
      case activeTab === 'languages':
        return <LanguageAcademy />;
      case activeTab === 'ai':
        return <AiPromptLab />;
      case activeTab === 'tooling':
        return <ToolingSetupGuide />;
      case activeTab === 'app_workshop':
        return <AppWorkshop onCompleteWorkshop={(xp) => awardXP(xp, 'app_builder')} />;
      case activeTab === 'exam':
        return <ExamSimulator onCompleteExam={(_score, xp) => awardXP(xp, 'exam_passed')} />;
      default:
        return null;
    }
  })();

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
          <ErrorBoundary resetKey={activeTab} onGoHome={() => setActiveTab('dashboard')}>
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
                <Suspense fallback={null}>
                  <SkillMatrixWidget userState={userState} />
                </Suspense>

                {/* Feature Modules Quick Access Grid */}
                <DashboardQuickAccessGrid setActiveTab={setActiveTab} />
              </div>
            )}

            {activeLabElement && (
              <Suspense fallback={<LabLoadingFallback />}>
                {activeLabElement}
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
          </ErrorBoundary>
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
