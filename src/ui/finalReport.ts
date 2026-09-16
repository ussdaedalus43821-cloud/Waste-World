import { el } from './dom.js';
import type { WeekResult } from '../types.js';

export interface ReportStats {
  quizCorrect: number;
  quizTotal: number;
  totalSorted: number;
  totalCorrectSorts: number;
  weekHistory: WeekResult[];
}

export function renderFinalReport(stats: ReportStats, onContinue: () => void): HTMLElement {
  const quizPct = stats.quizTotal > 0 ? (stats.quizCorrect / stats.quizTotal) * 100 : 0;
  const sortPct = stats.totalSorted > 0 ? (stats.totalCorrectSorts / stats.totalSorted) * 100 : 0;

  const avgReported =
    stats.weekHistory.length > 0
      ? (stats.weekHistory.reduce((sum, w) => sum + w.reportedRate, 0) / stats.weekHistory.length) * 100
      : null;
  const avgTrue =
    stats.weekHistory.length > 0
      ? (stats.weekHistory.reduce((sum, w) => sum + w.trueRate, 0) / stats.weekHistory.length) * 100
      : null;

  return el('div', { className: 'sorting-screen final-report' }, [
    el('h2', {}, ['Your Report: Before vs. After']),

    el('div', { className: 'reveal-rates' }, [
      el('div', { className: 'reveal-rate' }, [
        el('div', { className: 'reveal-rate-label' }, ['Pre-game quiz score']),
        el('div', { className: 'reveal-rate-value reported' }, [`${quizPct.toFixed(0)}%`]),
        el('div', { className: 'muted small' }, [`${stats.quizCorrect} / ${stats.quizTotal}`]),
      ]),
      el('div', { className: 'reveal-rate' }, [
        el('div', { className: 'reveal-rate-label' }, ['Actual in-game sorting accuracy']),
        el('div', { className: 'reveal-rate-value true-rate' }, [`${sortPct.toFixed(0)}%`]),
        el('div', { className: 'muted small' }, [`${stats.totalCorrectSorts} / ${stats.totalSorted} items`]),
      ]),
    ]),

    avgTrue !== null
      ? el('div', { className: 'reveal-rates' }, [
          el('div', { className: 'reveal-rate' }, [
            el('div', { className: 'reveal-rate-label' }, ['Avg. reported collection rate']),
            el('div', { className: 'reveal-rate-value reported' }, [`${avgReported!.toFixed(0)}%`]),
          ]),
          el('div', { className: 'reveal-rate' }, [
            el('div', { className: 'reveal-rate-label' }, ['Avg. true reprocessing rate']),
            el('div', { className: 'reveal-rate-value true-rate' }, [`${avgTrue.toFixed(0)}%`]),
          ]),
        ])
      : el('p', { className: 'muted' }, ['Finish at least one full week to see your reported-vs-true rate gap here.']),

    el('div', { className: 'fragmentation-note' }, [
      el('h3', {}, ['One more thing']),
      el('p', {}, [
        'This entire simulation runs on rules for one hypothetical municipality. In reality, the United States has no single national recycling standard — policy is set locally, and the Recycling Partnership’s National Recycling Database tracks upwards of 9,000 distinct community programs, each setting its own accepted-materials list. ',
        'The exact same item can be correctly recyclable in one town and a contaminant two towns over. Other countries with more centralized waste policy (Japan and Germany are often cited) can teach one consistent set of rules nationwide; the US structurally cannot, which is part of why this never made it into a standard K-12 curriculum here.',
      ]),
      el('p', { className: 'muted small' }, [
        'Program count is sourced; the cross-country curriculum comparison is illustrative framing, not an audited claim — verify specifics before citing elsewhere.',
      ]),
    ]),

    el('button', { className: 'next-btn', onclick: onContinue }, ['Continue Playing →']),
  ]);
}
