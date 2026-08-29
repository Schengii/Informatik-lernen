# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen für Einsteiger (ohne Vorkenntnisse), IHK Berufsschul-Lernfeldern (ausbildung-in-der-it.de LF 1 - 12b), OS Prozess-Scheduling & Bankier-Deadlock-Algorithmus, Web-Wireshark Packet Sniffer & Frame Analyzer, Relationalem ERD Designer & 1NF–3NF Normalform-Linter, Transformer Attention & LLM Sampling Studio, Cloud Architecture SLA & SPOF Canvas, IHK Noten- & MEP-Rechner (AO 2020), 19"-Server-Rack & USV/Klimarechner, ITIL 4 ITSM Service Desk Simulator, SuperMemo SM-2 Spaced Repetition Mastery mit Ebbinghaus-Kurven, Developer Notizbuch & Markdown Vault, Scrum Sprint & Kanban Simulator, GraphQL Schema & Query Explorer (AST Visualizer), Bluetooth Low Energy (BLE) & GATT Sensor Studio, RegEx Railroad Diagramm Studio, REST API Webhook Inspector & Mock Server, Podcast Voice Quiz Studio, TCO & ROI Wirtschaftlichkeits-Simulator, Git 3-Way Merge Conflict Resolver, Custom Coding Challenge Creator, P2P Multiplayer / LAN Quiz-Duell Arena, SQLite & Relational In-Browser Database Sandbox, Live Coding Challenge Studio, WISO- & Handelskalkulations-Studio, IEEE-754 Gleitkomma & Zahlen-Lab, IPv6 & Routing-Table Simulator, OWASP Top 10 Live-Exploit Sandbox, Neural Network & BPE Tokenizer Studio, druckfertigem IHK Cheat-Sheet PDF-Generator, 365-Tage GitHub-Style Aktivitäts-Heatmap, Pomodoro-Fokus-Timer, Web-Audio SFX-Controller, W3Schools-Style Programmier-Masterclasses, Coursera Deep Learning, Praxis-Projekten, Advanced Prompt Engineering, OAuth2 & OpenID Connect, WebSockets, Performance Profiling, Kubernetes, Local RAG Vector AI, WebAssembly & Rust, Apache Kafka, Docker & Containerisierung, CI/CD, Cybersecurity Red vs Blue Team, 10+ Programmiersprachen, TDD Unit-Testing, i18n Mehrsprachigkeit, Systemarchitektur, Microservices, Design Patterns, Datenbanken, IT-Sicherheit, Logikschaltungen, Netzwerken, Big-O Komplexität, Karriere-Roadmaps, Boss-Battles, Code Typing Speedrun, PWA Offline-Support, Vokabeln und Quizzes – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

---

