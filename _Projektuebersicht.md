---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.56.0
date: 2026-09-26
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.56.0)
1. **IHK WISO Personalbedarfsplanung & HR-Kennzahlen Studio (`WisoPersonalPlanungLab.jsx` & `wisoPersonalPlanungEngine.js`)**: Didaktisches HR- und Controlling-Studio für die IHK Abschlussprüfung (AP2 WISO). Ermittlung von Brutto-Personalbedarf (Einsatzbedarf + Reservebedarf bei Arbeitsausfallzeiten) und Netto-Personalbedarf (Einstellungsbedarf vs. Überhang), Fluktuationsraten nach ZVEI- und BDA-Formel sowie Krankenquote mit 60 XP Belohnung.
2. **OAuth 2.1 & RFC 9449 DPoP Sender-Constrained Security Studio (`Oauth21DpopLab.jsx` & `oauth21DpopEngine.js`)**: Didaktisches Cloud- und API-Security-Studio nach den neuesten OAuth 2.1 Richtlinien und RFC 9449. Verbot von Implicit Grant & ROPC, erzwungenes PKCE mit SHA-256 (`S256`), striktes Redirect-URI Matching und kryptographische Token-Bindung (DPoP Proof mit Replay-Schutz, HTTP-Methoden- und URI-Bindung) mit 65 XP Belohnung.
3. **IHK WISO Rechtsformen & Haftungs-Entscheidungsmatrix (`WisoCompanyFormsLab.jsx` & `wisoCompanyFormsEngine.js`)**: Didaktisches Rechtsformen- und Gründungs-Studio für die IHK Abschlussprüfung (AP2 WISO). Systematischer Vergleich (Einzelunternehmen, e.K., GbR, OHG, KG, UG, GmbH, AG), Mindeststammkapital, Haftungsumfang, Handelsregistereintrag (HRA vs. HRB) und interaktiver Gründungsfilter mit 60 XP Belohnung.
4. **Mutual TLS (mTLS) & Zero-Trust Service-Mesh Studio (`MtlsZtnaLab.jsx` & `mtlsZtnaEngine.js`)**: Didaktisches Cloud-Native Cyber-Security-Studio nach RFC 8446 für Microservice-Kommunikation. Gegenseitige X.509 Zertifikatsprüfung auf Transportschicht, CRL-Zertifikatssperren (HTTP 496) und feingranulare Zero-Trust RBAC-Zugriffskontrolle (HTTP 403) mit 65 XP Belohnung.
5. **SRP-6a Zero-Knowledge Authentication Studio (`SrpZeroKnowledgeLab.jsx` & `srpAuthEngine.js`)**: Didaktisches Kryptographie- und Authentifizierungs-Studio nach RFC 2945 & RFC 5054 mit ephemeren Schlüsseln, Verifier $v$ und Wire-Traffic-Sniffer.
6. **IHK WISO Kaufvertragsstörungen & Sachmängelhaftung Studio (`WisoContractBreachLab.jsx` & `wisoContractBreachEngine.js`)**: Gesetzliche Rügefristen nach HGB § 377 vs. BGB § 438, Vorrang der Nacherfüllung (§ 439 BGB) und Freischaltung nachrangiger Käuferrechte nach 2 fehlgeschlagenen Nachbesserungsversuchen.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.56.0)
- **Unit- & Integrationstests**: 1147 bestandene Tests in 153 Test-Dateien (100% Erfolgsquote, +4 Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 577 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (237 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 110.83 KB gzipped < 115 KB Limit)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
