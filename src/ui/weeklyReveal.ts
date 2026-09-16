import { el } from './dom.js';
import type { WeekResult } from '../types.js';

export function renderWeeklyReveal(result: WeekResult, onContinue: () => void): HTMLElement {
  return el('div', { className: 'modal-overlay' }, [
    el('div', { className: 'modal reveal-modal' }, [
      el('h2', {}, [`Week ${result.week} Results — Behind the Curtain`]),
      el('div', { className: 'reveal-rates' }, [
        el('div', { className: 'reveal-rate' }, [
          el('div', { className: 'reveal-rate-label' }, ['Reported Collection Rate']),
          el('div', { className: 'reveal-rate-value reported' }, [`${(result.reportedRate * 100).toFixed(0)}%`]),
        ]),
        el('div', { className: 'reveal-rate' }, [
          el('div', { className: 'reveal-rate-label' }, ['True Reprocessing Rate']),
          el('div', { className: 'reveal-rate-value true-rate' }, [`${(result.trueRate * 100).toFixed(0)}%`]),
        ]),
      ]),
      el('h3', {}, ['Why the gap?']),
      el(
        'ul',
        { className: 'reveal-reasons' },
        result.reasons.map((r) => el('li', {}, [r]))
      ),
      el('button', { className: 'next-btn', onclick: onContinue }, [`Continue to Week ${result.week + 1} →`]),
    ]),
  ]);
}
