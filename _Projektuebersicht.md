---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.68.0
date: 2026-10-01
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.68.0)
1. **IHK UML 2.5 Klassendiagramm-Prüfungs-Drill (`UmlDiagramLab.jsx` & `src/utils/umlEngine.js`)**: Neuer interaktiver Tab für Klassendiagramme mit automatischem Mermaid.js Class Diagram Export und IHK-Prüfungs-Drill zu Sichtbarkeits-Modifikatoren (`+`, `-`, `#`, `~`), Beziehungstypen (Komposition `*--` vs. Aggregation `o--`) sowie Multiplizitäten/Kardinalitäten (`1` zu `0..*`) mit +20 XP pro Frage.
2. **IHK WISO Rückwärts- & Differenzkalkulation (`WisoKalkulationLab.jsx` & `src/utils/wisoCalculations.js`)**:
   - *Rückwärtskalkulation*: Exakte Berechnung des maximal erlaubten Listeneinkaufspreises (LEP) ausgehend vom Marktpreis unter Berücksichtigung von Kundenkonditionen, Gewinn- und Handlungskostenzuschlag.
   - *Differenzkalkulation*: Ermittlung des realisierbaren Gewinns und Gewinnsatzes bei fix vorgegebenem Einkaufs- und Verkaufspreis mit Rentabilitäts-Status (Rentabel vs. Verlustgeschäft).
3. **IHK SQL-Abfrage-Tuning & Composite-Index-Drill (`SqlQueryOptimizerLab.jsx`)**: Erweiterung um realistische 3,5-Mio.-Zeilen-Abfragen, Schalten von Verbundindizes (`idx_orders_cust_created`), Index Only Scan ohne Heap-Zugriff und Prüfungs-Drill mit 50 XP Belohnung.
4. **Adaptiver Schwächen-Trainer im Prüfungs-Countdown (`ExamCountdownWidget.jsx`)**: Anbindung an die `examReadinessEngine.js` zur dynamischen Berechnung des Gesamtbereitschafts-Scores, IHK-Notenprognose und Schwächen-Hervorhebung.
5. **IHK Netzplan Prüfungs-Drill (`CpmNetworkLab.jsx`)**: Interaktiver Trainer zur Berechnung von FAZ, FEZ, SAZ, SEZ, GP und FP direkt in die DIN-69900 Knotenmatrix mit Sofortprüfung und 50 XP.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.68.0)
- **Unit- & Integrationstests**: 1301 bestandene Tests in 166 Test-Dateien (100% Erfolgsquote, +3 neue Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 619 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite & PWA Offline Service Worker (265 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 72.48 KB gzipped < 105 KB Limit)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
