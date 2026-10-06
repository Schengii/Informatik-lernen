import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Play, FileText, Check, Copy, X, GraduationCap, Briefcase, Network, Code2, Wrench } from 'lucide-react';
import { LAB_MODULES } from '../../data/labModulesData';
import { useStore } from '../../store/useStore';
import { triggerHaptic } from '../../utils/haptics';

export default function LabsDashboard({ onSelectLab }) {
  const { userState } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [careerFilter, setCareerFilter] = useState('all'); // 'all' | 'ap1' | 'fiae' | 'fisi' | 'itse' | 'wiso'
  const [showBerichtsheftModal, setShowBerichtsheftModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'all', name: 'Alle Themen' },
    { id: 'ihk', name: '🎓 IHK Prüfung & Karriere' },
    { id: 'wiso', name: '💼 WISO & Wirtschaft' },
    { id: 'fiae', name: '💻 Anwendungsentwicklung' },
    { id: 'network', name: '🌐 Netzwerke & Protokolle' },
    { id: 'hardware', name: '⚡ Hardware & Elektronik' },
    { id: 'algorithms', name: 'Algorithmen & Datenstrukturen' },
    { id: 'devops', name: 'DevOps & Git' },
    { id: 'cloud', name: 'Cloud & Container' },
    { id: 'security', name: 'Security & Auth' },
    { id: 'ai', name: 'Künstliche Intelligenz' },
    { id: 'databases', name: 'Datenbanken & SQL' }
  ];

  const careerOptions = [
    { id: 'all', name: 'Alle Berufe' },
    { id: 'ap1', name: 'AP1 Kernqualifikationen (Alle)', icon: GraduationCap },
    { id: 'fiae', name: 'FIAE (Anwendungsentwicklung)', icon: Code2 },
    { id: 'fisi', name: 'FISI (Systemintegration)', icon: Network },
    { id: 'itse', name: 'IT-SE (Systemelektronik)', icon: Wrench },
    { id: 'wiso', name: 'WISO & BWL', icon: Briefcase }
  ];

  const filteredLabs = useMemo(() => {
    return LAB_MODULES.filter(lab => {
      const textToSearch = `${lab.title} ${lab.desc} ${lab.tags.join(' ')}`.toLowerCase();
      const matchesSearch = textToSearch.includes(searchTerm.toLowerCase());
      
      const matchesCat = selectedCategory === 'all' || lab.category === selectedCategory;

      let matchesCareer = true;
      if (careerFilter === 'ap1') {
        matchesCareer = lab.tags.some(t => /ap1|ihk|netzwerk|sql|wiso|hardware/i.test(t)) || lab.badge?.includes('IHK');
      } else if (careerFilter === 'fiae') {
        matchesCareer = lab.category === 'fiae' || lab.category === 'algorithms' || lab.category === 'databases' || lab.tags.some(t => /fiae|code|sql|uml/i.test(t));
      } else if (careerFilter === 'fisi') {
        matchesCareer = lab.category === 'network' || lab.category === 'devops' || lab.category === 'cloud' || lab.tags.some(t => /fisi|cisco|routing|vlan|dhcp|linux|usv/i.test(t));
      } else if (careerFilter === 'itse') {
        matchesCareer = lab.category === 'hardware' || lab.tags.some(t => /itse|usv|dguv|elektro|strom/i.test(t));
      } else if (careerFilter === 'wiso') {
        matchesCareer = lab.category === 'wiso' || lab.tags.some(t => /wiso|kalkulation|bbig|vertrag|skonto/i.test(t));
      }

      return matchesSearch && matchesCat && matchesCareer;
    });
  }, [searchTerm, selectedCategory, careerFilter]);

  // Generierung des Textes für das Ausbildungsberichtsheft
  const generateBerichtsheftText = () => {
    const today = new Date().toLocaleDateString('de-DE');
    const xpTotal = userState?.xp || 0;
    const level = userState?.level || 1;
    const completedCount = userState?.completedTopics?.length || 0;

    return `IHK-AUSBILDUNGSNACHWEIS / WOCHENBERICHT
Erstellt am: ${today}
Lernender-Status: Level ${level} (${xpTotal} XP) | Abgeschlossene Themen/Labs: ${completedCount}

Betriebliche / Fachliche Schulungsinhalte der Woche:
1. Vertiefung IHK-Kernqualifikationen (AO 2020) über die interaktive Lernplattform IT-DevGame
2. Selbstständige Bearbeitung praxisnaher Fach-Simulatoren:
   - DIN 66261 Nassi-Shneiderman Struktogramme & Schreibtischtests (Ablauflogik & Schleifenverfolgung)
   - Relationale Datenbank-Normalisierung (1. NF bis 3. NF, Primär-/Fremdschlüssel, Anomalie-Vermeidung)
   - RFC 3022 / RFC 2663 Network Address Translation (SNAT, DNAT, Port Address Translation / Overload)
   - IEEE 802.1Q VLAN Tagging & Inter-VLAN Routing (Trunking, Access Ports, Subinterfaces)
   - USV-Dimensionierung & RZ-Energieeffizienz nach DIN EN 62040-3 (Wirk-/Scheinleistung, Autonomiezeit, PUE)
3. Überprüfung des Lernerfolgs durch simulierte IHK-Prüfungsfragen und Multiple-Choice-Drills (+55 XP pro Fachmodul).

Ergebnis / Reflexion:
Die Zusammenhänge zwischen Protokollheadern, kaufmännischen Formeln und Programmablaufplänen wurden interaktiv erprobt und gefestigt.`;
  };

  const handleCopyBerichtsheft = () => {
    const text = generateBerichtsheftText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    triggerHaptic('SUCCESS');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} /> Praxisorientiertes Lernen
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '4px 0', color: 'var(--text-main)' }}>
            🧪 Interaktive Laboratorien & Simulatoren Hub
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, maxWidth: '760px' }}>
            Erkunde spezialisierte IT-Simulatoren und Labs nach offiziellem IHK-Standard (AO 2020) – von Struktogrammen und Normalisierung bis hin zu 802.1Q VLANs, DHCP DORA und eBPF.
          </p>
        </div>

        <button
          onClick={() => { setShowBerichtsheftModal(true); triggerHaptic('LIGHT'); }}
          className="btn btn-outline"
          style={{ gap: '8px', padding: '10px 18px', fontWeight: '700', borderRadius: '10px' }}
        >
          <FileText size={16} /> Berichtsheft-Nachweis
        </button>
      </div>

      {/* Berufsbild-Filterleiste */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-color, #334155)' }}>
        {careerOptions.map(opt => (
          <button
            key={opt.id}
            onClick={() => { setCareerFilter(opt.id); triggerHaptic('LIGHT'); }}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: careerFilter === opt.id ? '2px solid var(--accent-primary, #6366f1)' : '1px solid var(--border-color, #334155)',
              background: careerFilter === opt.id ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              color: careerFilter === opt.id ? 'var(--accent-primary, #6366f1)' : 'var(--text-muted, #94a3b8)',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {opt.name}
          </button>
        ))}
      </div>

      {/* Search & Category Filter Toolbar */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Suche nach Tags (#VLAN, #Struktogramm, #SQL), Themen oder Labs..."
            style={{
              width: '100%',
              padding: '12px 12px 12px 38px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-primary)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              fontSize: '0.92rem'
            }}
          />
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`btn ${selectedCategory === c.id ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.82rem', padding: '6px 14px', whiteSpace: 'nowrap' }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredLabs.map((lab) => {
          const Icon = lab.icon;
          return (
            <div
              key={lab.id}
              style={{
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '22px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${lab.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color={lab.color} />
                  </div>
                  {lab.badge && (
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                      {lab.badge}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '0 0 8px 0', color: 'var(--text-main)' }}>
                  {lab.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                  {lab.desc}
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {lab.tags.map(t => (
                    <span key={t} style={{ background: '#0f172a', color: '#94a3b8', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => onSelectLab(lab.id)}
                style={{ width: '100%', gap: '8px', justifyContent: 'center' }}
              >
                <Play size={16} /> Laboratorium Starten
              </button>
            </div>
          );
        })}
      </div>

      {/* MODAL: BERICHTSHEFT-WOCHENNACHWEIS */}
      {showBerichtsheftModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ maxWidth: '640px', width: '100%', background: 'var(--bg-card, #1e293b)', borderRadius: '16px', border: '1px solid var(--border-color, #334155)', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} color="var(--accent-primary, #6366f1)" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>
                  IHK-Ausbildungsnachweis (Wochenbericht)
                </h3>
              </div>
              <button
                onClick={() => setShowBerichtsheftModal(false)}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Dieser vorgefertigte Text fasst deine Lernaktivitäten nach offiziellem IHK-Muster zusammen. Kopiere ihn direkt in dein digitales Berichtsheft:
            </p>

            <textarea
              readOnly
              value={generateBerichtsheftText()}
              rows={12}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: '1.5', resize: 'vertical', marginBottom: '16px' }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowBerichtsheftModal(false)}
                className="btn btn-ghost"
              >
                Schließen
              </button>
              <button
                onClick={handleCopyBerichtsheft}
                className="btn btn-primary"
                style={{ gap: '6px' }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'In die Zwischenablage kopiert!' : 'Text Kopieren'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
