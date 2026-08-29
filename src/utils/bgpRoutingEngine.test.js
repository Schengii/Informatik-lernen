import { describe, it, expect } from 'vitest';
import {
  selectBestBgpPath,
  applyAsPathPrepending,
  INITIAL_BGP_TOPOLOGY
} from './bgpRoutingEngine';

describe('BGP Routing Engine', () => {
  it('selects the shortest AS_PATH by default', () => {
    const best = selectBestBgpPath(INITIAL_BGP_TOPOLOGY.availableRoutesToPrefix);
    expect(best.id).toBe('route_primary');
    expect(best.asPath.length).toBe(2);
  });

  it('deprioritizes a route when AS-Path prepending is applied', () => {
    const prependedPrimary = applyAsPathPrepending(INITIAL_BGP_TOPOLOGY.availableRoutesToPrefix[0], 3);
    const routes = [
      prependedPrimary, // AS Path length is now 5
      INITIAL_BGP_TOPOLOGY.availableRoutesToPrefix[1] // AS Path length is 3
    ];

    const best = selectBestBgpPath(routes);
    expect(best.id).toBe('route_backup');
  });
});
