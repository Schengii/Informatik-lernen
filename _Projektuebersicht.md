---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.52.0
date: 2026-09-26
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.52.0)
1. **IHK Mündliche Ergänzungsprüfung (MEP) Simulator (`IhkMepSimulatorLab.jsx` & `ihkMepEngine.js`)**: Didaktisches Prüfungs- und Notfall-Studio nach BBiG § 198 und Prüfungsordnung AO 2020 für gefährdete Prüflinge mit Note 5 (30–49 Punkte). Exakte 2:1 Notenberechnung ($\text{Gesamt} = \frac{2 \times \text{Schriftlich} + 1 \times \text{MEP}}{3}$), Mindestpunktzahl-Kalkulator für genau 50 Punkte (Note 4 / Ausreichend) und 15-Minuten-Prüfungsfragensimulation für WiSo, AP2 Bereich 1 und AP2 Bereich 2 mit Prüfer-Musterantworten und 60 XP Belohnung.
2. **WISO Finanzierungsvergleich: Kauf vs. Kredit vs. Leasing (`WisoFinancingLab.jsx` & `wisoFinancingEngine.js`)**: Didaktisches Investitions- und Finanzierungs-Studio für IHK AP2 WISO & Kostenrechnung. Gegenüberstellung von Barzahlung/Sofortkauf mit Skonto, Ratendarlehen mit degressiven Zinsen und Operating Leasing mit Liquiditätsschonung inklusive linearer AfA-Abschreibung (§ 7 EStG) und Tax-Shield-Steuerabzug mit 60 XP Belohnung.
3. **X.509 PKI & Certificate Chain Validator Studio (`PkiCertificateLab.jsx` & `pkiCertificateEngine.js`)**: Tiefgehende Netzwerksicherheits- und TLS-Inspektion nach RFC 5280 und RFC 6960. Interaktive Hierarchie (Root CA, Intermediate CA, Leaf Server-Zertifikat), Hostname-Matching (SAN-Prüfung inkl. Wildcards), Gültigkeitszeiträume, CRL/OCSP Widerrufsprüfung und Live-Simulation von Kettenbrüchen mit 60 XP Belohnung.
4. **SQL Transaction Isolation & ACID Studio (`SqlIsolationLab.jsx` & `sqlIsolationEngine.js`)**: Didaktisches Datenbank-Architektur- und Concurrency-Studio nach ANSI SQL-92 Standard. Gegenüberstellung der 4 ANSI-SQL Isolationslevel (Read Uncommitted, Read Committed, Repeatable Read, Serializable SSI) und dynamische Simulation von Dirty Reads, Non-Repeatable Reads, Phantom Reads und Write Skew inklusive technischer MVCC- und SIREAD-Erklärungen.
5. **DGUV Vorschrift 3 & VDE Elektro-Prüfstudio (`DguvV3ElektronikLab.jsx` & `dguvV3ElektronikEngine.js`)**: Prüfung elektrischer Schutzmaßnahmen für IT-System-Elektroniker (ITSE AP2) und Fachinformatiker (FISI LF 2). Schutzklassen I–III, Schutzleiterwiderstand $R_{PE}$ nach Leitungslänge ($0,3\,\Omega$ + $0,1\,\Omega$/7,5m), Isolationswiderstand $R_{ISO}$, RCD 30 mA Personenschutzprüfung und USV-Batterieautonomie-Rechner.
6. **Volle IHK AP2-Berufsabdeckung im Prüfungssimulator (`ExamSimulator.jsx` & `examData.js`)**: Vollständige Prüfungsmodi für alle 5 IT-Berufe (FIAE, FISI, FIDP, FIDV, ITSE) mit erweiterten Fragenkatalogen zu ELT/ETL, Data Lineage, MQTT QoS, OPC UA, DGUV V3 und RCD-Schutz.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.52.0)
- **Unit- & Integrationstests**: 1029 bestandene Tests in 143 Test-Dateien (100% Erfolgsquote, +8 Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 546 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (228 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell < 109.07 KB gzipped)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
