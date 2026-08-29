# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen für Einsteiger (ohne Vorkenntnisse), IHK Berufsschul-Lernfeldern (ausbildung-in-der-it.de LF 1 - 12b), Linux POSIX VFS Terminal Sandbox mit Pipes & Systemd, IHK Projektdokumentation & Nutzwertanalyse-Assistent (AO 2020), Chaos Engineering & Microservice Resilience Studio, CI/CD Pipeline DAG Studio & Runner, OS Prozess-Scheduling & Bankier-Deadlock-Algorithmus, Web-Wireshark Packet Sniffer & Frame Analyzer, Relationalem ERD Designer & 1NF–3NF Normalform-Linter, Transformer Attention & LLM Sampling Studio, Cloud Architecture SLA & SPOF Canvas, IHK Noten- & MEP-Rechner (AO 2020), 19"-Server-Rack & USV/Klimarechner, ITIL 4 ITSM Service Desk Simulator, SuperMemo SM-2 Spaced Repetition Mastery mit Ebbinghaus-Kurven, Developer Notizbuch & Markdown Vault, Scrum Sprint & Kanban Simulator, GraphQL Schema & Query Explorer (AST Visualizer), Bluetooth Low Energy (BLE) & GATT Sensor Studio, RegEx Railroad Diagramm Studio, REST API Webhook Inspector & Mock Server, Podcast Voice Quiz Studio, TCO & ROI Wirtschaftlichkeits-Simulator, Git 3-Way Merge Conflict Resolver, Custom Coding Challenge Creator, P2P Multiplayer / LAN Quiz-Duell Arena, SQLite & Relational In-Browser Database Sandbox, Live Coding Challenge Studio, WISO- & Handelskalkulations-Studio, IEEE-754 Gleitkomma & Zahlen-Lab, IPv6 & Routing-Table Simulator, OWASP Top 10 Live-Exploit Sandbox, Neural Network & BPE Tokenizer Studio, druckfertigem IHK Cheat-Sheet PDF-Generator, 365-Tage GitHub-Style Aktivitäts-Heatmap, Pomodoro-Fokus-Timer, Web-Audio SFX-Controller, W3Schools-Style Programmier-Masterclasses, Coursera Deep Learning, Praxis-Projekten, Advanced Prompt Engineering, OAuth2 & OpenID Connect, WebSockets, Performance Profiling, Kubernetes, Local RAG Vector AI, WebAssembly & Rust, Apache Kafka, Docker & Containerisierung, CI/CD, Cybersecurity Red vs Blue Team, 10+ Programmiersprachen, TDD Unit-Testing, i18n Mehrsprachigkeit, Systemarchitektur, Microservices, Design Patterns, Datenbanken, IT-Sicherheit, Logikschaltungen, Netzwerken, Big-O Komplexität, Karriere-Roadmaps, Boss-Battles, Code Typing Speedrun, PWA Offline-Support, Vokabeln und Quizzes – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

---

