# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen für Einsteiger (ohne Vorkenntnisse), IHK Berufsschul-Lernfeldern (FISI/FIAE LF 1 - 12b), Stefan Macke IT-Berufe Podcasts, Advanced Prompt Engineering (Chain-of-Thought, Few-Shot), Deep Learning, OAuth2 & OpenID Connect (OIDC), WebSockets Realtime Communication, Performance Profiling & Memory Leak Handling, Kubernetes Orchestrierung, Local RAG Vector AI Pipelines, WebAssembly & Rust Compilation, Apache Kafka Event-Driven Architecture, Docker & Containerisierung, Cloud Infrastructure (AWS/GitHub Actions CI/CD), Cybersecurity Red vs Blue Team, GraphQL & REST API Testing, Web Components (Lit.dev, Vaadin), 10+ Programmiersprachen (JS, TS, Java, C#, Angular, PHP, React, Vite, C++), TDD Unit-Testing, i18n Mehrsprachigkeit, Systemarchitektur, Microservices, Design Patterns, Cloud Native, Datenbanken, IT-Sicherheit, Logikschaltungen, Netzwerken, RegEx, Terminal-Commands, Big-O Komplexität, Karriere-Roadmaps, Boss-Battles, Code Typing Speedrun, PWA Offline-Support, Vokabeln, Quizzes und App-Entwicklung – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

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
   - **Sehr umfassender Einsteiger-Kurs (`AnfaengerGuideHub.jsx`)**: Lernen ohne jegliche Vorkenntnisse.
   - Grundlagen leicht verständlich erklärt: Das **EVA-Prinzip** (Eingabe, Verarbeitung, Ausgabe), wie das **CPU-Gehirn** rechnet (ALU, Steuerwerk, Register), **Binärsystem & Bytes** (Bits, 0/1-Schalter), **Internet & DNS** (Telefonbuch des Webs).
2. **⚡ IT-Auszubildende (Fachinformatiker AE/SI, IT-Systemelektroniker)**:
   - Detaillierte IHK-Berufsschul Lernfelder (LF 1 bis LF 12b), prüfungsrelevante Tipps für AP Teil 1 & AP Teil 2, Amortisationsrechnungen, Handelskalkulationen, RTO/RPO Definitionen & Stefan Macke Podcast-Tipps.
3. **🚀 Junior Developer**:
   - Clean Code Prinzipien, REST & GraphQL APIs, Docker, CI/CD Pipelines, JavaScript, TypeScript, React, Angular, Node.js, Vite, RegEx, TDD Unit-Testing & Git-Workflows.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - Advanced Prompt Engineering (Chain-of-Thought, Few-Shot), OAuth2 PKCE & JWT Claims Decoding, WebSockets HTTP 101 Handshake, V8 Performance & Memory Leak Profiling, Kubernetes Deployments, RAG Vector AI Pipelines & Apache Kafka Events.

---

## 🔥 Hauptfunktionen & Neue Features (v2.7.0 Anfänger-Upgrade)

* **🌱 Neuer Anfänger-Lernbereich ohne Vorkenntnisse (`AnfaengerGuideHub.jsx`)**:
  * **EVA-Prinzip**: Eingabe -> Verarbeitung -> Ausgabe anschaulich erklärt.
  * **CPU-Architektur**: ALU, Steuerwerk, Register & Taktfrequenz in GigaHertz.
  * **Binärsystem & Speichergrößen**: Bits, Bytes, KB, MB, GB & TB Vergleiche.
  * **Internet & DNS**: Paketweiterleitung und Domain Name System.
