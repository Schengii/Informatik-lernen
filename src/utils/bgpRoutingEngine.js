/**
 * BGP Routing & Autonomous System (AS) Path Simulator Engine
 * Implements BGP best path selection algorithm, AS-Path loop detection, and AS-Path prepending.
 */

export const INITIAL_BGP_TOPOLOGY = {
  autonomousSystems: [
    { asn: 100, name: 'Tier-1 Backbone (Lumen/Arelion)', tier: 1 },
    { asn: 200, name: 'Tier-2 ISP (Deutsche Telekom)', tier: 2 },
    { asn: 300, name: 'Cloud Provider (AWS/Cloudflare)', tier: 2 },
    { asn: 400, name: 'Enterprise Datacenter (Customer)', tier: 3 }
  ],
  availableRoutesToPrefix: [
    {
      id: 'route_primary',
      prefix: '198.51.100.0/24',
      originAsn: 400,
      asPath: [200, 400],
      localPref: 100,
      med: 0,
      nextHop: '192.0.2.1',
      description: 'Direkte Anbindung über Tier-2 ISP (AS200)'
    },
    {
      id: 'route_backup',
      prefix: '198.51.100.0/24',
      originAsn: 400,
      asPath: [100, 300, 400],
      localPref: 100,
      med: 50,
      nextHop: '198.18.0.1',
      description: 'Transit über Tier-1 Backbone (AS100 -> AS300)'
    }
  ]
};

/**
 * Selects the best BGP path based on standard decision rules:
 * 1. Highest Local Preference
 * 2. Shortest AS_PATH length
 * 3. Lowest MED (Multi-Exit Discriminator)
 */
export function selectBestBgpPath(routes = []) {
  if (!routes || routes.length === 0) return null;

  // Filter out routes with loops (where origin appears twice without intentional prepending or loop in transit)
  const validRoutes = routes.filter(r => {
    const counts = {};
    for (const asn of r.asPath) {
      counts[asn] = (counts[asn] || 0) + 1;
    }
    // Simple loop check: if any non-origin ASN appears multiple times
    for (const [asnStr, count] of Object.entries(counts)) {
      const asn = parseInt(asnStr, 10);
      if (asn !== r.originAsn && count > 1) return false;
    }
    return true;
  });

  if (validRoutes.length === 0) return null;

  return validRoutes.reduce((best, current) => {
    // 1. Local Preference
    if (current.localPref > best.localPref) return current;
    if (current.localPref < best.localPref) return best;

    // 2. Shortest AS_PATH length
    if (current.asPath.length < best.asPath.length) return current;
    if (current.asPath.length > best.asPath.length) return best;

    // 3. Lowest MED
    if (current.med < best.med) return current;
    return best;
  });
}

/**
 * Simulates AS-Path Prepending to intentionally deprioritize a path
 */
export function applyAsPathPrepending(route, prependCount = 2) {
  const prependedAsns = new Array(prependCount).fill(route.originAsn);
  return {
    ...route,
    asPath: [...route.asPath.slice(0, -1), ...prependedAsns, route.originAsn]
  };
}
