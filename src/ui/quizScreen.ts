import { el } from './dom.js';
import type { QuizQuestion } from '../types.js';

export function renderQuizQuestion(
  question: QuizQuestion,
  index: number,
  total: number,
  onAnswer: (chosenIndex: number) => void
): HTMLElement {
  return el('div', { className: 'sorting-screen quiz-screen' }, [
    el('div', { className: 'quiz-progress' }, [`Question ${index + 1} of ${total}`]),
    el('div', { className: 'item-card' }, [el('div', { className: 'item-name quiz-prompt' }, [question.prompt])]),
    el(
      'div',
      { className: 'quiz-options' },
      question.options.map((opt, i) =>
        el('button', { className: 'action-btn quiz-option-btn', onclick: () => onAnswer(i) }, [opt])
      )
    ),
    el('p', { className: 'muted quiz-note' }, [
      'Answer honestly — this is a snapshot of what you believe right now, not a test you can fail.',
    ]),
  ]);
}
