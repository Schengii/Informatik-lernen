# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen, AI Business Prompts & Deep Learning (Golem/Coursera-basiert), IT-Berufe & IHK Prüfungspodcasts (Stefan Macke & Superprof-basiert), IHK Berufsschul-Lernfeldern (FISI/FIAE), Web Components (Lit.dev, Vaadin), 10+ Programmiersprachen (JS, TS, Java, C#, Angular, PHP, React, Vite, C++), Generativer KI (RAG/LLMs), TDD Unit-Testing, i18n Mehrsprachigkeit, Systemarchitektur, Microservices, Design Patterns, Cloud Native, Datenbanken, IT-Sicherheit, Logikschaltungen, Netzwerken, RegEx, Terminal-Commands, Big-O Komplexität, Karriere-Roadmaps, Boss-Battles, Code Typing Speedrun, PWA Offline-Support, Vokabeln, Quizzes und App-Entwicklung – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

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
   - Lernen ohne jegliche Vorkenntnisse.
   - Grundlagen spielerisch erklärt: Wie denkt ein PC? Was sind Bits/Bytes? Erste Schritte in Python, HTML/CSS & Binärlogik.
2. **⚡ IT-Auszubildende (Fachinformatiker AE/SI, IT-Systemelektroniker)**:
   - Alle 12 IHK-Berufsschul Lernfelder (1. bis 3. Lehrjahr), Prüfungswissen für AP Teil 1 & AP Teil 2, IHK-Podcast Tipps für Doku & Fachgespräch.
3. **🚀 Junior Developer**:
   - Clean Code Prinzipien, REST-APIs, JavaScript, TypeScript, React, Angular, Node.js, Vite, RegEx, TDD Unit-Testing, Git-Workflows und Design Patterns.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - AI Business Masterclass, Deep Learning (PyTorch/TensorFlow), Web Components (**Lit.dev**, **Vaadin**), C++ Systemprogrammierung, Systemarchitektur (Microservices, Load Balancer, Redis Cache) & PWA Live Deployment.

---

## 🔥 Hauptfunktionen & Neue Features (v2.2.0)

* **🤖 AI Business & Deep Learning Masterclass (`AiBusinessMasterclass.jsx` & `aiBusinessData.js`)**:
  * Golem Karrierewelt & Coursera-inspirierte Lerneinheiten für Business Prompts, Marketing-Automatisierung & Deep Learning Grundlagen.
* **🎧 IT-Berufe & IHK Podcast Hub (`ItPodcastHub.jsx` & `podcastData.js`)**:
  * Stefan Macke & Superprof-inspirierte Prüfertipps für Projektdokumentation, Fachgespräch & AP Teil 2.
* **🎓 Offizielle IHK FISI/FIAE Lernfelder Hub (`FisiLernfelderHub.jsx`)**: Alle 12 Berufsschul-Lernfelder (LF 1 bis 12b).
* **🔥 Web Components Hub (`WebComponentsHub.jsx`)**: Lit.dev, Vaadin & Custom Elements.
* **📚 10+ Sprachen W3Schools Academy (`LanguageAcademy.jsx`)**.

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
    │   │   ├── AppWorkshop.jsx
    │   │   ├── ArchitectureVisualizer.jsx
    │   │   ├── BigOVisualizer.jsx
    │   │   ├── CareerRoadmap.jsx
    │   │   ├── ClozeTester.jsx
    │   │   ├── DeploymentGuideModal.jsx
    │   │   ├── DesignPatternsLab.jsx
    │   │   ├── ExamSimulator.jsx
    │   │   ├── FisiLernfelderHub.jsx
    │   │   ├── GlossaryModal.jsx
    │   │   ├── ItPodcastHub.jsx
    │   │   ├── KnowledgeQuizArena.jsx
    │   │   ├── LanguageAcademy.jsx
    │   │   ├── TddUnitTestLab.jsx
    │   │   ├── TopicReader.jsx
    │   │   ├── ToolingSetupGuide.jsx
    │   │   ├── VideoHub.jsx
    │   │   ├── VocabularyTrainerModal.jsx
    │   │   └── WebComponentsHub.jsx
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
    │   ├── clozeData.js
    │   ├── examData.js
    │   ├── flashcardsData.js
    │   ├── gamesData.js
    │   ├── glossaryData.js
    │   ├── languageData.js
    │   ├── lernfelderData.js
    │   ├── podcastData.js
    │   ├── projectsData.js
    │   ├── quizArenaData.js
    │   ├── roadmapData.js
    │   ├── topicsData.js
    │   ├── userProfiles.js
    │   ├── vocabularyData.js
    │   ├── webComponentsData.js
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

#### [v2.2.0] - AI Business Masterclass & IT Podcast Hub (Superprof/Golem/Coursera)
* **AI Business Masterclass (`AiBusinessMasterclass.jsx`)**: Golem & Coursera-basierte KI Business Prompts & Deep Learning.
* **IT-Berufe Podcast Hub (`ItPodcastHub.jsx`)**: Stefan Macke & Superprof-basierte IHK Prüfungstipps.

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

#### [v1.6.0] - IT-Vokabeltrainer, Wissensquiz Arena & Trend-Lernvideos
* IT-Vokabeltrainer, Wissensquiz Arena & Trend-Lernvideos.

#### [v1.5.0] - Sprachen Academy, KI Prompt Lab, CLI Terminal & Tooling
* Python, Java, C#, React, Node.js, KI Prompting & Terminal CLI.

#### [v1.4.0] - RegEx Lab, Karteikarten & Backup Manager
* RegEx Lab, Karteikarten-Trainer & JSON Backup Manager.

#### [v1.3.0] - IT-Lexikon, IHK Simulator & Zertifikate
* IT-Lexikon, IHK Prüfungssimulator & Zertifikat-Generator.

#### [v1.2.0] - Zielgruppen-Erweiterung für jedes Alter
* Erweiterung des Nutzerprofil-Systems & Einführung von `DifficultyFilterBar.jsx`.

#### [v1.1.0] - Helles High-Contrast Design, Barrierefreiheit & DSGVO
* UI-Redesign, Barrierefreiheit & DSGVO-Modal.

#### [v1.0.0] - Initiales Release
* Initiales Setup des IT-DevGame Repositories.
