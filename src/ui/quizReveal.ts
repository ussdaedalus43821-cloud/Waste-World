import { el } from './dom.js';
import type { QuizQuestion, QuizAnswer } from '../types.js';

export function renderQuizReveal(
  questions: QuizQuestion[],
  answers: QuizAnswer[],
  onContinue: () => void
): HTMLElement {
  const answerByQuestion = new Map(answers.map((a) => [a.questionId, a.chosenIndex]));
  let correctCount = 0;

  const rows = questions.map((q) => {
    const chosen = answerByQuestion.get(q.id) ?? -1;
    const wasCorrect = chosen === q.correctIndex;
    if (wasCorrect) correctCount += 1;

    return el('div', { className: `quiz-reveal-row ${wasCorrect ? 'quiz-row-correct' : 'quiz-row-wrong'}` }, [
      el('div', { className: 'quiz-reveal-prompt' }, [q.prompt]),
      el('div', { className: 'quiz-reveal-answers' }, [
        el('span', { className: 'quiz-your-answer' }, [
          `Your answer: ${chosen >= 0 ? q.options[chosen] : '(skipped)'} `,
          wasCorrect ? '✓' : '✗',
        ]),
        !wasCorrect ? el('span', { className: 'quiz-correct-answer' }, [`Correct: ${q.options[q.correctIndex]}`]) : null,
      ]),
      el('div', { className: 'quiz-misconception' }, [
        el('strong', {}, ['Why you probably answered that: ']),
        q.commonMisconception,
      ]),
      el('div', { className: 'quiz-explanation' }, [el('strong', {}, ['What’s actually true: ']), q.explanation]),
    ]);
  });

  return el('div', { className: 'sorting-screen quiz-reveal' }, [
    el('h2', {}, ['Before You Start: Your Baseline']),
    el('div', { className: 'quiz-score' }, [`${correctCount} / ${questions.length} correct`]),
    el('p', { className: 'muted' }, [
      'Most first-time players score in a similar range — that gap between confidence and accuracy is exactly what this game is about. Keep this number in mind; you’ll compare it to your actual in-game performance later.',
    ]),
    el('div', { className: 'quiz-reveal-list' }, rows),
    el('button', { className: 'next-btn', onclick: onContinue }, ['Start Sorting →']),
  ]);
}