* **🎓 IHK Lernfelder Deep-Dive & Advanced AI Masterclass**.
* **🔐 OAuth2 OIDC, 📻 WebSockets & ☸️ Kubernetes**.

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
    │   │   ├── AnfaengerGuideHub.jsx
    │   │   ├── ApiBenchStudio.jsx
    │   │   ├── AppWorkshop.jsx
    │   │   ├── ArchitectureVisualizer.jsx
    │   │   ├── BigOVisualizer.jsx
    │   │   ├── CareerRoadmap.jsx
    │   │   ├── ClozeTester.jsx
    │   │   ├── CloudDevOpsLab.jsx
    │   │   ├── DeploymentGuideModal.jsx
    │   │   ├── DesignPatternsLab.jsx
    │   │   ├── DockerLab.jsx
    │   │   ├── ExamSimulator.jsx
    │   │   ├── FisiLernfelderHub.jsx
    │   │   ├── GlossaryModal.jsx
    │   │   ├── ItPodcastHub.jsx
    │   │   ├── KafkaEventLab.jsx
    │   │   ├── KnowledgeQuizArena.jsx
    │   │   ├── KubernetesLab.jsx
    │   │   ├── LanguageAcademy.jsx
    │   │   ├── OauthOidcLab.jsx
    │   │   ├── PerformanceProfilingLab.jsx
    │   │   ├── RagAiSimulator.jsx
    │   │   ├── RedBlueTeamLab.jsx
    │   │   ├── TddUnitTestLab.jsx
    │   │   ├── TopicReader.jsx
    │   │   ├── ToolingSetupGuide.jsx
    │   │   ├── VideoHub.jsx
    │   │   ├── VocabularyTrainerModal.jsx
    │   │   ├── WasmRustLab.jsx
    │   │   ├── WebComponentsHub.jsx
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

#### [v2.7.0] - Dedicated Beginners Hub Upgrade
* **Anfänger-Lernbereich (`AnfaengerGuideHub.jsx`)**: EVA-Prinzip, CPU-Architektur, Binärlogik & Netzwerke leicht erklärt.

#### [v2.6.0] - Content & Knowledge Deep-Dive Upgrade
* IHK Lernfelder Knowledge Upgrade, Advanced AI Prompting & IHK Podcast Hub.

#### [v2.5.0] - OAuth2 Security, WebSockets Realtime & Performance Profiling
* OAuth2 PKCE Flow, WebSockets HTTP 101 Handshake & V8 Memory Leak Profiling.

#### [v2.4.1] - Systematisches Audit, Clean Build & Refactoring
* Bereinigung aller unbenutzten Variablen über 82 Komponenten.

#### [v2.4.0] - Kubernetes, RAG Vector AI, Wasm Rust & Kafka Event-Driven Architecture
* Kubernetes Lab, RAG Vector AI Simulator, WebAssembly Rust & Apache Kafka Events.

#### [v2.3.0] - Docker Lab, Cloud DevOps, Red/Blue Security & API Studio
* Multi-Stage Dockerfiles, GitHub Actions Pipelines & Red/Blue Team Hardening.

#### [v2.2.0] - AI Business Masterclass & IT Podcast Hub (Superprof/Golem/Coursera)
* AI Business Prompts, Deep Learning & IHK Podcast Hub.

#### [v2.1.0] - Offizieller IHK FISI / FIAE Lernfelder Hub (LF 1 bis 12b)
* IHK Lernfelder Hub mit allen 12 Berufsschul-Lernfeldern.

#### [v2.0.0] - Web Components (Lit.dev, Vaadin) & 10+ Sprachen W3Schools Hub
* Web Components Hub & erweiterte Sprachen Academy.

#### [v1.9.0] - i18n Mehrsprachigkeit (DE/EN), TDD Unit-Testing & Live Deployment Guide
* i18n Mehrsprachigkeit, Jest TDD Unit Testing Lab & Deployment Guide.

#### [v1.8.0] - Systemarchitektur, Design Patterns, Code Speedrun & PWA Support
* Systemarchitektur Visualizer, Design Patterns Lab, Code Speedrun & PWA Offline-Support.

#### [v1.7.0] - IT Roadmaps, Code Duel Boss Battle & Big-O Visualizer
* IT Karriere Roadmaps, Boss Battle Mode & Big-O Notation Visualizer.

#### [v1.1.0] - Helles High-Contrast Design, Barrierefreiheit & DSGVO
* UI-Redesign, Barrierefreiheit & DSGVO-Modal.

#### [v1.0.0] - Initiales Release
* Initiales Setup des IT-DevGame Repositories.
