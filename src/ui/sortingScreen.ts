import { el } from './dom.js';
import type { SortableItem, Stream, LiquidPath } from '../types.js';

const SOLID_ACTIONS: { stream: Stream; label: string; icon: string }[] = [
  { stream: 'recycle', label: 'Recycling', icon: '♻' },
  { stream: 'compost', label: 'Compost', icon: '🍂' },
  { stream: 'trash', label: 'Trash', icon: '🗑' },
  { stream: 'hazardous', label: 'Hazardous', icon: '⚠' },
];

const LIQUID_ACTIONS: { path: LiquidPath; label: string; icon: string }[] = [
  { path: 'drain', label: 'Drain', icon: '🚿' },
  { path: 'trash', label: 'Trash', icon: '🗑' },
  { path: 'recycling-dropoff', label: 'Recycling Drop-off', icon: '♻' },
  { path: 'hhw-collection', label: 'HHW Collection', icon: '⚠' },
  { path: 'take-back-program', label: 'Take-Back Program', icon: '🔄' },
];

export function renderSortingScreen(
  sortable: SortableItem,
  onChoose: (choice: Stream | LiquidPath) => void
): HTMLElement {
  if (sortable.kind === 'solid') {
    const item = sortable.item;
    const tags: (string | null)[] = [
      item.resinCode ? `Resin #${item.resinCode}` : null,
      item.hasChasingArrowsSymbol ? 'has chasing-arrows symbol' : null,
      item.municipalityVariance === 'varies-by-city' ? 'acceptance varies by city' : null,
      item.municipalityVariance === 'rarely-accepted' ? 'rarely accepted curbside' : null,
    ];

    return el('div', { className: 'sorting-screen' }, [
      el('div', { className: 'item-card' }, [
        el('div', { className: 'item-name' }, [item.name]),
        el(
          'div',
          { className: 'item-tags' },
          tags.filter((t): t is string => !!t).map((t) => el('span', { className: 'tag' }, [t]))
        ),
      ]),
      el('div', { className: 'question' }, ['Where does this go?']),
      el(
        'div',
        { className: 'action-row' },
        SOLID_ACTIONS.map((a) =>
          el('button', { className: 'action-btn', onclick: () => onChoose(a.stream) }, [
            el('span', { className: 'action-icon' }, [a.icon]),
            a.label,
          ])
        )
      ),
    ]);
  }

  const item = sortable.item;
  return el('div', { className: 'sorting-screen liquid' }, [
    el('div', { className: 'item-card' }, [
      el('div', { className: 'item-name' }, [`💧 ${item.name}`]),
      el('div', { className: 'item-tags' }, [el('span', { className: 'tag liquid-tag' }, ['liquid'])]),
    ]),
    el('div', { className: 'question' }, ['How should this liquid be disposed of?']),
    el(
      'div',
      { className: 'action-row liquid-actions' },
      LIQUID_ACTIONS.map((a) =>
        el('button', { className: 'action-btn liquid-btn', onclick: () => onChoose(a.path) }, [
          el('span', { className: 'action-icon' }, [a.icon]),
          a.label,
        ])
      )
    ),
  ]);
}
