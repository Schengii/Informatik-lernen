// Zentrale, datengetriebene Lab-Registry: ein Eintrag pro Lab statt
// `lazy`-Import + `case` in App.jsx. Neue Labs werden NUR hier ergänzt
// (plus ein Eintrag in labModulesData.js für Dashboard/Command-Palette).
// Bestehende Labs in der `activeLabElement`-Switch-Tabelle bleiben gültig und
// werden schrittweise hierher migriert.
//
// Eintrag:
//   tabs   – alle Tab-IDs/Aliase, die das Lab öffnen
//   load   – dynamischer Import (wird in App.jsx per React.lazy geladen)
//   xp     – optional: { prop, badge, withBadgeArg } – Name der XP-Callback-Prop
//            und Standard-Badge. `withBadgeArg` = Lab ruft onXPGain(xp, badge)
export const LAB_REGISTRY = [
  {
    tabs: ['dhcp_dora_lab', 'dhcp_dora', 'dhcp_lab', 'dora_handshake_lab'],
    load: () => import('../components/Content/DhcpDoraLab'),
    xp: { prop: 'onRewardXP', badge: 'dhcp_dora_master' }
  },
  {
    tabs: ['testverfahren_lab', 'testverfahren', 'aequivalenzklassen_lab', 'grenzwertanalyse_lab'],
    load: () => import('../components/Content/TestverfahrenLab'),
    xp: { prop: 'onRewardXP', badge: 'testverfahren_master' }
  },
  {
    tabs: ['wiso_angebotsvergleich_lab', 'wiso_angebotsvergleich', 'angebotsvergleich_lab', 'skonto_rechner'],
    load: () => import('../components/Content/WisoAngebotsvergleichLab'),
    xp: { prop: 'onRewardXP', badge: 'wiso_angebotsvergleich_master' }
  },
  {
    tabs: ['tcp_state_machine_lab', 'tcp_state_machine', 'tcp_handshake_lab'],
    load: () => import('../components/Content/TcpStateMachineLab'),
    xp: { prop: 'onRewardXP', badge: 'tcp_state_machine_master' }
  },
  {
    tabs: ['transfer_time_lab', 'ihk_transfer_time_lab', 'bandbreite_rechner'],
    load: () => import('../components/Content/IhkTransferTimeLab')
  },
  {
    tabs: ['wiso_payment_lab', 'wiso_zahlungsverkehr', 'payment_lab'],
    load: () => import('../components/Content/WisoPaymentMethodsLab'),
    xp: { prop: 'onXPGain', badge: 'wiso_payment_master', withBadgeArg: true }
  }
];

/** Map Tab-ID -> Registry-Eintrag (für O(1)-Lookup und Duplikat-Erkennung). */
export function buildRegistryIndex(registry = LAB_REGISTRY) {
  const index = new Map();
  for (const entry of registry) {
    for (const tab of entry.tabs) {
      if (index.has(tab)) throw new Error(`Doppelte Lab-Registry-Tab-ID: ${tab}`);
      index.set(tab, entry);
    }
  }
  return index;
}