## 📋 Inhaltsverzeichnis
- [Übersicht & Zielgruppen](#-übersicht--zielgruppen)
- [Hauptfunktionen & Neue Features (v3.8.0)](#-hauptfunktionen--neue-features-v380-next-gen-engineering-architecture--ihk-power-edition)
- [Barrierefreiheit & Inklusion](#-barrierefreiheit--inklusion)
- [Ordnerstruktur](#-ordnerstruktur)
- [Dateiinhalt & Komponentenübersicht](#-dateiinhalt--komponentenübersicht)
- [Funktionsweise](#-funktionsweise)
- [DSGVO & Datenschutz](#-dsgvo--datenschutz)
- [Anleitung (Installation & Ausführung)](#-anleitung-installation--ausführung)
- [Änderungshistorie & Entwicklungsdokumentation](#-änderungshistorie--entwicklungsdokumentation)

---

## 🎯 Übersicht & Zielgruppen

**IT-DevGame** ist so konzipiert, dass **jeder Mensch – unabhängig von Alter oder Vorkenntnissen** – spielerisch in die Welt der Informatik einsteigen oder bestehendes Wissen gezielt vertiefen kann:

1. **🌱 Einsteiger & Neugierige (Kinder, Senioren, Quereinsteiger)**:
   - **Einsteiger-Kurs (`AnfaengerGuideHub.jsx`)**: Lernen ohne jegliche Vorkenntnisse.
   - Grundlagen leicht verständlich erklärt: **EVA-Prinzip**, **CPU-Gehirn** (ALU, Steuerwerk, Register), **Binärsystem & Bytes**, **Internet & DNS**.
2. **⚡ IT-Auszubildende (Fachinformatiker AE/SI/DP/DVS, IT-Systemelektroniker, Kaufleute IT-Systemmanagement)**:
   - **IHK Noten- & MEP-Rechner (`IhkGradeCalculatorLab.jsx` & `ihkGradeCalculations.js`)**: Offizielle AO 2020 Prüfungsordnung, Gewichtungen (AP1 20%, AP2 30%, Projekt 50%) und automatischer Rechner für die **Mündliche Ergänzungsprüfung (MEP)**.
   - **19"-Rack Konfigurator & USV/Klimarechner (`RackConfiguratorLab.jsx` & `rackCalculations.js`)**: 42HE Serverschrank, Schein- & Wirkleistung ($VA, W$), USV-Akkulaufzeit und BTU/h Kühlungslast.
   - **ITIL 4 ITSM & Service Desk Studio (`ItsmSimulatorLab.jsx` & `itsmEngine.js`)**: Incident Queue mit SLA-Timern, Impact $\times$ Urgency Priorisierung und Change Advisory Board (CAB) Risiko-Scoring.
   - **OS Process Scheduler & Deadlock Studio (`OsProcessSchedulerLab.jsx` & `osSchedulerEngine.js`)**: CPU-Scheduling (FCFS, SJF, Round Robin mit Quantum, Priority), animierter Gantt-Chart und Bankier-Algorithmus (Banker's Algorithm) zur Deadlock-Vermeidung.
   - **Web-Wireshark Packet Sniffer (`PacketSnifferLab.jsx` & `packetSnifferEngine.js`)**: Schichten 2–7 Paket-Dissektion (Ethernet, IP, TCP/UDP, DNS, HTTP), Hex-Dump Synchronisation und Display-Filter.
   - **Relational ERD Designer & 3NF Linter (`ErdDesignerLab.jsx` & `erdDesignerEngine.js`)**: Visuelle Entity-Relationship Modelle, 1NF–3NF Normalisierungs-Audit und produktionsreifer SQL DDL Export.
   - **SuperMemo SM-2 Spaced Repetition Mastery (`Sm2SpacedRepetitionLab.jsx` & `sm2Algorithm.js`)**: Wissenschaftliches Karteikarten-Lernen mit dynamischen Ease-Faktoren ($EF$) und Ebbinghaus-Vergessenskurven.
   - **Developer Notizbuch & Vault (`PersonalNotebookLab.jsx`)**: Persönliches Markdown-Notizbuch mit Tag-Suche, LocalStorage Auto-Save und `.md`-Export.
   - Detaillierte IHK-Berufsschul Lernfelder (LF 1 bis LF 12b), **Handelskalkulationen**, **Deckungsbeitragsrechnung & Break-Even-Point**, **Netzplantechnik (CPM)**, **WISO-Arbeitsrecht** und druckfertige **A4 PDF-Spickzettel**.
3. **🚀 Junior Developer & Systemintegratoren**:
   - **Cloud Architecture SLA & SPOF Canvas (`CloudArchitectureCanvasLab.jsx` & `cloudArchitectureEngine.js`)**: Multi-Tier Topologie-Planung, Compound Availability ($A_{\text{ges}}$), Ausfallzeiten-Rechner und Single-Point-of-Failure Audit.
   - **Transformer Attention & LLM Playground (`TransformerAttentionLab.jsx` & `transformerAttentionEngine.js`)**: Scaled Dot-Product Self-Attention Heatmap, Temperature / Top-P / Top-K Token Sampling und autonome AI-Agenten ReAct-Loops.
   - **GraphQL Schema & Query Explorer (`GraphqlExplorerStudioLab.jsx`)**, **RegEx Railroad Visualizer**, **Webhook Inspector**, **Git 3-Way Merge Conflict Resolver**, **Custom Challenge Creator**, **SQLite WASM Studio** und **Live Coding Challenge Studio**.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - **OWASP Top 10 Live-Exploit Sandbox** (XSS, SQLi, CSRF, IDOR), **Deep Learning Neural Network Forward-Propagation**, **Byte-Pair Encoding (BPE) Tokenizer**, OAuth2 PKCE & JWT Claims Decoding, WebSockets HTTP 101 Handshake, V8 Performance & Memory Leak Profiling, Kubernetes Deployments & RAG Vector AI Pipelines.

---

## 🔥 Hauptfunktionen & Neue Features (v3.8.0 Next-Gen Engineering, Architecture & IHK Power Edition)

* **⏱️ OS Process Scheduler & Deadlock Studio (`OsProcessSchedulerLab.jsx` & `osSchedulerEngine.js`)**:
  * Vollwertige Simulation von FCFS, Shortest Job First (SJF), Round Robin (mit dynamischem Time-Quantum-Slider) und Priority Scheduling.
  * Animiertes Echtzeit-**Gantt-Diagramm** mit automatischer Berechnung von $T_{WT}$ (Wartezeit), $T_{TAT}$ (Turnaround) und CPU-Auslastung.
  * **Bankier-Algorithmus (Banker's Algorithm)** zur Deadlock-Vermeidung mit Allokations-, Maximal- und Bedarfs-Matrizen sowie Safe-Sequence-Ermittlung.
* **📡 Web-Wireshark Packet Sniffer & Frame Analyzer (`PacketSnifferLab.jsx` & `packetSnifferEngine.js`)**:
  * Packet Dissection für Ethernet II, IPv4/IPv6, TCP/UDP, DNS und HTTP.
  * Synchroner **Hex-Dump & ASCII-Viewer**: Klick auf ein Header-Feld hebt im Hex-Dump die exakte Byte-Range farblich hervor.
  * Wireshark-Style Display-Filter (z. B. `tcp`, `http`, `ip.src == 192.168.1.45`, `tcp.port == 443`).
* **🗄️ Relational ERD Designer & Normalform-Linter (`ErdDesignerLab.jsx` & `erdDesignerEngine.js`)**:
  * Interaktiver Visualisierer für relationale Datenbank-Tabellen (PK, FK, Typen, Not Null) und Beziehungen (1:1, 1:N, N:M / Crow's Foot).
  * **Normalisierungs-Linter (1NF, 2NF, 3NF)**: Erkennt fehlende Primärschlüssel, nicht-atomare Werte und transitive Abhängigkeiten.
  * 1-Klick **SQL DDL Generator** für PostgreSQL, MySQL und SQLite.
* **🧠 Transformer Self-Attention & LLM Playground (`TransformerAttentionLab.jsx` & `transformerAttentionEngine.js`)**:
  * Interaktive **Self-Attention Heatmap** ($QK^T / \sqrt{d_k}$) zur Visualisierung semantischer Wort-Aufmerksamkeiten.
  * **Next-Token Sampling Simulator** mit Schiebereglern für Temperature ($T$), Top-K und Top-P (Nucleus).
  * Autonomer **AI-Agent ReAct-Loop** (Thought $\rightarrow$ Action $\rightarrow$ Observation $\rightarrow$ Final Answer).
* **☁️ Cloud Architecture SLA & SPOF Canvas (`CloudArchitectureCanvasLab.jsx` & `cloudArchitectureEngine.js`)**:
  * Multi-Tier Cloud-Topologie-Planung (WAF, CDN, ALB, ASG Clusters, Redis, RDS Multi-AZ, S3).
  * Compound SLA-Berechnung (Seriell vs. Parallel) und exakte jährliche Ausfallzeit (Minuten / Stunden / Tage).
  * Automatischer **Single Point of Failure (SPOF) Audit** und monatliche TCO-Kostenschätzung.
* **🎓 IHK Noten- & MEP-Rechner (`IhkGradeCalculatorLab.jsx` & `ihkGradeCalculations.js`)**:
  * Konform mit der aktuellen Prüfungsordnung **AO 2020** für alle IT-Berufe (FIAE, FISI, FIDP, FIDV, ITSE, Kaufleute).
  * Gewichtung: AP1 (20%), AP2 Teil 1 (10%), AP2 Teil 2 (10%), AP2 WiSo (10%), Dokumentation & Fachgespräch (50%).
  * Prüfung der Bestehensregeln und automatischer **Mündliche Ergänzungsprüfung (MEP) Rechner** zur Ermittlung der benötigten Mindestpunkte.
* **🗄️ 19"-Server-Rack Konfigurator & USV/Klimarechner (`RackConfiguratorLab.jsx` & `rackCalculations.js`)**:
  * Visueller 42HE Serverschrank mit Bestückung (Storage Server, GPU Server, Managed PoE Switches, Patchfelder, USV).
  * Berechnung von Scheinleistung (VA), Wirkleistung (Watt), Leistungsfaktor ($\cos \phi$), USV-Akkulaufzeit und RZ-Klimatisierung (BTU/h & kW).
* **🎧 ITIL 4 ITSM & Service Desk Management Studio (`ItsmSimulatorLab.jsx` & `itsmEngine.js`)**:
  * Service Desk Ticket-Warteschlange (Incidents, Service Requests, Problems, Change Requests) mit SLA-Countdowns.
  * Priorisierungs-Matrix (Impact $\times$ Urgency) und Change Advisory Board (CAB) Risiko-Scoring.
* **💡 SuperMemo SM-2 Spaced Repetition Mastery (`Sm2SpacedRepetitionLab.jsx` & `sm2Algorithm.js`)**:
  * Wissenschaftlicher SM-2 Algorithmus mit Repetitionen, Intervallen und Ease-Faktoren ($EF \ge 1.3$).
  * Interaktive **Ebbinghaus-Vergessenskurven-Diagramme** mit Recharts.
* **📓 Developer Notizbuch & Markdown Vault (`PersonalNotebookLab.jsx`)**:
  * In-App Markdown-Editor mit Live-Vorschau, Tag-Organisation, Volltextsuche, LocalStorage Auto-Save und `.md`-Export.
* **🔐 OAuth 2.0 PKCE & OIDC Flow Studio (`OauthPkceStudioLab.jsx` & `oauthPkceEngine.js`)**:
  * Vollständige RFC 7636 Authorization Code Flow mit PKCE Simulation ($S256$ SHA-256 Code Challenge).
  * JWT Payload Dekodierung (Header, Claims, Signature) und geschützter API-Aufruf (`GET /userinfo` mit Bearer Token).
* **☸️ Kubernetes Cluster & Topology Studio (`KubernetesClusterStudioLab.jsx` & `k8sClusterEngine.js`)**:
  * Interaktive Cluster-Architektur (Control Plane: API-Server, etcd, Scheduler, Controller Manager & Worker Nodes).
  * Dynamic Pod Scheduling, Self-Healing Pod-Eviction bei Node-Crashes, Replicas-Skalierung und Ingress-to-Service Load Balancing.
* **📡 WebRTC P2P DataChannel & Signaling Studio (`WebRtcPeerStudioLab.jsx` & `webrtcPeerEngine.js`)**:
  * RFC 8829 JSEP SDP Offer/Answer Handshake über Signaling-Server & STUN/TURN ICE-Candidate Discovery.
  * Live P2P DataChannel Chat mit einstellbaren Netzwerk-Impairments (Latenz & Paketverlust-Simulation).
* **📋 Scrum Sprint & Kanban Simulator (`AgileScrumSimulatorLab.jsx`)**:
  * Kanban-Board mit 5 Phasen, Story Point Estimation und Recharts Burndown-Charts.
* **🧬 GraphQL Schema & Query Explorer (`GraphqlExplorerStudioLab.jsx`)**:
  * In-Browser GraphQL Query Runner und AST-Inspektor.
* **📡 BLE & GATT Sensor Simulator (`BleSensorSimulatorLab.jsx`)**:
  * Bluetooth Low Energy Telemetrie, GATT Services und Byte-Dekodierung.

---

## ♿ Barrierefreiheit & Inklusion

* **Lese-Rechtschreib-Hilfe (Dyslexie-Modus)**: Spezialschriftart (*Atkinson Hyperlegible*), erweiterter Zeichen- & Zeilenabstand.
* **Rot-Grün-Sehhilfe (Farbenblindheits-Modus)**: Zusätzliche Icon-Indikatoren (✓ / ✗) und barrierefreie Farbwelten.
* **Vorlesefunktion (Text-to-Speech)**: Audio-Steuerung zum Vorlesen aller Lerneinheiten.
* **Schriftgrößen-Skalierung**: Stufenlose Anpassung (A- / 100% / A+).
* **100% DSGVO-konform**: Keine Tracking-Cookies, alle Daten verbleiben rein lokal im `localStorage`.

---

## 📁 Ordnerstruktur

```
Informatik-lernen/
├── .agents/
│   └── AGENTS.md
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
├── public/
│   ├── manifest.json
│   └── sw.js
└── src/
    ├── App.css
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── Content/
    │   │   ├── AgileScrumSimulatorLab.jsx
    │   │   ├── AiBusinessMasterclass.jsx
    │   │   ├── AiPromptLab.jsx
    │   │   ├── AlgoPlaygroundLab.jsx
    │   │   ├── AnfaengerGuideHub.jsx
    │   │   ├── ApiBenchStudio.jsx
    │   │   ├── ApiMockStudioLab.jsx
    │   │   ├── AppWorkshop.jsx
    │   │   ├── ArchitectureVisualizer.jsx
    │   │   ├── BigOBenchmarkLab.jsx
    │   │   ├── BigOVisualizer.jsx
    │   │   ├── BleSensorSimulatorLab.jsx
    │   │   ├── CampaignQuestHub.jsx
    │   │   ├── CareerRoadmap.jsx
    │   │   ├── CiCdMatrixLinterLab.jsx
    │   │   ├── CiCdPipelineLab.jsx
    │   │   ├── CiCdWorkflowLab.jsx
    │   │   ├── CircuitBreakerLab.jsx
    │   │   ├── CleanCodeReviewLab.jsx
    │   │   ├── CloudArchitectureCanvasLab.jsx
    │   │   ├── CloudDesignerLab.jsx
    │   │   ├── CloudDevOpsLab.jsx
    │   │   ├── ClozeTester.jsx
    │   │   ├── CodeExecutionDebuggerLab.jsx
    │   │   ├── CpuArchitectureLab.jsx
    │   │   ├── CryptoKeygenLab.jsx
    │   │   ├── CtfChallengeLab.jsx
    │   │   ├── CustomChallengeCreatorLab.jsx
    │   │   ├── DataStructuresLab.jsx
    │   │   ├── DeploymentGuideModal.jsx
    │   │   ├── DesignPatternsLab.jsx
    │   │   ├── DnsHttpLifecycleLab.jsx
    │   │   ├── DockerComposeLab.jsx
    │   │   ├── DockerLab.jsx
    │   │   ├── EbpfXdpLab.jsx
    │   │   ├── ErdDesignerLab.jsx
    │   │   ├── ExamSimulator.jsx
    │   │   ├── FisiLernfelderHub.jsx
    │   │   ├── GitBranchGraphLab.jsx
    │   │   ├── GitLab.jsx
    │   │   ├── GitMergeConflictLab.jsx
    │   │   ├── GlossaryModal.jsx
    │   │   ├── GraphqlExplorerStudioLab.jsx
    │   │   ├── GraphqlResolverLab.jsx
    │   │   ├── Http3QuicLab.jsx
    │   │   ├── Ieee754FloatingPointLab.jsx
    │   │   ├── IhkCheatSheetPdfGenerator.jsx
    │   │   ├── IhkGradeCalculatorLab.jsx
    │   │   ├── IhkOralExamSimulator.jsx
    │   │   ├── IhkProjectDocumentationGenerator.jsx
    │   │   ├── Ipv6RoutingLab.jsx
    │   │   ├── ItPodcastHub.jsx
    │   │   ├── ItsmSimulatorLab.jsx
    │   │   ├── JwksRotationLab.jsx
    │   │   ├── K8sCniOverlayLab.jsx
    │   │   ├── KafkaEventLab.jsx
    │   │   ├── KnowledgeQuizArena.jsx
    │   │   ├── KubernetesClusterStudioLab.jsx
    │   │   ├── KubernetesLab.jsx
    │   │   ├── LabsDashboard.jsx
    │   │   ├── LanguageAcademy.jsx
    │   │   ├── LeitnerFlashcardLab.jsx
    │   │   ├── LinuxPermissionsLab.jsx
    │   │   ├── LinuxContainerLab.jsx
    │   │   ├── LinuxMemoryLab.jsx
    │   │   ├── LiveCodingChallengeStudio.jsx
    │   │   ├── MonacoStudioLab.jsx
    │   │   ├── NeuralNetVisualizerLab.jsx
    │   │   ├── OauthOidcLab.jsx
    │   │   ├── OauthPkceStudio.jsx
    │   │   ├── OauthTokenExchangeLab.jsx
    │   │   ├── OsProcessSchedulerLab.jsx
    │   │   ├── OwaspExploitLab.jsx
    │   │   ├── P2pQuizDuellLab.jsx
    │   │   ├── PacketSnifferLab.jsx
    │   │   ├── PacketTracerLab.jsx
    │   │   ├── PerformanceProfilingLab.jsx
    │   │   ├── PersonalNotebookLab.jsx
    │   │   ├── PostgresExplainVisualizerLab.jsx
    │   │   ├── PostgresFlamegraphLab.jsx
    │   │   ├── PostgresMvccLab.jsx
    │   │   ├── PostgresPoolLab.jsx
    │   │   ├── PythonWasmLab.jsx
    │   │   ├── RackConfiguratorLab.jsx
    │   │   ├── RagAiSimulator.jsx
    │   │   ├── RedBlueTeamLab.jsx
    │   │   ├── RedisCachingLab.jsx
    │   │   ├── RegexMasterLab.jsx
    │   │   ├── RegexRailroadVisualizerLab.jsx
    │   │   ├── ServiceMeshLab.jsx
    │   │   ├── Sm2SpacedRepetitionLab.jsx
    │   │   ├── SqlJoinVisualizerLab.jsx
    │   │   ├── SqlQueryOptimizerLab.jsx
    │   │   ├── SqlTransactionLab.jsx
    │   │   ├── SqliteWasmStudioLab.jsx
    │   │   ├── SubnettingLab.jsx
    │   │   ├── SystemDesignLab.jsx
    │   │   ├── TcoRoiCalculatorLab.jsx
    │   │   ├── TddUnitTestLab.jsx
    │   │   ├── ToolingSetupGuide.jsx
    │   │   ├── TopicReader.jsx
    │   │   ├── TransformerAttentionLab.jsx
    │   │   ├── VectorSearchLab.jsx
    │   │   ├── VideoHub.jsx
    │   │   ├── VocabularyTrainerModal.jsx
    │   │   ├── VoiceQuizStudioLab.jsx
    │   │   ├── WasmCompilerPlaygroundLab.jsx
    │   │   ├── WasmRustLab.jsx
    │   │   ├── WasmRustStudio.jsx
    │   │   ├── WebComponentsHub.jsx
    │   │   ├── WebRtcPeerStudioLab.jsx
    │   │   ├── WebRtcSignalingLab.jsx
    │   │   ├── WebSocketProtocolLab.jsx
    │   │   ├── WebSocketsLab.jsx
    │   │   ├── WebhookInspectorLab.jsx
    │   │   ├── WireguardZtnaLab.jsx
    │   │   ├── WisoAbcXyzLab.jsx
    │   │   ├── WisoContributionMarginLab.jsx
    │   │   ├── WisoDunningLab.jsx
    │   │   └── WisoKalkulationLab.jsx
    │   ├── Footer/
    │   │   └── DsgvoFooterModal.jsx
    │   ├── Games/
    │   │   ├── BossBattleGame.jsx
    │   │   ├── CliTerminalLab.jsx
    │   │   ├── CodePuzzle.jsx
    │   │   ├── CodeTypingSpeedrun.jsx
    │   │   ├── LogicGatesGame.jsx
    │   │   ├── RegexLab.jsx
    │   │   ├── SecurityLab.jsx
    │   │   ├── SqlDungeon.jsx
    │   │   └── WebSandbox.jsx
    │   ├── Gamification/
    │   │   ├── ActivityHeatmapWidget.jsx
    │   │   ├── BackupModal.jsx
    │   │   ├── BadgesModal.jsx
    │   │   ├── CertificateModal.jsx
    │   │   ├── DailyChallengeWidget.jsx
    │   │   ├── FlashcardsModal.jsx
    │   │   ├── SkillMatrixWidget.jsx
    │   │   └── SkillTreeWidget.jsx
    │   ├── Navigation/
    │   │   ├── AccessibilityToolbar.jsx
    │   │   ├── AudioSettingsModal.jsx
    │   │   ├── CommandPaletteModal.jsx
    │   │   ├── DifficultyFilterBar.jsx
    │   │   ├── MobileNav.jsx
    │   │   ├── ModalContainer.jsx
    │   │   ├── Navbar.jsx
    │   │   └── PomodoroTimerWidget.jsx
    │   ├── Onboarding/
    │   │   └── RoleSelectionModal.jsx
    │   └── Projects/
    │       └── ProjectViewer.jsx
    ├── data/
    │   ├── advancedLabs.test.js
    │   ├── advancedLabsData.js
    │   ├── aiBusinessData.js
    │   ├── algorithmData.js
    │   ├── apiStudioData.js
    │   ├── campaignData.js
    │   ├── cloudArchLabs.test.js
    │   ├── cloudArchLabsData.js
    │   ├── cloudData.js
    │   ├── clozeData.js
    │   ├── dockerData.js
    │   ├── enterpriseLabs.test.js
    │   ├── enterpriseLabsData.js
    │   ├── examData.js
    │   ├── expertLabs.test.js
    │   ├── expertLabsData.js
    │   ├── flashcardsData.js
    │   ├── gamesData.js
    │   ├── glossaryData.js
    │   ├── k8sData.js
    │   ├── kafkaData.js
    │   ├── languageData.js
    │   ├── lernfelderData.js
    │   ├── nextGenLabs.test.js
    │   ├── nextGenLabsData.js
    │   ├── oauthData.js
    │   ├── oralExamData.js
    │   ├── perfData.js
    │   ├── podcastData.js
    │   ├── projectsData.js
    │   ├── quizArenaData.js
    │   ├── ragAiData.js
    │   ├── roadmapData.js
    │   ├── securityTeamData.js
    │   ├── subnettingData.js
    │   ├── topicsData.js
    │   ├── userProfiles.js
    │   ├── videosData.js
    │   ├── vocabularyData.js
    │   ├── wasmRustData.js
    │   ├── webComponentsData.js
    │   └── websocketData.js
    ├── store/
    │   ├── useStore.js
    │   └── useStore.test.js
    ├── styles/
    │   └── global.css
    └── utils/
        ├── audioSystem.js
        ├── bleSensorEngine.js
        ├── bleSensorEngine.test.js
        ├── campaignAndExam.test.js
        ├── cloudArchitectureEngine.js
        ├── cloudArchitectureEngine.test.js
        ├── codingChallengesEngine.js
        ├── codingChallengesEngine.test.js
        ├── customChallengesManager.js
        ├── customChallengesManager.test.js
        ├── ebpfXdpEngine.js
        ├── ebpfXdpEngine.test.js
        ├── erdDesignerEngine.js
        ├── erdDesignerEngine.test.js
        ├── gitConflictEngine.js
        ├── gitConflictEngine.test.js
        ├── graphqlSandboxEngine.js
        ├── graphqlSandboxEngine.test.js
        ├── haptics.js
        ├── haptics.test.js
        ├── i18n.js
        ├── ieee754.js
        ├── ieee754.test.js
        ├── ihkGradeCalculations.js
        ├── ihkGradeCalculations.test.js
        ├── ipv6Routing.js
        ├── ipv6Routing.test.js
        ├── itsmEngine.js
        ├── itsmEngine.test.js
        ├── linuxContainerEngine.js
        ├── linuxContainerEngine.test.js
        ├── linuxMemoryEngine.js
        ├── linuxMemoryEngine.test.js
        ├── oauthTokenExchangeEngine.js
        ├── oauthTokenExchangeEngine.test.js
        ├── osSchedulerEngine.js
        ├── osSchedulerEngine.test.js
        ├── p2pQuizEngine.js
        ├── p2pQuizEngine.test.js
        ├── packetSnifferEngine.js
        ├── packetSnifferEngine.test.js
        ├── postgresFlamegraphEngine.js
        ├── postgresFlamegraphEngine.test.js
        ├── postgresMvccEngine.js
        ├── postgresMvccEngine.test.js
        ├── postgresPoolEngine.js
        ├── postgresPoolEngine.test.js
        ├── rackCalculations.js
        ├── rackCalculations.test.js
        ├── regexParserEngine.js
        ├── regexParserEngine.test.js
        ├── scrumEngine.js
        ├── scrumEngine.test.js
        ├── serviceMeshEngine.js
        ├── serviceMeshEngine.test.js
        ├── sm2Algorithm.js
        ├── sm2Algorithm.test.js
        ├── sqlSandboxEngine.js
        ├── sqlSandboxEngine.test.js
        ├── srsAlgorithm.js
        ├── srsAlgorithm.test.js
        ├── storage.js
        ├── storage.test.js
        ├── tcoCalculations.js
        ├── tcoCalculations.test.js
        ├── transformerAttentionEngine.js
        ├── transformerAttentionEngine.test.js
        ├── voiceQuizEngine.js
        ├── voiceQuizEngine.test.js
        ├── webhookSimulator.js
        ├── webhookSimulator.test.js
        ├── wireguardZtnaEngine.js
        ├── wireguardZtnaEngine.test.js
        ├── wisoAbcXyzEngine.js
        ├── wisoAbcXyzEngine.test.js
        ├── wisoCalculations.js
        ├── wisoCalculations.test.js
        ├── wisoContributionMarginEngine.js
        ├── wisoContributionMarginEngine.test.js
        ├── wisoDunningEngine.js
        └── wisoDunningEngine.test.js
```

---

## ⚙️ Funktionsweise

1. **State-Management (`zustand` & `localStorage`)**:
   * Sämtliche Fortschritte (XP, Level, Badges, erledigte Module, Spaced-Repetition-Karten, 365-Tage-Aktivitätshistorie, Custom Challenges, persönliche Notizen) werden rein lokal im Browser gespeichert.
2. **Audio-Synthesizer (`audioSystem.js`)**:
   * Keine schweren Audio-Dateien: Alle Soundeffekte (Erfolg, LevelUp, Fehler, Timer-Glocke) werden in Echtzeit über die Web Audio API synthetisiert und lassen sich stufenlos regulieren oder stummschalten.
3. **PWA & Offline-Fähigkeit (`vite-plugin-pwa`)**:
   * Vollständiger Service-Worker-Precache aller 126 Anwendungs-Chunks für 100% Offline-Nutzung.
4. **Vite 8 & Rolldown Bundle Splitting**:
   * Aufteilung in logische Chunks (`vendor-react`, `vendor-ui`, `vendor-charts-pdf`) für Ladezeiten unter 1 Sekunde.

---

## 🔒 DSGVO & Datenschutz

* **Kein Tracking, keine Analyse-Tools, keine Werbe-Cookies**.
* Alle Daten bleiben auf dem Endgerät des Nutzers.
* Export- und Importfunktion zur einfachen Datensicherung als JSON.

---

## 🚀 Anleitung (Installation & Ausführung)

```bash
# Repository klonen & Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Unit-Tests ausführen (Vitest)
npm test

# Linter ausführen (Oxlint)
npm run lint

# Für Produktion kompilieren
npm run build
```

---

## 📝 Änderungshistorie & Entwicklungsdokumentation

### Version 3.25.0 (Linux eBPF/XDP, Postgres FlameGraph, IHK ABC/XYZ & WireGuard ZTNA Edition)

- **Neu**: `EbpfXdpLab.jsx` & `src/utils/ebpfXdpEngine.js` — Linux eBPF & XDP (eXpress Data Path) Sandbox: High-Speed Paketfilterung auf NIC-Treiberebene (`XDP_DROP`, `XDP_PASS`, `XDP_TX`) und C-Code-Verifikation im virtuellen eBPF Kernel-Verifier (Bounds-Checking, Loop-Safety) in unter 50 Nanosekunden.
- **Neu**: `PostgresFlamegraphLab.jsx` & `src/utils/postgresFlamegraphEngine.js` — PostgreSQL EXPLAIN FlameGraph & Buffer Cache Studio: Hierarchische Zeitverteilung komplexer Abfragen, Shared Buffer Cache Hit Ratios und Erkennung von Seq-Scan-Bottlenecks.
- **Neu**: `WisoAbcXyzLab.jsx` & `src/utils/wisoAbcXyzEngine.js` — IHK WISO ABC- und XYZ-Materialanalyse Studio: Kumulative Wertanteils-Klassifizierung (Lorenz-Kurve: A $\le$ 80%, B $\le$ 95%, C $>$ 95%) und Bedarfsverbrauchs-Vorhersagbarkeit (X/Y/Z Matrix) mit 3x3-Beschaffungsstrategien (Just-in-Time, Vorrat, Einzelbeschaffung).
- **Neu**: `WireguardZtnaLab.jsx` & `src/utils/wireguardZtnaEngine.js` — WireGuard VPN & Zero-Trust Architecture Studio: 1-RTT NoiseIK Handshakes (Curve25519), AllowedIPs Cryptokey Routing und dynamische Zero-Trust Policy Validierung anhand von Device Health Scores.
- **Routing & Navigation**: Vollständige Verknüpfung in `Navbar.jsx`, `CommandPaletteModal.jsx` und `App.jsx`.
- **Test-Suite**: **158 bestandene Unit-Tests** in **51 Test-Dateien** mit 100% Erfolgsquote (vorher 152/47).

### Version 3.24.0 (Linux Container Isolation, Postgres MVCC/Autovacuum, IHK Deckungsbeitrag & OAuth Token Exchange Edition)

- **Neu**: `LinuxContainerLab.jsx` & `src/utils/linuxContainerEngine.js` — Linux Container Isolation & Cgroups v2 Studio: 6 Kern-Namespaces (PID, NET, MNT, UTS, IPC, USER), Cgroups v2 Bandbreiten-Drosselung (`cpu.max`) und OOM-Killer Auslösung bei Überschreitung von `memory.max`.
- **Neu**: `PostgresMvccLab.jsx` & `src/utils/postgresMvccEngine.js` — PostgreSQL MVCC Tuple Headers & Autovacuum Engine: Simulation von `xmin`, `xmax`, `t_ctid`, Dead Tuple Anhäufung bei DML-Operationen, Schwellwertberechnung für Autovacuum ($\text{Threshold} = 50 + 0.2 \times \text{reltuples}$) und Vergleich von `VACUUM` (FSM) vs. `VACUUM FULL` (`AccessExclusiveLock`).
- **Neu**: `WisoContributionMarginLab.jsx` & `src/utils/wisoContributionMarginEngine.js` — IHK WISO Deckungsbeitrags- & Break-Even-Point Studio: Stückdeckungsbeitrag ($db = p - k_v$), Gewinnschwelle ($x_{\text{BEP}} = \frac{K_f}{db}$) und mehrstufige Fixkostenspaltung (Erzeugnis-, Gruppen-, Bereichs- und Unternehmensfixkosten).
- **Neu**: `OauthTokenExchangeLab.jsx` & `src/utils/oauthTokenExchangeEngine.js` — OAuth 2.0 Token Exchange Studio (RFC 8693): Token Delegation mit Actor-Claim (`act: { sub: "gateway" }`) vs. Impersonation und Live RFC 8693 POST-Request / JWT-Payload Inspector.
- **Routing & Navigation**: Vollständige Integration in `Navbar.jsx`, `CommandPaletteModal.jsx` und `App.jsx`.
- **Test-Suite**: **152 bestandene Unit-Tests** in **47 Test-Dateien** mit 100% Erfolgsquote (vorher 142/43).

### Version 3.23.0 (Linux Virtual Memory, Postgres Connection Pool, IHK Skonto/Mahnwesen & Service Mesh mTLS Edition)

- **Neu**: `LinuxMemoryLab.jsx` & `src/utils/linuxMemoryEngine.js` — Linux Virtual Memory & Page Fault Studio: MMU Adressübersetzung via TLB (L1/L2 Cache), Minor Page Faults (OS Page Cache) vs. Major Page Faults (Disk Swap I/O) und dynamischer Linux OOM-Score-Rechner (`/proc/[pid]/oom_score`).
- **Neu**: `PostgresPoolLab.jsx` & `src/utils/postgresPoolEngine.js` — PostgreSQL Connection Pooling & SQL Isolation Studio: Vergleich von Session-, Transaction- und Statement-Pooling mit PgBouncer zur Reduzierung des RAM-Footprints um über 90% sowie interaktive SQL Isolation Anomaly Matrix (Dirty Reads, Non-Repeatable Reads, Phantoms, Serialization Anomalies).
- **Neu**: `WisoDunningLab.jsx` & `src/utils/wisoDunningEngine.js` — IHK WISO Skonto-Effektivzins, Verzugszinsen & Mahnwesen Studio: Berechnung des effektiven Jahreszinses bei Skontonutzung ($p_{\text{eff}} = \frac{\text{Skonto\%} \times 360}{\text{Zahlungsziel} - \text{Skontofrist}}$), BGB § 288 Verzugszinsen (B2B vs. B2C) und 3-stufiges gerichtliches Mahnverfahren.
- **Neu**: `ServiceMeshLab.jsx` & `src/utils/serviceMeshEngine.js` — Service Mesh mTLS & Envoy Sidecar Studio: Envoy Proxy Traffic Interception (iptables `15001`), SPIFFE/SPIRE X.509 mTLS Identitäten, dynamisches Canary Traffic Shifting (z. B. 90/10 Split) und Validierung von Istio `VirtualService` / `PeerAuthentication` YAML Manifesten.
- **Neu**: `src/utils/haptics.js` — Web Vibration API Integration mit haptischem Feedback (`SUCCESS`, `WARNING`, `LEVEL_UP`).
- **Routing & Navigation**: Nahtlose Integration aller neuen Labs in `Navbar.jsx`, `CommandPaletteModal.jsx` und `App.jsx`.
- **Test-Suite**: **142 bestandene Unit-Tests** in **43 Test-Dateien** mit 100% Erfolgsquote (vorher 129/38).

### Version 3.10.0 (OAuth PKCE, K8s Topology & WebRTC Mesh Edition)
- **Neu**: `OauthPkceStudioLab.jsx` & `oauthPkceEngine.js` mit RFC 7636 PKCE ($S256$ SHA-256 Code Challenge), Consent Screen, Token Exchange, JWT Decoder und Bearer Token API Access.
- **Neu**: `KubernetesClusterStudioLab.jsx` & `k8sClusterEngine.js` mit visueller Control Plane, Worker Node Kapazitäten, automatischer Pod-Eviction / Self-Healing bei Node-Ausfällen und Ingress-to-Service Round-Robin Load Balancing.
- **Neu**: `WebRtcPeerStudioLab.jsx` & `webrtcPeerEngine.js` mit Dual-Peer Visualisierung (Caller & Callee), SDP Offer/Answer Handshake über Signaling Server, STUN/TURN ICE Candidates und Live DataChannel Chat mit Latenz- & Paketverlust-Simulation.
- **Aktualisiert**: `Navbar.jsx`, `CommandPaletteModal.jsx` und `App.jsx` für nahtloses Routing und Schnellzugriff.
- **Test-Suite**: Erweiterung auf **129 bestandene Unit-Tests** in **38 Test-Dateien** mit 100% Erfolgsquote.

### Version 3.9.0 (WASM, Crypto & PWA Push Edition)
- **Neu**: `WasmCompilerPlaygroundLab.jsx` & `wasmParserEngine.js` mit direktem In-Browser C/Rust Kompiler-Playground und WebAssembly Hex-Sektionsinspektor.
- **Neu**: `ZkpCryptoVisualizerLab.jsx` & `zkpCryptoEngine.js` mit interaktivem Elliptische-Kurven Visualisierer und Zero-Knowledge Proof (Schnorr) Simulation für Prover (Alice) & Verifier (Bob).
- **Neu**: `pushNotificationManager.js` zur lokalen PWA Push-Notification Planung, direkt integriert in `Sm2SpacedRepetitionLab.jsx` für tägliche Lern-Erinnerungen.
- **Aktualisiert**: `Navbar.jsx`, `CommandPaletteModal.jsx` und `App.jsx` für vollständiges Routing.
- **Test-Suite**: Weitere Erhöhung der Test-Abdeckung (**114 bestandene Unit-Tests** in **35 Test-Dateien**).

### Version 3.8.0 (Next-Gen Engineering, Architecture & IHK Power Edition)
- **Neu**: `OsProcessSchedulerLab.jsx` & `osSchedulerEngine.js` mit CPU-Scheduling (FCFS, SJF, Round Robin, Priority), animiertem Gantt-Chart und Bankier-Algorithmus zur Deadlock-Vermeidung.
- **Neu**: `PacketSnifferLab.jsx` & `packetSnifferEngine.js` mit Schichten 2–7 Paket-Dissektion, synchronem Hex-Dump/ASCII-Viewer und Wireshark-Display-Filtern.
- **Neu**: `ErdDesignerLab.jsx` & `erdDesignerEngine.js` mit relationalem ERD-Designer, 1NF–3NF Normalform-Audit und Multi-Dialekt SQL DDL Generator.
- **Neu**: `TransformerAttentionLab.jsx` & `transformerAttentionEngine.js` mit Scaled Dot-Product Self-Attention Heatmap ($QK^T / \sqrt{d_k}$), Temperature / Top-P Sampling und autonomem ReAct AI Agenten-Trace.
- **Neu**: `CloudArchitectureCanvasLab.jsx` & `cloudArchitectureEngine.js` mit Cloud-Topologie-Planung, Compound SLA-Berechnung ($A_{\text{ges}}$), Ausfallzeit-Kalkulation und SPOF-Linter.
- **Neu**: `IhkGradeCalculatorLab.jsx` & `ihkGradeCalculations.js` mit offizieller AO 2020 IHK-Gewichtung (AP1/AP2/Projekt) und Mündliche Ergänzungsprüfung (MEP) Rechner.
- **Neu**: `RackConfiguratorLab.jsx` & `rackCalculations.js` mit 42HE Serverschrank, Schein-/Wirkleistungsberechnung ($VA, W$), USV-Akkulaufzeit und BTU/h Klimakühlung.
- **Neu**: `ItsmSimulatorLab.jsx` & `itsmEngine.js` mit ITIL 4 Incident/Problem/Change Warteschlange, SLA-Countdowns und Change Advisory Board (CAB) Risikobewertung.
- **Neu**: `Sm2SpacedRepetitionLab.jsx` & `sm2Algorithm.js` mit wissenschaftlichem SuperMemo SM-2 Algorithmus und interaktiver Ebbinghaus-Vergessenskurve.
- **Neu**: `PersonalNotebookLab.jsx` mit Markdown-Editor, Tag-Suche, LocalStorage Auto-Save und `.md`-Export.
- **Aktualisiert**: `Navbar.jsx`, `CommandPaletteModal.jsx` und `App.jsx` mit vollständiger Integration aller neuen Flaggschiff-Module und Dashboard-Schnellzugriffen.
- **Test-Suite**: Erfolgreich erweitert auf **102 bestandene Unit-Tests** in **33 Test-Dateien** mit 100% Erfolgsquote.

### Version 3.7.0 (Agile, GraphQL & IoT Edition)
- **Neu**: `AgileScrumSimulatorLab.jsx` & `scrumEngine.js` mit Kanban-Board, Story Point Estimation und Recharts Burndown-Charts.
- **Neu**: `GraphqlExplorerStudioLab.jsx` & `graphqlSandboxEngine.js` mit In-Browser GraphQL Query-Engine und Abstract Syntax Tree (AST) Visualizer.
- **Neu**: `BleSensorSimulatorLab.jsx` & `bleSensorEngine.js` mit Bluetooth Low Energy GATT-Server Simulation, Sensor-Telemetrie und Byte-Dekodierung.
- **Aktualisiert**: Navigation in `Navbar.jsx`, `LabsDashboard.jsx`, `CommandPaletteModal.jsx` und `App.jsx`.

### Version 3.6.0 (Event-Driven & Speech Edition)
- **Neu**: `RegexRailroadVisualizerLab.jsx` & `regexParserEngine.js` mit visuellen Eisenbahndiagrammen, Syntax-Bäumen und Live-Matching.
- **Neu**: `WebhookInspectorLab.jsx` & `webhookSimulator.js` mit simuliertem HTTP-Webhook-Server, Request-Logs und Header-Signaturen.
- **Neu**: `VoiceQuizStudioLab.jsx` & `voiceQuizEngine.js` mit sprachgesteuertem Audio-Quiz zu Podcast-Themen via Web Speech API.
