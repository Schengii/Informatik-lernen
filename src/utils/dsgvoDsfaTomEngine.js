/**
 * IHK DSGVO Datenschutz-Folgenabschätzung (DSFA) & TOM-Generator Engine
 * Evaluates Art. 35 DSGVO threshold criteria and produces Art. 32 TOM compliance catalogues.
 */

export function evaluateDsfaCriteria(criteriaAnswers = {}) {
  // 9 Standard criteria according to European Data Protection Board (EDPB)
  const criteriaList = [
    { id: 'eval_scoring', label: '1. Bewertung / Scoring (z.B. Bonitätsprüfung, Leistungsbewertung)', weight: 2 },
    { id: 'auto_decision', label: '2. Automatisierte Entscheidungsfindung mit Rechtswirkung (Art. 22)', weight: 3 },
    { id: 'surveillance', label: '3. Systematische Überwachung öffentlich zugänglicher Bereiche (Video)', weight: 3 },
    { id: 'special_data', label: '4. Besondere Datenkategorien (Art. 9: Gesundheit, Biometrie, Religion)', weight: 3 },
    { id: 'large_scale', label: '5. Großflächige Datenverarbeitung (z.B. > 10.000 Betroffene)', weight: 2 },
    { id: 'matching_datasets', label: '6. Zusammenführung / Matching getrennter Datensätze', weight: 2 },
    { id: 'vulnerable_subjects', label: '7. Daten schutzbedürftiger Personen (Kinder, Arbeitnehmer)', weight: 2 },
    { id: 'new_tech', label: '8. Einsatz neuartiger Technologien (KI, Gesichtserkennung, IoT)', weight: 2 },
    { id: 'exclusion_rights', label: '9. Verarbeitung hindert Betroffene an Ausübung von Rechten', weight: 3 }
  ];

  let score = 0;
  let activeCount = 0;

  criteriaList.forEach(c => {
    if (criteriaAnswers[c.id]) {
      score += c.weight;
      activeCount++;
    }
  });

  const isMandatory = activeCount >= 2 || score >= 5;
  let riskLevel = 'Niedrig';
  if (score >= 6) riskLevel = 'Sehr Hoch (DSFA zwingend + Meldung an Aufsichtsbehörde)';
  else if (score >= 3) riskLevel = 'Mittel bis Hoch (DSFA erforderlich)';

  return {
    score,
    activeCriteriaCount: activeCount,
    isDsfaMandatory: isMandatory,
    riskLevel,
    criteriaList
  };
}

export function generateTomCatalogue({
  encryption = true,
  twoFactor = true,
  accessControl = true,
  backups = true,
  incidentPlan = true
}) {
  const toms = [
    {
      category: 'Vertraulichkeit (Art. 32 Abs. 1 lit. a/b DSGVO)',
      measures: [
        encryption ? 'End-to-End Verschlüsselung bei Übertragung (TLS 1.3) und Ruhezustand (AES-256)' : 'Verschlüsselung unvollständig',
        twoFactor ? 'Zwei-Faktor-Authentifizierung (2FA / FIDO2) für alle administrativen Zugänge' : 'Passwort-Auth ohne MFA',
        accessControl ? 'Rollenbasiertes Berechtigungskonzept (RBAC) nach Principle of Least Privilege' : 'Standardzugriffsrechte'
      ]
    },
    {
      category: 'Integrität & Weitergabekontrolle',
      measures: [
        'Protokollierung aller Schreib- und Lesezugriffe in manipulationssicherem SIEM Audit-Log',
        'Integritätsprüfung gespeicherter Daten mittels SHA-256 Checksums'
      ]
    },
    {
      category: 'Verfügbarkeit & Belastbarkeit',
      measures: [
        backups ? 'Tägliches automatisiertes 3-2-1 Backup (Offsite & Immutable Storage)' : 'Keine Offsite-Backups',
        'Redundante USV-Notstromversorgung und DDoS-Absicherung im Tier-3 Rechenzentrum'
      ]
    },
    {
      category: 'Wiederherstellbarkeit & Evaluierung',
      measures: [
        incidentPlan ? 'Dokumentierter Incident Response Plan und vierteljährliche Disaster-Recovery-Übungen' : 'Kein formaler Notfallplan',
        'Regelmäßige Datenschutz-Audits und Schwachstellenscans'
      ]
    }
  ];

  return toms;
}
