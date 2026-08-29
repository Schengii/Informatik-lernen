/**
 * IHK WISO Gehaltsabrechnungs- & Sozialversicherungs-Rechner Engine (Stand 2026)
 * Computes statutory social security deductions, income tax brackets, BBG caps, and employer total labor costs.
 */

export const SOCIAL_SECURITY_RATES_2026 = {
  kvBase: 0.146, // 14.6% Gesamt (50% AN / 50% AG)
  defaultKvZusatz: 0.017, // 1.7% Zusatzbeitrag (hälftig 0.85%)
  rvRate: 0.186, // 18.6% Gesamt (9.3% AN / 9.3% AG)
  avRate: 0.026, // 2.6% Gesamt (1.3% AN / 1.3% AG)
  pvBase: 0.040, // 4.0% Grundbeitrag (2.0% AN / 2.0% AG)
  pvChildlessSurcharge: 0.006, // +0.6% für kinderlose AN ab 23 Jahren
  bbgKvPvMonthly: 5175, // Beitragsbemessungsgrenze KV/PV (Stand 2026)
  bbgRvAvMonthly: 7550 // Beitragsbemessungsgrenze RV/AV
};

export function calculateSalaryDeductions({
  grossSalaryMonthly = 3500,
  taxClass = 1, // 1 to 6
  hasChildren = false,
  churchTax = false,
  kvZusatzPercent = 1.7
}) {
  const gross = Math.max(0, grossSalaryMonthly);
  const { bbgKvPvMonthly, bbgRvAvMonthly, rvRate, avRate, pvBase, pvChildlessSurcharge } = SOCIAL_SECURITY_RATES_2026;

  // 1. Social Security Base amounts (capped by BBG)
  const assessmentKvPv = Math.min(gross, bbgKvPvMonthly);
  const assessmentRvAv = Math.min(gross, bbgRvAvMonthly);

  // 2. Employee Social Contributions
  const employeeKv = Math.round(assessmentKvPv * (0.073 + (kvZusatzPercent / 100) / 2) * 100) / 100;
  const employeeRv = Math.round(assessmentRvAv * (rvRate / 2) * 100) / 100;
  const employeeAv = Math.round(assessmentRvAv * (avRate / 2) * 100) / 100;

  // PV Calculation (Kinderloser Zuschlag 0.6% zahlt AN allein)
  const employeePvRate = (pvBase / 2) + (hasChildren ? 0 : pvChildlessSurcharge);
  const employeePv = Math.round(assessmentKvPv * employeePvRate * 100) / 100;

  const totalSocialEmployee = Math.round((employeeKv + employeeRv + employeeAv + employeePv) * 100) / 100;

  // 3. Wage Tax (Lohnsteuer Approximation based on Tax Class)
  let taxRatePercent = 0.14;
  if (taxClass === 1 || taxClass === 4) {
    if (gross > 4500) taxRatePercent = 0.24;
    else if (gross > 2500) taxRatePercent = 0.18;
    else if (gross > 1200) taxRatePercent = 0.12;
    else taxRatePercent = 0;
  } else if (taxClass === 3) {
    taxRatePercent = gross > 3500 ? 0.12 : 0.05;
  } else if (taxClass === 5 || taxClass === 6) {
    taxRatePercent = 0.28;
  }

  const wageTax = Math.round(gross * taxRatePercent * 100) / 100;
  const churchTaxAmount = churchTax ? Math.round(wageTax * 0.08 * 100) / 100 : 0;
  const totalTax = Math.round((wageTax + churchTaxAmount) * 100) / 100;

  // 4. Net Salary
  const netSalary = Math.max(0, Math.round((gross - totalSocialEmployee - totalTax) * 100) / 100);

  // 5. Employer Total Costs (Arbeitgeber-Brutto)
  const employerKv = Math.round(assessmentKvPv * (0.073 + (kvZusatzPercent / 100) / 2) * 100) / 100;
  const employerRv = employeeRv;
  const employerAv = employeeAv;
  const employerPv = Math.round(assessmentKvPv * (pvBase / 2) * 100) / 100;
  const totalEmployerSocial = Math.round((employerKv + employerRv + employerAv + employerPv) * 100) / 100;
  const totalEmployerCost = Math.round((gross + totalEmployerSocial) * 100) / 100;

  return {
    gross,
    netSalary,
    totalTax,
    wageTax,
    churchTaxAmount,
    totalSocialEmployee,
    employeeKv,
    employeeRv,
    employeeAv,
    employeePv,
    totalEmployerSocial,
    totalEmployerCost,
    netRatioPercent: gross > 0 ? Math.round((netSalary / gross) * 1000) / 10 : 0
  };
}
