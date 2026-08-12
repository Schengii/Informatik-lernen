# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform für alle Altersgruppen

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen, Softwareentwicklung, Datenbanken, IT-Sicherheit, Logikschaltungen und Netzwerken – **geeignet für Menschen jeden Alters (ohne Vorwissen) bis hin zu IT-Auszubildenden und erfahrenen Senior-Programmierern**.

---

## 📋 Inhaltsverzeichnis
- [Übersicht & Zielgruppen](#-übersicht--zielgruppen)
- [Hauptfunktionen & Barrierefreiheit](#-hauptfunktionen--barrierefreiheit)
- [Ordnerstruktur](#-ordnerstruktur)
- [Dateiinhalt & Komponentenübersicht](#-dateiinhalt--komponentenübersicht)
- [Funktionsweise & Schwierigkeitsgrad-Filter](#-funktionsweise--schwierigkeitsgrad-filter)
- [DSGVO & Datenschutz](#-dsgvo--datenschutz)
- [Anleitung (Installation & Ausführung)](#-anleitung-installation--ausführung)
- [Änderungshistorie & Entwicklungsdokumentation](#-änderungshistorie--entwicklungsdokumentation)

---

## 🎯 Übersicht & Zielgruppen

**IT-DevGame** ist so konzipiert, dass **jeder Mensch – unabhängig von Alter oder Vorkenntnissen** – spielerisch in die Welt der Informatik einsteigen oder bestehendes Wissen gezielt vertiefen kann:

1. **🌱 Einsteiger & Neugierige (Kinder, Senioren, Quereinsteiger)**:
   - Lernen ohne jegliche Vorkenntnisse.
   - Grundlagen spielerisch erklärt: Wie denkt ein PC? Was sind Bits/Bytes? Erste Schritte in HTML/CSS & Binärlogik.
2. **⚡ IT-Auszubildende (Fachinformatiker AE/SI, IT-Systemelektroniker)**:
   - Gezieltes IHK-Prüfungswissen, Berufsschul-Themen (SQL JOINs, Netzwerke/OSI, OOP, Pseudocode, Lückentexte).
3. **🚀 Junior Developer**:
   - Clean Code Prinzipien, REST-APIs, Git-Workflows und praxisnahe Mikroprojekte.
4. **🔥 Erfahrene Senior Developer & IT-Architekten**:
   - Fortgeschrittene Cybersecurity (OWASP Top 10, SQLi, XSS), Datenbank-Performance & Indexing, RegEx & System-Architektur.

---

## 🔥 Hauptfunktionen & Barrierefreiheit

* **🎚️ Interaktiver Schwierigkeitsgrad-Filter**:
  * Dynamische Umschaltung zwischen `🟢 Einsteiger`, `🔵 Azubi / IHK`, `🟣 Senior / Expert` und `Alle Levels`.
* **🎨 Modernes, helles & kontraststarkes UI-Design**:
  * Optimierte Textkontraste nach **WCAG 2.1 Level AA / AAA**.
  * Dynamischer Wechsel zwischen Hell- & Dunkelmodus.
* **♿ Umfassende Barrierefreiheit & Inklusion**:
  * **Lese-Rechtschreib-Hilfe (Dyslexie-Modus)**: Spezialschriftart (*Atkinson Hyperlegible*), erweiterter Zeichen- & Zeilenabstand.
  * **Rot-Grün-Sehhilfe (Farbenblindheits-Modus)**: Zusätzliche Icon-Indikatoren (✓ / ✗) und barrierefreie Farbpaletten.
  * **Vorlesefunktion (Text-to-Speech)**: Audio-Steuerung (Play/Pause/Stopp) zum Vorlesen aller Lerneinheiten.
  * **Schriftgrößen-Skalierung**: Stufenlose Anpassung (A- / 100% / A+).
* **🔒 DSGVO & Privacy First**:
  * 100% DSGVO-konform: Keine Tracking-Cookies, alle Daten bleiben rein lokal im `localStorage`.
* **🎮 Interaktive Mini-Games**:
  * **Logic Gates Simulator**, **SQL Dungeon**, **Web Sandbox**, **Cyber Defense Lab**, **Code Bug Hunter**.

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
    │   │   ├── ClozeTester.jsx
    │   │   ├── TopicReader.jsx
    │   │   └── VideoHub.jsx
    │   ├── Footer/
    │   │   └── DsgvoFooterModal.jsx
    │   ├── Games/
    │   │   ├── CodePuzzle.jsx
    │   │   ├── LogicGatesGame.jsx
    │   │   ├── SecurityLab.jsx
    │   │   ├── SqlDungeon.jsx
    │   │   └── WebSandbox.jsx
    │   ├── Gamification/
    │   │   └── BadgesModal.jsx
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
    │   ├── gamesData.js
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

## 📄 Dateiinhalt & Komponentenübersicht

### Navigation & Level-Steuerung
* **`src/components/Navigation/DifficultyFilterBar.jsx`**: Dynamische Barrierefreiheits-Filterleiste zur Auswahl von Vorwissens-Stufen (`Einsteiger`, `Azubi / IHK`, `Senior / Expert`).
* **`src/components/Onboarding/RoleSelectionModal.jsx`**: Personalisierter Einstiegs-Dialog zur Wahl der passenden Zielgruppe und Lern-Roadmap.
* **`src/data/userProfiles.js`**: Definition der 4 Haupt-Zielgruppen (Einsteiger, Azubi, Junior, Senior).
* **`src/data/topicsData.js`**: Fachkunde-Lektionen mit zugewiesenen Schwierigkeitsgraden.

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

#### [v1.2.0] - Zielgruppen-Erweiterung für jedes Alter & Vorwissen (Einsteiger bis Senior Dev)
* **Zielgruppen-Expansion**: Erweiterung des Nutzerprofil-Systems auf 4 Hauptgruppen (`🌱 Einsteiger ohne Vorwissen`, `⚡ Azubi / IHK`, `🚀 Junior Dev`, `🔥 Senior Dev / Architekt`).
* **Schwierigkeitsgrad-Filter (`DifficultyFilterBar.jsx`)**: Ermöglicht das Filtern aller Wissens- und Praxismodule nach Vorkenntnissen und Alter.
* **Didaktische Anpassungen**: Einfache Sprache in Einsteiger-Modulen, gezieltes Prüfungswissen für Azubis & OWASP/Performance-Themen für Profis.

#### [v1.1.0] - Helles High-Contrast Design, Barrierefreiheit (WCAG/Dyslexie/Sehhilfe), TTS & DSGVO
* **UI Redesign**: Umstellung auf ein helles, modernes Design mit kontrastreichen Akzentfarben.
* **Barrierefreiheit (WCAG 2.1 AA/AAA)**: Dyslexie-Modus, Rot-Grün-Sehhilfe, Text-to-Speech Vorlesefunktion & Accessibility-Toolbar.

#### [v1.0.0] - initiales Release & Git Repository Push
* Initiales Setup des IT-DevGame Repositories.
