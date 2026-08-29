/**
 * PostgreSQL Write-Ahead Logging (WAL) & LSN Replication Engine
 * Simulates WAL record generation, LSN (Log Sequence Number) byte offsets,
 * checkpointing, and Synchronous vs. Asynchronous Standby Replication.
 */

export class PostgresWalSimulator {
  constructor(replicationMode = 'async') {
    this.replicationMode = replicationMode; // 'async' | 'sync'
    this.lsnCounter = 0x16b0000;
    this.flushedLsn = this.formatLsn(this.lsnCounter);
    this.standbyLsn = this.formatLsn(this.lsnCounter);
    this.redoPointLsn = this.formatLsn(this.lsnCounter);
    this.walRecords = [];
  }

  formatLsn(offset) {
    const high = Math.floor(offset / 0x100000000).toString(16).toUpperCase();
    const low = (offset % 0x100000000).toString(16).toUpperCase().padStart(7, '0');
    return `${high}/${low}`;
  }

  commitTransaction(query = 'INSERT INTO users VALUES (1, "Alice")') {
    const recordBytes = 128 + Math.floor(Math.random() * 64);
    this.lsnCounter += recordBytes;
    const recordLsn = this.formatLsn(this.lsnCounter);

    const record = {
      lsn: recordLsn,
      query,
      bytes: recordBytes,
      timestamp: new Date().toISOString()
    };
    this.walRecords.unshift(record);

    // Primary flush
    this.flushedLsn = recordLsn;

    // Standby replication
    if (this.replicationMode === 'sync') {
      this.standbyLsn = recordLsn; // Standby acks before commit returns
    } else {
      // Async replication: Standby trails slightly (e.g. previous LSN)
      if (this.walRecords.length > 2) {
        this.standbyLsn = this.walRecords[1].lsn;
      }
    }

    return {
      record,
      replicationMode: this.replicationMode,
      primaryLsn: this.flushedLsn,
      standbyLsn: this.standbyLsn,
      replicationLagBytes: this.replicationMode === 'sync' ? 0 : recordBytes
    };
  }

  triggerCheckpoint() {
    this.redoPointLsn = this.flushedLsn;
    return {
      checkpointLsn: this.redoPointLsn,
      message: `Checkpoint erfolgreich: REDO-Punkt auf ${this.redoPointLsn} gesetzt. Alte WAL-Dateien können archiviert/gelöscht werden.`
    };
  }
}
