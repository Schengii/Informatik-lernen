import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Terminal, BookOpen, Sparkles, Trophy, Cpu, Code2,
  Layers, Award, FileText, ArrowRight, X, Command, Database, ShieldCheck,
  Calculator, Globe, ShieldAlert, Brain, GitMerge, Lock, Radio, Flame, Swords,
  GitBranch, HardDrive, Users, Cloud
} from 'lucide-react';
import { useTranslation } from '../../utils/i18n';
import { TOPICS } from '../../data/topicsData';
import { GLOSSARY_TERMS } from '../../data/glossaryData';
import { LAB_REGISTRY } from '../../data/labRegistry';

export default function CommandPaletteModal({ isOpen, onClose, onNavigate, onOpenModal }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Schnell-Befehle & Navigationselemente
  const staticActions = [
    { id: 'view-home', title: 'Übersicht / Startseite', category: 'Navigation', icon: BookOpen, labId: 'dashboard', action: () => onNavigate('dashboard') },
    { id: 'view-sqlite-cli', title: 'SQLite CLI Terminal & Virtual Tables REPL (Dot-Commands & SQL)', category: 'Labs & Tools', icon: Terminal, labId: 'sqlite_cli_repl', action: () => onNavigate('sqlite_cli_repl') },
    { id: 'view-k8s-helm', title: 'Kubernetes Helm Chart & Kustomize Overlay Studio (GitOps)', category: 'Labs & Tools', icon: Cloud, labId: 'k8s_helm_kustomize', action: () => onNavigate('k8s_helm_kustomize') },
    { id: 'view-wiso-salary', title: 'IHK Brutto-Netto & Sozialversicherungs-Rechner 2026 (WISO)', category: 'Prüfung', icon: Award, labId: 'wiso_salary_calculator', action: () => onNavigate('wiso_salary_calculator') },
    { id: 'view-dockerfile-opt', title: 'Dockerfile Multi-Stage Optimizer & Security Linter (Distroless)', category: 'Labs & Tools', icon: HardDrive, labId: 'dockerfile_optimizer', action: () => onNavigate('dockerfile_optimizer') },
    { id: 'view-postgres-flamegraph', title: 'PostgreSQL EXPLAIN FlameGraph & Window Functions Studio', category: 'Labs & Tools', icon: Flame, labId: 'postgres_flamegraph', action: () => onNavigate('postgres_flamegraph') },
    { id: 'view-git-rebase', title: 'Git Interactive Rebase Studio (git rebase -i / Squash & Fixup)', category: 'Labs & Tools', icon: GitBranch, labId: 'git_interactive_rebase', action: () => onNavigate('git_interactive_rebase') },
    { id: 'view-collab-whiteboard', title: 'Collaborative Architecture Whiteboard & Mermaid Diagrammer', category: 'Labs & Tools', icon: Users, labId: 'collaborative_whiteboard', action: () => onNavigate('collaborative_whiteboard') },
    { id: 'view-sql-query-plan', title: 'SQL Query Execution Plan & Cost Optimizer (Plan Tree & Indexes)', category: 'Labs & Tools', icon: Database, labId: 'sql_query_plan', action: () => onNavigate('sql_query_plan') },
    { id: 'view-p2p-code-duel', title: 'Live Coding-Duell & Speedrun Arena (Realtime Multiplayer & Bot)', category: 'Labs & Tools', icon: Swords, labId: 'p2p_code_duel', action: () => onNavigate('p2p_code_duel') },
    { id: 'view-linux-vfs', title: 'Linux POSIX Terminal & VFS Sandbox (Pipes, Chmod, Systemd)', category: 'Labs & Tools', icon: Terminal, labId: 'linux_vfs_lab', action: () => onNavigate('linux_vfs_lab') },
    { id: 'view-ihk-project-planner', title: 'IHK Projektdokumentation & Nutzwertanalyse-Studio (AO 2020)', category: 'Prüfung', icon: FileText, labId: 'ihk_project_planner', action: () => onNavigate('ihk_project_planner') },
    { id: 'view-chaos-engineering', title: 'Chaos Engineering & Microservice Failure Studio', category: 'Labs & Tools', icon: Flame, labId: 'chaos_engineering', action: () => onNavigate('chaos_engineering') },
    { id: 'view-cicd-dag', title: 'CI/CD Pipeline DAG Studio & Runner (GitHub Actions)', category: 'Labs & Tools', icon: GitMerge, labId: 'cicd_dag_builder', action: () => onNavigate('cicd_dag_builder') },
    { id: 'view-os-scheduler', title: 'OS Process Scheduler & Deadlock Studio (Gantt & Bankier)', category: 'Labs & Tools', icon: Cpu, labId: 'os_scheduler', action: () => onNavigate('os_scheduler') },
    { id: 'view-packet-sniffer', title: 'Web-Wireshark Packet Sniffer & Hex Analyzer', category: 'Labs & Tools', icon: Terminal, labId: 'packet_sniffer', action: () => onNavigate('packet_sniffer') },
    { id: 'view-erd-designer', title: 'Relational ERD Designer & 3NF Normalform-Linter', category: 'Labs & Tools', icon: Database, labId: 'erd_designer', action: () => onNavigate('erd_designer') },
    { id: 'view-transformer-attention', title: 'Transformer Self-Attention & LLM Sampling Studio', category: 'Labs & Tools', icon: Brain, labId: 'transformer_attention', action: () => onNavigate('transformer_attention') },
    { id: 'view-cloud-canvas', title: 'Cloud Architecture SLA & SPOF Canvas', category: 'Labs & Tools', icon: Globe, labId: 'cloud_canvas', action: () => onNavigate('cloud_canvas') },
    { id: 'view-ihk-grade-calc', title: 'IHK Notenrechner & Mündliche Ergänzungsprüfung (AO 2020)', category: 'Prüfung', icon: Award, labId: 'ihk_grade_calculator', action: () => onNavigate('ihk_grade_calculator') },
    { id: 'view-rack-configurator', title: '19"-Server-Rack Konfigurator & USV/Klimarechner', category: 'Hardware', icon: Cpu, labId: 'rack_configurator', action: () => onNavigate('rack_configurator') },
    { id: 'view-itsm-simulator', title: 'ITIL 4 ITSM & Service Desk Management Studio', category: 'Prüfung', icon: Award, labId: 'itsm_simulator', action: () => onNavigate('itsm_simulator') },
    { id: 'view-sm2-repetition', title: 'SuperMemo SM-2 Spaced Repetition Mastery & Ebbinghaus', category: 'Lernen', icon: Brain, labId: 'sm2_spaced_repetition', action: () => onNavigate('sm2_spaced_repetition') },
    { id: 'view-personal-notebook', title: 'Developer Notizen- & Wissens-Archiv (Markdown Vault)', category: 'Tools', icon: FileText, labId: 'personal_notebook', action: () => onNavigate('personal_notebook') },
    { id: 'view-wasm-compiler', title: 'WebAssembly Compiler Playground & Hex-Inspector', category: 'Labs & Tools', icon: Terminal, labId: 'wasm_compiler', action: () => onNavigate('wasm_compiler') },
    { id: 'view-zkp-crypto', title: 'ZKP & Kryptographie Visualizer (Elliptische Kurven)', category: 'Labs & Tools', icon: ShieldCheck, labId: 'zkp_crypto', action: () => onNavigate('zkp_crypto') },
    { id: 'view-oauth-pkce', title: 'OAuth 2.0 PKCE & OIDC Flow Studio (S256 & JWT Claims)', category: 'Labs & Tools', icon: Lock, labId: 'oauth_pkce_studio', action: () => onNavigate('oauth_pkce_studio') },
    { id: 'view-k8s-cluster', title: 'Kubernetes Cluster & Topology Visualizer (Pods & Ingress)', category: 'Labs & Tools', icon: Cpu, labId: 'k8s_cluster_studio', action: () => onNavigate('k8s_cluster_studio') },
    { id: 'view-webrtc-peer', title: 'WebRTC P2P DataChannel & Signaling Studio (SDP & STUN)', category: 'Labs & Tools', icon: Radio, labId: 'webrtc_peer_studio', action: () => onNavigate('webrtc_peer_studio') },
    { id: 'view-scrum-simulator', title: 'Scrum Sprint & Kanban Simulator', category: 'Prüfung', icon: Award, labId: 'scrum_simulator', action: () => onNavigate('scrum_simulator') },
    { id: 'view-graphql-explorer', title: 'GraphQL Schema & Query Explorer', category: 'Labs & Tools', icon: Layers, labId: 'graphql_explorer', action: () => onNavigate('graphql_explorer') },
    { id: 'view-ble-sensor', title: 'BLE & GATT Sensor Simulator', category: 'Hardware', icon: Cpu, labId: 'ble_sensor', action: () => onNavigate('ble_sensor') },
    { id: 'view-regex-railroad', title: 'RegEx Railroad & Diagramm Studio', category: 'Labs & Tools', icon: Code2, labId: 'regex_railroad', action: () => onNavigate('regex_railroad') },
    { id: 'view-webhook-inspector', title: 'REST API Webhook Inspector & Mock Server', category: 'Labs & Tools', icon: Terminal, labId: 'webhook_inspector', action: () => onNavigate('webhook_inspector') },
    { id: 'view-voice-quiz', title: 'Podcast Voice Quiz Studio', category: 'Prüfung', icon: Award, labId: 'voice_quiz', action: () => onNavigate('voice_quiz') },
    { id: 'view-tco-roi', title: 'TCO & ROI Wirtschaftlichkeits-Simulator', category: 'Prüfung', icon: Calculator, labId: 'tco_roi_lab', action: () => onNavigate('tco_roi_lab') },
    { id: 'view-git-conflict', title: 'Git 3-Way Merge Conflict Resolver', category: 'Labs & Tools', icon: GitMerge, labId: 'git_conflict_lab', action: () => onNavigate('git_conflict_lab') },
    { id: 'view-custom-challenges', title: 'Custom Coding Challenge Creator', category: 'Labs & Tools', icon: Code2, labId: 'custom_challenges', action: () => onNavigate('custom_challenges') },
    { id: 'view-p2p-duell', title: 'IHK Quiz-Duell Arena (1v1 / P2P)', category: 'Prüfung', icon: Award, labId: 'p2p_duell', action: () => onNavigate('p2p_duell') },
    { id: 'view-sqlite-studio', title: 'SQLite & Relational DB Sandbox', category: 'Labs & Tools', icon: Database, labId: 'sqlite_studio', action: () => onNavigate('sqlite_studio') },
    { id: 'view-coding-challenges', title: 'Live Coding Challenge Studio', category: 'Labs & Tools', icon: Code2, labId: 'coding_challenges', action: () => onNavigate('coding_challenges') },
    { id: 'view-wiso-kalkulation', title: 'WISO & Handelskalkulations-Studio', category: 'Labs & Tools', icon: Calculator, labId: 'wiso_kalkulation', action: () => onNavigate('wiso_kalkulation') },
    { id: 'view-ieee754-lab', title: 'IEEE-754 Float & Zahlen-Studio', category: 'Labs & Tools', icon: Cpu, labId: 'ieee754_lab', action: () => onNavigate('ieee754_lab') },
    { id: 'view-ipv6-routing', title: 'IPv6 & Routing-Table Simulator', category: 'Labs & Tools', icon: Globe, labId: 'ipv6_routing_lab', action: () => onNavigate('ipv6_routing_lab') },
    { id: 'view-owasp-exploit', title: 'OWASP Top 10 Live-Exploit Sandbox', category: 'Labs & Tools', icon: ShieldAlert, labId: 'owasp_exploit_lab', action: () => onNavigate('owasp_exploit_lab') },
    { id: 'view-neural-net', title: 'Neural Network & BPE Tokenizer Studio', category: 'Labs & Tools', icon: Brain, labId: 'neural_net_lab', action: () => onNavigate('neural_net_lab') },
    { id: 'view-cheat-sheets', title: 'IHK Spickzettel & PDF-Generator', category: 'Prüfung', icon: FileText, labId: 'cheat_sheets', action: () => onNavigate('cheat_sheets') },
    { id: 'view-topics', title: 'Alle Informatik-Themen', category: 'Themen & Content', icon: Layers, labId: 'wissen', action: () => onNavigate('wissen') },
    { id: 'view-labs', title: 'Interaktive Labs & Simulatoren', category: 'Labs & Tools', icon: Terminal, labId: 'labs', action: () => onNavigate('labs') },
    { id: 'view-jwks-rotation', title: 'OAuth2 JWKS Key Rotation Lab', category: 'Labs & Tools', icon: ShieldCheck, labId: 'jwks_rotation_lab', action: () => onNavigate('jwks_rotation_lab') },
    { id: 'view-postgres-mvcc', title: 'PostgreSQL MVCC & VACUUM Lab', category: 'Labs & Tools', icon: Database, labId: 'postgres_mvcc_lab', action: () => onNavigate('postgres_mvcc_lab') },
    { id: 'view-http3-quic', title: 'HTTP/3 & QUIC Protocol Inspector', category: 'Labs & Tools', icon: Layers, labId: 'http3_quic_lab', action: () => onNavigate('http3_quic_lab') },
    { id: 'view-redis-caching', title: 'Redis Caching & Invalidation Lab', category: 'Labs & Tools', icon: Database, labId: 'redis_caching_lab', action: () => onNavigate('redis_caching_lab') },
    { id: 'view-circuit-breaker', title: 'Circuit Breaker & Resilience Lab', category: 'Labs & Tools', icon: Layers, labId: 'circuit_breaker_lab', action: () => onNavigate('circuit_breaker_lab') },
    { id: 'view-k8s-cni', title: 'Kubernetes CNI & VXLAN Overlay Lab', category: 'Labs & Tools', icon: Terminal, labId: 'k8s_cni_lab', action: () => onNavigate('k8s_cni_lab') },
    { id: 'view-graphql-resolver', title: 'GraphQL AST & DataLoader Lab', category: 'Labs & Tools', icon: Layers, labId: 'graphql_resolver_lab', action: () => onNavigate('graphql_resolver_lab') },
    { id: 'view-linux-permissions', title: 'Linux Permissions & Inode Rechner', category: 'Labs & Tools', icon: Terminal, labId: 'linux_permissions_lab', action: () => onNavigate('linux_permissions_lab') },
    { id: 'view-crypto-keygen', title: 'RSA & Diffie-Hellman Crypto Lab', category: 'Labs & Tools', icon: ShieldCheck, labId: 'crypto_keygen_lab', action: () => onNavigate('crypto_keygen_lab') },
    { id: 'view-cicd-matrix', title: 'CI/CD Matrix Linter & Runner Lab', category: 'Labs & Tools', icon: Layers, labId: 'cicd_matrix_lab', action: () => onNavigate('cicd_matrix_lab') },
    { id: 'view-postgres-explain', title: 'PostgreSQL Query Tree & Cost Visualizer', category: 'Labs & Tools', icon: Database, labId: 'postgres_explain_lab', action: () => onNavigate('postgres_explain_lab') },
    { id: 'view-webrtc-signaling', title: 'WebRTC P2P & SDP Signaling Lab', category: 'Labs & Tools', icon: Terminal, labId: 'webrtc_signaling_lab', action: () => onNavigate('webrtc_signaling_lab') },
    { id: 'view-code-debugger', title: 'Code Execution & Memory Debugger Lab', category: 'Labs & Tools', icon: Cpu, labId: 'code_debugger_lab', action: () => onNavigate('code_debugger_lab') },
    { id: 'view-clean-code', title: 'Clean Code & Security Review Arena', category: 'Labs & Tools', icon: ShieldCheck, labId: 'clean_code_lab', action: () => onNavigate('clean_code_lab') },
    { id: 'view-dns-http', title: 'DNS & HTTP/TLS Request Inspector', category: 'Labs & Tools', icon: Layers, labId: 'dns_http_lab', action: () => onNavigate('dns_http_lab') },
    { id: 'view-sql-transaction', title: 'SQL Transaktionen & ACID Simulator', category: 'Labs & Tools', icon: Database, labId: 'sql_transaction_lab', action: () => onNavigate('sql_transaction_lab') },
    { id: 'view-ihk-doku', title: 'IHK Projektantrags- & Doku-Generator', category: 'Prüfung', icon: FileText, labId: 'ihk_doc_generator', action: () => onNavigate('ihk_doc_generator') },
    { id: 'view-games', title: 'Coding Games & SQL Dungeon', category: 'Spiele', icon: Trophy, labId: 'games', action: () => onNavigate('games') },
    { id: 'view-exam', title: 'IHK Prüfungssimulator (AP1 & AP2)', category: 'Prüfung', icon: FileText, labId: 'exam', action: () => onNavigate('exam') },
    { id: 'view-oral-exam', title: 'IHK Mündliches Fachgespräch Simulation', category: 'Prüfung', icon: Award, labId: 'oral_exam', action: () => onNavigate('oral_exam') },
    { id: 'view-campaign', title: 'Story-Kampagne: Der IT-Aufstieg', category: 'Quests', icon: Sparkles, labId: 'campaign', action: () => onNavigate('campaign') },
    { id: 'view-cpu-arch', title: 'Von-Neumann CPU & Register-Simulator', category: 'Labs & Tools', icon: Cpu, labId: 'cpu_architecture_lab', action: () => onNavigate('cpu_architecture_lab') },
    { id: 'view-sql-optimizer', title: 'SQL Query Optimizer & EXPLAIN Lab', category: 'Labs & Tools', icon: Database, labId: 'sql_optimizer_lab', action: () => onNavigate('sql_optimizer_lab') },
    { id: 'view-git-graph', title: 'Git Branch & Rebase Graph Visualizer', category: 'Labs & Tools', icon: Code2, labId: 'git_graph_lab', action: () => onNavigate('git_graph_lab') },
    { id: 'view-sql-join', title: 'SQL JOIN Visualizer Lab', category: 'Labs & Tools', icon: Terminal, labId: 'sql_joins', action: () => onNavigate('sql_joins') },
    { id: 'modal-badges', title: 'Erfolge & Abzeichen ansehen', category: 'Profil & Gamification', icon: Trophy, action: () => onOpenModal('badges') },
    { id: 'modal-glossary', title: 'IT-Glossar & Fachbegriffe durchsuchen', category: 'Wissen', icon: BookOpen, action: () => onOpenModal('glossary') },
    { id: 'modal-flashcards', title: 'Karteikarten-Trainer öffnen', category: 'Lernen', icon: Layers, action: () => onOpenModal('flashcards') },
    { id: 'modal-role', title: 'Rolle / Fachrichtung wechseln (FIAE, FISI...)', category: 'Einstellungen', icon: Cpu, action: () => onOpenModal('role') }
  ];

  // Themen aus topicsData matchen
  const topicItems = TOPICS.map(t => ({
    id: `topic-${t.id}`,
    title: `${t.title} (${t.category})`,
    category: 'Lerneinheiten & Module',
    icon: BookOpen,
    description: t.description || '',
    action: () => onNavigate('topic-detail', t)
  }));

  // Glossarbegriffe matchen
  const glossaryMatches = GLOSSARY_TERMS.map(g => ({
    id: `glossary-${g.id}`,
    title: `${g.term}: ${(g.simpleExplanation || '').slice(0, 75)}...`,
    category: 'Glossar & Begriffe',
    icon: FileText,
    action: () => onOpenModal('glossary', g.term)
  }));

  // Alle Labs aus der zentralen Registry (siehe data/labRegistry.js) durchsuchbar machen -
  // nicht nur die oben handverlesenen `staticActions`. Vorher fand die Suche ein Lab nur,
  // wenn sein Titel exakt in `staticActions` gepflegt war; jetzt matcht sie zusätzlich auf
  // Beschreibung und Tags jedes der 102 Labs (z. B. findet "Bankier" jetzt den OS-Scheduler,
  // auch ohne dass "Bankier" im kuratierten Titel oben vorkommt).
  const curatedLabIds = new Set(staticActions.map((a) => a.labId).filter(Boolean));
  const labItems = LAB_REGISTRY
    .filter((lab) => !curatedLabIds.has(lab.id))
    .map((lab) => ({
      id: `lab-${lab.id}`,
      title: lab.title,
      category: 'Labs & Tools',
      icon: lab.icon,
      description: [lab.desc, ...(lab.tags || [])].join(' '),
      action: () => onNavigate(lab.id)
    }));

  // Quick Calculator detection
  const quickCalcItems = [];
  const query = search.trim();
  if (query) {
    // 1. Math calculation (e.g. "80 * 65 + 1500")
    if (/^[0-9+\-*/().\s^%]+$/.test(query) && /[+\-*/^%]/.test(query)) {
      try {
        const sanitized = query.replace(/\^/g, '**');
        const mathRes = Function(`'use strict'; return (${sanitized})`)();
        if (typeof mathRes === 'number' && !isNaN(mathRes) && isFinite(mathRes)) {
          quickCalcItems.push({
            id: 'quick-calc-math',
            title: `Ergebnis: ${query} = ${mathRes.toLocaleString('de-DE')}`,
            category: 'Schnellrechner',
            icon: Calculator,
            action: () => {
              navigator.clipboard?.writeText(String(mathRes));
            }
          });
        }
      } catch {
        // ignore
      }
    }

    // 2. Base Conversion (e.g. "hex 255", "bin 42")
    const hexMatch = query.match(/^hex\s+(\d+)$/i);
    if (hexMatch) {
      const num = parseInt(hexMatch[1], 10);
      quickCalcItems.push({
        id: 'quick-calc-hex',
        title: `Konvertierung: ${num} = 0x${num.toString(16).toUpperCase()} (Binär: ${num.toString(2)})`,
        category: 'Schnellrechner',
        icon: Cpu,
        action: () => onNavigate('ieee754_lab')
      });
    }

    const binMatch = query.match(/^bin\s+(\d+)$/i);
    if (binMatch) {
      const num = parseInt(binMatch[1], 10);
      quickCalcItems.push({
        id: 'quick-calc-bin',
        title: `Konvertierung: ${num} = 0b${num.toString(2)} (Hex: 0x${num.toString(16).toUpperCase()})`,
        category: 'Schnellrechner',
        icon: Cpu,
        action: () => onNavigate('ieee754_lab')
      });
    }

    // 3. Subnet CIDR match (e.g. "/24", "subnet /24")
    const cidrMatch = query.match(/(?:subnet\s+|cidr\s+)?\/([0-9]{1,2})$/i);
    if (cidrMatch) {
      const prefix = parseInt(cidrMatch[1], 10);
      if (prefix >= 0 && prefix <= 32) {
        const totalIps = Math.pow(2, 32 - prefix);
        const usableHosts = prefix >= 31 ? (prefix === 31 ? 2 : 1) : totalIps - 2;
        quickCalcItems.push({
          id: 'quick-calc-subnet',
          title: `Subnetz /${prefix}: ${usableHosts.toLocaleString('de-DE')} nutzbare Hosts (${totalIps.toLocaleString('de-DE')} IPs)`,
          category: 'Schnellrechner',
          icon: Globe,
          action: () => onNavigate('subnetting')
        });
      }
    }
  }

  const allItems = [...quickCalcItems, ...staticActions, ...topicItems, ...glossaryMatches, ...labItems];

  const filteredItems = search.trim() === '' 
    ? staticActions 
    : [
        ...quickCalcItems,
        ...allItems.filter(item => 
          item.id.startsWith('quick-calc') ? false : (
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(search.toLowerCase()))
          )
        )
      ].slice(0, 10);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '12vh',
          zIndex: 9999,
          paddingLeft: '16px',
          paddingRight: '16px'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '640px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header Search Input */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border-color)', gap: '12px' }}>
            <Search size={20} color="var(--accent-primary)" />
            <input
              ref={inputRef}
              type="text"
              placeholder={t('cmdk_placeholder')}
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '1.05rem',
                color: 'var(--text-main)',
                fontFamily: 'inherit'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <kbd style={{ background: 'var(--bg-secondary)', padding: '3px 7px', borderRadius: '6px', fontSize: '0.75rem', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>ESC</kbd>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Results List */}
          <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '8px' }}>
            {filteredItems.length === 0 ? (
              <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Search size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                <p style={{ margin: 0, fontWeight: '600' }}>{t('cmdk_no_results')} "{search}"</p>
                <span style={{ fontSize: '0.85rem' }}>{t('cmdk_no_results_hint')}</span>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                const IconComponent = item.icon || Terminal;
                return (
                  <div
                    key={item.id || index}
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                      border: isSelected ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                      transition: 'all 0.1s ease',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: '34px', 
                        height: '34px', 
                        borderRadius: '8px', 
                        background: isSelected ? 'var(--accent-primary)' : 'var(--bg-secondary)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: isSelected ? '#ffffff' : 'var(--accent-primary)',
                        flexShrink: 0
                      }}>
                        <IconComponent size={18} />
                      </div>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: isSelected ? '700' : '600', color: isSelected ? 'var(--accent-primary)' : 'var(--text-main)' }}>
                          {item.title}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <ArrowRight size={16} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div style={{ 
            padding: '10px 16px', 
            borderTop: '1px solid var(--border-color)', 
            background: 'var(--bg-secondary)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span><kbd style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>↑↓</kbd> {t('cmdk_navigate')}</span>
              <span><kbd style={{ background: 'var(--bg-card)', padding: '2px 5px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>↵</kbd> {t('cmdk_select')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Command size={12} />
              <span>{t('cmdk_power_search')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
