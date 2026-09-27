// @ts-check
/**
 * IHK WISO Deckungsbeitrags- & Break-Even-Point Engine
 * Calculates Unit Contribution Margin (db), Break-Even-Point (BEP),
 * Multi-Stage Fixed Cost Allocation (Erzeugnis-, Gruppen-, Bereichs- & Unternehmensfixkosten),
 * and Relative Contribution Margin for bottleneck optimization.
 */

/**
 * @typedef {object} ContributionMarginInput
 * @property {number} [preis]
 * @property {number} [variableStueckkosten]
 * @property {number} [fixkosten]
 * @property {number} [menge]
 *
 * @typedef {object} ContributionMarginResult
 * @property {number} preis
 * @property {number} variableStueckkosten
 * @property {number} fixkosten
 * @property {number} menge
 * @property {number} stueckDb
 * @property {number} dbQuotePercent
 * @property {number} bepMenge
 * @property {number} bepUmsatz
 * @property {number} gesamtUmsatz
 * @property {number} gesamtDb
 * @property {number} betriebsergebnis
 * @property {boolean} isProfit
 *
 * @typedef {object} MultiStageContributionInput
 * @property {number} [erloese]
 * @property {number} [varKosten]
 * @property {number} [erzeugnisFixkosten]
 * @property {number} [gruppenFixkosten]
 * @property {number} [bereichsFixkosten]
 * @property {number} [unternehmensFixkosten]
 *
 * @typedef {object} MultiStageContributionResult
 * @property {number} erloese
 * @property {number} varKosten
 * @property {number} db1
 * @property {number} db2
 * @property {number} db3
 * @property {number} db4
 * @property {number} betriebsergebnis
 * @property {boolean} isProfit
 */

/**
 * @param {ContributionMarginInput} input
 * @returns {ContributionMarginResult}
 */
export function calculateContributionMargin({
  preis = 120.0,
  variableStueckkosten = 70.0,
  fixkosten = 50000.0,
  menge = 1200
}) {
  const p = Math.max(1, preis);
  const kv = Math.max(0, variableStueckkosten);
  const kf = Math.max(0, fixkosten);
  const m = Math.max(1, menge);

  const db = p - kv;
  const dbQuote = p > 0 ? (db / p) * 100 : 0;
  const bepMenge = db > 0 ? Math.ceil(kf / db) : Infinity;
  const bepUmsatz = bepMenge !== Infinity ? bepMenge * p : Infinity;

  const gesamtUmsatz = m * p;
  const gesamtDb = m * db;
  const betriebsergebnis = gesamtDb - kf;

  return {
    preis: p,
    variableStueckkosten: kv,
    fixkosten: kf,
    menge: m,
    stueckDb: parseFloat(db.toFixed(2)),
    dbQuotePercent: parseFloat(dbQuote.toFixed(2)),
    bepMenge,
    bepUmsatz: parseFloat(bepUmsatz.toFixed(2)),
    gesamtUmsatz: parseFloat(gesamtUmsatz.toFixed(2)),
    gesamtDb: parseFloat(gesamtDb.toFixed(2)),
    betriebsergebnis: parseFloat(betriebsergebnis.toFixed(2)),
    isProfit: betriebsergebnis > 0
  };
}

/**
 * @param {MultiStageContributionInput} input
 * @returns {MultiStageContributionResult}
 */
export function calculateMultiStageContribution({
  erloese = 250000,
  varKosten = 140000,
  erzeugnisFixkosten = 25000,
  gruppenFixkosten = 15000,
  bereichsFixkosten = 20000,
  unternehmensFixkosten = 30000
}) {
  const db1 = erloese - varKosten;
  const db2 = db1 - erzeugnisFixkosten;
  const db3 = db2 - gruppenFixkosten;
  const db4 = db3 - bereichsFixkosten;
  const betriebsergebnis = db4 - unternehmensFixkosten;

  return {
    erloese,
    varKosten,
    db1,
    db2,
    db3,
    db4,
    betriebsergebnis,
    isProfit: betriebsergebnis > 0
  };
}
