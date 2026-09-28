---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.61.0
date: 2026-09-28
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.61.0)
1. **IHK WISO Zahlungsverkehr (`WisoPaymentMethodsLab.jsx` & `wisoPaymentEngine.js`)**: SEPA-Überweisung, SEPA-Lastschrift (Mandatsrecht, Vorlaufzeiten, Widerspruch), Wechsel (Diskontierung), Skonto-Effektivzins-Rechner, Wechseldiskont-Rechner, Skonto vs. Rabatt vs. Bonus mit 60 XP Belohnung.
2. **Globales Lab-Styling-System**: Neues CSS-Design-System in `global.css` für alle modernen Labs — `.lab-container`, `.lab-header`, `.lab-tabs`, `.info-box`, `.xp-badge`, vollständige WISO-Lab-Styles, responsive Design für Mobile.
3. **IHK WISO Doppelte Buchführung (`WisoBookkeepingLab.jsx` & `wisoBookkeepingEngine.js`)**: T-Konten-Visualizer, interaktiver Buchungssatz-Builder (7 IHK-Szenarien), Jahresabschluss (GuV & Schlussbilanz) mit 65 XP.
4. **IHK WISO BAB & Zuschlagskalkulation (`WisoBabLab.jsx` & `wisoBabEngine.js`)**: Grafischer BAB, Zuschlagssatz-Berechnung (MGK/FGK/VwGK/VtrGK), vollständige Kalkulation bis Angebotspreis mit 65 XP.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.60.0)
- **Unit- & Integrationstests**: 1286 bestandene Tests in 165 Test-Dateien (100% Erfolgsquote, +22 neue Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 604 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (247 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 113.07 KB gzipped < 115 KB Limit)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
