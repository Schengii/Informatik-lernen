import { describe, it, expect } from 'vitest';
import {
  generateExecutionPlan,
  SAMPLE_SCHEMAS,
  SAMPLE_QUERIES
} from './sqlQueryExecutionEngine';

describe('SQL Query Execution Plan Engine', () => {
  it('generates an execution plan for an indexed lookup with low cost', () => {
    const query = SAMPLE_QUERIES[0].sql;
    const plan = generateExecutionPlan(query, SAMPLE_SCHEMAS.ecommerce);

    expect(plan.error).toBeUndefined();
    expect(plan.nodes.length).toBeGreaterThan(0);
    expect(plan.rating).toBe('GOOD');
    expect(plan.nodes[0].nodeType).toContain('Index');
  });

  it('detects a sequential scan and generates optimization recommendations', () => {
    const query = SAMPLE_QUERIES[1].sql;
    const plan = generateExecutionPlan(query, SAMPLE_SCHEMAS.ecommerce);

    expect(plan.nodes[0].nodeType).toContain('Seq Scan');
    expect(plan.recommendations.length).toBeGreaterThan(0);
    expect(plan.recommendations[0].type).toBe('MISSING_INDEX');
  });

  it('handles multi-table joins and aggregations', () => {
    const query = SAMPLE_QUERIES[2].sql;
    const plan = generateExecutionPlan(query, SAMPLE_SCHEMAS.ecommerce);

    const nodeTypes = plan.nodes.map(n => n.nodeType);
    expect(nodeTypes.some(t => t.includes('Join'))).toBe(true);
    expect(nodeTypes.some(t => t.includes('Aggregate'))).toBe(true);
  });

  it('handles empty SQL queries gracefully', () => {
    const plan = generateExecutionPlan('   ', SAMPLE_SCHEMAS.ecommerce);
    expect(plan.error).toBeDefined();
  });
});
