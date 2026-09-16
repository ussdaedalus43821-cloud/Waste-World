import type { FireRisk, Stream } from '../types.js';

/** Fire risk only applies if the item ends up somewhere it can be compacted/crushed. */
const COMPACTING_STREAMS: Stream[] = ['recycle', 'trash'];

export function rollFireEvent(risk: FireRisk | undefined, intoStream: Stream): boolean {
  if (!risk) return false;
  if (!COMPACTING_STREAMS.includes(intoStream)) return false;
  return Math.random() < risk.probability;
}
