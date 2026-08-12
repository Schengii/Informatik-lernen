import React, { useState } from 'react';
import { TOPICS } from '../../data/topicsData';
import { BookOpen, CheckCircle, HelpCircle, Code, Award, ArrowLeft } from 'lucide-react';

export default function TopicReader({ topicId, onBack, onCompleteTopic, isCompleted }) {
  const topic = TOPICS.find(t => t.id === topicId) || TOPICS[0];
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const handleOptionSelect = (quizIdx, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [quizIdx]: optionIdx }));
  };

  const handleFinishQuiz = () => {
    setShowQuizResult(true);
    onCompleteTopic(topic.id, 50);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-muted)',
          padding: '8px 16px',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          marginBottom: '20px',
          fontWeight: '600',
          fontSize: '0.85rem'
        }}
      >
        <ArrowLeft size={16} /> Zurück zur Übersicht
      </button>

      {/* Main Topic Header */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
          <span className="badge badge-cyan">{topic.category}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>⏱️ Lesedauer: {topic.readTime}</span>
            {isCompleted && (
              <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle size={12} /> Abgeschlossen
              </span>
            )}
          </div>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>
          {topic.icon} {topic.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.5' }}>
          {topic.summary}
        </p>
      </div>

      {/* Topic Theory Article Body */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px', fontSize: '0.96rem', lineHeight: '1.7' }}>
        <div 
          dangerouslySetInnerHTML={{ __html: topic.content.replace(/\n/g, '<br/>') }} 
          style={{ whiteSpace: 'pre-line' }}
        />

        {/* Code Snippet Box (w3schools inspired) */}
        {topic.codeSnippet && (
          <div className="code-window" style={{ marginTop: '24px' }}>
            <div className="code-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code size={14} /> Code-Beispiel (w3schools Standard)
              </span>
              <span>JavaScript / SQL / HTML</span>
            </div>
            <pre className="code-body">
              <code>{topic.codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Interactive Quick Check Quiz */}
      {topic.quiz && (
        <div className="glass-panel" style={{ padding: '32px', border: '1px solid var(--border-highlight)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <HelpCircle size={24} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>Wissens-Check</h3>
          </div>

          {topic.quiz.map((q, qIdx) => (
            <div key={qIdx} style={{ marginBottom: '24px', background: 'var(--bg-tertiary)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontWeight: '600', marginBottom: '12px', fontSize: '0.95rem' }}>
                {qIdx + 1}. {q.question}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[qIdx] === oIdx;
                  const isCorrect = q.correct === oIdx;
                  let btnBg = 'var(--bg-secondary)';
                  let btnBorder = 'var(--border-color)';

                  if (showQuizResult) {
                    if (isCorrect) {
                      btnBg = 'rgba(16, 185, 129, 0.2)';
                      btnBorder = 'var(--accent-green)';
                    } else if (isSelected && !isCorrect) {
                      btnBg = 'rgba(244, 63, 94, 0.2)';
                      btnBorder = 'var(--accent-rose)';
                    }
                  } else if (isSelected) {
                    btnBg = 'rgba(6, 182, 212, 0.2)';
                    btnBorder = 'var(--accent-cyan)';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => !showQuizResult && handleOptionSelect(qIdx, oIdx)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        background: btnBg,
                        border: `1px solid ${btnBorder}`,
                        color: 'var(--text-main)',
                        textAlign: 'left',
                        cursor: showQuizResult ? 'default' : 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {showQuizResult && (
                <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '10px', borderRadius: '6px' }}>
                  💡 {q.explanation}
                </div>
              )}
            </div>
          ))}

          {!showQuizResult ? (
            <button 
              className="btn btn-primary"
              onClick={handleFinishQuiz}
              disabled={Object.keys(selectedAnswers).length < topic.quiz.length}
              style={{ opacity: Object.keys(selectedAnswers).length < topic.quiz.length ? 0.5 : 1 }}
            >
              <Award size={18} /> Modul Abschließen (+50 XP)
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-green)', fontWeight: '700' }}>
              <CheckCircle size={22} /> Gut gemacht! Das Modul wurde absolviert.
            </div>
          )}

        </div>
      )}

    </div>
  );
}
