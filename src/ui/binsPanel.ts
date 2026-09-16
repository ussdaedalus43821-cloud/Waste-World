import { el } from './dom.js';
import type { GameState, Stream } from '../types.js';

const STREAM_LABELS: Record<Stream, string> = {
  recycle: '♻ Recycling',
  compost: '🍂 Compost',
  trash: '🗑 Trash',
  hazardous: '⚠ Hazardous',
};

function purityClass(purity: number): string {
  if (purity >= 95) return 'purity-good';
  if (purity >= 80) return 'purity-ok';
  if (purity >= 50) return 'purity-bad';
  return 'purity-critical';
}

export function renderBinsPanel(state: GameState): HTMLElement {
  const rows = (['recycle', 'compost', 'trash', 'hazardous'] as Stream[]).map((stream) => {
    const batch = state.streams[stream];
    const hasPurity = stream === 'recycle' || stream === 'compost';
    return el('div', { className: 'bin-row' }, [
      el('span', { className: 'bin-label' }, [STREAM_LABELS[stream]]),
      hasPurity
        ? el('div', { className: 'purity-bar-track' }, [
            el('div', {
              className: `purity-bar-fill ${purityClass(batch.purity)}`,
              style: { width: `${batch.purity}%` },
            }),
          ])
        : el('span', { className: 'bin-dash' }, ['—']),
      hasPurity ? el('span', { className: 'purity-pct' }, [`${batch.purity.toFixed(0)}%`]) : null,
      el('span', { className: 'bin-weight' }, [`${batch.collectedKg.toFixed(1)} kg`]),
    ]);
  });

  const reportedRate =
    state.totalWasteKgThisWeek > 0 ? (state.streams.recycle.collectedKg / state.totalWasteKgThisWeek) * 100 : 0;

  return el('div', { className: 'bins-panel' }, [
    el('h3', {}, [`Week ${state.week} · Day ${state.day} / 7`]),
    ...rows,
    el('div', { className: 'reported-rate' }, [
      `Reported "Recycling Rate" so far: ${reportedRate.toFixed(0)}% `,
      el('span', { className: 'muted' }, ['(naive, weight-based — true rate hidden until week end)']),
    ]),
    state.facilityDowntimeWeeks > 0
      ? el('div', { className: 'downtime-notice' }, [
          `⚠ Facility running at reduced capacity for ${state.facilityDowntimeWeeks} more week(s) after a recent fire incident.`,
        ])
      : null,
  ]);
}
