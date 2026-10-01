---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.69.0
date: 2026-10-01
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.69.0)
1. **IHK WISO Arbeitsrecht & Kündigungsfristen-Kalenderrechner (`WisoLaborLawLab.jsx` & `src/utils/wisoLaborLawEngine.js`)**:
   - Exakte kalendarische Berechnung des Wirksamkeitsdatums der Kündigung nach BGB § 622 (Probezeit, Grundkündigungsfrist zum 15. oder Monatsende, gestaffelte Fristen nach Betriebszugehörigkeit bis 20 Jahre).
   - Berechnung der gesetzlichen 3-Wochen-Klagefrist nach § 4 KSchG zur Einreichung der Kündigungsschutzklage beim Arbeitsgericht ausgehend vom Zugang (§ 130 BGB).
2. **IPv6 Subnetting & Nibble-Boundary Studio (`Ipv6RoutingLab.jsx` & `src/utils/ipv6Routing.js`)**:
   - Didaktisches Subnetz-Planungs-Studio für IPv6: Berechnung von Subnetz-Anzahlen ($2^n$), Einhaltung von Hex-Nibble-Boundaries (Schrittweiten von 4 Bit wie `/48`, `/52`, `/56`, `/60`, `/64`), RFC 4862 SLAAC-Konformität (/64) und P2P Point-to-Point Links (/126, /127 nach RFC 6164).
   - Interaktive Adress-Tabelle mit Subnetz-Präfixen und Hex-Darstellung.
3. **IHK UML 2.5 Klassendiagramm-Prüfungs-Drill (`UmlDiagramLab.jsx` & `src/utils/umlEngine.js`)**: Neuer interaktiver Tab für Klassendiagramme mit automatischem Mermaid.js Class Diagram Export und IHK-Prüfungs-Drill zu Sichtbarkeits-Modifikatoren (`+`, `-`, `#`, `~`), Beziehungstypen (Komposition `*--` vs. Aggregation `o--`) sowie Multiplizitäten/Kardinalitäten (`1` zu `0..*`) mit +20 XP pro Frage.
4. **IHK WISO Rückwärts- & Differenzkalkulation (`WisoKalkulationLab.jsx` & `src/utils/wisoCalculations.js`)**:
   - *Rückwärtskalkulation*: Exakte Berechnung des maximal erlaubten Listeneinkaufspreises (LEP) ausgehend vom Marktpreis unter Berücksichtigung von Kundenkonditionen, Gewinn- und Handlungskostenzuschlag.
   - *Differenzkalkulation*: Ermittlung des realisierbaren Gewinns und Gewinnsatzes bei fix vorgegebenem Einkaufs- und Verkaufspreis mit Rentabilitäts-Status (Rentabel vs. Verlustgeschäft).
5. **IHK SQL-Abfrage-Tuning & Composite-Index-Drill (`SqlQueryOptimizerLab.jsx`)**: Erweiterung um realistische 3,5-Mio.-Zeilen-Abfragen, Schalten von Verbundindizes (`idx_orders_cust_created`), Index Only Scan ohne Heap-Zugriff und Prüfungs-Drill mit 50 XP Belohnung.
6. **Adaptiver Schwächen-Trainer im Prüfungs-Countdown (`ExamCountdownWidget.jsx`)**: Anbindung an die `examReadinessEngine.js` zur dynamischen Berechnung des Gesamtbereitschafts-Scores, IHK-Notenprognose und Schwächen-Hervorhebung.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.69.0)
- **Unit- & Integrationstests**: 1311 bestandene Tests in 166 Test-Dateien (100% Erfolgsquote, +10 neue Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 619 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite & PWA Offline Service Worker (265 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 72.48 KB gzipped < 105 KB Limit)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
