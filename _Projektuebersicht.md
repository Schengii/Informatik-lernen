---
tags:
  - project/informatik-lernen
  - type/software
  - tech/react
  - domain/ihk-ausbildung
  - status/active
version: v3.55.0
date: 2026-09-26
---

# 💻 Informatik-lernen (IT-DevGame) - Projektübersicht

> Interaktive IHK-Prüfungsvorbereitung, Gamification & IT-Simulatoren-Hub für Fachinformatiker (FIAE, FISI, FIDP, FIDV, IT-SE).

## 📂 Verlinkte Hauptdateien im Vault
- [[README|📖 Projektdokumentation & Feature-Guide]]
- [[CLAUDE|🛠️ Entwickler- & KI-Leitfaden (CLAUDE.md)]]
- `.gitignore` & `.claudeignore`

---

## 🎯 Wichtige Meilensteine (Version 3.55.0)
1. **IHK WISO Rechtsformen & Haftungs-Entscheidungsmatrix (`WisoCompanyFormsLab.jsx` & `wisoCompanyFormsEngine.js`)**: Didaktisches Rechtsformen- und Gründungs-Studio für die IHK Abschlussprüfung (AP2 WISO). Systematischer Vergleich (Einzelunternehmen, e.K., GbR, OHG, KG, UG, GmbH, AG), Mindeststammkapital, Haftungsumfang, Handelsregistereintrag (HRA vs. HRB, deklaratorisch vs. konstitutiv) und interaktiver Gründungsfilter mit 60 XP Belohnung.
2. **Mutual TLS (mTLS) & Zero-Trust Service-Mesh Studio (`MtlsZtnaLab.jsx` & `mtlsZtnaEngine.js`)**: Didaktisches Cloud-Native Cyber-Security-Studio nach RFC 8446 für Microservice-Kommunikation. Gegenseitige X.509 Zertifikatsprüfung auf Transportschicht, CRL-Zertifikatssperren (HTTP 496) und feingranulare Zero-Trust RBAC-Zugriffskontrolle (HTTP 403) mit 65 XP Belohnung.
3. **SRP-6a Zero-Knowledge Authentication Studio (`SrpZeroKnowledgeLab.jsx` & `srpAuthEngine.js`)**: Didaktisches Kryptographie- und Authentifizierungs-Studio nach RFC 2945 & RFC 5054. Ephemere Schlüssel ($a, b$), Public Keys ($A, B$), Password Verifier ($v = g^x \pmod N$) und beidseitiger symmetrischer Schlüsseltausch ($S$) ohne Übertragung von Klartext oder Hashes mit Wire-Traffic-Sniffer.
4. **IHK WISO Kaufvertragsstörungen & Sachmängelhaftung Studio (`WisoContractBreachLab.jsx` & `wisoContractBreachEngine.js`)**: Gesetzliche Rügefristen nach HGB § 377 vs. BGB § 438, Vorrang der Nacherfüllung (§ 439 BGB), Freischaltung nachrangiger Käuferrechte nach 2 fehlgeschlagenen Nachbesserungsversuchen (§ 440 BGB) und Bagatellmangelprüfung.
5. **Routing-Algorithmen: Dijkstra (SPF) & Spanning Tree (STP IEEE 802.1D) (`RoutingDijkstraLab.jsx` & `routingDijkstraEngine.js`)**: OSPF Shortest Path First mit visualisierter Schritt-für-Schritt-Relaxation und Spanning Tree Loop Prevention.
6. **RFC 9111 HTTP Caching Studio (`HttpCachingLab.jsx` & `httpCachingEngine.js`)**: Cache-Control Direktiven und bedingte Anfragen (`If-None-Match` vs. `ETag`) mit 0-Byte-Payload HTTP 304 Not Modified Antworten.

---

## 📊 Aktuelle Test- & Qualitätsmetriken (v3.55.0)
- **Unit- & Integrationstests**: 1052 bestandene Tests in 151 Test-Dateien (100% Erfolgsquote, +6 Tests)
- **Code-Qualität**: 0 Oxlint Fehler / 0 Warnungen über 561 Quelldateien, `tsc --noEmit` fehlerfrei
- **Build**: Vite 8 & PWA Offline Service Worker (235 Precache-Einträge)
- **Performance & Limits**: Alle Chunks innerhalb der Size-Limits (App-Shell 111.56 KB gzipped)
- **Vercel-Deployment**: Produktionsreife `vercel.json` mit SPA-Rewrites, Asset-Caching & Security-Headern
- **A11y**: WCAG 2.1 Konformität (Reduced Motion Support, barrierefreie Labels)
