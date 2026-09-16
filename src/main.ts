import { createInitialState, sortCurrentItem, currentItem } from './engine/state.js';
import type { GameState, FireIncident, WeekResult, Stream, LiquidPath, FeedbackEvent } from './types.js';
import { renderSortingScreen } from './ui/sortingScreen.js';
import { renderFeedbackPanel } from './ui/feedbackPanel.js';
import { renderBinsPanel } from './ui/binsPanel.js';
import { renderFireModal } from './ui/fireModal.js';
import { renderWeeklyReveal } from './ui/weeklyReveal.js';
import { renderDashboard } from './ui/dashboard.js';
import { el, clear } from './ui/dom.js';

type Phase = 'item' | 'feedback' | 'fire' | 'week-reveal';

let state: GameState = createInitialState();
let phase: Phase = 'item';
let lastFeedback: FeedbackEvent | null = null;
let pendingFireIncident: FireIncident | null = null;
let pendingWeekResult: WeekResult | null = null;
let dashboardVisible = false;

const app = document.getElementById('app');
if (!app) throw new Error('Missing #app root element');

function handleChoice(choice: Stream | LiquidPath): void {
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

function render(): void {
  clear(app as HTMLElement);

  const header = el('header', { className: 'app-header' }, [
    el('h1', {}, ['Waste World']),
    el('span', { className: 'subtitle' }, ['A Household Recycling Simulation']),
  ]);

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

  (app as HTMLElement).append(header, layout);

  if (phase === 'fire' && pendingFireIncident) {
    (app as HTMLElement).append(renderFireModal(pendingFireIncident, handleFireDismiss));
  } else if (phase === 'week-reveal' && pendingWeekResult) {
    (app as HTMLElement).append(renderWeeklyReveal(pendingWeekResult, handleWeekRevealContinue));
  }
}

render();
