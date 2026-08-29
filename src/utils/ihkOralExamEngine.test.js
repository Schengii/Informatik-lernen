import { describe, it, expect } from 'vitest';
import {
  determineNextQuestion,
  evaluateOralExam,
  SAMPLE_EXAM_TOPICS
} from './ihkOralExamEngine';

describe('IHK Oral Exam Simulator Engine', () => {
  it('determines adaptive follow-up question when keyword is mentioned', () => {
    const topic = SAMPLE_EXAM_TOPICS[0];
    const nextQ = determineNextQuestion(topic, 'Wir verwenden das Saga-Pattern für asynchrone Events.');
    expect(nextQ).toContain('Choreographie');
  });

  it('falls back to default question when keyword is not present', () => {
    const topic = SAMPLE_EXAM_TOPICS[0];
    const nextQ = determineNextQuestion(topic, 'Wir haben einfach mehrere Services gebaut.');
    expect(nextQ).toContain('Latenz');
  });

  it('calculates weighted IHK grade and passing status correctly', () => {
    const result = evaluateOralExam({
      techScore: 96,
      methodScore: 94,
      businessScore: 92,
      presentationScore: 94
    });

    expect(result.passed).toBe(true);
    expect(result.points).toBeGreaterThanOrEqual(92);
    expect(result.grade).toBe(1);
    expect(result.gradeText).toBe('Sehr Gut');
  });

  it('correctly identifies failing results below 50 points', () => {
    const result = evaluateOralExam({
      techScore: 40,
      methodScore: 40,
      businessScore: 30,
      presentationScore: 50
    });

    expect(result.passed).toBe(false);
    expect(result.points).toBeLessThan(50);
    expect(result.grade).toBeGreaterThanOrEqual(5);
  });
});
