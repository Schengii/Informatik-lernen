---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.67.0
date: 2026-10-01
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.67.0)
1. **IHK SQL-Abfrage-Tuning & Composite-Index-Drill (`SqlQueryOptimizerLab.jsx`)**: Erweiterung um realistische 3,5-Mio.-Zeilen-Abfragen (Filter + Range + Sort), interaktives Schalten von Verbundindizes (`idx_orders_cust_created`), Visualisierung von Seq Scan vs. Index Only Scan ohne Heap-Zugriff sowie IHK-Klausur-Multiple-Choice-Drill mit 50 XP Belohnung.
2. **Adaptiver Schwächen-Trainer im Prüfungs-Countdown (`ExamCountdownWidget.jsx`)**: Direkte Anbindung an die `examReadinessEngine.js` zur dynamischen Berechnung des Gesamtbereitschafts-Scores, IHK-Notenprognose und automatischen Hervorhebung von Prioritäts-Lernfeldern mit Defiziten.
3. **IHK Netzplan Prüfungs-Drill (`CpmNetworkLab.jsx`)**: Interaktiver Trainer zur selbstständigen Berechnung von FAZ, FEZ, SAZ, SEZ, GP und FP direkt in die DIN-69900 Knotenmatrix mit Sofortprüfung, Fehler-Feedback und 50 XP.
4. **IHK DSFA / Art. 35 DSGVO Klausurfälle (`IhkDpiaLab.jsx` & `ihkDpiaEngine.js`)**: Praxis-Szenarien für KI-Copilots (PII-Leak/BetrVG), Serverraum-Videoüberwachung (Biometrie/Art. 9) und US-Cloud-Migration (CLOUD Act/SCC).
5. **IHK Übertragungszeit- & Bandbreiten-Simulator (`IhkTransferTimeLab.jsx` & `transferTimeEngine.js`)**: Präzise Berechnungen von Dezimal- vs. Binärpräfixen (kB vs. KiB, MB vs. MiB, GB vs. GiB), Bit/Byte-Umrechnung, Protokoll-Overhead (TCP/IP/Ethernet) und IHK-Prüfungsszenarien mit 50 XP Belohnung.
6. **Cross-Device Clipboard-Sync & Backup-Härtung (`BackupModal.jsx`)**: Schnelle Übertragung des Lernfortschritts via Zwischenablage-Copy/Paste.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.67.0)
- **Unit- & Integrationstests**: 1298 bestandene Tests in 166 Test-Dateien (100% Erfolgsquote)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 619 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite & PWA Offline Service Worker (265 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 72.48 KB gzipped < 105 KB Limit)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
