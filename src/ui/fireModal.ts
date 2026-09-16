import { el } from './dom.js';
import type { FireIncident } from '../types.js';

export function renderFireModal(incident: FireIncident, onDismiss: () => void): HTMLElement {
  return el('div', { className: 'modal-overlay' }, [
    el('div', { className: 'modal fire-modal' }, [
      el('div', { className: 'fire-modal-badge' }, ['🔥 FIRE INCIDENT']),
      el('h2', {}, [incident.headline]),
      el('p', {}, [incident.body]),
      el('p', { className: 'muted' }, [`Week ${incident.week}, Day ${incident.day}`]),
      el('button', { className: 'next-btn', onclick: onDismiss }, ['Acknowledge']),
    ]),
  ]);
}
