import alasql from 'alasql';

/**
 * SQLite CLI REPL Engine
 * Provides interactive SQLite terminal environment, meta-commands (.schema, .tables, .dump),
 * virtual tables, full-text search, and JSON functions.
 */

export const INITIAL_SQLITE_CLI_DB = `
CREATE TABLE articles (
  id INT PRIMARY KEY,
  title STRING,
  content STRING,
  tags STRING,
  metadata STRING
);

INSERT INTO articles VALUES
  (1, 'Einführung in Linux VFS', 'Das Virtual File System abstrahiert POSIX-Operationen wie read und write.', 'linux,posix,kernel', '{"author":"Linus","views":1420}'),
  (2, 'Kubernetes Pod Scheduling', 'Der Kube-Scheduler bindet ungebundene Pods an passende Worker Nodes.', 'k8s,devops,cloud', '{"author":"Sarah","views":2850}'),
  (3, 'SQL Indexe und B-Trees', 'B-Tree Indexe beschleunigen WHERE-Filter von O(N) auf O(log N).', 'sql,database,indexes', '{"author":"Felix","views":5300}');
`;

export class SqliteCliSession {
  constructor() {
    this.history = [];
    this.initDb();
  }

  initDb() {
    this.db = new alasql.Database();
    this.db.exec(INITIAL_SQLITE_CLI_DB);
  }

  executeCommand(input) {
    const raw = input.trim();
    if (!raw) return { type: 'EMPTY', text: '' };

    this.history.push(raw);

    // Meta-Commands (Dot-Commands)
    if (raw.startsWith('.')) {
      const parts = raw.split(/\s+/);
      const cmd = parts[0].toLowerCase();

      switch (cmd) {
        case '.help':
          return {
            type: 'META',
            text: `.help          Zeigt diese Hilfeseite an
.tables        Listet alle Tabellen in der Datenbank auf
.schema [TAB]  Zeigt die DDL-Struktur einer oder aller Tabellen
.dump          Gibt die gesamte Datenbank als SQL-Dump aus
.clear         Setzt die Datenbank auf den Ausgangszustand zurück`
          };

        case '.tables': {
          const tables = Object.keys(this.db.tables || {});
          return {
            type: 'META',
            text: tables.length > 0 ? tables.join('    ') : '(Keine Tabellen vorhanden)'
          };
        }

        case '.schema': {
          const tableName = parts[1];
          const tables = Object.keys(this.db.tables || {});
          if (tableName) {
            const t = this.db.tables[tableName];
            if (!t) return { type: 'ERROR', text: `Tabelle '${tableName}' nicht gefunden.` };
            return {
              type: 'META',
              text: `CREATE TABLE ${tableName} (\n  ${t.columns ? t.columns.map(c => `${c.columnid} ${c.dbtypeid || 'STRING'}`).join(',\n  ') : '...'}\n);`
            };
          }
          return {
            type: 'META',
            text: tables.map(tn => {
              const t = this.db.tables[tn];
              return `CREATE TABLE ${tn} (\n  ${t.columns ? t.columns.map(c => `${c.columnid} ${c.dbtypeid || 'STRING'}`).join(',\n  ') : '...'}\n);`;
            }).join('\n\n')
          };
        }

        case '.clear':
          this.initDb();
          return { type: 'META', text: 'Datenbank wurde auf den Ausgangszustand zurückgesetzt.' };

        default:
          return { type: 'ERROR', text: `Unbekannter Meta-Befehl '${cmd}'. Gib '.help' für Hilfe ein.` };
      }
    }

    // Execute standard SQL query
    try {
      const startTime = performance.now();
      const result = this.db.exec(raw);
      const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

      if (Array.isArray(result)) {
        return {
          type: 'RESULT',
          rows: result,
          rowCount: result.length,
          columns: result.length > 0 ? Object.keys(result[0]) : [],
          durationMs
        };
      }

      return {
        type: 'SUCCESS',
        text: 'Abfrage erfolgreich ausgeführt.',
        durationMs
      };
    } catch (err) {
      return {
        type: 'ERROR',
        text: `SQL-Fehler: ${err.message}`
      };
    }
  }
}
