/**
 * PostgreSQL EXPLAIN (ANALYZE, BUFFERS) FlameGraph & Window Functions Engine
 * Parses query plans, computes buffer cache ratios, and formats hierarchy for FlameGraph rendering.
 */

export const SAMPLE_POSTGRES_PLANS = [
  {
    id: 'window_fn_ranking',
    title: 'Window Function: Gehalts-Ranking pro Abteilung',
    sql: `SELECT employee_id, department, salary,
       ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank,
       AVG(salary) OVER (PARTITION BY department) as dept_avg
FROM employees
WHERE is_active = true;`,
    rootNode: {
      nodeType: 'WindowAgg',
      actualTotalTimeMs: 142.5,
      actualRows: 25000,
      sharedHitBlocks: 1820,
      sharedReadBlocks: 45,
      children: [
        {
          nodeType: 'Sort',
          actualTotalTimeMs: 110.2,
          actualRows: 25000,
          sortMethod: 'quicksort',
          sortSpaceUsedKb: 1420,
          children: [
            {
              nodeType: 'Bitmap Heap Scan on employees',
              actualTotalTimeMs: 42.1,
              actualRows: 25000,
              sharedHitBlocks: 850,
              sharedReadBlocks: 45,
              children: [
                {
                  nodeType: 'Bitmap Index Scan on idx_emp_active',
                  actualTotalTimeMs: 8.4,
                  actualRows: 25000,
                  sharedHitBlocks: 42,
                  sharedReadBlocks: 0,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id: 'cte_recursive_hierarchy',
    title: 'Rekursives CTE: Organisationsstruktur-Baum',
    sql: `WITH RECURSIVE org_tree AS (
  SELECT id, manager_id, name, 1 as level FROM org_units WHERE manager_id IS NULL
  UNION ALL
  SELECT o.id, o.manager_id, o.name, ot.level + 1
  FROM org_units o
  JOIN org_tree ot ON o.manager_id = ot.id
)
SELECT * FROM org_tree;`,
    rootNode: {
      nodeType: 'CTE Scan on org_tree',
      actualTotalTimeMs: 88.6,
      actualRows: 4800,
      sharedHitBlocks: 950,
      sharedReadBlocks: 12,
      children: [
        {
          nodeType: 'WorkTable Scan',
          actualTotalTimeMs: 32.4,
          actualRows: 4800,
          sharedHitBlocks: 400,
          sharedReadBlocks: 0,
          children: []
        },
        {
          nodeType: 'Index Scan on idx_org_manager',
          actualTotalTimeMs: 45.2,
          actualRows: 4800,
          sharedHitBlocks: 550,
          sharedReadBlocks: 12,
          children: []
        }
      ]
    }
  }
];

/**
 * Computes buffer statistics, total time, and cache hit ratio across the entire plan tree
 */
export function analyzePlanMetrics(node) {
  if (!node) {
    return {
      totalTimeMs: 0,
      totalHitBlocks: 0,
      totalReadBlocks: 0,
      cacheHitRatio: 100,
      flatNodes: []
    };
  }

  let totalHit = 0;
  let totalRead = 0;
  const flatNodes = [];

  function traverse(n, depth = 0) {
    totalHit += n.sharedHitBlocks || 0;
    totalRead += n.sharedReadBlocks || 0;

    flatNodes.push({
      nodeType: n.nodeType,
      timeMs: n.actualTotalTimeMs,
      rows: n.actualRows,
      depth,
      hit: n.sharedHitBlocks || 0,
      read: n.sharedReadBlocks || 0
    });

    if (n.children && n.children.length > 0) {
      n.children.forEach(child => traverse(child, depth + 1));
    }
  }

  traverse(node, 0);

  const totalBlocks = totalHit + totalRead;
  const cacheHitRatio = totalBlocks > 0 
    ? Math.round((totalHit / totalBlocks) * 1000) / 10 
    : 100;

  return {
    totalTimeMs: node.actualTotalTimeMs || 0,
    totalHitBlocks: totalHit,
    totalReadBlocks: totalRead,
    cacheHitRatio,
    flatNodes
  };
}
