// submit.js
// --------------------------------------------------

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './submit.css';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Could not reach the backend.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setResult(null);
    setError(null);
  };

  return (
    <>
      <div className="submit-bar">
        <button
          type="button"
          className={`submit-bar__button${loading ? ' submit-bar__button--loading' : ''}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          <span className="submit-bar__icon">{loading ? '⏳' : '▶'}</span>
          {loading ? 'Running…' : 'Run Pipeline'}
        </button>
      </div>

      {(result || error) && (
        <div className="pipeline-modal-overlay" onClick={closeModal}>
          <div
            className="pipeline-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="pipeline-modal__header">
              <span className="pipeline-modal__title">
                {error ? '⚠️ Error' : '✅ Pipeline Analysis'}
              </span>
              <button
                type="button"
                className="pipeline-modal__close"
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="pipeline-modal__body">
              {error ? (
                <p className="pipeline-modal__error">{error}</p>
              ) : (
                <div className="pipeline-modal__stats">
                  <div className="pipeline-modal__stat">
                    <span className="pipeline-modal__stat-value">{result.num_nodes}</span>
                    <span className="pipeline-modal__stat-label">Nodes</span>
                  </div>
                  <div className="pipeline-modal__stat">
                    <span className="pipeline-modal__stat-value">{result.num_edges}</span>
                    <span className="pipeline-modal__stat-label">Edges</span>
                  </div>
                  <div className="pipeline-modal__stat">
                    <span
                      className={`pipeline-modal__stat-value pipeline-modal__stat-value--${result.is_dag ? 'yes' : 'no'}`}
                    >
                      {result.is_dag ? 'Yes' : 'No'}
                    </span>
                    <span className="pipeline-modal__stat-label">Valid DAG</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};