## 📋 Inhaltsverzeichnis
- [Übersicht & Zielgruppen](#-übersicht--zielgruppen)
- [Hauptfunktionen & Neue Features (v3.15.0)](#-hauptfunktionen--neue-features-v3150)
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
   - **Linux POSIX Terminal & VFS Sandbox (`LinuxVfsTerminalLab.jsx` & `linuxVfsEngine.js`)**: Vollwertiges hierarchisches In-Memory Dateisystem, Pipes (`|`), Redirections (`>`, `>>`), POSIX-Befehle (`ls`, `cat`, `grep`, `wc`, `find`, `chmod`, `chown`, `systemctl`) und interaktive SysAdmin-Notfall-Challenges.
   - **IHK Projektdokumentation & Nutzwertanalyse-Studio (`IhkProjectPlannerLab.jsx` & `ihkProjectPlannerEngine.js`)**: Phasen- und Stundenplanung (80h FIAE / 40h FISI nach AO 2020), K.O.-Kriterien gewichtete Nutzwertanalyse (NWA), 3-Jahres-Amortisation (ROI) und druckfertiger Markdown-Export.
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
   - **Chaos Engineering & Resilience Studio (`ChaosEngineeringLab.jsx` & `chaosEngineeringEngine.js`)**: Microservices Fault Injection, Cascading Failures, Circuit Breaker, Rate Limiter, Retry mit Exponential Backoff & Fallback Cache Simulation.
   - **CI/CD Pipeline DAG Studio & Runner (`CiCdPipelineBuilderLab.jsx` & `cicdPipelineBuilderEngine.js`)**: Directed Acyclic Graph Pipeline-Editor, Zyklen-Erkennung, topologische Stage-Sortierung, Live Streaming Logs & GitHub Actions YAML Export.
   - **Cloud Architecture SLA & SPOF Canvas (`CloudArchitectureCanvasLab.jsx` & `cloudArchitectureEngine.js`)**: Multi-Tier Topologie-Planung, Compound Availability ($A_{\text{ges}}$), Ausfallzeiten-Rechner und Single-Point-of-Failure Audit.
   - **Transformer Attention & LLM Playground (`TransformerAttentionLab.jsx` & `transformerAttentionEngine.js`)**: Scaled Dot-Product Self-Attention Heatmap, Temperature / Top-P / Top-K Token Sampling und autonome AI-Agenten ReAct-Loops.
   - **GraphQL Schema & Query Explorer (`GraphqlExplorerStudioLab.jsx`)**, **RegEx Railroad Visualizer**, **Webhook Inspector**, **Git 3-Way Merge Conflict Resolver**, **Custom Challenge Creator**, **SQLite WASM Studio** und **Live Coding Challenge Studio**.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - **OWASP Top 10 Live-Exploit Sandbox** (XSS, SQLi, CSRF, IDOR), **Deep Learning Neural Network Forward-Propagation**, **Byte-Pair Encoding (BPE) Tokenizer**, OAuth2 PKCE & JWT Claims Decoding, WebSockets HTTP 101 Handshake, V8 Performance & Memory Leak Profiling, Kubernetes Deployments & RAG Vector AI Pipelines.

---

## 🔥 Hauptfunktionen & Neue Features (v3.12.0 High-Resilience Engineering, POSIX Ecosystem & IHK Documentation Power Edition)

* **🐧 Linux POSIX Terminal & VFS Sandbox (`LinuxVfsTerminalLab.jsx` & `linuxVfsEngine.js`)**:
  * Vollständig in-memory simuliertes, hierarchisches Unix/Linux-Dateisystem (`/`, `/etc`, `/var/log`, `/home/dev`, `/bin`).
  * Echter Unix Command-Parser mit Unterstützung für **Pipes (`|`)**, Output-Redirection (`>`, `>>`) und Standard-Tools (`ls -la`, `cd`, `pwd`, `cat`, `grep`, `wc -l`, `find`, `chmod`, `chown`, `systemctl`, `df -h`, `free -m`, `ps aux`, `echo`, `head`, `tail`, `touch`, `mkdir`, `rm`).
  * Systemd Service-Manager zur Verwaltung von Dämonen (`nginx.service`, `postgresql.service`, `redis.service`).
  * 4 praxisnahe **SysAdmin-Notfall-Szenarien** mit automatischem Zustand-Audit & XP-Belohnung (Webserver 502 Bad Gateway beheben, Security Audit & Berechtigungen härten, Disk Space Cleanup & Log-Rotation, User Onboarding).
* **📝 IHK Projektdokumentation & Nutzwertanalyse-Studio (`IhkProjectPlannerLab.jsx` & `ihkProjectPlannerEngine.js`)**:
  * Phasen- und Stundenrechner konform mit der Prüfungsordnung **AO 2020** (80h FIAE / 40h FISI).
  * Validierung der IHK-Phasenverteilung (Analyse, Entwurf, Implementierung, Qualitätssicherung, Dokumentation) mit Warnungen bei Über-/Unterschreitungen.
  * Interaktive **Nutzwertanalyse (NWA)** mit Gewichtungsprozenten ($\sum = 100\%$), K.O.-Kriterien und Recharts-Balkendiagrammen.
  * Wirtschaftlichkeitsrechnung (Entwicklungskosten, Einsparungen, Amortisation & 3-Jahres-ROI).
  * 1-Klick **Druckfertiger Markdown-Export** für den IHK-Abschlussbericht.
* **🔥 Chaos Engineering & Resilience Studio (`ChaosEngineeringLab.jsx` & `chaosEngineeringEngine.js`)**:
  * Topologie-Graph mit 5 Microservices (`api_gateway`, `auth_service`, `order_service`, `payment_service`, `inventory_db`).
  * Fault-Injections: Latenz-Spitzen ($+2200\,\text{ms}$), 500er Crashes, Connection-Pool-Erschöpfung und Cascading Failures.
  * Interaktives Zuschalten von Resilienz-Patterns: **Circuit Breaker** (Open/Half-Open/Closed), **Token Bucket Rate Limiter**, **Exponential Backoff Retries**, **Fallback Cache** und **Bulkhead-Isolation**.
* **⚙️ CI/CD Pipeline DAG Studio & Runner (`CiCdPipelineBuilderLab.jsx` & `cicdPipelineBuilderEngine.js`)**:
  * Directed Acyclic Graph (DAG) Editor zur Definition abhängiger Build-, Test-, Lint-, Security- und Deploy-Jobs.
  * Automatische **Zyklen-Erkennung** (DFS-Algorithmus) und Berechnung paralleler Ausführungs-Stages (Topologische Sortierung).
  * Live Streaming-Runner mit ANSI-Farben und realistischen Build-Logs.
  * Export in produktionsfertiges **GitHub Actions Workflow YAML** (`.github/workflows/pipeline.yml`).
* **📱 Mobile Swipe-Gesten & Web Vibration Haptics (`src/utils/haptics.js`)**:
  * Native Web Vibration API Integration mit haptischem Feedback bei richtigen/falschen Antworten (`SUCCESS`, `WARNING`, `LEVEL_UP`).
  * Tinder-Style Swipe-Gesten mit Framer-Motion für schnelles Lernen im Leitner- und SM-2 Karteikarten-Studio.
* **⭐ Bookmark & Favoriten-System (`LabsDashboard.jsx`, `storage.js`, `useStore.js`)**:
  * 1-Klick Stern-Favoriten auf allen Lab-Karten.
  * Schneller Filter-Tab `"⭐ Favoriten (N)"` im Labs-Hub für gezielten Direktzugriff.
* **⚡ Command Palette Quick Calculators (`CommandPaletteModal.jsx`)**:
  * Direkte Schnellrechner im Strg+K-Suchfeld:
    * **CIDR Subnetting**: Eingabe `/24` $\rightarrow$ berechnet sofort nutzbare Hosts & Subnetzmaske.
    * **Zahlenbasis-Konverter**: Eingabe `hex 255` oder `bin 42` $\rightarrow$ sofortige Hex/Binär-Umrechnung.
    * **Arithmetik-Eval**: Direkte mathematische Berechnungen.
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
├── playwright.config.js
├── README.md
├── vercel.json
├── vite.config.js
├── vitest.setup.js
├── e2e/
│   ├── accessibility.spec.js
│   ├── command-palette.spec.js
│   ├── helpers.js
│   ├── lab-smoke.spec.js
│   └── onboarding.spec.js
├── public/
│   ├── 404.html
│   ├── _redirects
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
    │   │   ├── ChaosEngineeringLab.jsx
    │   │   ├── CiCdMatrixLinterLab.jsx
    │   │   ├── CiCdPipelineBuilderLab.jsx
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
    │   │   ├── IhkProjectPlannerLab.jsx
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
    │   │   ├── LinuxVfsTerminalLab.jsx
    │   │   ├── LiveCodingChallengeStudio.jsx
    │   │   ├── MonacoStudioLab.jsx
    │   │   ├── NeuralNetVisualizerLab.jsx
    │   │   ├── OauthOidcLab.jsx
    │   │   ├── OauthPkceStudio.jsx
    │   │   ├── OsProcessSchedulerLab.jsx
    │   │   ├── OwaspExploitLab.jsx
    │   │   ├── P2pCodeDuelLab.jsx
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
    │   │   ├── SqlQueryExecutionPlanLab.jsx
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
    │   │   ├── navLinks.test.js
    │   │   └── PomodoroTimerWidget.jsx
    │   ├── Onboarding/
    │   │   ├── FirstVisitTourOverlay.jsx
    │   │   └── RoleSelectionModal.jsx
    │   └── Projects/
    │       └── ProjectViewer.jsx
    ├── data/
    │   ├── advancedLabs.test.js
    │   ├── advancedLabsData.js
    │   ├── aiBusinessData.js
    │   ├── algorithmData.js
    │   ├── anfaengerGuideData.js
    │   ├── apiStudioData.js
    │   ├── labRegistry.js
    │   ├── labRegistry.smoke.test.jsx
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
        ├── adaptiveLearningEngine.js
        ├── adaptiveLearningEngine.test.js
        ├── audioSystem.js
        ├── bleSensorEngine.js
        ├── bleSensorEngine.test.js
        ├── campaignAndExam.test.js
        ├── chaosEngineeringEngine.js
        ├── chaosEngineeringEngine.test.js
        ├── cicdPipelineBuilderEngine.js
        ├── cicdPipelineBuilderEngine.test.js
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
        ├── haptics.js
        ├── haptics.test.js
        ├── i18n.js
        ├── i18nContentPilot.test.js
        ├── ieee754.js
        ├── ieee754.test.js
        ├── ihkGradeCalculations.js
        ├── ihkGradeCalculations.test.js
        ├── ihkOralExamEngine.js
        ├── ihkOralExamEngine.test.js
        ├── ihkProjectPlannerEngine.js
        ├── ihkProjectPlannerEngine.test.js
        ├── ipv6Routing.js
        ├── ipv6Routing.test.js
        ├── itsmEngine.js
        ├── itsmEngine.test.js
        ├── k8sClusterEngine.js
        ├── k8sClusterEngine.test.js
        ├── linuxVfsEngine.js
        ├── linuxVfsEngine.test.js
        ├── oauthPkceEngine.js
        ├── oauthPkceEngine.test.js
        ├── osSchedulerEngine.js
        ├── osSchedulerEngine.test.js
        ├── p2pCodeDuelEngine.js
        ├── p2pCodeDuelEngine.test.js
        ├── p2pQuizEngine.js
        ├── p2pQuizEngine.test.js
        ├── packetSnifferEngine.js
        ├── packetSnifferEngine.test.js
        ├── pcapParserEngine.js
        ├── pcapParserEngine.test.js
        ├── rackCalculations.js
        ├── rackCalculations.test.js
        ├── regexParserEngine.js
        ├── regexParserEngine.test.js
        ├── scrumEngine.js
        ├── scrumEngine.test.js
        ├── sm2Algorithm.js
        ├── sm2Algorithm.test.js
        ├── sqlQueryExecutionEngine.js
        ├── sqlQueryExecutionEngine.test.js
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

### Version 3.15.0 (SQL Query Plan Optimization, Wireshark PCAP Stream Engine, Adaptive IHK Examiners & P2P Code Duel Edition)

- **Neu**: `SqlQueryExecutionPlanLab.jsx` & `src/utils/sqlQueryExecutionEngine.js` — SQL Query Execution Plan & Cost Optimizer Studio: AST-Zerlegung, physischer Ausführungsbaum (Plan Tree), I/O-Kostenberechnung (Cost Units), B-Tree Index Scans vs Full Table Scans, Hash Joins, HashAggregate, Memory-Sorts und automatische Empfehlungs-Engine für fehlende Indizes.
- **Neu**: `src/utils/pcapParserEngine.js` & Wireshark Stream Integration — Echter Libpcap Binär-Parser und Exporter (`.pcap` 24-Byte Global Header + 16-Byte Packet Header): Ermöglicht das Herunterladen und Hochladen von echten Packet-Captures direkt im Web-Wireshark `PacketSnifferLab.jsx`.
- **Neu**: `src/utils/ihkOralExamEngine.js` & Multi-Prüfer-Simulation — IHK-Prüfer-Personas (Dr. Jansen / Sabine Meier / Klaus Weber), adaptive Folgefragen mit Keyword-Erkennung und offizielle IHK-Bewertungsmatrix nach AO 2020 im `IhkOralExamSimulator.jsx`.
- **Neu**: `P2pCodeDuelLab.jsx` & `src/utils/p2pCodeDuelEngine.js` — Live Coding-Duell & Speedrun Arena: Echtzeit-Programmierwettkampf mit automatischem In-Browser Test-Runner, synchronisiertem Fortschritts-Race gegen KI-Bot "Azubi-Bot Max" und 3 LeetCode/IHK-Herausforderungen.
- **Codebase-Weite Bereinigung & Stabilität**:
  - Oxlint auf 0 Warnungen und 0 Fehler über alle 287 Quellcodedateien gehalten.
  - Alle 108 interaktiven Labs im Smoke-Test validiert (`labRegistry.smoke.test.jsx`).
- **Test-Suite**: **313 bestandene Unit- & Smoke-Tests** in **56 Test-Dateien** mit 100% Erfolgsquote (vorher 296/52).

### Version 3.14.0 (High-Resilience Engineering, POSIX Ecosystem & IHK Documentation Power Edition)

- **Neu**: `LinuxVfsTerminalLab.jsx` & `src/utils/linuxVfsEngine.js` — Vollwertige In-Memory Linux POSIX Terminal & VFS Sandbox mit Pipes (`|`), Redirections (`>`, `>>`), POSIX-Befehlen (`ls -la`, `cd`, `pwd`, `cat`, `grep`, `wc -l`, `find`, `chmod`, `chown`, `systemctl`, `df -h`, `free -m`, `ps aux`, `echo`, `head`, `tail`, `touch`, `mkdir`, `rm`) und 4 praxisnahen SysAdmin-Notfall-Challenges mit automatischer Zustands-Validierung und XP-Vergabe.
- **Neu**: `IhkProjectPlannerLab.jsx` & `src/utils/ihkProjectPlannerEngine.js` — IHK Projektdokumentations- und Nutzwertanalyse-Studio nach AO 2020: Phasen- und Stundenrechner (80h FIAE / 40h FISI), automatischer Phasen-Check, interaktive Nutzwertanalyse (NWA) mit K.O.-Kriterien und Recharts-Balkendiagrammen, 3-Jahres-Amortisationsrechner (ROI) und druckfertiger Markdown-Export für den IHK-Abschlussbericht.
- **Neu**: `ChaosEngineeringLab.jsx` & `src/utils/chaosEngineeringEngine.js` — Microservices Chaos Engineering & Resilience Studio: Fault Injections (Latenz-Spitzen, 500er Crashes, DB-Pool-Erschöpfung, kaskadierende Ausfälle) mit interaktiv zuschaltbaren Schutzmustern (Circuit Breaker, Rate Limiter, Retry mit Exponential Backoff, Fallback Cache, Bulkhead-Isolation).
- **Neu**: `CiCdPipelineBuilderLab.jsx` & `src/utils/cicdPipelineBuilderEngine.js` — CI/CD Pipeline DAG Studio & Runner: Directed Acyclic Graph Editor, automatische Zyklen-Erkennung, topologische Sortierung paralleler Ausführungsstufen, Live-Streaming-Runner-Simulation und Export in GitHub Actions Workflow YAML.
- **Neu**: `src/utils/haptics.js` & Mobile Swipe-Gesten — Web Vibration API Integration mit haptischem Feedback (`SUCCESS`, `WARNING`, `LEVEL_UP`) und flüssigen Tinder-Style Swipe-Gesten via Framer-Motion im Leitner- und SM-2 Karteikarten-Studio.
- **Neu**: Bookmark- & Favoriten-System — 1-Klick Stern-Favoriten auf allen Lab-Karten (`LabsDashboard.jsx`), gespeichert in `userState.bookmarkedLabs` (`storage.js` & `useStore.js`) mit direktem Filter-Tab `"⭐ Favoriten (N)"` im Labs-Hub.
- **Neu**: Command Palette Quick Calculators — Strg+K Schnellrechner für CIDR Subnetting (`/24` $\rightarrow$ Hosts & Maske), Zahlenbasis-Konvertierung (`hex 255`, `bin 42`) und Inline-Arithmetik.
- **Codebase-Weite Bereinigung & Stabilität**:
  - Oxlint auf 0 Warnungen und 0 Fehler gebracht.
  - Konstanten und Datensätze sauber in `src/data/flashcardsData.js`, `src/data/anfaengerGuideData.js`, `src/data/roadmapData.js` und `src/utils/regexParserEngine.js` ausgelagert.
  - Alle 106 registrierten Labs im Smoke-Test validiert (`labRegistry.smoke.test.jsx`).
- **Test-Suite**: **296 bestandene Unit- & Smoke-Tests** in **52 Test-Dateien** mit 100% Erfolgsquote (vorher 271/47).

### Version 3.13.0 (Hosting-Fallback, Volltextsuche, i18n-Pilot, Lernpfade, Onboarding-Tour & E2E/A11y-Tests)

- **Neu**: SPA-Fallback-Konfiguration für alle drei gängigen Hosting-Ziele (`public/404.html`
  + Gegenstück-Script in `index.html` für GitHub Pages, `public/_redirects` für Netlify,
  `vercel.json` für Vercel) — vorher hätte ein direkter Aufruf/Reload einer Lab-URL (z. B.
  `/subnetting`) auf einem echten Static-Host einen 404 geworfen, da react-router zwar schon
  clientseitig sauber routet, es aber keine serverseitige Fallback-Regel gab.
- **`favicon.svg` korrekt verlinkt**: `index.html` verwies auf ein nie existierendes
  `/vite.svg` (Standard-Vite-Template-Überbleibsel) statt auf das tatsächlich vorhandene
  `public/favicon.svg`.
- **Command Palette durchsucht jetzt alle 102 Labs**: vorher matchte die Suche nur Titel
  einer handverlesenen `staticActions`-Liste. Neu werden zusätzlich Beschreibung und Tags
  jedes `LAB_REGISTRY`-Eintrags durchsucht — z. B. findet "Bankier" jetzt den OS-Scheduler,
  auch wenn er nicht in der kuratierten Liste steht.
- **i18n-Content-Pilot (Einsteiger-Bereich)**: `AnfaengerGuideHub` (alle 4 Guides) und die
  `ihk_basics`-Kategorie der Quiz Arena sind jetzt vollständig zweisprachig (DE/EN), nach
  demselben Muster wie die bereits zweisprachigen Rollen-Profile in `userProfiles.js`.
- **Geführte Lernpfade**: `RecommendationsWidget` verlinkt bei einer Wissenslücke jetzt
  gezielt auf ein passendes Lab (z. B. "Netzwerke & Subnetting" → Subnetting-Rechner) statt
  pauschal nur zurück zum Prüfungssimulator. `CareerRoadmap`-Schritte können jetzt ebenfalls
  auf ein passendes Lab verlinken ("Lab öffnen"-Button), wo ein sinnvolles existiert.
- **6 komplett unerreichbare Labs jetzt zusätzlich verlinkt**: dank der neuen Kategorie- und
  Lernpfad-Verlinkung sind `subnetting`, `ai` und weitere zuvor nur über den Hub erreichbare
  Labs jetzt auch direkt aus den adaptiven Empfehlungen und Roadmaps ansteuerbar.
- **Neu**: Einmalige Erste-Schritte-Tour (`FirstVisitTourOverlay`) nach dem ersten Besuch
  (3 Schritte: Schnellsuche, Labs-Hub, adaptive Empfehlungen), persistiert über
  `userState.hasSeenTour`.
- **Neu**: Playwright-E2E-Tests (`e2e/`) für Onboarding, Command Palette und einen
  Lab-Smoke-Test in echten Browsern (ergänzt den bestehenden jsdom-basierten
  `labRegistry.smoke.test.jsx`, der z. B. keine echten Layout-/Canvas-Eigenheiten prüft) —
  neues Skript `npm run test:e2e`, neue CI-Pipeline-Stufe.
- **Neu**: Automatisierte Barrierefreiheitsprüfung (`@axe-core/playwright`) auf Dashboard,
  einem Lab und im Hochkontrast-Modus. Fand echte, app-weite Probleme, die jetzt behoben sind:
  - **~21 Range-Slider ohne zugängliches Label** (kritisch, WCAG 4.1.2) app-weit ergänzt um
    `aria-label` (rein additiv, keine optische Änderung).
  - **Akzentfarben-Kontrast**: `--accent-teal`, `--accent-amber` und `--accent-emerald`
    erreichten als Badge-/Label-Text auf hellem Grund nur 2.85–3.76:1 Kontrast statt der
    WCAG-AA-Mindestanforderung von 4.5:1 — leicht abgedunkelt (siehe `global.css`).
  - **Hochkontrast-Modus unlesbar**: der aktive Hell/Dunkel-Umschalter in der Navbar nutzte
    hartkodiertes weißes Text auf `var(--accent-primary)`-Hintergrund, der im
    Hochkontrast-Modus zu leuchtendem Cyan wird (1.25:1 statt 4.5:1) — neues
    `--on-accent-text`-Token behebt das themenübergreifend korrekt.
  - **Gesperrte Skill-Tree-Knoten unlesbar**: `opacity: 0.6` auf einem bereits dunkel
    getönten Hintergrund verwässerte den Text auf 1.69:1 — Hintergrund auf `--bg-tertiary`
    umgestellt, Opacity-Trick entfernt (gestrichelter Rahmen + Schloss-Icon reichen als
    visuelles Signal für "gesperrt").
- **Bekannter, bewusst nicht behobener Folgefund**: dasselbe Muster aus hartkodiertem
  weißem Text auf einem accent-farbenen Volltonhintergrund (wie beim Hell/Dunkel-Umschalter)
  kommt noch an vielen weiteren Stellen vor (u. a. `WebSandbox.jsx`, `SqlDungeon.jsx`,
  `CodePuzzle.jsx`, `SecurityLab.jsx` und vermutlich weitere Games/Labs) — dort aber nur
  im Hochkontrast-Modus ein Problem, der aktuelle E2E-Test deckt nur Dashboard + ein Lab ab.
  Eine vollständige Bereinigung wäre ein eigener, größerer Durchgang.
- **Zurückgestellt** (siehe vorherige Analyse): optionaler Cloud-Sync (braucht einen externen
  Anbieter-Account) und ein P2P-Quiz-Leaderboard (vergleichbarer Infra-Aufwand).
- **Test-Suite**: **271 bestandene Unit-Tests** in **47 Test-Dateien** (vorher 247/44) plus
  **12 neue E2E-/A11y-Tests** (Playwright) in einer separaten Pipeline-Stufe.

### Version 3.12.0 (Zentrale Lab-Registry & Struktureller Bugfix)

- **Neu**: `src/data/labRegistry.js` — die Zuordnung ID ↔ Komponente für alle 102 interaktiven Labs war bisher an vier unabhängigen Stellen gepflegt (`App.jsx`-Tab-Switch, `LabsDashboard`-Kartenraster, Navbar-Dropdowns, Command Palette). Genau das war laut dieser Änderungshistorie die Ursache für tote Links, nie verlinkte Labs und Abstürze durch fehlende Icon-Imports in fast jeder vorherigen Version. `App.jsx` rendert Labs jetzt generisch aus dieser einen Registry (`findLabEntry(activeTab)`), `LabsDashboard` bezieht sein Kartenraster ebenfalls von dort — Navbar und Command Palette behalten bewusst ihre eigenen, kontextspezifischen Texte, werden aber jetzt per Test gegen die Registry validiert.
- **`App.jsx` um ca. 45 % verkleinert** (1668 → 891 Zeilen): ~90 einzelne `{activeTab === 'x' && <Suspense>…}`-Blöcke und die zugehörigen `lazy()`-Deklarationen wurden durch einen einzigen generischen Render-Block ersetzt. Verhalten ist für jede bisherige Tab-ID identisch.
- **6 komplett unerreichbare Labs entdeckt & angebunden**: `subnetting` (CIDR-Rechner), `api_mock_studio`, `docker_compose`, `vector_search`, `tdd` und `ai` (Prompt-Engineering-Lab) waren über keine einzige Navigationsfläche (Navbar, Command Palette, Labs-Hub) erreichbar — komplett tote Features trotz vollständiger Implementierung. Alle sechs sind jetzt Teil der Registry und damit im "Alle Labs"-Hub sichtbar.
- **`ExamSimulator` jetzt lazy-geladen** statt fest ins Hauptbundle eingebunden — ein Nebeneffekt der Registry-Migration, der die initiale Bundle-Größe reduziert.
- **Neuer kritischer Fund**: `Sm2SpacedRepetitionLab.jsx` enthielt eine LaTeX-Formel (`$R(t) = e^{-t / S}$`) direkt im JSX-Text statt als String — JSX interpretierte `{-t / S}` als Ausdruck und stürzte mit `ReferenceError: t is not defined` ab, sobald das Lab geöffnet wurde. Gefunden vom neuen Smoke-Test, nicht von einem Nutzer.
- **Neu**: `src/data/labRegistry.smoke.test.jsx` — mountet jeden der 102 Registry-Einträge einmal isoliert. Das ist der erste Test in diesem Projekt, der jedes Lab tatsächlich rendert statt nur seine Erreichbarkeit zu prüfen; er hätte jeden bisherigen "App/Lab stürzt beim Öffnen ab"-Vorfall vor dem Release gefangen (siehe Fund oben).
- **Neu**: `src/components/Navigation/navLinks.test.js` — prüft, dass jede von Navbar-Dropdowns und Command Palette referenzierte ID entweder in der Registry oder in den bewusst separat gerenderten App-Bereichen (Dashboard, Themen-Browser, Minispiele-Hub, Labs-Hub, Kampagne, Lückentext, Videos, Projekte) existiert.
- **`LabsDashboard.jsx` um ca. 84 % verkleinert** (913 → 150 Zeilen) durch Wegfall der jetzt redundanten lokalen Lab-Liste; zwei neue Kategorie-Filter (`Programmierung & Tools`, `Hardware & Elektrotechnik`) ergänzt, da nach der Konsolidierung 21 bzw. 3 Labs sonst durch keinen Filter-Button erreichbar gewesen wären.
- **Test-Suite**: **247 bestandene Unit-Tests** in **46 Test-Dateien** (vorher 141 in 42 Dateien).

### Version 3.11.1 (CI Pipeline & Codebase-Weite Lint-Bereinigung)

- **Neu**: `.github/workflows/ci.yml` — GitHub Actions Pipeline, die bei jedem Push/PR auf `main` automatisch Lint, Unit-Tests und den Produktions-Build ausführt. Bisher gab es trotz 141 Tests keine CI-Absicherung.
- **Lint-Bereinigung**: Ungenutzte Imports/Variablen von **502 auf 0** reduziert (verifiziert mit `oxlint --fix-dangerously` + manueller Diff-Review jeder nicht-trivialen Änderung, um versteckte Fehler auszuschließen).
- **Weiterer kritischer Fund**: `WasmCompilerPlaygroundLab.jsx` referenzierte `RefreshCw` als JSX-Icon ohne Import — ein Klick auf "Kompilieren" ließ das Lab abstürzen. Neuer Regressionstest `WasmCompilerPlaygroundLab.test.jsx` deckt das jetzt ab.
- **Zwei weitere unvollständige Features entdeckt & vervollständigt** (Muster: `useStore`-Import wurde beim Lint-Cleanup als "ungenutzt" entfernt, weil nie ein XP-Button verdrahtet war): `IhkGradeCalculatorLab` und `TransformerAttentionLab` hatten trotz Award-Icon im Header **keine Möglichkeit, XP zu verdienen**. Beide haben jetzt einen "XP sichern"-Button wie alle vergleichbaren Rechner-Labs.
- **`ProjectViewer.jsx`**: abgeschlossene Praxisprojekte wurden in der Projekt-Liste nicht als erledigt markiert (die Variable dafür war berechnet, aber nie gerendert) — jetzt mit ✓-Badge sichtbar.
- **`ActivityHeatmapWidget.jsx`**: die gesamt protokollierte XP-Summe wurde berechnet, aber nirgends angezeigt — jetzt als dritte Stat-Kachel neben Streak & Einheiten sichtbar.
- **Test-Suite**: **141 bestandene Unit-Tests** in **42 Test-Dateien**.

### Version 3.11.0 (Bilingual Shell, Adaptive Learning & Critical Stability Fixes)

**🚨 Kritische Stabilitätsfixes** (App war teilweise nicht nutzbar):
- **`CommandPaletteModal.jsx`**: Die Schnellsuche (Ctrl+K) referenzierte die Icons `Lock` und `Radio`, ohne sie zu importieren. Da die Liste bei jedem Render aufgebaut wird — unabhängig davon, ob die Palette geöffnet ist — stürzte die **gesamte App** ab, sobald `ModalContainer` gerendert wurde (also praktisch immer). Zusätzlich zeigte der Eintrag "Mündliches Fachgespräch" auf `'oral-exam'` statt `'oral_exam'` und lief damit ins Leere.
- **`LabsDashboard.jsx`**: Dieselbe Fehlerklasse — `icon: Code2` ohne Import ließ die "Alle Labs Hub"-Seite bei jedem Aufruf abstürzen.
- **8 tote Links im Labs-Hub**: Karten wie `'bigo'`, `'pkce'`, `'k8s'`, `'ragai'`, `'regexmaster'`, `'pythonwasm'`, `'gitvisual'` und `'sqldungeon'` verwendeten IDs, die zu keinem existierenden Tab passten (z. B. `'bigo'` statt `'bigo_benchmark'`) — ein Klick landete auf einer leeren Seite. Alle auf die korrekten Tab-IDs korrigiert.
- **`App.jsx`**: `wasm_rust_studio` renderte `<WasmRustStudio>`, eine Komponente, die im ganzen Projekt nicht existiert (Datei heißt `WasmRustLab.jsx`) — ebenfalls ein sofortiger Absturz beim Öffnen dieses Labs.
- **24 komplett unverlinkte Labs entdeckt & angebunden**: Komponenten wie `AlgoPlaygroundLab`, `CloudDesignerLab`, `CloudDevOpsLab`, `OauthOidcLab`, `SystemDesignLab`, `CiCdPipelineLab`, `KafkaEventLab` u.v.m. waren vollständig implementiert und über `App.jsx` erreichbar, tauchten aber in keinem einzigen Navigationsmenü auf (weder Navbar noch Dashboard noch Command Palette noch Labs-Hub). Alle 24 sind jetzt als Karten im "🧪 Alle Labs & Simulatoren Hub" auffindbar.
- **Neuer Regressionstest** `LabsDashboard.test.js`: prüft automatisch, dass jede Hub-Karte auf einen tatsächlich existierenden Tab in `App.jsx` zeigt. `CommandPaletteModal.test.jsx` stellt sicher, dass die Schnellsuche beim Mounten nicht mehr abstürzt.
- **Duplikat entfernt**: `OauthPkceStudio.jsx` (ältere Version mit simulierter/nicht echter SHA-256-Berechnung) wurde durch `OauthPkceStudioLab.jsx` (echte RFC-7636-Implementierung) ersetzt — beide wurden zuvor gleichzeitig auf derselben Tab-ID gerendert.

**🌍 Zweisprachige App-Oberfläche (Deutsch/English)**:
- Der bereits vorhandene "Sprache: DE/EN"-Schalter in der Navbar änderte bisher nichts sichtbares. Jetzt gibt es eine echte `useTranslation()`-Hook (`utils/i18n.js`) mit einem deutlich erweiterten Wörterbuch, verdrahtet in Navbar, Barrierefreiheits-Panel, Footer (inkl. DSGVO/Impressum/FAQ), Rollenauswahl-Onboarding, Dashboard-Begrüßung und Schnellsuche.
- `userProfiles.js` liefert jetzt englische Übersetzungen für alle 4 Nutzerrollen (Titel, Beschreibung, Skills) über `getLocalizedRole()`.
- **Bewusst nicht übersetzt**: die eigentlichen Lerninhalte der 100+ einzelnen Labs (Fragen, Erklärtexte, Code-Beispiele) — das bleibt vorerst Deutsch, da es ein eigenes, deutlich größeres Lokalisierungsprojekt wäre.

**🎯 Adaptive Lernempfehlungen**:
- Neu: `utils/adaptiveLearningEngine.js` sammelt kategorisierte Ergebnisse aus dem IHK-Prüfungssimulator und der Quiz Arena (`userState.categoryStats`) und ermittelt die Themen mit der niedrigsten Trefferquote.
- Neu: `RecommendationsWidget.jsx` auf dem Dashboard zeigt die 3 schwächsten Themen mit direktem Sprung zurück ins passende Lab.

**🛠️ Feature-Vervollständigungen** (Bugfixes bestehender Labs):
- `AgileScrumSimulatorLab`: Sprintlänge war im UI nicht änderbar, obwohl der State existierte; das Burndown-Chart brach zudem bei jeder Sprintlänge ≠ 10 Tage ab. Jetzt per Slider einstellbar (5–20 Tage), Berechnung generalisiert.
- `Ipv6RoutingLab`: eigene Routen können jetzt zur LPM-Tabelle hinzugefügt/entfernt werden.
- `CloudDesignerLab`: Komponenten-Bibliothek zum Hinzufügen/Entfernen; generierter Terraform-Code spiegelt jetzt die tatsächliche Architektur wider.
- `RedisCachingLab`: TTLs zählen jetzt live herunter, abgelaufene Keys werden automatisch evictet.
- `FlashcardsModal`: Sitzungsfortschritt wird jetzt angezeigt statt nur berechnet.
- **Test-Suite**: **140 bestandene Unit-Tests** in **41 Test-Dateien** (100% Erfolgsquote).

### Version 3.10.1 (Interactive Fixes & Quality Pass)
- **Fix**: `scrumEngine.js` — die Sprintlänge (`sprintDays`) war zwar als Zustand vorhanden, aber im UI nirgends änderbar, und das Burndown-Chart brach bei jeder Sprintlänge ≠ 10 Tage ab (Mitte & Endpunkt der "Ist"-Kurve waren hartkodiert auf Tag 5 / Tag 10). Jetzt skaliert die Berechnung auf jede beliebige Sprintlänge; neuer Unit-Test deckt einen 14-Tage-Sprint ab.
- **Neu**: `AgileScrumSimulatorLab.jsx` — Slider zur Live-Anpassung der Sprintlänge (5–20 Tage) direkt über dem Burndown-Chart.
- **Neu**: `Ipv6RoutingLab.jsx` — die LPM-Routing-Tabelle war rein statisch (kein Weg, Routen hinzuzufügen, obwohl der State dafür bereits existierte). Jetzt können eigene Routen per Formular ergänzt und per Klick wieder entfernt werden, inklusive sofortiger Neubewertung des Longest-Prefix-Match.
- **Neu**: `CloudDesignerLab.jsx` — aus dem rein statischen 3-Komponenten-Demo wurde ein echter Mini-Designer: eine Komponenten-Bibliothek (VPC, EC2, RDS, S3, Lambda, ALB) kann per Klick auf die Canvas gebracht oder wieder entfernt werden, und der generierte Terraform-Code (`main.tf`) spiegelt jetzt exakt die aktuell platzierten Komponenten wider statt eines fest verdrahteten Textblocks.
- **Verbessert**: `RedisCachingLab.jsx` — die "Live Redis In-Memory Table" tickte vorher nie herunter. TTLs zählen jetzt sekündlich echt herunter, abgelaufene Keys werden automatisch aus dem Keyspace entfernt (mit visueller Warnung bei TTL ≤ 5s) und lassen sich per Klick neu befüllen.
- **Verbessert**: `FlashcardsModal.jsx` — der Sitzungsfortschritt (`completedCount`) wurde berechnet, aber nirgends angezeigt; er erscheint nun als Live-Zähler ("X Karten in dieser Sitzung gemeistert"). Ungenutzter Dead Code (`handleNext`) entfernt.
- **Qualität**: Zahlreiche ungenutzte Imports/Variablen in den oben genannten Dateien bereinigt (Oxlint-Warnungen reduziert).
- **Test-Suite**: **130 bestandene Unit-Tests** in **38 Test-Dateien** (100% Erfolgsquote).

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
