// Core shared types for Waste World.
// Kept framework-free: this file has zero runtime dependencies.

export type Stream = 'recycle' | 'compost' | 'trash' | 'hazardous';

export type LiquidPath =
  | 'drain'
  | 'trash'
  | 'recycling-dropoff'
  | 'hhw-collection'
  | 'take-back-program';

export type Severity = 'none' | 'minor' | 'major' | 'batch-voiding';

export type ResinCode = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type SolidCategory =
  | 'plastic'
  | 'paper-cardboard'
  | 'metal'
  | 'glass'
  | 'organic'
  | 'battery'
  | 'e-waste'
  | 'textile'
  | 'hazardous-solid'
  | 'other';

export type MunicipalityVariance = 'universal' | 'varies-by-city' | 'rarely-accepted';

export type MaterialMarket =
  | 'aluminum'
  | 'steel'
  | 'pet-1'
  | 'hdpe-2'
  | 'mixed-plastics-3-7'
  | 'cardboard'
  | 'mixed-paper'
  | 'glass'
  | 'e-waste-metals'
  | 'textiles'
  | 'organics';

/** A penalty applied to a stream's batch purity if this item ends up there. */
export interface ContaminationRule {
  intoStream: Stream;
  severity: Severity;
  reason: string;
}

export interface FireRisk {
  /** 0-1 chance of ignition, rolled once if this item is missorted into a compacting stream. */
  probability: number;
  condition: 'compacted-in-truck' | 'crushed-in-sorter';
}

export interface WasteItem {
  id: string;
  name: string;
  category: SolidCategory;
  resinCode?: ResinCode;
  hasChasingArrowsSymbol: boolean;
  correctStream: Stream;
  municipalityVariance: MunicipalityVariance;
  material: MaterialMarket;
  /** Residue state variants (e.g. "greasy jar" vs "rinsed jar") let the same object
   * appear clean or contaminated; most items only ever appear in one state. */
  residueState?: 'rinsed' | 'unrinsed';
  contamination: ContaminationRule[];
  fireRisk?: FireRisk;
  explanation: string;
  factCitation: string;
  /** false = flagged for fact-check before publishing; do not treat as verified. */
  citationVerified: boolean;
  weightKg: number;
}

export interface LiquidItem {
  id: string;
  name: string;
  category:
    | 'cooking-oil'
    | 'motor-fluid'
    | 'paint'
    | 'household-chemical'
    | 'medication'
    | 'pool-spa'
    | 'other';
  correctPath: LiquidPath;
  isValueRecoverable: boolean;
  recoveredAs?: string;
  drainHazard: {
    severity: Severity;
    mechanism: string;
  };
  /** Contamination applied to whichever recycling-dropoff/hhw batch it lands in if misrouted. */
  contamination: ContaminationRule[];
  explanation: string;
  factCitation: string;
  citationVerified: boolean;
  volumeL: number;
}

export type SortableItem =
  | { kind: 'solid'; item: WasteItem }
  | { kind: 'liquid'; item: LiquidItem };

export interface StreamBatch {
  collectedKg: number;
  purity: number; // 0-100
  /** Per-material breakdown of what actually landed in this stream, so market
   * demand (which varies per material) can be applied within one systemic batch. */
  materialsKg: Partial<Record<MaterialMarket, number>>;
}

export interface LiquidBatch {
  collectedL: number;
  purity: number; // 0-100, only meaningful for recycling-dropoff / hhw-collection
}

export interface FireIncident {
  week: number;
  day: number;
  itemName: string;
  stream: Stream;
  headline: string;
  body: string;
}

export interface WeekResult {
  week: number;
  reportedRate: number; // naive weight-based "recycling rate" the public sees
  trueRate: number; // actual reprocessed fraction
  reasons: string[];
  streamBreakdown: Record<Stream, { collectedKg: number; reprocessedKg: number; purity: number }>;
}

export interface MarketState {
  demand: Record<MaterialMarket, number>; // 0-1 multiplier
  shockActive: boolean;
  shockName?: string;
  shockNote?: string;
}

export interface GameState {
  week: number;
  day: number; // 1-7
  itemsLeftToday: SortableItem[];
  todayItemCount: number;
  streams: Record<Stream, StreamBatch>;
  liquidPaths: Record<LiquidPath, LiquidBatch>;
  totalWasteKgThisWeek: number;
  market: MarketState;
  facilityDowntimeWeeks: number; // capacity penalty from a recent fire
  fireIncidents: FireIncident[];
  weekHistory: WeekResult[];
  lastFeedback: FeedbackEvent | null;
  gameOverIncident: FireIncident | null;
}

export interface FeedbackEvent {
  correct: boolean;
  headline: string;
  detail: string;
  purityDelta?: { stream: Stream; before: number; after: number };
  valueRecovered?: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  /** Framed as "here's probably what you picked, and why" — revealed only after
   * the player has already answered, never before. */
  commonMisconception: string;
  explanation: string;
  factCitation: string;
  citationVerified: boolean;
}

export interface QuizAnswer {
  questionId: string;
  chosenIndex: number;
}
