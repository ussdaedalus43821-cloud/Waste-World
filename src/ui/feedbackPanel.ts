import { el } from './dom.js';
import type { FeedbackEvent } from '../types.js';

export function renderFeedbackPanel(feedback: FeedbackEvent, onNext: () => void): HTMLElement {
  const statusClass = feedback.correct ? 'feedback-correct' : 'feedback-wrong';

  return el('div', { className: `feedback-panel ${statusClass}` }, [
    el('div', { className: 'feedback-headline' }, [feedback.correct ? '✓ ' : '✗ ', feedback.headline]),
    el('p', { className: 'feedback-detail' }, [feedback.detail]),
    feedback.purityDelta
      ? el('p', { className: 'purity-delta' }, [
          `${feedback.purityDelta.stream} purity: ${feedback.purityDelta.before.toFixed(0)}% → ${feedback.purityDelta.after.toFixed(0)}%`,
        ])
      : null,
    feedback.valueRecovered
      ? el('p', { className: 'value-recovered' }, [`✨ Recovered as: ${feedback.valueRecovered}`])
      : null,
    el('button', { className: 'next-btn', onclick: onNext }, ['Next item →']),
  ]);
}
