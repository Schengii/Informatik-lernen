// @ts-check
/**
 * WISO Arbeitsrecht, Kündigungsfristen & Kündigungsschutz Engine
 * Prüfungsrelevant nach BGB § 622, KSchG, MuSchG, SGB IX & JArbSchG
 * für IHK-Abschlussprüfung Teil 1 & Teil 2 (WISO / Wirtschafts- und Sozialkunde).
 */

/**
 * Berechnet die gesetzliche Kündigungsfrist für Arbeitgeber nach BGB § 622 Abs. 1 & 2.
 * @param {number} yearsInCompany Betriebszugehörigkeit in vollen Jahren
 * @param {boolean} isInProbation Befindet sich der Arbeitnehmer in der Probezeit (max. 6 Monate)?
 * @param {boolean} isInitiatedByEmployee Kündigung geht vom Arbeitnehmer aus?
 * @returns {{
 *   termWeeks: number,
 *   termMonths: number,
 *   targetDateDescription: string,
 *   legalBasis: string,
 *   summary: string
 * }}
 */
export function calculateNoticePeriod(yearsInCompany = 0, isInProbation = false, isInitiatedByEmployee = false) {
  // 1. Probezeit (BGB § 622 Abs. 3): 2 Wochen zu jedem Tag
  if (isInProbation) {
    return {
      termWeeks: 2,
      termMonths: 0,
      targetDateDescription: 'Zu jedem beliebigen Kalendertag (ohne Bindung an Monatsende/15.)',
      legalBasis: 'BGB § 622 Abs. 3 (Probezeit)',
      summary: '2 Wochen Kündigungsfrist zu jedem beliebigen Tag.'
    };
  }

  // 2. Kündigung durch den Arbeitnehmer (BGB § 622 Abs. 1): Grundkündigungsfrist 4 Wochen zum 15. oder Monatsende
  if (isInitiatedByEmployee) {
    return {
      termWeeks: 4,
      termMonths: 0,
      targetDateDescription: 'Zum 15. oder zum Ende eines Kalendermonats',
      legalBasis: 'BGB § 622 Abs. 1 (Grundkündigungsfrist Arbeitnehmer)',
      summary: '4 Wochen zum 15. oder zum Ende eines Kalendermonats.'
    };
  }

  // 3. Kündigung durch Arbeitgeber nach Betriebszugehörigkeit (BGB § 622 Abs. 2)
  if (yearsInCompany < 2) {
    return {
      termWeeks: 4,
      termMonths: 0,
      targetDateDescription: 'Zum 15. oder zum Ende eines Kalendermonats',
      legalBasis: 'BGB § 622 Abs. 1 (Grundkündigungsfrist)',
      summary: '4 Wochen zum 15. oder zum Ende eines Kalendermonats.'
    };
  } else if (yearsInCompany < 5) {
    return {
      termWeeks: 0,
      termMonths: 1,
      targetDateDescription: 'Zum Ende eines Kalendermonats',
      legalBasis: 'BGB § 622 Abs. 2 Nr. 1 (2 Jahre Betriebszugehörigkeit)',
      summary: '1 Monat zum Ende eines Kalendermonats.'
    };
  } else if (yearsInCompany < 8) {
    return {
      termWeeks: 0,
      termMonths: 2,
      targetDateDescription: 'Zum Ende eines Kalendermonats',
      legalBasis: 'BGB § 622 Abs. 2 Nr. 2 (5 Jahre Betriebszugehörigkeit)',
      summary: '2 Monate zum Ende eines Kalendermonats.'
    };
  } else if (yearsInCompany < 10) {
    return {
      termWeeks: 0,
      termMonths: 3,
      targetDateDescription: 'Zum Ende eines Kalendermonats',
      legalBasis: 'BGB § 622 Abs. 2 Nr. 3 (8 Jahre Betriebszugehörigkeit)',
      summary: '3 Monate zum Ende eines Kalendermonats.'
    };
  } else if (yearsInCompany < 12) {
    return {
      termWeeks: 0,
      termMonths: 4,
      targetDateDescription: 'Zum Ende eines Kalendermonats',
      legalBasis: 'BGB § 622 Abs. 2 Nr. 4 (10 Jahre Betriebszugehörigkeit)',
      summary: '4 Monate zum Ende eines Kalendermonats.'
    };
  } else if (yearsInCompany < 15) {
    return {
      termWeeks: 0,
      termMonths: 5,
      targetDateDescription: 'Zum Ende eines Kalendermonats',
      legalBasis: 'BGB § 622 Abs. 2 Nr. 5 (12 Jahre Betriebszugehörigkeit)',
      summary: '5 Monate zum Ende eines Kalendermonats.'
    };
  } else if (yearsInCompany < 20) {
    return {
      termWeeks: 0,
      termMonths: 6,
      targetDateDescription: 'Zum Ende eines Kalendermonats',
      legalBasis: 'BGB § 622 Abs. 2 Nr. 6 (15 Jahre Betriebszugehörigkeit)',
      summary: '6 Monate zum Ende eines Kalendermonats.'
    };
  } else {
    return {
      termWeeks: 0,
      termMonths: 7,
      targetDateDescription: 'Zum Ende eines Kalendermonats',
      legalBasis: 'BGB § 622 Abs. 2 Nr. 7 (20 Jahre Betriebszugehörigkeit)',
      summary: '7 Monate zum Ende eines Kalendermonats.'
    };
  }
}

