import { describe, it, expect } from 'vitest';
import {
  exportCanvasToMermaid,
  validateTopology,
  INITIAL_CANVAS_NODES,
  INITIAL_CANVAS_EDGES
} from './collaborativeWhiteboardEngine';

describe('Collaborative Whiteboard Engine', () => {
  it('exports valid Mermaid diagram markdown', () => {
    const mermaid = exportCanvasToMermaid(INITIAL_CANVAS_NODES, INITIAL_CANVAS_EDGES);
    expect(mermaid).toContain('graph LR');
    expect(mermaid).toContain('node_gw["API Gateway (Kong / NGINX)"]');
    expect(mermaid).toContain('node_gw -->|HTTPS /auth| node_auth');
  });

  it('validates connected topology and identifies orphan nodes', () => {
    const valid = validateTopology(INITIAL_CANVAS_NODES, INITIAL_CANVAS_EDGES);
    expect(valid.isValid).toBe(true);
    expect(valid.orphanCount).toBe(0);

    const withOrphan = [...INITIAL_CANVAS_NODES, { id: 'orphan_1', label: 'Unconnected Service' }];
    const invalid = validateTopology(withOrphan, INITIAL_CANVAS_EDGES);
    expect(invalid.isValid).toBe(false);
    expect(invalid.orphanCount).toBe(1);
  });
});
