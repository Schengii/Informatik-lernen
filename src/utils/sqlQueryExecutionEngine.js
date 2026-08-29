/**
 * SQL Query Execution Plan & Cost Optimizer Engine
 * Simulates RDBMS Query Planner, AST Decomposition, Cost Estimation, Index Selection, and Plan Tree Nodes.
 */

export const SAMPLE_SCHEMAS = {
  ecommerce: {
    name: 'E-Commerce Database',
    tables: {
      users: {
        rowCount: 100000,
        columns: [
          { name: 'id', type: 'INT', isPk: true },
          { name: 'email', type: 'VARCHAR(255)' },
          { name: 'country', type: 'VARCHAR(50)' },
          { name: 'created_at', type: 'TIMESTAMP' },
          { name: 'is_active', type: 'BOOLEAN' }
        ],
        indexes: [
          { name: 'idx_users_pk', columns: ['id'], isUnique: true, type: 'BTREE' },
          { name: 'idx_users_email', columns: ['email'], isUnique: true, type: 'BTREE' }
        ]
      },
      orders: {
        rowCount: 500000,
        columns: [
          { name: 'id', type: 'INT', isPk: true },
          { name: 'user_id', type: 'INT', isFk: true, ref: 'users.id' },
          { name: 'total_amount', type: 'NUMERIC(10,2)' },
          { name: 'status', type: 'VARCHAR(20)' },
          { name: 'order_date', type: 'DATE' }
        ],
        indexes: [
          { name: 'idx_orders_pk', columns: ['id'], isUnique: true, type: 'BTREE' },
          { name: 'idx_orders_user_id', columns: ['user_id'], isUnique: false, type: 'BTREE' },
          { name: 'idx_orders_status_date', columns: ['status', 'order_date'], isUnique: false, type: 'COMPOSITE' }
        ]
      },
      order_items: {
        rowCount: 1500000,
        columns: [
          { name: 'id', type: 'INT', isPk: true },
          { name: 'order_id', type: 'INT', isFk: true, ref: 'orders.id' },
          { name: 'product_id', type: 'INT' },
          { name: 'quantity', type: 'INT' },
          { name: 'price', type: 'NUMERIC(10,2)' }
        ],
        indexes: [
          { name: 'idx_items_pk', columns: ['id'], isUnique: true, type: 'BTREE' },
          { name: 'idx_items_order_id', columns: ['order_id'], isUnique: false, type: 'BTREE' }
        ]
      }
    }
  }
};

export const SAMPLE_QUERIES = [
  {
    id: 'user_lookup_email',
    title: 'Index Scan: Benutzer anhand E-Mail suchen',
    sql: 'SELECT * FROM users WHERE email = \'alex@example.com\' AND is_active = true;',
    difficulty: 'Beginner'
  },
  {
    id: 'unindexed_country_filter',
    title: 'Seq Scan Bottleneck: Unindizierter Filter nach Land',
    sql: 'SELECT * FROM users WHERE country = \'DE\' ORDER BY created_at DESC;',
    difficulty: 'Intermediate'
  },
  {
    id: 'order_join_aggregation',
    title: 'Hash Join & Group By: Umsatz pro Land aggregieren',
    sql: `SELECT u.country, COUNT(o.id) as order_count, SUM(o.total_amount) as revenue
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'COMPLETED'
GROUP BY u.country
ORDER BY revenue DESC;`,
    difficulty: 'Advanced'
  },
  {
    id: '3way_join_heavy',
    title: 'Multi-Join: 3-Wege Join mit Order Items & Filter',
    sql: `SELECT u.email, o.id as order_id, oi.product_id, oi.quantity * oi.price as subtotal
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
WHERE o.order_date >= '2026-01-01'
ORDER BY subtotal DESC
LIMIT 50;`,
    difficulty: 'Expert'
  }
];

/**
 * Parses and analyzes a SQL query against the schema to produce an Execution Plan Tree
 */
