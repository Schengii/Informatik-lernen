# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen für Einsteiger (ohne Vorkenntnisse), IHK Berufsschul-Lernfeldern (ausbildung-in-der-it.de LF 1 - 12b), RegEx Railroad Diagramm Studio, REST API Webhook Inspector & Mock Server, Podcast Voice Quiz Studio (Spracherkennung), TCO & ROI Wirtschaftlichkeits-Simulator, Git 3-Way Merge Conflict Resolver, Custom Coding Challenge Creator & JSON Manager, P2P Multiplayer / LAN Quiz-Duell Arena, SQLite & Relational In-Browser Database Sandbox, Live Coding Challenge Studio (LeetCode/Exercism Style), WISO- & Handelskalkulations-Studio, IEEE-754 Gleitkomma & Zahlen-Lab, IPv6 & Routing-Table Simulator, OWASP Top 10 Live-Exploit Sandbox, Neural Network & BPE Tokenizer Studio, druckfertigem IHK Cheat-Sheet PDF-Generator, 365-Tage GitHub-Style Aktivitäts-Heatmap, Pomodoro-Fokus-Timer, Web-Audio SFX-Controller, W3Schools-Style Programmier-Masterclasses (Python Complete Guide, JS ES6+, TS, Java, C#), Coursera Deep Learning (CNNs, RNNs, Transformers), IT-Berufe Podcast Specials, Schritt-für-Schritt Praxis-Projekten, Advanced Prompt Engineering, OAuth2 & OpenID Connect, WebSockets, Performance Profiling, Kubernetes Orchestrierung, Local RAG Vector AI Pipelines, WebAssembly & Rust, Apache Kafka, Docker & Containerisierung, Cloud Infrastructure CI/CD, Cybersecurity Red vs Blue Team, GraphQL & REST API Testing, Web Components, 10+ Programmiersprachen, TDD Unit-Testing, i18n Mehrsprachigkeit, Systemarchitektur, Microservices, Design Patterns, Datenbanken, IT-Sicherheit, Logikschaltungen, Netzwerken, RegEx, Big-O Komplexität, Karriere-Roadmaps, Boss-Battles, Code Typing Speedrun, PWA Offline-Support, Vokabeln und Quizzes – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

---

