# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen für Einsteiger (ohne Vorkenntnisse), IHK Berufsschul-Lernfeldern (ausbildung-in-der-it.de LF 1 - 12b), P2P Multiplayer / LAN Quiz-Duell Arena, SQLite & Relational In-Browser Database Sandbox, Live Coding Challenge Studio (LeetCode/Exercism Style), WISO- & Handelskalkulations-Studio, IEEE-754 Gleitkomma & Zahlen-Lab, IPv6 & Routing-Table Simulator, OWASP Top 10 Live-Exploit Sandbox, Neural Network & BPE Tokenizer Studio, druckfertigem IHK Cheat-Sheet PDF-Generator, 365-Tage GitHub-Style Aktivitäts-Heatmap, Pomodoro-Fokus-Timer, Web-Audio SFX-Controller, W3Schools-Style Programmier-Masterclasses (Python Complete Guide, JS ES6+, TS, Java, C#), Coursera Deep Learning (CNNs, RNNs, Transformers), IT-Berufe Podcast Specials, Schritt-für-Schritt Praxis-Projekten, Advanced Prompt Engineering, OAuth2 & OpenID Connect, WebSockets, Performance Profiling, Kubernetes Orchestrierung, Local RAG Vector AI Pipelines, WebAssembly & Rust, Apache Kafka, Docker & Containerisierung, Cloud Infrastructure CI/CD, Cybersecurity Red vs Blue Team, GraphQL & REST API Testing, Web Components, 10+ Programmiersprachen, TDD Unit-Testing, i18n Mehrsprachigkeit, Systemarchitektur, Microservices, Design Patterns, Datenbanken, IT-Sicherheit, Logikschaltungen, Netzwerken, RegEx, Big-O Komplexität, Karriere-Roadmaps, Boss-Battles, Code Typing Speedrun, PWA Offline-Support, Vokabeln und Quizzes – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

---

