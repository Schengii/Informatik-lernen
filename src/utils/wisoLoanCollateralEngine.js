/**
 * IHK WISO Loan Repayment Schedule & Collateral Classification Engine
 * Calculates amortization schedules for Annuity, Installment (Ratentilgung), and Bullet Loans,
 * and categorizes Personal vs. Real collaterals (Bürgschaft, Zession, Grundschuld, Sicherungsübereignung).
 */

export function calculateLoanSchedule({
  loanAmount = 100000,
  interestRatePercent = 4.5,
  years = 5,
  loanType = 'annuity' // 'annuity' | 'installment' | 'bullet'
}) {
  const principal = Math.max(1000, loanAmount);
  const rate = Math.max(0.1, interestRatePercent) / 100;
  const n = Math.max(1, years);

  let schedule = [];
  let remainingDebt = principal;
  let totalInterestPaid = 0;
  let totalRepaid = 0;

  if (loanType === 'installment') {
    // Ratentilgung: Fixed principal repayment per year
    const fixedTilgung = principal / n;
    for (let year = 1; year <= n; year++) {
      const zinsen = remainingDebt * rate;
      const rateTotal = fixedTilgung + zinsen;
      remainingDebt -= fixedTilgung;
      totalInterestPaid += zinsen;
      totalRepaid += fixedTilgung;

      schedule.push({
        year,
        startDebt: Math.round(remainingDebt + fixedTilgung),
        zinsen: Math.round(zinsen),
        tilgung: Math.round(fixedTilgung),
        rateTotal: Math.round(rateTotal),
        endDebt: Math.max(0, Math.round(remainingDebt))
      });
    }
  } else if (loanType === 'bullet') {
    // Fälligkeitsdarlehen: Interest only during tenure, full repayment in last year
    for (let year = 1; year <= n; year++) {
      const zinsen = principal * rate;
      const tilgung = year === n ? principal : 0;
      const rateTotal = zinsen + tilgung;
      totalInterestPaid += zinsen;

      schedule.push({
        year,
        startDebt: principal,
        zinsen: Math.round(zinsen),
        tilgung: Math.round(tilgung),
        rateTotal: Math.round(rateTotal),
        endDebt: year === n ? 0 : principal
      });
    }
  } else {
    // Annuity: Constant annual installment (R = K * q^n * (q-1)/(q^n - 1))
    const q = 1 + rate;
    const annuityRate = (principal * Math.pow(q, n) * (q - 1)) / (Math.pow(q, n) - 1);

    for (let year = 1; year <= n; year++) {
      const zinsen = remainingDebt * rate;
      const tilgung = year === n ? remainingDebt : annuityRate - zinsen;
      const rateTotal = zinsen + tilgung;
      remainingDebt -= tilgung;
      totalInterestPaid += zinsen;
      totalRepaid += tilgung;

      schedule.push({
        year,
        startDebt: Math.round(remainingDebt + tilgung),
        zinsen: Math.round(zinsen),
        tilgung: Math.round(tilgung),
        rateTotal: Math.round(rateTotal),
        endDebt: Math.max(0, Math.round(remainingDebt))
      });
    }
  }

  return {
    principal,
    interestRatePercent,
    years: n,
    loanType,
    schedule,
    totalInterestPaid: Math.round(totalInterestPaid),
    totalCost: Math.round(principal + totalInterestPaid)
  };
}

export const IHK_COLLATERAL_TYPES = [
  {
    name: 'Bürgschaft',
    category: 'Personalsicherheit',
    akzessorisch: true,
    description: 'Dritter verpflichtet sich für Verbindlichkeiten des Schuldners einzustehen (selbstschuldnerisch vs. Einrede der Vorausklage).'
  },
  {
    name: 'Zession (Forderungsabtretung)',
    category: 'Personalsicherheit',
    akzessorisch: false,
    description: 'Abtretung von Kundenforderungen oder Gehaltsansprüchen zur Kreditsicherung.'
  },
  {
    name: 'Grundschuld',
    category: 'Realsicherheit',
    akzessorisch: false,
    description: 'Dingliches Recht an einer Immobilie / Grundstück (nicht an das Fortbestehen der Forderung gebunden).'
  },
  {
    name: 'Sicherungsübereignung',
    category: 'Realsicherheit',
    akzessorisch: false,
    description: 'Kreditnehmer bleibt Besitzer (z. B. Fuhrpark/Maschinen), Bank wird Eigentümer.'
  },
  {
    name: 'Eigentumsvorbehalt',
    category: 'Realsicherheit',
    akzessorisch: true,
    description: 'Ware bleibt bis zur vollständigen Bezahlung Eigentum des Verkäufers.'
  }
];
