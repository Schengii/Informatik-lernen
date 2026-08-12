# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen, Softwareentwicklung, Datenbanken, IT-Sicherheit, Logikschaltungen, Netzwerken, RegEx, Terminal-Commands, KI-Prompting und App-Entwicklung – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

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
   - Fortgeschrittene Cybersecurity (OWASP Top 10, SQLi, XSS), KI-Prompt Engineering, Datenbank-Performance & Docker System-Architektur.

---

## 🔥 Hauptfunktionen & Neue Features (v1.5.0)

* **🐍 Sprachen & Frameworks Academy (`LanguageAcademy.jsx`)**:
  * Lerne neue Programmiersprachen & Web-Frameworks: **Python**, **Java**, **C#**, **React** und **Node.js**.
* **🤖 KI-Nutzung & Prompt Engineering Lab (`AiPromptLab.jsx`)**:
  * Interaktives Training zur sinnvollen und sicheren Nutzung von KI-Tools (ChatGPT, GitHub Copilot, Claude) für Entwickler.
* **💻 Interaktives Terminal & CLI Lab (`CliTerminalLab.jsx`)**:
  * Simulator für Linux- & Bash-Kommandozeilenbefehle (`ls`, `mkdir`, `cd`, `pwd`, `git status`) mit Aufgaben-Check.
* **🛠️ IDEs & Tools Setup Guides (`ToolingSetupGuide.jsx`)**:
  * Schritt-für-Schritt Einrichtung für **VS Code**, **Git & SSH** sowie **Docker Container**.
* **📱 Fullstack App-Entwicklungs Workshop (`AppWorkshop.jsx`)**:
  * Praxis-Workshop zum Bauen einer eigenen Task-Manager Web & Mobile App von A bis Z.
* **🔍 RegEx Lab & Pattern Tester (`RegexLab.jsx`)**:
  * Interaktive RegEx Testumgebung für Musterprüfung (E-Mail, IP-Adressen).
* **🎴 Spaced Repetition Karteikarten-Trainer (`FlashcardsModal.jsx`)**:
  * Anki-inspirierte IT-Karteikarten für IHK-Fachbegriffe.
* **💾 Daten Backup & Wiederherstellungs-Manager (`BackupModal.jsx`)**:
  * Exportiere und importiere deinen Lernfortschritt als JSON-Datei.
* **📖 IT-Lexikon & IHK-Prüfungssimulator**:
  * Durchsuchbares Glossar und realistischer IHK GAP 1 / GAP 2 Prüfungstrainer.

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
    │   │   ├── LanguageAcademy.jsx
    │   │   ├── TopicReader.jsx
    │   │   ├── ToolingSetupGuide.jsx
    │   │   └── VideoHub.jsx
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
    │   ├── topicsData.js
    │   ├── userProfiles.js
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

#### [v1.5.0] - Sprachen Academy, KI Prompt Lab, CLI Terminal, Tooling Setup & App Workshop
* **Sprachen & Frameworks Academy (`LanguageAcademy.jsx`)**: Tutorials & Codebeispiele für Python, Java, C#, React & Node.js.
* **KI Prompt Engineering Lab (`AiPromptLab.jsx`)**: Professionelle KI-Nutzung & Prompt-Regeln.
* **CLI Terminal Lab (`CliTerminalLab.jsx`)**: Interaktiver Linux/Bash Terminal Simulator.
* **IDE & Tools Setup (`ToolingSetupGuide.jsx`)**: Schritt-für-Schritt Anleitungen für VS Code, Git & Docker.
* **App Entwicklungs-Workshop (`AppWorkshop.jsx`)**: Schritt-für-Schritt Anleitung zum Bauen einer vollwertigen App.

#### [v1.4.0] - RegEx Lab, IT-Karteikarten Trainer & Backup Manager
* RegEx Lab, Karteikarten-Trainer & JSON Backup Manager.

#### [v1.3.0] - IT-Lexikon, IHK Prüfungssimulator, Skill-Matrix, Tages-Challenge & Zertifikate
* IT-Lexikon, IHK Prüfungssimulator, Skill-Matrix & Zertifikat-Generator.

#### [v1.2.0] - Zielgruppen-Erweiterung für jedes Alter & Vorwissen
* Erweiterung des Nutzerprofil-Systems & Einführung von `DifficultyFilterBar.jsx`.

#### [v1.1.0] - Helles High-Contrast Design, Barrierefreiheit & DSGVO
* UI-Redesign, Barrierefreiheit, Vorlesefunktion & DSGVO-Modal.

#### [v1.0.0] - Initiales Release
* Initiales Setup des IT-DevGame Repositories.
