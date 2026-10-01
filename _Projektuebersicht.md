---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.62.0
date: 2026-10-01
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.62.0)
1. **IHK Übertragungszeit- & Bandbreiten-Simulator (`IhkTransferTimeLab.jsx` & `transferTimeEngine.js`)**: Präzise Berechnungen von Dezimal- vs. Binärpräfixen (kB vs. KiB, MB vs. MiB, GB vs. GiB), Bit/Byte-Umrechnung, Protokoll-Overhead (TCP/IP/Ethernet), IHK-Prüfungsszenarien & IHK-Fallen-Quiz mit 50 XP Belohnung.
2. **IHK Prüfungs-Countdown & T-Minus Sprint (`ExamCountdownWidget.jsx`)**: Dynamischer Dashboard-Countdown auf AP1- (März) und AP2-Termine (Mai/November) mit personalisierten Sprint-Empfehlungen für priorisierte Lernmodule.
3. **Cross-Device Clipboard-Sync & Backup-Härtung (`BackupModal.jsx`)**: Schnelle Übertragung des Lernfortschritts zwischen Mobiltelefon und Desktop via Zwischenablage-Copy/Paste neben dem Datei-Export/Import.
4. **IHK WISO Zahlungsverkehr (`WisoPaymentMethodsLab.jsx` & `wisoPaymentEngine.js`)**: SEPA-Überweisung, SEPA-Lastschrift (Mandatsrecht, Vorlaufzeiten, Widerspruch), Wechsel (Diskontierung), Skonto-Effektivzins-Rechner, Wechseldiskont-Rechner, Skonto vs. Rabatt vs. Bonus mit 60 XP Belohnung.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.62.0)
- **Unit- & Integrationstests**: 1293 bestandene Tests in 166 Test-Dateien (100% Erfolgsquote, +7 neue Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 619 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite & PWA Offline Service Worker (265 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 72.47 KB gzipped < 105 KB Limit)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
