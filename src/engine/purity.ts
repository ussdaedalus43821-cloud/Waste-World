import type { Severity } from '../types.js';

export const SEVERITY_PENALTY: Record<Severity, number> = {
  none: 0,
  minor: 8,
  major: 32,
  'batch-voiding': 100,
};

export function applyContaminationPenalty(currentPurity: number, severity: Severity): number {
  if (severity === 'batch-voiding') return 0;
  return Math.max(0, currentPurity - SEVERITY_PENALTY[severity]);
}

/** Step function modeling real MRF rejection behavior: below a purity threshold,
 * a batch is downgraded or rejected outright rather than degrading smoothly. */
export function purityMultiplier(purity: number): number {
  if (purity >= 95) return 1.0;
  if (purity >= 80) return 0.7;
  if (purity >= 50) return 0.3;
  return 0;
}
