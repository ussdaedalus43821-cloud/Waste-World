import type {
  WasteItem,
  SolidCategory,
  Stream,
  ResinCode,
  MunicipalityVariance,
  MaterialMarket,
  ContaminationRule,
  FireRisk,
} from '../../types.js';

let counter = 0;
function nextId(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter.toString().padStart(3, '0')}`;
}

export interface ItemSpec {
  name: string;
  category: SolidCategory;
  correctStream: Stream;
  material: MaterialMarket;
  resinCode?: ResinCode;
  hasChasingArrowsSymbol?: boolean;
  municipalityVariance?: MunicipalityVariance;
  residueState?: 'rinsed' | 'unrinsed';
  contamination?: ContaminationRule[];
  fireRisk?: FireRisk;
  explanation: string;
  factCitation: string;
  citationVerified?: boolean;
  weightKg?: number;
}

/** Shared factory so every item gets a unique id regardless of which category
 * file constructed it (module-level counter is a singleton across imports). */
export function w(prefix: string, spec: ItemSpec): WasteItem {
  return {
    id: nextId(prefix),
    name: spec.name,
    category: spec.category,
    resinCode: spec.resinCode,
    hasChasingArrowsSymbol: spec.hasChasingArrowsSymbol ?? spec.resinCode !== undefined,
    correctStream: spec.correctStream,
    municipalityVariance: spec.municipalityVariance ?? 'universal',
    material: spec.material,
    residueState: spec.residueState,
    contamination: spec.contamination ?? [],
    fireRisk: spec.fireRisk,
    explanation: spec.explanation,
    factCitation: spec.factCitation,
    citationVerified: spec.citationVerified ?? true,
    weightKg: spec.weightKg ?? 0.05,
  };
}

// Common contamination shorthands reused across many items.
export const GREASE_FOOD_CONTAM = (severity: 'minor' | 'major' = 'major'): ContaminationRule[] => [
  {
    intoStream: 'recycle',
    severity,
    reason: 'Food residue and grease soak into paper fiber or coat other material, degrading the whole batch.',
  },
];

export const FILM_JAM_CONTAM: ContaminationRule[] = [
  {
    intoStream: 'recycle',
    severity: 'batch-voiding',
    reason: 'Flexible plastic film wraps around sorting machinery augers, forcing a shutdown to clear it.',
  },
];

export const LIQUID_RESIDUE_CONTAM = (severity: 'minor' | 'major' = 'minor'): ContaminationRule[] => [
  {
    intoStream: 'recycle',
    severity,
    reason: 'Leftover liquid soaks surrounding paper/cardboard and can leak into equipment.',
  },
];

export const GLASS_SHARD_CONTAM: ContaminationRule[] = [
  {
    intoStream: 'recycle',
    severity: 'major',
    reason: 'Broken glass shards contaminate paper/plastic bales and are a worker-injury hazard on the sorting line.',
  },
];
