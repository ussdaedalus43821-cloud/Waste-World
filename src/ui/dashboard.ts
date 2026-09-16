import { el } from './dom.js';
import type { GameState } from '../types.js';

export function renderDashboard(state: GameState, visible: boolean, onToggle: () => void): HTMLElement {
  const rows = state.weekHistory.map((w) =>
    el('div', { className: 'history-row' }, [
      el('span', { className: 'history-week' }, [`Week ${w.week}`]),
      el('div', { className: 'history-bars' }, [
        el('div', { className: 'history-bar-track' }, [
          el('div', { className: 'history-bar reported', style: { width: `${w.reportedRate * 100}%` } }),
        ]),
        el('div', { className: 'history-bar-track' }, [
          el('div', { className: 'history-bar true-rate', style: { width: `${w.trueRate * 100}%` } }),
        ]),
      ]),
      el('span', { className: 'history-values' }, [
        `${(w.reportedRate * 100).toFixed(0)}% reported / ${(w.trueRate * 100).toFixed(0)}% true`,
      ]),
    ])
  );

  return el('div', { className: 'dashboard' }, [
    el('button', { className: 'dashboard-toggle', onclick: onToggle }, [
      visible ? 'Hide Behind-the-Curtain Dashboard ▲' : 'Show Behind-the-Curtain Dashboard ▼',
    ]),
    visible
      ? el('div', { className: 'dashboard-body' }, [
          el('p', { className: 'legend' }, [
            el('span', { className: 'legend-swatch reported' }),
            ' Reported collection rate   ',
            el('span', { className: 'legend-swatch true-rate' }),
            ' True reprocessing rate',
          ]),
          rows.length ? el('div', {}, rows) : el('p', { className: 'muted' }, ['No completed weeks yet.']),
          state.market.shockActive
            ? el('div', { className: 'market-shock-notice' }, [
                el('strong', {}, [`📉 ${state.market.shockName}`]),
                el('p', {}, [state.market.shockNote ?? '']),
              ])
            : null,
        ])
      : null,
  ]);
}
