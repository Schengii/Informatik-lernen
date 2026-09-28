import React, { useState, useMemo } from 'react';
import { Calculator, Info, ChevronRight, Award } from 'lucide-react';
import { useStore } from '../../store/useStore';
import {
  berechneBab,
  berechneZuschlagskalkulation,
  IHK_BAB_BEISPIEL,
  KOSTENSTELLEN,
  ZUSCHLAGSAETZE_ERLAEUTERUNG,
} from '../../utils/wisoBabEngine';

const XP_REWARD = 65;

export default function WisoBabLab({ onXPGain }) {
  const addXP = useStore((s) => s.addXP);
  const [aktivesTab, setAktivesTab] = useState('bab');
  const [xpVergeben, setXpVergeben] = useState(false);

  // BAB-Eingaben (MEK, FEK & Gemeinkosten-Gesamtbeträge, Schlüssel sind fix für Einfachheit)
  const [mek, setMek] = useState(IHK_BAB_BEISPIEL.materialeinzelkosten);
  const [fek, setFek] = useState(IHK_BAB_BEISPIEL.fertigungseinzelkosten);

  // Zuschlagskalkulation
  const [kalkmek, setKalkmek] = useState(200);
  const [kalkfek, setKalkfek] = useState(300);
  const [kalkGewinn, setKalkGewinn] = useState(15);
  const [kalkuliertXp, setKalkuliertXp] = useState(false);

  const babErgebnis = useMemo(() => {
    try {
      return berechneBab({ ...IHK_BAB_BEISPIEL, materialeinzelkosten: mek, fertigungseinzelkosten: fek });
    } catch {
      return null;
    }
  }, [mek, fek]);

  const kalkErgebnis = useMemo(() => {
    if (!babErgebnis) return null;
    return berechneZuschlagskalkulation({
      mek: kalkmek,
      fek: kalkfek,
      mgkSatz: babErgebnis.zuschlagsaetze.mgkSatz,
      fgkSatz: babErgebnis.zuschlagsaetze.fgkSatz,
      vwgkSatz: babErgebnis.zuschlagsaetze.vwgkSatz,
      vtrgkSatz: babErgebnis.zuschlagsaetze.vtrgkSatz,
      gewinnzuschlag: kalkGewinn,
    });
  }, [babErgebnis, kalkmek, kalkfek, kalkGewinn]);

  const handleKalkXP = () => {
    if (!kalkuliertXp) {
      const xpFn = onXPGain || addXP;
      xpFn?.(XP_REWARD, 'IHK WISO BAB & Kostenstellenrechnung');
      setKalkuliertXp(true);
      setXpVergeben(true);
    }
  };

  const fmt = (n) => typeof n === 'number' ? n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';

  return (
    <div className="lab-container">
      <div className="lab-header">
        <Calculator size={28} className="lab-icon" />
        <div>
          <h2>IHK WISO Betriebsabrechnungsbogen (BAB)</h2>
          <p className="lab-subtitle">Kostenstellenrechnung · Zuschlagssätze · Zuschlagskalkulation — IHK AP2 Standard</p>
        </div>
        {xpVergeben && <div className="xp-badge"><Award size={16} /> +{XP_REWARD} XP</div>}
      </div>

      <div className="lab-tabs">
        {['bab', 'zuschlaege', 'kalkulation'].map((tab) => (
          <button key={tab} className={`lab-tab${aktivesTab === tab ? ' active' : ''}`} onClick={() => setAktivesTab(tab)}>
            {tab === 'bab' ? 'BAB-Übersicht' : tab === 'zuschlaege' ? 'Zuschlagssätze' : 'Zuschlagskalkulation'}
          </button>
        ))}
      </div>

      {aktivesTab === 'bab' && babErgebnis && (
        <div className="bab-panel">
          <div className="info-box">
            <Info size={16} />
            <span>
              Der <strong>Betriebsabrechnungsbogen (BAB)</strong> verteilt die Gemeinkosten des Unternehmens auf die
              Kostenstellen <em>Material, Fertigung, Verwaltung und Vertrieb</em>. Die Zuschlagssätze
              bilden die Basis für die Kalkulation des Selbstkostenpreises.
            </span>
          </div>

          <div className="bab-inputs-row">
            <label>
              Materialeinzelkosten (MEK) [€]
              <input type="number" value={mek} onChange={(e) => setMek(Number(e.target.value))} min="1" />
            </label>
            <label>
              Fertigungseinzelkosten (FEK) [€]
              <input type="number" value={fek} onChange={(e) => setFek(Number(e.target.value))} min="1" />
            </label>
          </div>

          <div className="bab-table-wrapper">
            <table className="bab-table">
              <thead>
                <tr>
                  <th>Kostenart</th>
                  <th>Gesamt (€)</th>
                  {KOSTENSTELLEN.map((ks) => <th key={ks}>{ks}</th>)}
                </tr>
              </thead>
              <tbody>
                {IHK_BAB_BEISPIEL.gemeinkosten.map((art) => {
                  const verteilung = babErgebnis.bab[art.name] || {};
                  return (
                    <tr key={art.name}>
                      <td>{art.name}</td>
                      <td className="betrag-cell">{fmt(art.gesamt)}</td>
                      {KOSTENSTELLEN.map((ks) => <td key={ks} className="betrag-cell">{fmt(verteilung[ks] || 0)}</td>)}
                    </tr>
                  );
                })}
                <tr className="summen-row">
                  <td><strong>Summe Gemeinkosten</strong></td>
                  <td className="betrag-cell"><strong>{fmt(IHK_BAB_BEISPIEL.gemeinkosten.reduce((s, a) => s + a.gesamt, 0))}</strong></td>
                  {KOSTENSTELLEN.map((ks) => (
                    <td key={ks} className="betrag-cell"><strong>{fmt(babErgebnis.kostenstellenSummen[ks] || 0)}</strong></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {aktivesTab === 'zuschlaege' && babErgebnis && (
        <div className="zuschlaege-panel">
          <h3>Berechnete Zuschlagssätze</h3>
          <div className="zuschlagsatz-grid">
            {[
              { key: 'mgkSatz', label: 'MGK-Zuschlag', basis: `MEK = ${fmt(mek)} €`, farbe: 'material' },
              { key: 'fgkSatz', label: 'FGK-Zuschlag', basis: `FEK = ${fmt(fek)} €`, farbe: 'fertigung' },
              { key: 'vwgkSatz', label: 'VwGK-Zuschlag', basis: `HK = ${fmt(babErgebnis.herstellkosten)} €`, farbe: 'verwaltung' },
              { key: 'vtrgkSatz', label: 'VtrGK-Zuschlag', basis: `HK = ${fmt(babErgebnis.herstellkosten)} €`, farbe: 'vertrieb' },
            ].map(({ key, label, basis, farbe }) => (
              <div key={key} className={`zuschlagsatz-card zuschlagsatz-${farbe}`}>
                <div className="zuschlagsatz-wert">{fmt(babErgebnis.zuschlagsaetze[key])} %</div>
                <div className="zuschlagsatz-label">{label}</div>
                <div className="zuschlagsatz-basis">Bezugsbasis: {basis}</div>
                <div className="zuschlagsatz-formel">{ZUSCHLAGSAETZE_ERLAEUTERUNG[key]}</div>
              </div>
            ))}
          </div>

          <div className="herstellkosten-card">
            <div className="herstellkosten-schema">
              <div>MEK: {fmt(mek)} €</div>
              <div className="plus">+ MGK ({fmt(babErgebnis.zuschlagsaetze.mgkSatz)} %): {fmt(mek * babErgebnis.zuschlagsaetze.mgkSatz / 100)} €</div>
              <div className="plus">+ FEK: {fmt(fek)} €</div>
              <div className="plus">+ FGK ({fmt(babErgebnis.zuschlagsaetze.fgkSatz)} %): {fmt(fek * babErgebnis.zuschlagsaetze.fgkSatz / 100)} €</div>
              <div className="summe-zeile">= Herstellkosten: {fmt(babErgebnis.herstellkosten)} €</div>
              <div className="plus">+ VwGK ({fmt(babErgebnis.zuschlagsaetze.vwgkSatz)} %): {fmt(babErgebnis.herstellkosten * babErgebnis.zuschlagsaetze.vwgkSatz / 100)} €</div>
              <div className="plus">+ VtrGK ({fmt(babErgebnis.zuschlagsaetze.vtrgkSatz)} %): {fmt(babErgebnis.herstellkosten * babErgebnis.zuschlagsaetze.vtrgkSatz / 100)} €</div>
              <div className="summe-zeile highlight">= Selbstkosten: {fmt(babErgebnis.selbstkosten)} €</div>
            </div>
          </div>
        </div>
      )}

      {aktivesTab === 'kalkulation' && kalkErgebnis && (
        <div className="kalkulation-panel">
          <div className="info-box">
            <Info size={16} />
            <span>
              Die <strong>Zuschlagskalkulation</strong> verwendet die BAB-Zuschlagssätze,
              um den Selbstkostenpreis und den Angebotspreis für ein einzelnes Produkt zu berechnen.
            </span>
          </div>
          <div className="kalk-inputs-row">
            <label>MEK pro Stück (€) <input type="number" value={kalkmek} onChange={(e) => setKalkmek(Number(e.target.value))} min="0" /></label>
            <label>FEK pro Stück (€) <input type="number" value={kalkfek} onChange={(e) => setKalkfek(Number(e.target.value))} min="0" /></label>
            <label>Gewinnzuschlag (%) <input type="number" value={kalkGewinn} onChange={(e) => setKalkGewinn(Number(e.target.value))} min="0" max="100" /></label>
          </div>

          <div className="kalk-schema">
            {[
              { label: 'Materialeinzelkosten (MEK)', wert: kalkErgebnis.mek },
              { label: `+ Materialgemeinkosten (MGK, ${fmt(babErgebnis?.zuschlagsaetze.mgkSatz)} %)`, wert: kalkErgebnis.mgk },
              { label: 'Fertigungseinzelkosten (FEK)', wert: kalkErgebnis.fek },
              { label: `+ Fertigungsgemeinkosten (FGK, ${fmt(babErgebnis?.zuschlagsaetze.fgkSatz)} %)`, wert: kalkErgebnis.fgk },
              { label: '= Herstellkosten (HK)', wert: kalkErgebnis.herstellkosten, highlight: true },
              { label: `+ Verwaltungsgemeinkosten (VwGK, ${fmt(babErgebnis?.zuschlagsaetze.vwgkSatz)} %)`, wert: kalkErgebnis.vwgk },
              { label: `+ Vertriebsgemeinkosten (VtrGK, ${fmt(babErgebnis?.zuschlagsaetze.vtrgkSatz)} %)`, wert: kalkErgebnis.vtrgk },
              { label: '= Selbstkosten (SK)', wert: kalkErgebnis.selbstkosten, highlight: true },
              { label: `+ Gewinn (${kalkGewinn} %)`, wert: kalkErgebnis.gewinn },
              { label: '= Angebotspreis (netto)', wert: kalkErgebnis.angebotspreis, highlight: true, gross: true },
            ].map(({ label, wert, highlight, gross }) => (
              <div key={label} className={`kalk-zeile${highlight ? ' kalk-highlight' : ''}${gross ? ' kalk-gross' : ''}`}>
                <span>{label}</span>
                <span className="kalk-betrag">{fmt(wert)} €</span>
              </div>
            ))}
          </div>

          <div className="kalk-actions">
            <button className="btn-primary" onClick={handleKalkXP} disabled={kalkuliertXp}>
              {kalkuliertXp ? <><Award size={16} /> +{XP_REWARD} XP verdient!</> : <><ChevronRight size={16} /> Aufgabe abschließen & {XP_REWARD} XP verdienen</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
