# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen, Softwareentwicklung, Generativer KI (RAG/LLMs), Cloud Native, Datenbanken, IT-Sicherheit, Logikschaltungen, Netzwerken, RegEx, Terminal-Commands, Vokabeln, Quizzes und App-Entwicklung – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

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
   - Clean Code Prinzipien, REST-APIs, React, Node.js, RegEx, Git-Workflows und praxisnahe Mikroprojekte.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - Fortgeschrittene Cybersecurity (OWASP Top 10, SQLi, XSS), Generative AI (LLMs, RAG-Architekturen), Cloud Native (Docker, Kubernetes) & System-Architektur.

---

## 🔥 Hauptfunktionen & Neue Features (v1.6.0)

* **📖 IT-Vokabeltrainer & Fachbegriffe (`VocabularyTrainerModal.jsx` & `vocabularyData.js`)**:
  * Interaktiver Vokabeltrainer für englische & deutsche IT-Fachbegriffe mit US-Audio-Aussprache, Übersetzung & Beispielsätzen.
* **🏆 Wissens-Quiz Arena (`KnowledgeQuizArena.jsx` & `quizArenaData.js`)**:
  * Interaktive Quiz-Arena mit Kategorien zu KI-Trends 2026 (RAG, LLMs, AI Agents), Cloud, Kubernetes & IHK-Basics.
* **🎥 Erweiterte Lernvideo-Bibliothek (`videosData.js`)**:
  * Neue Trend-Lernvideos zu Generative AI, RAG-Architekturen, Docker & Kubernetes.
* **🐍 Sprachen & Frameworks Academy (`LanguageAcademy.jsx`)**:
  * Python, Java, C#, React & Node.js interaktiv erlernen.
* **🤖 KI-Nutzung & Prompt Engineering Lab (`AiPromptLab.jsx`)**:
  * Professionelles Training zur sicheren KI-Nutzung (ChatGPT, GitHub Copilot).
* **💻 Interaktives Terminal & CLI Lab (`CliTerminalLab.jsx`)**:
  * Linux/Bash Terminal-Simulator für Befehle & Scripts.
* **🛠️ IDEs & Tools Setup Guides (`ToolingSetupGuide.jsx`)**:
  * VS Code, Git & Docker Einrichtungsleitfaden.
* **📱 Fullstack App-Entwicklungs Workshop (`AppWorkshop.jsx`)**:
  * Praxis-Workshop zum Bauen einer eigenen App.
* **🔍 RegEx Lab, 🎴 Karteikarten-Trainer & 💾 Backup Manager**.

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
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── Content/
    │   │   ├── AiPromptLab.jsx
    │   │   ├── AppWorkshop.jsx
    │   │   ├── ClozeTester.jsx
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
    │   │   ├── CliTerminalLab.jsx
    │   │   ├── CodePuzzle.jsx
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

#### [v1.6.0] - IT-Vokabeltrainer, Wissensquiz Arena & Trend-Lernvideos
* **IT-Vokabeltrainer (`VocabularyTrainerModal.jsx`)**: Englische & deutsche IT-Fachausdrücke mit Audio-Aussprache.
* **Wissens-Quiz Arena (`KnowledgeQuizArena.jsx`)**: Quiz-Formate zu KI-Trends 2026 (RAG, LLMs), Cloud & Kubernetes.
* **Lernvideos**: Ergänzung von Video-Tutorials für Generative AI & Cloud Native.

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