/**
 * Prüft den allgemeinen und besonderen Kündigungsschutz.
 * @param {{
 *   employeeCount: number,
 *   employmentMonths: number,
 *   isPregnant: boolean,
 *   hasDisability: boolean,
 *   isWorksCouncilMember: boolean,
 *   isApprenticeAfterProbation: boolean
 * }} params
 * @returns {{
 *   hasGeneralProtection: boolean,
 *   hasSpecialProtection: boolean,
 *   specialProtectionReasons: string[],
 *   requiresSocialJustification: boolean,
 *   summary: string
 * }}
 */
export function evaluateProtection({
  employeeCount = 12,
  employmentMonths = 10,
  isPregnant = false,
  hasDisability = false,
  isWorksCouncilMember = false,
  isApprenticeAfterProbation = false
}) {
  const reasons = [];

  if (isPregnant) {
    reasons.push('Mutterschutz (§ 17 MuSchG): Absolutes Kündigungsverbot während der Schwangerschaft und bis 4 Monate nach Entbindung.');
  }
  if (hasDisability) {
    reasons.push('Schwerbehinderung (§ 168 SGB IX): Vorherige Zustimmung des Integrationsamtes zwingend erforderlich.');
  }
  if (isWorksCouncilMember) {
    reasons.push('Betriebsratsmitglied (§ 15 KSchG): Ordentliche Kündigung ausgeschlossen, nur außerordentliche Kündigung mit Betriebsratszustimmung möglich.');
  }
  if (isApprenticeAfterProbation) {
    reasons.push('Auszubildender nach der Probezeit (§ 22 BBiG): Ordentliche Kündigung durch den Ausbildenden ausgeschlossen; nur fristlos aus wichtigem Grund.');
  }

  // Allgemeiner Kündigungsschutz nach KSchG:
  // 1. Betrieb hat regelmäßig mehr als 10 Vollzeit-Arbeitnehmer (Kleinbetriebsklausel § 23 KSchG)
  // 2. Arbeitsverhältnis besteht länger als 6 Monate (§ 1 KSchG)
  const hasGeneralProtection = employeeCount > 10 && employmentMonths > 6;
  const hasSpecialProtection = reasons.length > 0;

  let summary = '';
  if (hasSpecialProtection) {
    summary = 'Besonderer Kündigungsschutz greift! Eine Kündigung ist unzulässig oder erfordert behördliche Genehmigungen.';
  } else if (hasGeneralProtection) {
    summary = 'Allgemeiner Kündigungsschutz (KSchG) greift: Kündigung bedarf sozialer Rechtfertigung (personen-, verhaltens- oder betriebsbedingt).';
  } else {
    summary = 'Kein KSchG-Kündigungsschutz (Kleinbetrieb <= 10 MA oder Wartezeit <= 6 Monate nicht erfüllt). Nur Treu und Glauben / Fristen nach BGB § 622 gelten.';
  }

  return {
    hasGeneralProtection,
    hasSpecialProtection,
    specialProtectionReasons: reasons,
    requiresSocialJustification: hasGeneralProtection && !hasSpecialProtection,
    summary
  };
}