## 📋 Inhaltsverzeichnis
- [Übersicht & Zielgruppen](#-übersicht--zielgruppen)
- [Hauptfunktionen & Neue Features (v3.6.0)](#-hauptfunktionen--neue-features-v360-event-driven--speech-edition)
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
   - **Podcast Voice Quiz Studio (`VoiceQuizStudioLab.jsx`)**: Sprachgesteuertes IHK-Quiz per Mikrofon zu Themen aus dem IT-Berufe Podcast (Datenschutz vs. Datensicherheit, UTF-8/ASCII Encodings, Stefan Macke Prüfungstipps).
   - **TCO & ROI Wirtschaftlichkeits-Simulator (`TcoRoiCalculatorLab.jsx`)**: On-Premises vs. Cloud-Migration Kostenvergleich mit Break-Even-Monat und Recharts-Amortisationsdiagramm für IHK-Projektanträge.
   - **1v1 IHK Quiz-Duell Arena (`P2pQuizDuellLab.jsx`)**: Multiplayer Duell gegen Kollegen oder KI-Bots mit Geschwindigkeitsbonus.
   - Detaillierte IHK-Berufsschul Lernfelder (LF 1 bis LF 12b), prüfungsrelevante Tipps für AP Teil 1 & AP Teil 2, **Handelskalkulationen** (Vorwärtsrechnung mit Rabatt, Skonto, Selbstkosten), **Deckungsbeitragsrechnung & Break-Even-Point**, **Netzplantechnik (CPM / Kritischer Pfad)**, **WISO-Arbeitsrecht** (§ 622 BGB, JAV/Betriebsrat) und druckfertige **A4 PDF-Spickzettel**.
3. **🚀 Junior Developer & Systemintegratoren**:
   - **RegEx Railroad & Diagramm Studio (`RegexRailroadVisualizerLab.jsx`)**: Visuelle Eisenbahndiagramme, Syntaxbäume und Live-Pattern Matching.
   - **REST Webhook Inspector & Mock Server (`WebhookInspectorLab.jsx`)**: Eingehende Webhooks (GitHub, Stripe) simulieren, Header-Signaturen prüfen und Payloads inspizieren.
   - **Git 3-Way Merge Conflict Resolver (`GitMergeConflictLab.jsx`)**: Interaktives Lösen von Merge-Konflikten zwischen Branches mit Schnell-Aktionen (`Accept Current`, `Accept Incoming`, `Accept Both`) und Live-Code-Validierung.
   - **Custom Coding Challenge Creator (`CustomChallengeCreatorLab.jsx`)**: Eigene Programmieraufgaben mit Testfällen erstellen, gegen Musterlösung validieren und als JSON exportieren/importieren.
   - **SQLite In-Browser Database Sandbox (`SqliteWasmStudioLab.jsx`)**: Echte relationale SQL-Konsole mit Schema-Explorer, JOINs, Groupings, Inserts und CSV-Export.
   - **Live Coding Challenge Studio (`LiveCodingChallengeStudio.jsx`)**: LeetCode & Exercism Aufgaben mit automatischer Testausführung.
   - Clean Code Prinzipien, **IEEE-754 Single Precision Floats**, **Zweierkomplement & KV-Diagramme**, **IPv6 Kompression & SLAAC/EUI-64**, **Longest Prefix Match (LPM) Routing**, REST & GraphQL APIs, Docker, CI/CD Pipelines, JavaScript, TypeScript, React, Vite, RegEx, TDD Unit-Testing & Git-Workflows.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - **OWASP Top 10 Live-Exploit Sandbox** (XSS, SQLi, CSRF, IDOR), **Deep Learning Neural Network Forward-Propagation** (ReLU, Sigmoid, Weights/Biases), **Byte-Pair Encoding (BPE) Tokenizer**, OAuth2 PKCE & JWT Claims Decoding, WebSockets HTTP 101 Handshake, V8 Performance & Memory Leak Profiling, Kubernetes Deployments & RAG Vector AI Pipelines.

---

## 🔥 Hauptfunktionen & Neue Features (v3.6.0 Event-Driven & Speech Edition)

* **🚂 RegEx Railroad & Diagramm Studio (`RegexRailroadVisualizerLab.jsx` & `regexParserEngine.js`)**:
  * Zerlegt reguläre Ausdrücke in visuelle Token-Ketten und Eisenbahndiagramme (Anchors, Zeichenklassen, Quantifizierer, Gruppen, Escapes)
  * Live-Tester gegen anpassbare Test-Strings mit Treffer-Auflistung und Gruppenextraktion.
* **📡 REST API Webhook Inspector & Mock Server (`WebhookInspectorLab.jsx` & `webhookSimulator.js`)**:
  * Simulierter HTTP Webhook Empfänger & Mock Server im Browser
  * Presets für **GitHub Push Events** und **Stripe Payment Succeeded**
  * Live-Inspektor für Request-Headers, JSON-Payloads, Statuscodes und Latenzen.
* **🎙️ Podcast Voice Quiz Studio (`VoiceQuizStudioLab.jsx` & `voiceQuizEngine.js`)**:
  * Sprachgesteuertes IHK-Quiz per Mikrofon (Web Speech API) mit automatischer semantischer Schlüsselwort-Prüfung
  * Text-to-Speech Vorlesen der Fragen
  * Fragen zu Datenschutz vs. Datensicherheit, UTF-8/ASCII Encodings und Stefan Macke Prüfungstipps.
* **📊 TCO & ROI Wirtschaftlichkeits-Simulator (`TcoRoiCalculatorLab.jsx` & `tcoCalculations.js`)**:
  * Kumulierte TCO-Wirtschaftlichkeitsanalyse (On-Prem vs. Cloud) über 3–5 Jahre mit Recharts Amortisations-Chart.
* **🌿 Git 3-Way Merge Conflict Resolver (`GitMergeConflictLab.jsx` & `gitConflictEngine.js`)**:
  * Visuelles Lösen von Git Merge-Konflikten mit Schnell-Aktionen und Commit-Validierung.
* **✍️ Custom Coding Challenge Creator (`CustomChallengeCreatorLab.jsx` & `customChallengesManager.js`)**:
  * Eigene Aufgaben mit Testfällen erstellen, validieren und als JSON exportieren/importieren.
* **⚔️ IHK Quiz-Duell Arena (`P2pQuizDuellLab.jsx` & `p2pQuizEngine.js`)**:
  * 1v1 Echtzeit-Quizduell über Raum-Codes oder gegen KI-Bots.
* **🗄️ SQLite & Relational In-Browser Database Studio (`SqliteWasmStudioLab.jsx` & `sqlSandboxEngine.js`)**:
  * In-Memory SQL-Engine (AlaSQL), Schema-Explorer und CSV-Export.
* **💻 Live Coding Challenge Studio (`LiveCodingChallengeStudio.jsx` & `codingChallengesEngine.js`)**:
  * LeetCode/Exercism Style Code-Rätsel mit Test-Runner.
* **📊 WISO- & Handelskalkulations-Studio (`WisoKalkulationLab.jsx` & `wisoCalculations.js`)**:
  * Handelskalkulation, Deckungsbeitrag & Break-Even, Netzplantechnik (CPM) und Arbeitsrecht.
* **🔬 IEEE-754 Gleitkomma & Zahlen-Studio (`Ieee754FloatingPointLab.jsx` & `ieee754.js`)**:
  * 32-Bit Float-Bitmanipulation, Zweierkomplement und KV-Diagramme.
* **🌐 IPv6 & Routing Simulator (`Ipv6RoutingLab.jsx` & `ipv6Routing.js`)**:
  * RFC 5952 IPv6-Kompression, SLAAC/EUI-64 und LPM Routing.
* **🔒 OWASP Top 10 Live-Exploit Sandbox (`OwaspExploitLab.jsx`)**:
  * XSS, SQL Injection, CSRF und IDOR Exploit Defense.
* **🧠 Neural Network & BPE Tokenizer Studio (`NeuralNetVisualizerLab.jsx`)**:
  * Forward-Pass Visualizer und Byte-Pair Encoding Tokenizer.
* **📄 IHK Spickzettel & PDF-Generator (`IhkCheatSheetPdfGenerator.jsx`)**:
  * Druckfertige DIN A4 PDF-Zusammenfassungen via `jspdf`.
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
    │   │   ├── CustomChallengeCreatorLab.jsx
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
    │   │   ├── GitMergeConflictLab.jsx
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
    │   │   ├── RegexRailroadVisualizerLab.jsx
    │   │   ├── SqliteWasmStudioLab.jsx
    │   │   ├── SqlJoinVisualizerLab.jsx
    │   │   ├── SqlQueryOptimizerLab.jsx
    │   │   ├── SqlTransactionLab.jsx
    │   │   ├── SubnettingLab.jsx
    │   │   ├── SystemDesignLab.jsx
    │   │   ├── TcoRoiCalculatorLab.jsx
    │   │   ├── TddUnitTestLab.jsx
    │   │   ├── ToolingSetupGuide.jsx
    │   │   ├── TopicReader.jsx
    │   │   ├── VectorSearchLab.jsx
    │   │   ├── VideoHub.jsx
    │   │   ├── VocabularyTrainerModal.jsx
    │   │   ├── VoiceQuizStudioLab.jsx
    │   │   ├── WasmRustLab.jsx
    │   │   ├── WasmRustStudio.jsx
    │   │   ├── WebComponentsHub.jsx
    │   │   ├── WebhookInspectorLab.jsx
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
        ├── customChallengesManager.js
        ├── customChallengesManager.test.js
        ├── gitConflictEngine.js
        ├── gitConflictEngine.test.js
        ├── i18n.js
        ├── ieee754.js
        ├── ieee754.test.js
        ├── ipv6Routing.js
        ├── ipv6Routing.test.js
        ├── p2pQuizEngine.js
        ├── p2pQuizEngine.test.js
        ├── regexParserEngine.js
        ├── regexParserEngine.test.js
        ├── sqlSandboxEngine.js
        ├── sqlSandboxEngine.test.js
        ├── srsAlgorithm.js
        ├── srsAlgorithm.test.js
        ├── storage.js
        ├── storage.test.js
        ├── tcoCalculations.js
        ├── tcoCalculations.test.js
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
   * Sämtliche Fortschritte (XP, Level, Badges, erledigte Module, Spaced-Repetition-Karten, 365-Tage-Aktivitätshistorie, Custom Challenges) werden rein lokal im Browser gespeichert.
2. **Audio-Synthesizer (`audioSystem.js`)**:
   * Keine schweren Audio-Dateien: Alle Soundeffekte (Erfolg, LevelUp, Fehler, Timer-Glocke) werden in Echtzeit über die Web Audio API synthetisiert und lassen sich stufenlos regulieren oder stummschalten.
3. **PWA & Offline-Fähigkeit (`vite-plugin-pwa`)**:
   * Vollständiger Service-Worker-Precache aller 113 Anwendungs-Chunks für Offline-Nutzung.
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

### Version 3.6.0 (Event-Driven & Speech Edition)
- **Neu**: `RegexRailroadVisualizerLab.jsx` & `regexParserEngine.js` mit visuellen Eisenbahndiagrammen, Syntax-Bäumen und Live-Matching.
- **Neu**: `WebhookInspectorLab.jsx` & `webhookSimulator.js` mit simuliertem HTTP-Webhook-Server, Request-Logs und Header-Signaturen.
- **Neu**: `VoiceQuizStudioLab.jsx` & `voiceQuizEngine.js` mit sprachgesteuertem Audio-Quiz zu Podcast-Themen via Web Speech API.
- **Aktualisiert**: Navigation in `Navbar.jsx`, `LabsDashboard.jsx`, `CommandPaletteModal.jsx` und `App.jsx`.
- **Test-Suite**: Auf **70 bestandene Unit-Tests** in **21 Test-Dateien** erweitert.

### Version 3.5.0 (Productivity & IHK Project Edition)
- **Neu**: `TcoRoiCalculatorLab.jsx` & `tcoCalculations.js` mit kumulierter TCO-Wirtschaftlichkeitsanalyse (On-Premises vs. Cloud), ROI- und Break-Even-Berechnung sowie Amortisations-Liniendiagramm mit Recharts.
- **Neu**: `GitMergeConflictLab.jsx` & `gitConflictEngine.js` mit visuellem 3-Wege Git Merge-Konflikt Resolver, Schnell-Lösungsaktionen und Commit-Validierung.
- **Neu**: `CustomChallengeCreatorLab.jsx` & `customChallengesManager.js` zur Erstellung, Validierung und JSON Export/Import eigener Programmieraufgaben.
