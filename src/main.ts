import { createInitialState, sortCurrentItem, currentItem } from './engine/state.js';
import type { GameState, FireIncident, WeekResult, Stream, LiquidPath, FeedbackEvent, QuizAnswer } from './types.js';
import { quizQuestions } from './data/quiz.js';
import { renderSortingScreen } from './ui/sortingScreen.js';
import { renderFeedbackPanel } from './ui/feedbackPanel.js';
import { renderBinsPanel } from './ui/binsPanel.js';
import { renderFireModal } from './ui/fireModal.js';
import { renderWeeklyReveal } from './ui/weeklyReveal.js';
import { renderDashboard } from './ui/dashboard.js';
import { renderQuizQuestion } from './ui/quizScreen.js';
import { renderQuizReveal } from './ui/quizReveal.js';
import { renderFinalReport } from './ui/finalReport.js';
import { el, clear } from './ui/dom.js';

type Phase = 'quiz-question' | 'quiz-reveal' | 'item' | 'feedback' | 'fire' | 'week-reveal' | 'final-report';

let state: GameState = createInitialState();
let phase: Phase = 'quiz-question';
let lastFeedback: FeedbackEvent | null = null;
let pendingFireIncident: FireIncident | null = null;
let pendingWeekResult: WeekResult | null = null;
let dashboardVisible = false;
let phaseBeforeReport: Phase = 'item';

let quizIndex = 0;
const quizAnswers: QuizAnswer[] = [];

// Session-level accuracy stats, independent of the internal purity/contamination
// math — this tracks whether the PLAYER picked the right bin/path, for the
// before/after comparison against their pre-game quiz score.
let totalSorted = 0;
let totalCorrectSorts = 0;

const app = document.getElementById('app');
if (!app) throw new Error('Missing #app root element');

function handleQuizAnswer(chosenIndex: number): void {
  quizAnswers.push({ questionId: quizQuestions[quizIndex].id, chosenIndex });
  quizIndex += 1;
  phase = quizIndex >= quizQuestions.length ? 'quiz-reveal' : 'quiz-question';
  render();
}

function handleQuizRevealContinue(): void {
  phase = 'item';
  render();
}

function handleChoice(choice: Stream | LiquidPath): void {
  const sortable = currentItem(state);
  if (sortable) {
    const wasRightBin =
      sortable.kind === 'solid' ? choice === sortable.item.correctStream : choice === sortable.item.correctPath;
    totalSorted += 1;
    if (wasRightBin) totalCorrectSorts += 1;
  }

  const fireCountBefore = state.fireIncidents.length;
  const result = sortCurrentItem(state, choice);
  state = result.state;
  lastFeedback = result.feedback;
  pendingWeekResult = result.weekResult ?? pendingWeekResult;

  if (state.fireIncidents.length > fireCountBefore) {
    pendingFireIncident = state.fireIncidents[state.fireIncidents.length - 1];
    phase = 'fire';
  } else {
    phase = 'feedback';
  }
  render();
}

function handleFireDismiss(): void {
  pendingFireIncident = null;
  phase = pendingWeekResult ? 'week-reveal' : 'item';
  render();
}

function handleFeedbackNext(): void {
  lastFeedback = null;
  phase = pendingWeekResult ? 'week-reveal' : 'item';
  render();
}

function handleWeekRevealContinue(): void {
  pendingWeekResult = null;
  phase = 'item';
  render();
}

function toggleDashboard(): void {
  dashboardVisible = !dashboardVisible;
  render();
}

function handleViewReport(): void {
  phaseBeforeReport = phase;
  phase = 'final-report';
  render();
}

function handleReportContinue(): void {
  phase = phaseBeforeReport;
  render();
}

function render(): void {
  clear(app as HTMLElement);

  const header = el('header', { className: 'app-header' }, [
    el('h1', {}, ['Waste World']),
    el('span', { className: 'subtitle' }, ['A Household Recycling Simulation']),
  ]);

  if (phase === 'quiz-question') {
    const layout = el('div', { className: 'layout quiz-layout' });
    layout.append(renderQuizQuestion(quizQuestions[quizIndex], quizIndex, quizQuestions.length, handleQuizAnswer));
    (app as HTMLElement).append(header, layout);
    return;
  }

  if (phase === 'quiz-reveal') {
    const layout = el('div', { className: 'layout quiz-layout' });
    layout.append(renderQuizReveal(quizQuestions, quizAnswers, handleQuizRevealContinue));
    (app as HTMLElement).append(header, layout);
    return;
  }

  if (phase === 'final-report') {
    const layout = el('div', { className: 'layout quiz-layout' });
    layout.append(
      renderFinalReport(
        {
          quizCorrect: quizAnswers.filter((a, i) => a.chosenIndex === quizQuestions[i].correctIndex).length,
          quizTotal: quizQuestions.length,
          totalSorted,
          totalCorrectSorts,
          weekHistory: state.weekHistory,
        },
        handleReportContinue
      )
    );
    (app as HTMLElement).append(header, layout);
    return;
  }

  const layout = el('div', { className: 'layout' });
  const left = el('div', { className: 'left-col' });
  const right = el('div', { className: 'right-col' });
  layout.append(left, right);

  if (phase === 'feedback' && lastFeedback) {
    left.append(renderFeedbackPanel(lastFeedback, handleFeedbackNext));
  } else {
    const sortable = currentItem(state);
    if (sortable) {
      left.append(renderSortingScreen(sortable, handleChoice));
    }
  }

  right.append(renderBinsPanel(state));
  right.append(renderDashboard(state, dashboardVisible, toggleDashboard));
  right.append(el('button', { className: 'report-btn', onclick: handleViewReport }, ['📊 View My Report (before vs. after)']));

  (app as HTMLElement).append(header, layout);

  if (phase === 'fire' && pendingFireIncident) {
    (app as HTMLElement).append(renderFireModal(pendingFireIncident, handleFireDismiss));
  } else if (phase === 'week-reveal' && pendingWeekResult) {
    (app as HTMLElement).append(renderWeeklyReveal(pendingWeekResult, handleWeekRevealContinue));
  }
}

render();
