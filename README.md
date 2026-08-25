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
    │   │   ├── KubernetesLab.jsx
    │   │   ├── LabsDashboard.jsx
    │   │   ├── LanguageAcademy.jsx
    │   │   ├── LeitnerFlashcardLab.jsx
    │   │   ├── LinuxPermissionsLab.jsx
    │   │   ├── LiveCodingChallengeStudio.jsx
    │   │   ├── MonacoStudioLab.jsx
    │   │   ├── NeuralNetVisualizerLab.jsx
    │   │   ├── OauthOidcLab.jsx
    │   │   ├── OauthPkceStudio.jsx
    │   │   ├── OsProcessSchedulerLab.jsx
    │   │   ├── OwaspExploitLab.jsx
    │   │   ├── P2pQuizDuellLab.jsx
    │   │   ├── PacketSnifferLab.jsx
    │   │   ├── PacketTracerLab.jsx
    │   │   ├── PerformanceProfilingLab.jsx
    │   │   ├── PersonalNotebookLab.jsx
    │   │   ├── PostgresExplainVisualizerLab.jsx
    │   │   ├── PostgresMvccLab.jsx
    │   │   ├── PythonWasmLab.jsx
    │   │   ├── RackConfiguratorLab.jsx
    │   │   ├── RagAiSimulator.jsx
    │   │   ├── RedBlueTeamLab.jsx
    │   │   ├── RedisCachingLab.jsx
    │   │   ├── RegexMasterLab.jsx
    │   │   ├── RegexRailroadVisualizerLab.jsx
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
    │   │   ├── WasmRustLab.jsx
    │   │   ├── WasmRustStudio.jsx
    │   │   ├── WebComponentsHub.jsx
    │   │   ├── WebRtcSignalingLab.jsx
    │   │   ├── WebSocketProtocolLab.jsx
    │   │   ├── WebSocketsLab.jsx
    │   │   ├── WebhookInspectorLab.jsx
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
        ├── erdDesignerEngine.js
        ├── erdDesignerEngine.test.js
        ├── gitConflictEngine.js
        ├── gitConflictEngine.test.js
        ├── graphqlSandboxEngine.js
        ├── graphqlSandboxEngine.test.js
        ├── i18n.js
        ├── ieee754.js
        ├── ieee754.test.js
        ├── ihkGradeCalculations.js
        ├── ihkGradeCalculations.test.js
        ├── ipv6Routing.js
        ├── ipv6Routing.test.js
        ├── itsmEngine.js
        ├── itsmEngine.test.js
        ├── osSchedulerEngine.js
        ├── osSchedulerEngine.test.js
        ├── p2pQuizEngine.js
        ├── p2pQuizEngine.test.js
        ├── packetSnifferEngine.js
        ├── packetSnifferEngine.test.js
        ├── rackCalculations.js
        ├── rackCalculations.test.js
        ├── regexParserEngine.js
        ├── regexParserEngine.test.js
        ├── scrumEngine.js
        ├── scrumEngine.test.js
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
        ├── wisoCalculations.js
        └── wisoCalculations.test.js
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
