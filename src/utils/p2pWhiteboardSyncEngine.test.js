import { describe, it, expect } from 'vitest';
import { WhiteboardCrdtDoc } from './p2pWhiteboardSyncEngine';

describe('P2P Whiteboard CRDT Engine', () => {
  it('adds nodes and generates synchronization messages', () => {
    const doc1 = new WhiteboardCrdtDoc('client_a');
    const msg = doc1.setNode({ id: 'srv_1', label: 'Auth Service' });

    expect(msg.type).toBe('SET_NODE');
    expect(msg.payload.id).toBe('srv_1');
    expect(doc1.getSnapshot().nodes.length).toBe(1);
  });

  it('merges remote messages across two peers concurrently with LWW resolution', () => {
    const peerA = new WhiteboardCrdtDoc('peer_a');
    const peerB = new WhiteboardCrdtDoc('peer_b');

    const msgA = peerA.setNode({ id: 'db_1', label: 'PostgreSQL Primary' });
    const applied = peerB.applyRemoteMessage(msgA);

    expect(applied).toBe(true);
    expect(peerB.getSnapshot().nodes.length).toBe(1);
    expect(peerB.getSnapshot().nodes[0].label).toBe('PostgreSQL Primary');
  });

  it('handles remote node deletion', () => {
    const peerA = new WhiteboardCrdtDoc('peer_a');
    const peerB = new WhiteboardCrdtDoc('peer_b');

    const msgAdd = peerA.setNode({ id: 'cache_1', label: 'Redis Cache' });
    peerB.applyRemoteMessage(msgAdd);
    expect(peerB.getSnapshot().nodes.length).toBe(1);

    const msgDel = peerA.deleteNode('cache_1');
    peerB.applyRemoteMessage(msgDel);
    expect(peerB.getSnapshot().nodes.length).toBe(0);
  });
});