export function generateExecutionPlan(rawSql, schema = SAMPLE_SCHEMAS.ecommerce) {
  const sql = rawSql.trim();
  if (!sql) {
    return { error: 'SQL-Abfrage ist leer.' };
  }

  const upperSql = sql.toUpperCase();
  const tables = schema.tables;

  // Detect query characteristics
  const hasJoin = upperSql.includes('JOIN');
  const hasGroupBy = upperSql.includes('GROUP BY');
  const hasOrderBy = upperSql.includes('ORDER BY');
  const hasLimit = upperSql.includes('LIMIT');
  const hasWhere = upperSql.includes('WHERE');

  // Identify referenced tables
  const referencedTables = [];
  Object.keys(tables).forEach(tName => {
    const reg = new RegExp(`\\b${tName}\\b`, 'i');
    if (reg.test(sql)) {
      referencedTables.push(tName);
    }
  });

  if (referencedTables.length === 0) {
    referencedTables.push('users'); // default fallback
  }

  let totalCost = 0;
  let estimatedRows = 0;
  const recommendations = [];

  // Step 1: Scan Nodes for each table
  const scanNodes = referencedTables.map(tName => {
    const table = tables[tName];
    const rowCount = table ? table.rowCount : 10000;
    
    // Check if WHERE conditions use indexed columns
    let usesIndex = false;
    let indexName = null;
    let filterColumn = null;

    if (hasWhere) {
      table.indexes.forEach(idx => {
        idx.columns.forEach(col => {
          if (new RegExp(`\\b${col}\\b`, 'i').test(sql)) {
            usesIndex = true;
            indexName = idx.name;
            filterColumn = col;
          }
        });
      });
    }

    if (usesIndex) {
      const isUnique = table.indexes.find(i => i.name === indexName)?.isUnique;
      const rowsOut = isUnique ? 1 : Math.max(1, Math.round(rowCount * 0.05));
      const cost = Math.round(Math.log2(rowCount) * 1.5 + rowsOut * 0.2);
      
      return {
        id: `scan_${tName}`,
        nodeType: isUnique ? 'Index Lookup (Unique)' : 'Index Scan',
        table: tName,
        index: indexName,
        filterColumn,
        estimatedRows: rowsOut,
        totalRows: rowCount,
        cost,
        details: `Scan via B-Tree Index ${indexName} (${isUnique ? 'Exact Match' : 'Range Scan'})`
      };
    } else {
      // Sequential Scan (Table Scan)
      const rowsOut = hasWhere ? Math.round(rowCount * 0.35) : rowCount;
      const cost = Math.round(rowCount * 1.0); // Full scan cost
      
      if (hasWhere && rowCount > 1000) {
        recommendations.push({
          type: 'MISSING_INDEX',
          table: tName,
          message: `Sequentieller Scan auf Tabelle '${tName}' (${rowCount.toLocaleString()} Zeilen). Ein B-Tree Index auf gefilterte Spalten würde die I/O-Kosten drastisch senken.`
        });
      }

      return {
        id: `scan_${tName}`,
        nodeType: 'Seq Scan (Full Table Scan)',
        table: tName,
        index: null,
        filterColumn: null,
        estimatedRows: rowsOut,
        totalRows: rowCount,
        cost,
        details: `Full Table Scan über ${rowCount.toLocaleString()} Zeilen`
      };
    }
  });

  // Step 2: Joins
  let currentCost = scanNodes.reduce((sum, n) => sum + n.cost, 0);
  let currentRows = scanNodes.reduce((acc, n) => Math.max(acc, n.estimatedRows), 0);

  const intermediateNodes = [...scanNodes];

  if (hasJoin && referencedTables.length > 1) {
    const isSmall = currentRows < 5000;
    const joinType = isSmall ? 'Nested Loop Join' : 'Hash Join';
    const joinCost = isSmall ? Math.round(currentRows * 1.2) : Math.round(currentRows * 0.8 + 250);
    
    currentCost += joinCost;
    currentRows = Math.round(currentRows * 0.8);

    intermediateNodes.push({
      id: 'node_join',
      nodeType: joinType,
      estimatedRows: currentRows,
      cost: joinCost,
      details: isSmall 
        ? 'Nested Loop Join (effizient für kleine Zeilenzahlen)' 
        : 'In-Memory Hash Join mit Build- & Probe-Phase'
    });
  }

  // Step 3: Aggregation (GROUP BY / Aggregate)
  if (hasGroupBy || upperSql.includes('COUNT(') || upperSql.includes('SUM(')) {
    const aggCost = Math.round(currentRows * 0.5 + 100);
    currentCost += aggCost;
    currentRows = Math.max(1, Math.round(currentRows * 0.1));

    intermediateNodes.push({
      id: 'node_aggregate',
      nodeType: 'HashAggregate',
      estimatedRows: currentRows,
      cost: aggCost,
      details: `Hash-Aggregation & Bucket-Gruppierung (${currentRows} Gruppen)`
    });
  }

  // Step 4: Sort
  if (hasOrderBy) {
    const sortCost = Math.round(currentRows * Math.log2(Math.max(2, currentRows)) * 1.1);
    currentCost += sortCost;

    intermediateNodes.push({
      id: 'node_sort',
      nodeType: currentRows > 10000 ? 'External Merge Sort (Disk)' : 'QuickSort (In-Memory)',
      estimatedRows: currentRows,
      cost: sortCost,
      details: currentRows > 10000 
        ? 'Sortierung übersteigt work_mem -> Temp Disk I/O' 
        : 'In-Memory Quicksort im Arbeitsspeicher'
    });
  }

  // Step 5: Limit
  if (hasLimit) {
    const limitMatch = sql.match(/LIMIT\s+(\d+)/i);
    const limitVal = limitMatch ? parseInt(limitMatch[1], 10) : 10;
    currentRows = Math.min(currentRows, limitVal);

    intermediateNodes.push({
      id: 'node_limit',
      nodeType: 'Limit',
      estimatedRows: currentRows,
      cost: 5,
      details: `Early Exit nach ${limitVal} Ergebniszeilen`
    });
  }

  totalCost = currentCost;
  estimatedRows = currentRows;

  // Determine Overall Rating
  let rating = 'GOOD';
  if (totalCost > 200000) {
    rating = 'CRITICAL';
  } else if (totalCost > 20000) {
    rating = 'WARNING';
  }

  return {
    sql,
    nodes: intermediateNodes,
    totalCost,
    estimatedRows,
    rating,
    recommendations,
    cacheHitProbability: Math.min(99, Math.max(15, Math.round(100 - (totalCost / 5000))))
  };
}
