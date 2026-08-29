/**
 * IHK WISO Rentabilitäts- & Leverage-Effekt Engine
 * Calculates Eigenkapitalrentabilität (EKR), Gesamtkapitalrentabilität (GKR),
 * Umsatzrentabilität (UR), and Leverage Effect / Debt-to-Equity Multiplier.
 */

export function calculateLeverageEffect({
  eigenkapital = 500000,
  fremdkapital = 500000,
  fremdkapitalZinsPercent = 4.0,
  gesamtkapitalRentabilitaetPercent = 8.0,
  umsatzerloese = 2000000
}) {
  const ek = Math.max(1000, eigenkapital);
  const fk = Math.max(0, fremdkapital);
  const gk = ek + fk;
  const i = Math.max(0, fremdkapitalZinsPercent) / 100;
  const gkr = gesamtkapitalRentabilitaetPercent / 100;
  const umsatz = Math.max(1000, umsatzerloese);

  // Total operating profit before interest (EBIT)
  const ebit = gk * gkr;

  // Interest expense on debt
  const fkZinsen = fk * i;

  // Net Profit (Reingewinn)
  const reingewinn = ebit - fkZinsen;

  // Return on Equity (Eigenkapitalrentabilität EKR)
  const ekrPercent = (reingewinn / ek) * 100;

  // Verschuldungsgrad (Debt-to-Equity Ratio)
  const verschuldungsgrad = fk / ek;

  // Return on Sales (Umsatzrentabilität)
  const umsatzrentabilitaetPercent = (reingewinn / umsatz) * 100;

  // Leverage Effect Assessment
  let leverageStatus = 'NEUTRAL';
  let leverageExplanation = 'Kein Fremdkapitalhebel aktiv.';

  if (fk > 0) {
    if (gkr > i) {
      leverageStatus = 'POSITIVE';
      leverageExplanation = `Positiver Leverage-Effekt: Da die Gesamtkapitalrentabilität (${(gkr * 100).toFixed(1)}%) über dem Fremdkapitalzins (${(i * 100).toFixed(1)}%) liegt, steigt die Eigenkapitalrendite durch Aufnahme von Fremdkapital auf ${ekrPercent.toFixed(1)}%.`;
    } else if (gkr < i) {
      leverageStatus = 'NEGATIVE';
      leverageExplanation = `Negativer Leverage-Effekt (Zinsfalle): Da die Gesamtkapitalrentabilität (${(gkr * 100).toFixed(1)}%) unter dem Fremdkapitalzins (${(i * 100).toFixed(1)}%) liegt, schmälert Fremdkapital die Eigenkapitalrendite drastisch auf ${ekrPercent.toFixed(1)}%.`;
    } else {
      leverageStatus = 'NEUTRAL';
      leverageExplanation = `Neutral: GKR entspricht exakt dem Fremdkapitalzins (${(i * 100).toFixed(1)}%). Keine Hebelwirkung.`;
    }
  }

  return {
    eigenkapital: ek,
    fremdkapital: fk,
    gesamtkapital: gk,
    verschuldungsgrad: parseFloat(verschuldungsgrad.toFixed(2)),
    ebit: Math.round(ebit),
    fkZinsen: Math.round(fkZinsen),
    reingewinn: Math.round(reingewinn),
    gkrPercent: parseFloat((gkr * 100).toFixed(2)),
    ekrPercent: parseFloat(ekrPercent.toFixed(2)),
    umsatzrentabilitaetPercent: parseFloat(umsatzrentabilitaetPercent.toFixed(2)),
    leverageStatus,
    leverageExplanation
  };
}
