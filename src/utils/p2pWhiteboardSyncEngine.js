/**
 * P2P Whiteboard CRDT State Synchronization Engine
 * Implements Last-Write-Wins (LWW) State Map with vector timestamps for distributed architecture editing.
 */

export class WhiteboardCrdtDoc {
  constructor(peerId = 'peer_local') {
    this.peerId = peerId;
    this.clock = 0;
    this.nodes = new Map(); // id -> { data, timestamp, peerId }
    this.edges = new Map(); // id -> { data, timestamp, peerId }
  }

  setNode(node) {
    this.clock++;
    this.nodes.set(node.id, {
      data: node,
      timestamp: this.clock,
      peerId: this.peerId
    });
    return this.createUpdateMessage('SET_NODE', node);
  }

  deleteNode(nodeId) {
    this.clock++;
    this.nodes.delete(nodeId);
    return this.createUpdateMessage('DELETE_NODE', { id: nodeId });
  }

  applyRemoteMessage(msg) {
    if (!msg || !msg.type || !msg.payload) return false;

    const { type, payload, timestamp, peerId } = msg;
    this.clock = Math.max(this.clock, timestamp || 0) + 1;

    if (type === 'SET_NODE') {
      const existing = this.nodes.get(payload.id);
      if (!existing || timestamp >= existing.timestamp) {
        this.nodes.set(payload.id, {
          data: payload,
          timestamp,
          peerId
        });
        return true;
      }
    } else if (type === 'DELETE_NODE') {
      this.nodes.delete(payload.id);
      return true;
    }

    return false;
  }

  getSnapshot() {
    return {
      clock: this.clock,
      peerId: this.peerId,
      nodes: Array.from(this.nodes.values()).map(v => v.data)
    };
  }

  createUpdateMessage(type, payload) {
    return {
      type,
      payload,
      timestamp: this.clock,
      peerId: this.peerId
    };
  }
}
