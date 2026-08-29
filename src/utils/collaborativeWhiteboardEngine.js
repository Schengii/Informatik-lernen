/**
 * Collaborative Whiteboard & Architecture Canvas Engine
 * Manages distributed canvas nodes, connections, user cursors, and architecture export.
 */

export const INITIAL_CANVAS_NODES = [
  { id: 'node_gw', type: 'api_gateway', label: 'API Gateway (Kong / NGINX)', x: 60, y: 140, color: '#3b82f6' },
  { id: 'node_auth', type: 'microservice', label: 'Auth & JWT Service', x: 300, y: 60, color: '#10b981' },
  { id: 'node_orders', type: 'microservice', label: 'Order Processing Service', x: 300, y: 220, color: '#10b981' },
  { id: 'node_db', type: 'database_sql', label: 'PostgreSQL Primary Cluster', x: 560, y: 140, color: '#06b6d4' },
  { id: 'node_redis', type: 'cache_redis', label: 'Redis L2 Session Cache', x: 560, y: 280, color: '#ef4444' }
];

export const INITIAL_CANVAS_EDGES = [
  { id: 'e1', from: 'node_gw', to: 'node_auth', label: 'HTTPS /auth' },
  { id: 'e2', from: 'node_gw', to: 'node_orders', label: 'gRPC /orders' },
  { id: 'e3', from: 'node_auth', to: 'node_db', label: 'Read/Write' },
  { id: 'e4', from: 'node_orders', to: 'node_db', label: 'ACID Tx' },
  { id: 'e5', from: 'node_orders', to: 'node_redis', label: 'Cache Lookup' }
];

/**
 * Generates Mermaid.js diagram definition from nodes and edges
 */
export function exportCanvasToMermaid(nodes, edges) {
  let mermaid = 'graph LR\n';

  nodes.forEach(n => {
    mermaid += `  ${n.id}["${n.label}"]\n`;
  });

  edges.forEach(e => {
    mermaid += `  ${e.from} -->|${e.label || ''}| ${e.to}\n`;
  });

  return mermaid;
}

/**
 * Validates topology and identifies isolated nodes (SPOFs / orphans)
 */
export function validateTopology(nodes, edges) {
  const connectedNodeIds = new Set();
  edges.forEach(e => {
    connectedNodeIds.add(e.from);
    connectedNodeIds.add(e.to);
  });

  const orphans = nodes.filter(n => !connectedNodeIds.has(n.id));

  return {
    nodeCount: nodes.length,
    edgeCount: edges.length,
    orphanCount: orphans.length,
    orphans,
    isValid: orphans.length === 0
  };
}
