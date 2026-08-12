# 💻 IT-DevGame | Interaktives Informatik-Spiel & Lernplattform

Ein modernes, gamifiziertes Web-Anwendungs-Framework zum Erlernen von Informatik-Grundlagen, Softwareentwicklung, Datenbanken, IT-Sicherheit, Logikschaltungen und Netzwerken – **barrierefrei, WCAG-konform und 100% DSGVO-kompatibel**.

---

## 📋 Inhaltsverzeichnis
- [Übersicht & Beschreibung](#-übersicht--beschreibung)
- [Hauptfunktionen & Barrierefreiheit](#-hauptfunktionen--barrierefreiheit)
- [Ordnerstruktur](#-ordnerstruktur)
- [Dateiinhalt & Komponentenübersicht](#-dateiinhalt--komponentenübersicht)
- [Funktionsweise](#-funktionsweise)
- [DSGVO & Datenschutz](#-dsgvo--datenschutz)
- [Anleitung (Installation & Ausführung)](#-anleitung-installation--ausführung)
- [Änderungshistorie & Entwicklungsdokumentation](#-änderungshistorie--entwicklungsdokumentation)

---

## 🎯 Übersicht & Beschreibung

**IT-DevGame** ist eine interaktive, barrierefreie Lernplattform für angehende Informatiker (u. a. Fachinformatiker Anwendungsentwicklung, Systemintegration, IT-Systemelektroniker). Die Anwendung kombiniert theoretische Lerneinheiten mit praxisnahen Mini-Games, Lückentext-Tests, Code-Sandboxes, Audio-Vorlesefunktionen und Gamification-Elementen (XP, Level, Streaks, Badges).

---

## 🔥 Hauptfunktionen & Barrierefreiheit

* **🎨 Modernes, helles & kontraststarkes UI-Design**:
  * Vollständig überarbeitetes Farbschema (vibrante Indigo-, Teal-, Amber- & Emerald-Akzente).
  * Optimierte Textkontraste nach **WCAG 2.1 Level AA / AAA** für hervorragende Lesbarkeit.
  * Dynamischer Wechsel zwischen Hell- & Dunkelmodus.
* **♿ Umfassende Barrierefreiheit & Inklusion**:
  * **Lese-Rechtschreib-Hilfe (Dyslexie-Modus)**: Spezialschriftart (*Atkinson Hyperlegible*), erweiterter Zeichen- & Zeilenabstand für vereinfachtes Lesen.
  * **Rot-Grün-Sehhilfe (Farbenblindheits-Modus)**: Zusätzliche Icon-Indikatoren (✓ / ✗) und angepasste Farbpaletten, sodass kein Lerninhalt rein farbabhängig ist.
  * **Vorlesefunktion (Text-to-Speech)**: Integrierte Audio-Steuerung (Play/Pause/Stopp) in der Fachkunde zum Vorlesen von Theorietexten.
  * **Schriftgrößen-Skalierung**: Stufenlose Anpassung (A- / 100% / A+) über die Barrierefreiheits-Toolbar.
  * **Hoher Kontrast & Reduzierte Animationen**: Schalter für maximale Kontraste und sanfte Bewegungen.
* **🔒 DSGVO & Privacy First**:
  * 100% DSGVO-konform: Keine Tracking-Cookies, keine externen Analyse-Tools.
  * Sämtliche Fortschritte verbleiben ausschließlich im lokalen Speicher (`localStorage`) des Nutzers.
  * Integriertes DSGVO & Impressum Modal in der Fußzeile.
* **🎮 Interaktive Mini-Games**:
  * **Logic Gates Simulator**: Digitale Logikgatter (AND, OR, NOT, XOR, NAND, NOR) testen & Schaltungen simulieren.
  * **SQL Dungeon**: Datenbankabfragen (SELECT, JOIN, WHERE, GROUP BY) lösen.
  * **Web Sandbox**: Live HTML/CSS/JS Code-Editor mit Echtzeit-Vorschau.
  * **Security Lab**: Cyber-Security Scenarios (Phishing, Passwort-Stärke, Hashing, Port-Scans).
  * **Code Puzzle**: Code-Blöcke per Drag/Click in die richtige Reihenfolge bringen.
* **📱 Responsive & Touch-Optimiert**:
  * Barrierefreie Touch-Targets (mind. 44px) für Smartphone-, Tablet- und Desktop-Nutzung.

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
    ├── assets/
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

### Core & Navigation
* **`src/App.jsx`**: Hauptkomponente mit State-Management für Routing, Gamification, Barrierefreiheit (Dyslexie, Rot-Grün-Sehhilfe, High Contrast) und Theme-Modi.
* **`src/components/Navigation/Navbar.jsx`**: Kopfzeile mit XP, Level, Rolle, Theme-Wechsler & Barrierefreiheits-Button.
* **`src/components/Navigation/AccessibilityToolbar.jsx`**: Interaktive Toolbar für Schriftgrößen, Lese-Rechtschreib-Hilfe, Rot-Grün-Sehhilfe & reduziertes Motion-Setting.
* **`src/components/Footer/DsgvoFooterModal.jsx`**: Fußzeile & Modal für Datenschutz (DSGVO), Impressum und lokale Datentransparenz.
* **`src/components/Navigation/MobileNav.jsx`**: Untere Navigationsleiste mit touch-optimierten Buttons (mind. 44px).

### Inhalte & Lernen
* **`src/components/Content/TopicReader.jsx`**: Fachkunde-Artikel mit integrierter **Audio Vorlesefunktion (Text-to-Speech)**, Quizzes & Barrierefreiheits-Icons.
* **`src/components/Content/ClozeTester.jsx`**: Interaktiver Lückentext-Tester mit deutlichen Icon-Feedback-Indikatoren.
* **`src/styles/global.css`**: Zentrales CSS-Designsystem mit WCAG-Farbtokens, Dyslexie-Font-Regeln, Rot-Grün-Hilfe & Mikro-Animationen.

---

## ⚙️ Funktionsweise

1. **Accessibility & Inklusions-Engine**:
   - Die Anwendung schaltet dynamisch CSS-Klassen (`.dyslexia-mode`, `.colorblind-mode`, `.high-contrast-mode`) am `body`-Element.
   - Die Vorlesefunktion greift direkt auf die native `SpeechSynthesisUtterance` Web API des Browsers zu.
2. **Gamification-Engine**:
   - XP und Level-Aufstiege werden bei allen absolvierten Einheiten vergeben. Konfetti-Animationen berücksichtigen die Benutzereinstellung für reduzierte Bewegung (`isReducedMotion`).

---

## 🔒 DSGVO & Datenschutz

* **Kein Server-Tracking**: Weder IPs noch Nutzerdaten werden an Drittanbieter oder Server übermittelt.
* **Lokaler Speicher**: Fortschrittsdaten liegen verschlüsselt/rein im `localStorage` des jeweiligen Endgeräts.

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

#### [v1.1.0] - Helles High-Contrast Design, Barrierefreiheit (WCAG/Dyslexie/Sehhilfe), TTS & DSGVO
* **UI Redesign**: Umstellung auf ein helles, modernes Design mit kontrastreichen Akzentfarben (Indigo, Teal, Emerald, Amber).
* **Barrierefreiheit (WCAG 2.1 AA/AAA)**:
  * **Lese-Rechtschreib-Hilfe**: Integration des Dyslexie-Modus mit adaptierter Typografie (*Atkinson Hyperlegible*) & Abständen.
  * **Rot-Grün-Sehhilfe**: Ergänzung barrierefreier Icon-Indikatoren (✓/✗) & kontraststarker Farbwelten.
  * **Vorlesefunktion**: Text-to-Speech Vorlese-Steuerung in den Fachkunde-Themen.
  * **Accessibility Toolbar**: Menü zur Steuerung von Schriftgröße, Bewegung, Kontrast und Hilfsmodi.
* **DSGVO & Rechtliches**: Ergänzung von Datenschutz- & Impressum-Modalen sowie transparenter Deklaration des lokalen Speichers.
* **Responsive Touch-Targets**: Mindesthöhe von 44px für alle interaktiven Steuerelemente auf Mobilgeräten.

#### [v1.0.0] - initiales Release & Git Repository Push
* **Initiales Setup**: Einrichtung des Repositories, Mini-Games (Logic Gates, SQL Dungeon, Web Sandbox, Security Lab, Code Puzzle) & Theorie-Module.
