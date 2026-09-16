import type { MarketState, MaterialMarket } from '../types.js';

// Baseline demand multipliers (0-1) — illustrative relative ordering based on
// commonly reported scrap-value/market-strength patterns, NOT sourced hard numbers.
// citationVerified: false equivalent — verify real commodity index figures before publishing.
export const BASELINE_DEMAND: Record<MaterialMarket, number> = {
  aluminum: 0.95,
  steel: 0.85,
  'pet-1': 0.75,
  'hdpe-2': 0.8,
  'mixed-plastics-3-7': 0.35,
  cardboard: 0.85,
  'mixed-paper': 0.55,
  glass: 0.5,
  'e-waste-metals': 0.7,
  textiles: 0.25,
  organics: 0.9,
};

export const SHOCK_START_WEEK = 3;
export const SHOCK_DURATION_WEEKS = 6;

export const SHOCK_NAME = 'Global Recycling Market Shock';
export const SHOCK_HEADLINE = 'Overseas buyer abruptly stops taking mixed plastics and low-grade paper';
export const SHOCK_BODY =
  'Modeled loosely on the real 2018 shift in Chinese import policy ("National Sword"), which for decades had been the largest buyer of the world’s recyclable scrap. ' +
  'When that market closed to contaminated/mixed loads, many collectors abruptly had nowhere to sell material that had been "successfully recycled" for years — ' +
  'stockpiles built up, prices crashed, and a significant share of collected plastic and paper was quietly redirected to landfill or incineration, even though households kept sorting it correctly. ' +
  'Exact figures here are illustrative for gameplay pacing, not audited industry statistics — verify against real trade data before treating as fact.';

/** Returns this week's demand multipliers, applying the scripted shock window if active. */
export function getMarketStateForWeek(week: number): MarketState {
  const demand: Record<MaterialMarket, number> = { ...BASELINE_DEMAND };
  const shockActive = week >= SHOCK_START_WEEK && week < SHOCK_START_WEEK + SHOCK_DURATION_WEEKS;

  if (shockActive) {
    demand['mixed-plastics-3-7'] = 0.05;
    demand['mixed-paper'] = 0.15;
    demand.glass = 0.3;
  } else if (week >= SHOCK_START_WEEK + SHOCK_DURATION_WEEKS) {
    // Partial, permanent recovery as some domestic reprocessing capacity comes online —
    // never fully back to the pre-shock baseline.
    demand['mixed-plastics-3-7'] = 0.2;
    demand['mixed-paper'] = 0.4;
  }

  return {
    demand,
    shockActive,
    shockName: shockActive ? SHOCK_NAME : undefined,
    shockNote: shockActive ? SHOCK_BODY : undefined,
  };
}
