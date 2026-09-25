// @ts-check
/**
 * IHK WISO Liquiditätsgrade (1., 2. und 3. Grades) & Working Capital Engine
 * Berechnet Barliquidität, einzugsbedingte Liquidität, umsatzbedingte Liquidität (Current Ratio)
 * und das Net Working Capital nach offiziellem IHK-Rahmenlehrplan (AP2 WISO).
 */

/**
 * @typedef {Object} LiquiditaetInput
 * @property {number} fluessigeMittel (€ Kasse, Bankguthaben)
 * @property {number} kurzfristigeForderungen (€ Forderungen aus LuL, Wertpapiere)
 * @property {number} vorraete (€ Rohstoffe, fertige Erzeugnisse, Waren)
 * @property {number} kurzfristigeVerbindlichkeiten (€ Verbindlichkeiten aus LuL, Kontokorrent)
 * @property {number} umlaufvermoegen (€ Summe flüssige Mittel + Forderungen + Vorräte)
 */

/**
 * Berechnet Liquiditätsgrade und Working Capital
 * @param {LiquiditaetInput} params
 */
export function calculateLiquiditaetAndWorkingCapital(params) {
  const {
    fluessigeMittel = 50000,
    kurzfristigeForderungen = 120000,
    vorraete = 180000,
    kurzfristigeVerbindlichkeiten = 150000
  } = params;

  const kVerb = Math.max(1, kurzfristigeVerbindlichkeiten);
  const flM = Math.max(0, fluessigeMittel);
  const ford = Math.max(0, kurzfristigeForderungen);
  const vorr = Math.max(0, vorraete);

  const berechnetesUmlaufvermoegen = flM + ford + vorr;

  // 1. Liquidität 1. Grades (Barliquidität / Cash Ratio)
  // Formel: Flüssige Mittel / Kurzfristige Verbindlichkeiten * 100
  // Richtwert: ca. 20% - 30%
  const liquiditaet1 = (flM / kVerb) * 100;

  // 2. Liquidität 2. Grades (Einzugsbedingte Liquidität / Quick Ratio)
  // Formel: (Flüssige Mittel + kurzfristige Forderungen) / Kurzfristige Verbindlichkeiten * 100
  // Richtwert: ca. 100% - 120%
  const liquiditaet2 = ((flM + ford) / kVerb) * 100;

  // 3. Liquidität 3. Grades (Umsatzbedingte Liquidität / Current Ratio)
  // Formel: Umlaufvermögen / Kurzfristige Verbindlichkeiten * 100
  // Richtwert: ca. 150% - 200%
  const liquiditaet3 = (berechnetesUmlaufvermoegen / kVerb) * 100;

  // 4. Net Working Capital (NWC)
  // Formel: Umlaufvermögen - Kurzfristige Verbindlichkeiten
  const netWorkingCapital = berechnetesUmlaufvermoegen - kVerb;

  const round2 = (/** @type {number} */ n) => Number(n.toFixed(2));

  return {
    berechnetesUmlaufvermoegen: round2(berechnetesUmlaufvermoegen),
    liquiditaet1: round2(liquiditaet1),
    liquiditaet2: round2(liquiditaet2),
    liquiditaet3: round2(liquiditaet3),
    netWorkingCapital: round2(netWorkingCapital),
    statusL1: liquiditaet1 >= 20 ? 'OPTIMAL' : 'KRITISCH',
    statusL2: liquiditaet2 >= 100 ? 'OPTIMAL' : 'UNTERDECKUNG',
    statusL3: liquiditaet3 >= 150 ? 'OPTIMAL' : 'MÄSSIG'
  };
}
