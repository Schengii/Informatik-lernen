# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen, Softwareentwicklung, Generativer KI (RAG/LLMs), Systemarchitektur, Microservices, Design Patterns, Cloud Native, Datenbanken, IT-Sicherheit, Logikschaltungen, Netzwerken, RegEx, Terminal-Commands, Big-O Komplexität, Karriere-Roadmaps, Boss-Battles, Code Typing Speedrun, PWA Offline-Support, Vokabeln, Quizzes und App-Entwicklung – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

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
   - Gezieltes IHK-Prüfungswissen, Berufsschul-Themen (SQL JOINs, Netzwerke/OSI, Java, C#, Bash-Terminal, Pseudocode, Lückentexte).
3. **🚀 Junior Developer**:
   - Clean Code Prinzipien, REST-APIs, React, Node.js, RegEx, Git-Workflows, Design Patterns und praxisnahe Mikroprojekte.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - Fortgeschrittene Systemarchitektur (Microservices, Load Balancer, Redis Cache), Cybersecurity (OWASP Top 10), Generative AI (LLMs, RAG-Architekturen), Big-O Notation, Cloud Native (Docker, Kubernetes) & PWA Offline Deployment.

---

## 🔥 Hauptfunktionen & Neue Features (v1.8.0)

* **🌐 Systemarchitektur & Microservices Visualizer (`ArchitectureVisualizer.jsx`)**:
  * Interaktives Diagramm zum Verstehen von **Clients**, **API Gateways**, **Load Balancern**, **Microservices**, **Redis In-Memory Cache** und **SQL/NoSQL Datenbanken**.
* **🧩 Software Design Patterns & Refactoring Lab (`DesignPatternsLab.jsx`)**:
  * Interaktiver Code-Workshop für **Singleton**, **Observer**, **Factory** und **Strategy** Muster mit Vorher/Nachher Code-Refactoring.
* **⌨️ Code Typing Speedrun & WPM Tipptrainer (`CodeTypingSpeedrun.jsx`)**:
  * Gamifizierter Entwickler-Tipptrainer mit WPM-Messung (Words Per Minute) und Tippgenauigkeits-Auswertung für JavaScript, Python & SQL.
* **📱 Progressive Web App (PWA) & Offline-Support (`manifest.json` & `sw.js`)**:
  * Service Worker Caching & Web App Manifest – installierbar auf iOS, Android und Desktops für ständige Verfügbarkeit.
* **🧭 IT Karriere Roadmaps, ⚔️ Boss-Battle Mode & 📊 Big-O Notation Visualizer**.

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
    │   │   ├── AiPromptLab.jsx
    │   │   ├── AppWorkshop.jsx
    │   │   ├── ArchitectureVisualizer.jsx
    │   │   ├── BigOVisualizer.jsx
    │   │   ├── CareerRoadmap.jsx
    │   │   ├── ClozeTester.jsx
    │   │   ├── DesignPatternsLab.jsx
    │   │   ├── ExamSimulator.jsx
    │   │   ├── GlossaryModal.jsx
    │   │   ├── KnowledgeQuizArena.jsx
    │   │   ├── LanguageAcademy.jsx
    │   │   ├── TopicReader.jsx
    │   │   ├── ToolingSetupGuide.jsx
    │   │   ├── VideoHub.jsx
    │   │   └── VocabularyTrainerModal.jsx
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
    │   ├── clozeData.js
    │   ├── examData.js
    │   ├── flashcardsData.js
    │   ├── gamesData.js
    │   ├── glossaryData.js
    │   ├── languageData.js
    │   ├── projectsData.js
    │   ├── quizArenaData.js
    │   ├── roadmapData.js
    │   ├── topicsData.js
    │   ├── userProfiles.js
    │   ├── vocabularyData.js
    │   └── videosData.js
    ├── styles/
    │   └── global.css
    └── utils/
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

#### [v1.8.0] - Systemarchitektur, Design Patterns, Code Speedrun & PWA Offline Support
* **Systemarchitektur Visualizer (`ArchitectureVisualizer.jsx`)**: Diagramm für Microservices, Gateway, Redis Cache & DBs.
* **Design Patterns Lab (`DesignPatternsLab.jsx`)**: Refactoring-Lab für Singleton, Observer, Factory & Strategy.
* **Code Speedrun (`CodeTypingSpeedrun.jsx`)**: Entwickler Tipptrainer mit WPM-Messung.
* **PWA & Offline-Support (`manifest.json` & `sw.js`)**: Installierbare Web-App & Offline-Caching.

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
