# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen für Einsteiger (ohne Vorkenntnisse), IHK Berufsschul-Lernfeldern (ausbildung-in-der-it.de LF 1 - 12b), W3Schools-Style Programmier-Masterclasses (Python Complete Guide, JS ES6+, TS, Java, C#), Coursera Deep Learning (CNNs, RNNs, Transformers), IT-Berufe Podcast Specials (Datenschutz vs. Datensicherheit vs. Datensicherung, Encodings UTF-8/ASCII), interaktiven Video-Tutorials, Schritt-für-Schritt Praxis-Projekten, Advanced Prompt Engineering (Chain-of-Thought, Few-Shot), OAuth2 & OpenID Connect (OIDC), WebSockets Realtime Communication, Performance Profiling & Memory Leak Handling, Kubernetes Orchestrierung, Local RAG Vector AI Pipelines, WebAssembly & Rust Compilation, Apache Kafka Event-Driven Architecture, Docker & Containerisierung, Cloud Infrastructure (AWS/GitHub Actions CI/CD), Cybersecurity Red vs Blue Team, GraphQL & REST API Testing, Web Components (Lit.dev, Vaadin), 10+ Programmiersprachen (JS, TS, Java, C#, Angular, PHP, React, Vite, C++), TDD Unit-Testing, i18n Mehrsprachigkeit, Systemarchitektur, Microservices, Design Patterns, Cloud Native, Datenbanken, IT-Sicherheit, Logikschaltungen, Netzwerken, RegEx, Terminal-Commands, Big-O Komplexität, Karriere-Roadmaps, Boss-Battles, Code Typing Speedrun, PWA Offline-Support, Vokabeln, Quizzes und App-Entwicklung – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

---

