/**
 * IHK WISO Mehrstufige Deckungsbeitragsrechnung & Break-Even-Point Engine
 * Computes single-stage and multi-stage contribution margins (DB I, DB II, DB III, Operating Result)
 * and Break-Even Point metrics.
 */

export function calculateContributionMargin({
  unitsSold = 5000,
  unitPrice = 120,
  variableUnitCost = 45,
  productFixedCosts = 80000, // Erzeugnisfixkosten
  divisionFixedCosts = 60000, // Bereichs-/Spartenfixkosten
  companyFixedCosts = 90000 // Unternehmensfixkosten
}) {
  const units = Math.max(0, unitsSold);
  const price = Math.max(0, unitPrice);
  const varCost = Math.max(0, variableUnitCost);

  // 1. Revenues & Variable Costs
  const totalRevenue = units * price;
  const totalVarCosts = units * varCost;

  // 2. Multi-stage Margins
  const dbPerUnit = price - varCost;
  const db1Total = totalRevenue - totalVarCosts; // Deckungsbeitrag I
  const db2Total = db1Total - productFixedCosts; // Deckungsbeitrag II
  const db3Total = db2Total - divisionFixedCosts; // Deckungsbeitrag III
  const operatingResult = db3Total - companyFixedCosts; // Betriebsergebnis (Gewinn/Verlust)

  // 3. Break-Even Analysis
  const totalFixedCosts = productFixedCosts + divisionFixedCosts + companyFixedCosts;
  const breakEvenUnits = dbPerUnit > 0 ? Math.ceil(totalFixedCosts / dbPerUnit) : 0;
  const breakEvenRevenue = breakEvenUnits * price;
  const safetyMarginPercent = units > 0 && units >= breakEvenUnits
    ? Math.round(((units - breakEvenUnits) / units) * 1000) / 10
    : 0;

  return {
    units,
    price,
    varCost,
    totalRevenue,
    totalVarCosts,
    dbPerUnit,
    db1Total,
    db2Total,
    db3Total,
    totalFixedCosts,
    operatingResult,
    breakEvenUnits,
    breakEvenRevenue,
    safetyMarginPercent,
    isProfitable: operatingResult > 0
  };
}
