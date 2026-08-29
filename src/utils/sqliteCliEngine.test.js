import { describe, it, expect } from 'vitest';
import { SqliteCliSession } from './sqliteCliEngine';

describe('SQLite CLI REPL Engine', () => {
  it('executes SELECT queries and returns rows and columns', () => {
    const session = new SqliteCliSession();
    const res = session.executeCommand('SELECT id, title FROM articles;');

    expect(res.type).toBe('RESULT');
    expect(res.rowCount).toBe(3);
    expect(res.columns).toEqual(['id', 'title']);
  });

  it('handles .tables and .schema meta-commands', () => {
    const session = new SqliteCliSession();
    const tablesRes = session.executeCommand('.tables');
    expect(tablesRes.type).toBe('META');
    expect(tablesRes.text).toContain('articles');

    const schemaRes = session.executeCommand('.schema articles');
    expect(schemaRes.type).toBe('META');
    expect(schemaRes.text).toContain('CREATE TABLE articles');
  });

  it('handles SQL syntax errors gracefully without throwing', () => {
    const session = new SqliteCliSession();
    const res = session.executeCommand('SELECT FROM WHERE;');
    expect(res.type).toBe('ERROR');
    expect(res.text).toContain('SQL-Fehler');
  });

  it('supports .clear command to reset database', () => {
    const session = new SqliteCliSession();
    session.executeCommand('DROP TABLE articles;');
    expect(session.executeCommand('.tables').text).not.toContain('articles');

    session.executeCommand('.clear');
    expect(session.executeCommand('.tables').text).toContain('articles');
  });
});