## 📋 Inhaltsverzeichnis
- [Übersicht & Zielgruppen](#-übersicht--zielgruppen)
- [Hauptfunktionen & Neue Features](#-hauptfunktionen--neue-features)
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
   - Detaillierte IHK-Berufsschul Lernfelder (`ausbildung-in-der-it.de` LF 1 bis LF 12b), prüfungsrelevante Tipps für AP Teil 1 & AP Teil 2, Amortisationsrechnungen, Handelskalkulationen, RTO/RPO Definitionen & Stefan Macke Podcast-Tipps.
3. **🚀 Junior Developer**:
   - Clean Code Prinzipien, REST & GraphQL APIs, Docker, CI/CD Pipelines, JavaScript, TypeScript, React, Angular, Node.js, Vite, RegEx, TDD Unit-Testing & Git-Workflows.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - Coursera Deep Learning (CNNs, RNNs, Transformers), Advanced Prompt Engineering (Chain-of-Thought, Few-Shot), OAuth2 PKCE & JWT Claims Decoding, WebSockets HTTP 101 Handshake, V8 Performance & Memory Leak Profiling, Kubernetes Deployments & RAG Vector AI Pipelines.

---

## 🔥 Hauptfunktionen & Neue Features (v3.2.0 Full Web Sources Integration)

* **🎓 Ausbildung-in-der-IT Lernfelder Master Integration (`lernfelderData.js`)**:
  * Detaillierte Themen & Prüfungsfokus für alle 12 Lernfelder aus `ausbildung-in-der-it.de`.
* **📄 IT-Berufe Podcast & Coursera AI Integration (`topicsData.js`)**:
  * Datenschutz vs. Datensicherheit vs. Datensicherung, Encodings UTF-8/ASCII & Deep Learning CNN/RNN/Transformer Architekturen.
* **📚 W3Schools Python Complete Guide & IT-Lexikon Expansion**.

---

## ♿ Barrierefreiheit & Inklusion

* **Lese-Rechtschreib-Hilfe (Dyslexie-Modus)**: Spezialschriftart (*Atkinson Hyperlegible*), erweiterter Zeichen- & Zeilenabstand.
* **Rot-Grün-Sehhilfe (Farbenblindheits-Modus)**: Zusätzliche Icon-Indikatoren (✓ / ✗) und barrierefreie Farbwelten.
* **Vorlesefunktion (Text-to-Speech)**: Audio-Steuerung (Play/Pause/Stopp) zum Vorlesen aller Lerneinheiten.
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
    ├── index.css
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
    │   │   ├── CiCdWorkflowLab.jsx
    │   │   ├── CloudDesignerLab.jsx
    │   │   ├── CloudDevOpsLab.jsx
    │   │   ├── ClozeTester.jsx
    │   │   ├── CtfChallengeLab.jsx
    │   │   ├── DataStructuresLab.jsx
    │   │   ├── DeploymentGuideModal.jsx
    │   │   ├── DesignPatternsLab.jsx
    │   │   ├── DockerComposeLab.jsx
    │   │   ├── DockerLab.jsx
    │   │   ├── ExamSimulator.jsx
    │   │   ├── FisiLernfelderHub.jsx
    │   │   ├── GitLab.jsx
    │   │   ├── GlossaryModal.jsx
    │   │   ├── IhkOralExamSimulator.jsx
    │   │   ├── ItPodcastHub.jsx
    │   │   ├── KafkaEventLab.jsx
    │   │   ├── KnowledgeQuizArena.jsx
    │   │   ├── KubernetesLab.jsx
    │   │   ├── LabsDashboard.jsx
    │   │   ├── LanguageAcademy.jsx
    │   │   ├── LeitnerFlashcardLab.jsx
    │   │   ├── MonacoStudioLab.jsx
    │   │   ├── OauthOidcLab.jsx
    │   │   ├── OauthPkceStudio.jsx
    │   │   ├── PacketTracerLab.jsx
    │   │   ├── PerformanceProfilingLab.jsx
    │   │   ├── PythonWasmLab.jsx
    │   │   ├── RagAiSimulator.jsx
    │   │   ├── RedBlueTeamLab.jsx
    │   │   ├── RegexMasterLab.jsx
    │   │   ├── SqlJoinVisualizerLab.jsx
    │   │   ├── SubnettingLab.jsx
    │   │   ├── SystemDesignLab.jsx
    │   │   ├── TddUnitTestLab.jsx
    │   │   ├── TopicReader.jsx
    │   │   ├── ToolingSetupGuide.jsx
    │   │   ├── VectorSearchLab.jsx
    │   │   ├── VideoHub.jsx
    │   │   ├── VocabularyTrainerModal.jsx
    │   │   ├── WasmRustLab.jsx
    │   │   ├── WasmRustStudio.jsx
    │   │   ├── WebComponentsHub.jsx
    │   │   ├── WebSocketProtocolLab.jsx
    │   │   └── WebSocketsLab.jsx
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
    │   │   ├── BadgesModal.jsx
    │   │   ├── BackupModal.jsx
    │   │   ├── CertificateModal.jsx
    │   │   ├── DailyChallengeWidget.jsx
    │   │   ├── FlashcardsModal.jsx
    │   │   └── SkillMatrixWidget.jsx
    │   ├── Navigation/
    │   │   ├── AccessibilityToolbar.jsx
    │   │   ├── DifficultyFilterBar.jsx
    │   │   ├── MobileNav.jsx
    │   │   └── Navbar.jsx
    │   ├── Onboarding/
    │   │   └── RoleSelectionModal.jsx
    │   └── Projects/
    │       └── ProjectViewer.jsx
    ├── data/
    │   ├── aiBusinessData.js
    │   ├── apiStudioData.js
    │   ├── clozeData.js
    │   ├── cloudData.js
    │   ├── dockerData.js
    │   ├── examData.js
    │   ├── flashcardsData.js
    │   ├── gamesData.js
    │   ├── glossaryData.js
    │   ├── k8sData.js
    │   ├── kafkaData.js
    │   ├── languageData.js
    │   ├── lernfelderData.js
    │   ├── oauthData.js
    │   ├── perfData.js
    │   ├── podcastData.js
    │   ├── projectsData.js
    │   ├── quizArenaData.js
    │   ├── ragAiData.js
    │   ├── roadmapData.js
    │   ├── securityTeamData.js
    │   ├── topicsData.js
    │   ├── userProfiles.js
    │   ├── vocabularyData.js
    │   ├── wasmRustData.js
    │   ├── webComponentsData.js
    │   ├── websocketData.js
    │   └── videosData.js
    ├── styles/
    │   └── global.css
    └── utils/
        ├── i18n.js
        └── storage.js
```

---

## 🛠️ Anleitung (Installation & Ausführung)

```bash
# 1. Klonen des Repositories
git clone https://github.com/Schengii/Informatik-lernen.git
cd Informatik-lernen

# 2. Abhängigkeiten installieren
npm install

# 3. Entwicklungsserver starten
npm run dev

# 4. Produktions-Build erstellen & testen
npm run build
npm run lint
```

---

## 📝 Änderungshistorie & Entwicklungsdokumentation

### Versionsverlauf

#### [v11.0.0] - WebSockets Protocol, RAG Vector Search, Big-O Arena, OAuth2 PKCE & WASM Rust Playground
* **WebSockets & Real-Time Protocol Lab (`WebSocketProtocolLab.jsx`)**:
  * Simulation des HTTP 101 Switching Protocols Handshakes (`Sec-WebSocket-Key` / `Sec-WebSocket-Accept`).
  * Live-Frame-Inspektor für Text-, Binary- & Ping/Pong-Frames mit Latenz-Messung (ms).
* **Local RAG Vector Database & Embedding Explorer (`VectorSearchLab.jsx`)**:
  * Vektor-Einbettungen (Embeddings) & Berechnung von Kosinus-Ähnlichkeit ($\cos \theta$).
  * Top-K Dokumenten-Retrieval-Ranking für KI-Systeme.
* **Big-O Time & Space Complexity Benchmark Arena (`BigOBenchmarkLab.jsx`)**:
  * Algorithmen-Laufzeit-Benchmark für $O(1)$, $O(\log N)$, $O(N)$, $O(N \log N)$ und $O(N^2)$ bei Skalierung von $N$.
* **OAuth2 PKCE & OIDC Identity Flow Studio (`OauthPkceStudio.jsx`)**:
  * Visueller 4-Schritte PKCE Wizard (`code_verifier`, `code_challenge`, Code Exchange & JWT Claims Decoding).
* **WebAssembly (WASM) & Rust Compilation Playground (`WasmRustStudio.jsx`)**:
  * Rust Quellcode-Editor (`lib.rs`), In-Browser WASM-Bytecode-Compiler (`module.wasm`) & Performance-Benchmark (WASM vs. JS).

#### [v11.0.0] - IHK AP2 Fachgesprächs-Simulator, SQL JOIN Venn Visualizer & Story Kampagnen-Modus
* **IHK AP2 Fachgesprächs- & Projektpräsentations-Simulator (`IhkOralExamSimulator.jsx` / `oralExamData.js`)**:
  * Vollständige 30-Minuten Prüfungssimulation (15 Min. Präsentations-Checkliste mit Phasen-Tracking & 15 Min. Prüfer-Fachgespräch) für Anwendungsentwickler (FIAE) und Systemintegratoren (FISI).
  * Prüfer-Persönlichkeiten (Dr. Architekt, Frau Wirtschaft, Herr Security), fundierte Multiple-Choice-Begründungen und IHK-Notenberechnung (1-6).
* **Visueller SQL JOINs & Venn-Diagramm Builder (`SqlJoinVisualizerLab.jsx`)**:
  * Didaktische Visualisierung von `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN` und `LEFT EXCLUDING JOIN` mit interaktiven Venn-Kreisen.
  * Live In-Memory AlaSQL Ausführung über verknüpfte Tabellen (`Users` & `Orders`), dynamische Ergebnistabelle und Quests.
* **Globaler Story-Kampagnen-Modus ("Vom Noob zum Lead Architect") (`CampaignQuestHub.jsx` / `campaignData.js`)**:
  * 5 aufeinander aufbauende Entwicklungsstufen (Grundlagen, Azubi, Junior Dev, DevOps Engineer, Lead Architect) mit geführten Praxis-Quests und XP-Belohnungen.
* **Erweiterte Testabdeckung (`campaignAndExam.test.js`)**:
  * 100% Validierung aller Prüfungsfragen-Strukturen, Antwortmöglichkeiten und Kampagnen-Kapitel.

#### [v10.0.0] - Code-Splitting, Trees & Graphs Lab, CI/CD Builder & Interactive Labs Hub
* **Performance & Lazy Loading**:
  * Vollständige Umstellung von über 40 Lab- und Spielekomponenten in `App.jsx` auf `React.lazy` und `Suspense` für extrem schnelle Ladezeiten.
  * Bereinigung aller Linter-Fehler (Escape-Sequenzen, ungenutzte Imports) in `ApiMockStudioLab.jsx`, `OauthPkceStudio.jsx`, `GitLab.jsx`, `topicsData.js` und `CtfChallengeLab.jsx`.
* **Data Structures Tree & Graph Lab (`DataStructuresLab.jsx`)**:
  * Interaktive Simulation von Binären Suchbäumen (BST) mit Visualisierung von Inorder-, Preorder- und Postorder-Traversierungen.
  * Dijkstra Kürzeste-Wege-Algorithmus Visualizer mit Adjazenzmatrix, Schritt-für-Schritt Trace und animiertem Pfad.
* **CI/CD Workflow Pipeline Builder (`CiCdWorkflowLab.jsx`)**:
  * Visueller Multi-Stage Pipeline Designer (Checkout, Lint, Unit Tests, Security Scan, Docker Build, Kubernetes Deploy) mit Terminal-Runner und GitHub Actions YAML Export.
* **Interactive Labs & Simulatoren Explorer (`LabsDashboard.jsx`)**:
  * Zentraler Such- und Filter-Hub für alle 25+ Simulatoren nach Kategorien, Tags (#DevOps, #KI, #Security) und Schwierigkeit mit Direktstart.
* **Erweiterte Unit Tests (`useStore.test.js`)**:
  * 100% Testabdeckung für Zustand Store Logik (XP Vergabe, Level Up, Theme & Barrierefreiheits-Toggles, Role Switching).

#### [v9.1.0] - Visual Regex Master, Big-O Benchmark Arena & WebSockets Protocol Studio
* **Visual RegEx Master Quests (`RegexMasterLab.jsx`)**:
  * In-Browser Live Pattern Matcher für Reguläre Ausdrücke (RegEx) mit dynamischem Syntax Highlighting.
  * Gamifizierte Quests (E-Mail Validierung, IPv4 Erkennung, Telefonnummern & Hex-Farbcodes) mit Lösungs-Tipps & Punktebelohnungen.

#### [v9.0.0] - CI/CD GitHub Actions Builder & Docker Compose Multi-Container Studio
* **CI/CD Pipeline & GitHub Actions Builder (`CiCdPipelineLab.jsx`)**:
  * Visueller Workflow-Designer für Linting, Unit Tests, Security Scan, Build, Docker Push & Kubernetes Deployments.
  * Interaktiver Log-Runner und automatische Generierung von `.github/workflows/deploy.yml` Code.
* **Docker Compose Multi-Container Studio (`DockerComposeLab.jsx`)**:
  * Visueller Stack Builder für Frontend, Node API, PostgreSQL & Redis Cache.
  * Simulation von `docker compose up / down` mit Container-Status-LEDs, Log-Streams und Generierung von `docker-compose.yml`.

#### [v8.0.0] - REST API Tester Studio & Cybersecurity CTF Quest Lab
* **REST API Mock Studio (`ApiMockStudioLab.jsx`)**:
  * Postman-Lite API-Testing für HTTP GET, POST, PUT & DELETE mit Headers & JSON-Response Formatting.
* **Cybersecurity CTF Quest Lab (`CtfChallengeLab.jsx`)**:
  * Gamifizierte Hacking-Challenges (Reflected XSS, SQL Injection) mit Flagge-Einreichung (`CTF{...}`) und Punktebelohnungen.

#### [v7.0.0] - VS Code Monaco Studio & Cloud IaC Designer Integration
* **Monaco VS Code Studio (`MonacoStudioLab.jsx`)**:
  * Echter VS Code Editor (`@monaco-editor/react`) im Browser mit Syntax Highlighting & Auto-Completion (IntelliSense) für JS, Python, JSON & HTML.
* **Cloud Infrastructure & Terraform Designer (`CloudDesignerLab.jsx`)**:
  * Visueller Cloud-Architektur Designer (AWS VPC, EC2, RDS) mit automatischer Generierung von Terraform HCL-Code (`main.tf`).

#### [v6.0.0] - Python WASM Sandbox, Packet Tracer & Spaced Repetition Engine
* **Python 3 WASM Execution Sandbox (`PythonWasmLab.jsx`)**:
  * In-Browser Ausführung von Python 3 Skripten (Fibonacci, Algorithmen, Math & Console Logs).
* **Network Packet Tracer & Route Visualizer (`PacketTracerLab.jsx`)**:
  * Interaktive Simulation von ICMP Pings, Gateway Hops (PC ➔ Router ➔ Server) & Paketstatistiken.
* **Leitner Spaced Repetition Flashcard Engine (`LeitnerFlashcardLab.jsx`)**:
  * Karteikasten-Lernsystem mit dynamischer Box-Verschiebung (Box 1 - 5) für schwere IHK-Prüfungsfragen.

#### [v5.0.0] - Enterprise In-Memory SQL Engine, PDF Export & Skill Tree
* **AlaSQL Engine Integration (`SqlDungeon.jsx`)**:
  * Vollständige In-Memory SQL Execution Engine für echte `SELECT`, `JOIN`, `WHERE` und `GROUP BY` Abfragen.
* **jsPDF Zertifikat-Export Engine (`CertificateModal.jsx`)**:
  * Generierung und Download von hochauflösenden, druckfähigen PDF-Zertifikaten im Querformat.
* **RPG Skill Tree Widget (`SkillTreeWidget.jsx`)**:
  * Interaktiver Stufen-Fähigkeitenbaum von IT-Grundlagen bis Cloud Native & Vector AI.

#### [v4.2.0] - Algorithms & Data Structures Visualizer Integration
* **Interaktiver Algorithmen-Visualisierer (`AlgoPlaygroundLab.jsx` / `algorithmData.js`)**:
  * Step-by-Step Animationen für QuickSort, MergeSort & Binäre Suche.
  * Dynamischer Geschwindigkeitsregler, Vergleiche & Zeit-/Speicherkomplexitäts-Übersichten.

#### [v4.1.0] - High-Level IT-Features & Subnetting / Git Lab Integration
* **CIDR Subnetting & Network Calculator Lab (`SubnettingLab.jsx` / `subnettingData.js`)**:
  * Interaktive Subnetz-Berechnung (Netz-ID, Broadcast, erste/letzte nutzbare IP, Binärmasken).
  * IHK-prüfungsrelevantes Übungs-Quiz & Subnetz-Spickzettel.
* **Visual Git Branching & Merging Lab (`GitLab.jsx`)**:
  * Live Commit-Graph-Visualisierer für `git commit`, `branch`, `checkout` und `merge`.
  * Interaktive Terminal-Konsole und geführte Aufgabenstellungen (Quests).

#### [v4.0.0] - Architecture & Gamification Upgrade
* **React Router Integration** für sauberere URL-Navigation.
* **Zustand State Management** als Ersatz für lokale React-States (inklusive Persistenz und SFX-Sound Engine via Web Audio API).
* **Framer Motion** für animierte Page-Transitions und flüssigere UI-Übergänge.
* **Recharts Skill-Matrix** als neues visuelles Radar-Dashboard.
* **PWA (Progressive Web App)** Support mit `vite-plugin-pwa` für echte Offline-Nutzbarkeit.
* **Vitest Testing Framework** Setup für grundlegende Logik-Tests.

#### [v3.2.0] - Full Web Sources Integration (`ausbildung-in-der-it.de`, `it-berufe-podcast.de`, `w3schools.com`, `coursera.org`)
* Complete Content Fetching & Integration von allen angegebenen Web-Quellen.

#### [v3.1.0] - Web Knowledge Integration (IT-Berufe Podcast & Coursera AI)
* IT-Berufe Podcast Module & Coursera AI Module.

#### [v3.0.0] - Ultimate W3Schools Content & Knowledge Upgrade
* Python Complete Guide & Lexikonerweiterung.

#### [v1.0.0] - Initiales Release
* Initiales Setup des IT-DevGame Repositories.