## 📋 Inhaltsverzeichnis
- [Übersicht & Zielgruppen](#-übersicht--zielgruppen)
- [Hauptfunktionen & Neue Features (v3.4.0)](#-hauptfunktionen--neue-features-v340-multiplayer--live-coding-edition)
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
2. **⚡ IT-Auszubildende (Fachinformatiker AE/SI, IT-Systemelektroniker)**:
   - **1v1 IHK Quiz-Duell Arena (`P2pQuizDuellLab.jsx`)**: Multiplayer Duell gegen Kollegen oder KI-Bots mit Geschwindigkeitsbonus.
   - Detaillierte IHK-Berufsschul Lernfelder (LF 1 bis LF 12b), prüfungsrelevante Tipps für AP Teil 1 & AP Teil 2, **Handelskalkulationen** (Vorwärtsrechnung mit Rabatt, Skonto, Selbstkosten), **Deckungsbeitragsrechnung & Break-Even-Point**, **Netzplantechnik (CPM / Kritischer Pfad)**, **WISO-Arbeitsrecht** (§ 622 BGB, JAV/Betriebsrat) und druckfertige **A4 PDF-Spickzettel**.
3. **🚀 Junior Developer & Systemintegratoren**:
   - **SQLite In-Browser Database Sandbox (`SqliteWasmStudioLab.jsx`)**: Echte relationale SQL-Konsole mit Schema-Explorer, JOINs, Groupings, Inserts und CSV-Export.
   - **Live Coding Challenge Studio (`LiveCodingChallengeStudio.jsx`)**: LeetCode & Exercism Aufgaben (TwoSum, Palindrom, BinarySearch, FizzBuzz) mit automatischer Testausführung.
   - Clean Code Prinzipien, **IEEE-754 Single Precision Floats**, **Zweierkomplement & KV-Diagramme**, **IPv6 Kompression & SLAAC/EUI-64**, **Longest Prefix Match (LPM) Routing**, REST & GraphQL APIs, Docker, CI/CD Pipelines, JavaScript, TypeScript, React, Vite, RegEx, TDD Unit-Testing & Git-Workflows.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - **OWASP Top 10 Live-Exploit Sandbox** (XSS, SQLi, CSRF, IDOR), **Deep Learning Neural Network Forward-Propagation** (ReLU, Sigmoid, Weights/Biases), **Byte-Pair Encoding (BPE) Tokenizer**, OAuth2 PKCE & JWT Claims Decoding, WebSockets HTTP 101 Handshake, V8 Performance & Memory Leak Profiling, Kubernetes Deployments & RAG Vector AI Pipelines.

---

## 🔥 Hauptfunktionen & Neue Features (v3.4.0 Multiplayer & Live Coding Edition)

* **⚔️ IHK Quiz-Duell Arena (`P2pQuizDuellLab.jsx` & `p2pQuizEngine.js`)**:
  * 1-gegen-1 Echtzeit-Quizduell über Raum-Codes (LAN / WebRTC P2P) oder gegen simulierte KI-Bots (Junior, Azubi, Senior)
  * 8 Runden mit 15-Sekunden-Timer, 100 Basispunkten und bis zu 50 Speed-Bonuspunkten
  * Live-Balken der Kontrahenten, Konfetti-Siegerehrung und XP-Vergabe.
* **🗄️ SQLite & Relational In-Browser Database Studio (`SqliteWasmStudioLab.jsx` & `sqlSandboxEngine.js`)**:
  * Vollwertige In-Memory SQL-Engine (AlaSQL)
  * Tabellen-Schema Explorer (Spalten, Typen, Zeilenzahlen)
  * Vordefinierte Datenbanken (E-Commerce Store, IT Asset Management)
  * Beliebige SQL-Queries (JOINs, GROUP BY, INSERT INTO, CREATE TABLE) mit Laufzeitmessung in Millisekunden und CSV-Export.
* **💻 Live Coding Challenge Studio (`LiveCodingChallengeStudio.jsx` & `codingChallengesEngine.js`)**:
  * Interaktive Programmieraufgaben (Valid Palindrome, Two Sum, FizzBuzz, Binary Search)
  * Integrierter JavaScript Test-Runner mit sichtbaren & versteckten Testfällen (Input, Expected, Actual Output, Ausführungszeit in ms)
  * Sofortiges Feedback und XP-Belohnungen.
* **📊 WISO- & Handelskalkulations-Studio (`WisoKalkulationLab.jsx` & `wisoCalculations.js`)**:
  * Interaktive **Handelskalkulation** (LEP bis BKP über 12 Stufen)
  * **Deckungsbeitragsrechnung & Break-Even-Point** mit grafischem Fortschrittsbalken
  * **Netzplantechnik (Critical Path Method - CPM)** mit automatischer Vorwärts- und Rückwärtsrechnung (FAZ, FEZ, SAZ, SEZ, GP, FP, Kritischer Pfad)
  * **WISO-Prüfungsquiz** zu Kündigungsfristen (§ 622 BGB), JAV/Betriebsverfassung und Sozialversicherungen.
* **🔬 IEEE-754 Gleitkomma- & Rechnerarchitektur-Lab (`Ieee754FloatingPointLab.jsx` & `ieee754.js`)**:
  * 32-Bit Single Precision Bit-Manipulator mit klickbaren Bits (Vorzeichen, 8-Bit Exponent mit Bias 127, 23-Bit Mantisse)
  * Live-Dekodierung von Sonderfällen (`±0`, `±Infinity`, `NaN`, subnormale Zahlen)
  * **Zweierkomplement-Konverter** (8-Bit, 16-Bit, 32-Bit) mit Überlauf-Erkennung
  * **Karnaugh-Veitch (KV) Minimierer** zur Minimierung boolescher Funktionen in DNF.
* **🌐 IPv6 & Routing-Table Simulator (`Ipv6RoutingLab.jsx` & `ipv6Routing.js`)**:
  * RFC 5952 konforme **IPv6-Adresskompression (`::`)** und 128-Bit Expansion
  * **SLAAC & EUI-64 Generator** (MAC-Adresse ➔ Invertierung 7. Bit + `FF:FE` Insertion ➔ Link-Local IPv6)
  * **Longest Prefix Match (LPM) Routing-Simulator** mit Subnetz-CIDR Präfix-Evaluierung.
* **🔒 OWASP Top 10 Live-Exploit Sandbox (`OwaspExploitLab.jsx`)**:
  * Interaktive Testumgebung für **XSS**, **SQL Injection**, **CSRF** und **IDOR**.
* **🧠 Neural Network & BPE Tokenizer Studio (`NeuralNetVisualizerLab.jsx`)**:
  * Interaktiver **Forward-Pass Visualizer** (ReLU, Sigmoid, Tanh, Weights/Biases) und **Byte-Pair Encoding (BPE) Tokenizer**.
* **📄 IHK Spickzettel & PDF-Generator (`IhkCheatSheetPdfGenerator.jsx`)**:
  * Druckfertige DIN A4 PDF-Zusammenfassungen via `jspdf` für WISO, SQL und Netzwerke.
* **📅 365-Tage Aktivitäts-Heatmap & Pomodoro-Timer (`ActivityHeatmapWidget.jsx` & `PomodoroTimerWidget.jsx`)**:
  * Jahresmatrix (52 Wochen x 7 Tage) und 25m/5m Fokus-Timer mit Web-Audio Tonsignal.

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
    │   │   ├── CampaignQuestHub.jsx
    │   │   ├── CareerRoadmap.jsx
    │   │   ├── CiCdMatrixLinterLab.jsx
    │   │   ├── CiCdPipelineLab.jsx
    │   │   ├── CiCdWorkflowLab.jsx
    │   │   ├── CircuitBreakerLab.jsx
    │   │   ├── CleanCodeReviewLab.jsx
    │   │   ├── CloudDesignerLab.jsx
    │   │   ├── CloudDevOpsLab.jsx
    │   │   ├── ClozeTester.jsx
    │   │   ├── CodeExecutionDebuggerLab.jsx
    │   │   ├── CpuArchitectureLab.jsx
    │   │   ├── CryptoKeygenLab.jsx
    │   │   ├── CtfChallengeLab.jsx
    │   │   ├── DataStructuresLab.jsx
    │   │   ├── DeploymentGuideModal.jsx
    │   │   ├── DesignPatternsLab.jsx
    │   │   ├── DnsHttpLifecycleLab.jsx
    │   │   ├── DockerComposeLab.jsx
    │   │   ├── DockerLab.jsx
    │   │   ├── ExamSimulator.jsx
    │   │   ├── FisiLernfelderHub.jsx
    │   │   ├── GitBranchGraphLab.jsx
    │   │   ├── GitLab.jsx
    │   │   ├── GlossaryModal.jsx
    │   │   ├── GraphqlResolverLab.jsx
    │   │   ├── Http3QuicLab.jsx
    │   │   ├── Ieee754FloatingPointLab.jsx
    │   │   ├── IhkCheatSheetPdfGenerator.jsx
    │   │   ├── IhkOralExamSimulator.jsx
    │   │   ├── IhkProjectDocumentationGenerator.jsx
    │   │   ├── Ipv6RoutingLab.jsx
    │   │   ├── ItPodcastHub.jsx
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
    │   │   ├── OwaspExploitLab.jsx
    │   │   ├── P2pQuizDuellLab.jsx
    │   │   ├── PacketTracerLab.jsx
    │   │   ├── PerformanceProfilingLab.jsx
    │   │   ├── PostgresExplainVisualizerLab.jsx
    │   │   ├── PostgresMvccLab.jsx
    │   │   ├── PythonWasmLab.jsx
    │   │   ├── RagAiSimulator.jsx
    │   │   ├── RedBlueTeamLab.jsx
    │   │   ├── RedisCachingLab.jsx
    │   │   ├── RegexMasterLab.jsx
    │   │   ├── SqliteWasmStudioLab.jsx
    │   │   ├── SqlJoinVisualizerLab.jsx
    │   │   ├── SqlQueryOptimizerLab.jsx
    │   │   ├── SqlTransactionLab.jsx
    │   │   ├── SubnettingLab.jsx
    │   │   ├── SystemDesignLab.jsx
    │   │   ├── TddUnitTestLab.jsx
    │   │   ├── ToolingSetupGuide.jsx
    │   │   ├── TopicReader.jsx
    │   │   ├── VectorSearchLab.jsx
    │   │   ├── VideoHub.jsx
    │   │   ├── VocabularyTrainerModal.jsx
    │   │   ├── WasmRustLab.jsx
    │   │   ├── WasmRustStudio.jsx
    │   │   ├── WebComponentsHub.jsx
    │   │   ├── WebRtcSignalingLab.jsx
    │   │   ├── WebSocketProtocolLab.jsx
    │   │   ├── WebSocketsLab.jsx
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
        ├── campaignAndExam.test.js
        ├── codingChallengesEngine.js
        ├── codingChallengesEngine.test.js
        ├── i18n.js
        ├── ieee754.js
        ├── ieee754.test.js
        ├── ipv6Routing.js
        ├── ipv6Routing.test.js
        ├── p2pQuizEngine.js
        ├── p2pQuizEngine.test.js
        ├── sqlSandboxEngine.js
        ├── sqlSandboxEngine.test.js
        ├── srsAlgorithm.js
        ├── srsAlgorithm.test.js
        ├── storage.js
        ├── storage.test.js
        ├── wisoCalculations.js
        └── wisoCalculations.test.js
```

---

## ⚙️ Funktionsweise

1. **State-Management (`zustand` & `localStorage`)**:
   * Sämtliche Fortschritte (XP, Level, Badges, erledigte Module, Spaced-Repetition-Karten, 365-Tage-Aktivitätshistorie) werden rein lokal im Browser gespeichert.
2. **Audio-Synthesizer (`audioSystem.js`)**:
   * Keine schweren Audio-Dateien: Alle Soundeffekte (Erfolg, LevelUp, Fehler, Timer-Glocke) werden in Echtzeit über die Web Audio API synthetisiert und lassen sich stufenlos regulieren oder stummschalten.
3. **PWA & Offline-Fähigkeit (`vite-plugin-pwa`)**:
   * Vollständiger Service-Worker-Precache aller 107 Anwendungs-Chunks für Offline-Nutzung.
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

### Version 3.4.0 (Multiplayer & Live Coding Edition)
- **Neu**: `P2pQuizDuellLab.jsx` & `p2pQuizEngine.js` mit 1v1 Echtzeit-Quizduell (Multiplayer/LAN Room Code & Bot-Matches).
- **Neu**: `SqliteWasmStudioLab.jsx` & `sqlSandboxEngine.js` mit relationaler SQL-Sandbox, Schema-Inspektion und CSV-Export.
- **Neu**: `LiveCodingChallengeStudio.jsx` & `codingChallengesEngine.js` mit LeetCode/Exercism Aufgaben und automatischem Test-Runner.
- **Aktualisiert**: Navigation in `Navbar.jsx`, `LabsDashboard.jsx`, `CommandPaletteModal.jsx` und `App.jsx` für die 3 neuen Studios.
- **Test-Suite**: Auf **53 bestandene Unit-Tests** in **15 Test-Dateien** erweitert.

### Version 3.3.0 (Enterprise & Master Edition)
- **Neu**: `WisoKalkulationLab.jsx` & `wisoCalculations.js` mit Handelskalkulation, Deckungsbeitrag, Netzplantechnik (CPM) und Arbeitsrecht.
- **Neu**: `Ieee754FloatingPointLab.jsx` & `ieee754.js` mit 32-Bit Float-Bitmanipulation, Zweierkomplement und KV-Diagramm-Minimierer.
- **Neu**: `Ipv6RoutingLab.jsx` & `ipv6Routing.js` mit RFC 5952 IPv6-Kompression, SLAAC / EUI-64 und LPM Routing.
- **Neu**: `OwaspExploitLab.jsx` mit Live-Exploit-Sandboxes für XSS, SQLi, CSRF und IDOR.
- **Neu**: `NeuralNetVisualizerLab.jsx` mit Forward-Propagation und Byte-Pair Encoding (BPE) Tokenizer.
- **Neu**: `IhkCheatSheetPdfGenerator.jsx` mit DIN A4 PDF-Generierung via `jspdf`.
- **Neu**: `ActivityHeatmapWidget.jsx` mit 365-Tage Jahres-Aktivitätskalender.
- **Neu**: `PomodoroTimerWidget.jsx` mit 25m/5m Intervallen und Glockenton.
- **Neu**: `AudioSettingsModal.jsx` & `audioSystem.js` mit globalem Sound-Controller.
- **Neu**: `ModalContainer.jsx` zur Modularisierung von `App.jsx`.
