import type { LiquidItem, ContaminationRule } from '../types.js';

let counter = 0;
function nextId(): string {
  counter += 1;
  return `liquid-${counter.toString().padStart(3, '0')}`;
}

interface LiquidSpec {
  name: string;
  category: LiquidItem['category'];
  correctPath: LiquidItem['correctPath'];
  isValueRecoverable?: boolean;
  recoveredAs?: string;
  drainHazard: { severity: LiquidItem['drainHazard']['severity']; mechanism: string };
  contamination?: ContaminationRule[];
  explanation: string;
  factCitation: string;
  citationVerified?: boolean;
  volumeL?: number;
}

function l(spec: LiquidSpec): LiquidItem {
  return {
    id: nextId(),
    name: spec.name,
    category: spec.category,
    correctPath: spec.correctPath,
    isValueRecoverable: spec.isValueRecoverable ?? false,
    recoveredAs: spec.recoveredAs,
    drainHazard: spec.drainHazard,
    contamination: spec.contamination ?? [],
    explanation: spec.explanation,
    factCitation: spec.factCitation,
    citationVerified: spec.citationVerified ?? true,
    volumeL: spec.volumeL ?? 0.5,
  };
}

export const liquidItems: LiquidItem[] = [
  l({
    name: 'Used cooking/fryer oil (jug of drained oil)',
    category: 'cooking-oil', correctPath: 'recycling-dropoff',
    isValueRecoverable: true, recoveredAs: 'biodiesel feedstock',
    drainHazard: { severity: 'major', mechanism: 'Cooking oil solidifies (congeals with grease, "FOG") inside sewer pipes and is a leading cause of residential sewer-line and municipal main blockages.' },
    explanation: 'Used cooking oil poured down the drain is a top cause of home and municipal sewer blockages — collected properly instead, it becomes feedstock for biodiesel.',
    factCitation: 'Fats, oils, and grease (FOG) poured down drains are widely cited by water utilities as a leading cause of sewer blockages and overflows; used cooking oil collection for biodiesel conversion is an established industry, though exact yield/viability figures vary by feedstock quality.',
    citationVerified: false,
  }),
  l({
    name: 'Used motor oil (drained during an oil change)',
    category: 'motor-fluid', correctPath: 'recycling-dropoff',
    isValueRecoverable: true, recoveredAs: 're-refined base oil / lubricant',
    drainHazard: { severity: 'batch-voiding', mechanism: 'A single quart of motor oil can contaminate a very large volume of groundwater; illegal dumping is a serious environmental hazard.' },
    explanation: 'Used motor oil is toxic if drained or dumped, but auto parts stores and service stations widely accept it for re-refining into new lubricant — one of the clearest "do it right and it has real value" stories in household waste.',
    factCitation: 'Used motor oil re-refining into base lubricant oil is a long-established industrial process; many US auto parts retailers accept used oil for free by law or policy in many states.',
    citationVerified: false,
    volumeL: 4,
  }),
  l({
    name: 'Automotive antifreeze/coolant (old, drained)',
    category: 'motor-fluid', correctPath: 'hhw-collection',
    drainHazard: { severity: 'batch-voiding', mechanism: 'Ethylene glycol antifreeze is toxic to pets and wildlife (it has a sweet taste that attracts animals) and is banned from storm drains and sewers in most jurisdictions.' },
    explanation: 'Antifreeze is acutely toxic to pets and wildlife — household hazardous waste collection only, never a drain or storm sewer.',
    factCitation: 'Ethylene glycol antifreeze toxicity to animals (due to its sweet taste) is well documented in veterinary and environmental guidance.',
    citationVerified: false,
    volumeL: 4,
  }),
  l({
    name: 'Latex (water-based) house paint, fully dried out in the can',
    category: 'paint', correctPath: 'trash',
    drainHazard: { severity: 'minor', mechanism: 'Wet latex paint should never be drained, but once fully solid/dried it is inert.' },
    explanation: 'Many municipalities accept fully hardened, dried-out latex paint as ordinary trash (lid off, so an inspector can confirm it is solid) — never pour wet latex paint down a drain.',
    factCitation: 'A number of US municipal guides explicitly allow dried latex paint in the trash, distinct from paint that is still liquid.',
    citationVerified: false,
    volumeL: 1,
  }),
  l({
    name: 'Oil-based paint (still wet, half a can left)',
    category: 'paint', correctPath: 'hhw-collection',
    drainHazard: { severity: 'major', mechanism: 'Oil-based paint is flammable and toxic; it does not dry/solidify safely the way latex paint does.' },
    explanation: 'Oil-based paints are flammable and hazardous while wet — household hazardous waste collection, never trash or drain.',
    factCitation: 'Oil-based (alkyd) paints are commonly listed as household hazardous waste distinct from water-based latex paint.',
    citationVerified: false,
    volumeL: 2,
  }),
  l({
    name: 'Chemical drain cleaner (lye or acid-based, partial bottle)',
    category: 'household-chemical', correctPath: 'hhw-collection',
    drainHazard: { severity: 'major', mechanism: 'Ironically dangerous to drain in bulk/leftover form: highly corrosive and can react violently with other chemicals already in a pipe or in HHW storage if mixed carelessly.' },
    explanation: 'Corrosive drain cleaner needs household hazardous waste handling for disposal of the leftover product — using it as intended (small amounts, per label) is different from dumping a leftover bottle.',
    factCitation: 'Corrosive drain-cleaning chemicals (lye/sulfuric-acid based) are standard HHW collection items.',
    citationVerified: false,
  }),
  l({
    name: 'Unused liquid prescription medication (old antibiotic suspension)',
    category: 'medication', correctPath: 'take-back-program',
    drainHazard: { severity: 'major', mechanism: 'Flushed or drained pharmaceuticals pass through many wastewater treatment systems largely intact and have been detected in downstream waterways.' },
    explanation: 'Unused medication should go to a pharmacy or police-station take-back program, not down the drain — flushed drugs contribute to detectable pharmaceutical pollution in waterways.',
    factCitation: 'Pharmaceutical take-back programs (e.g., DEA National Prescription Drug Take Back Day and year-round pharmacy kiosks) exist specifically because flushed/drained medication is a recognized water-contamination pathway.',
    citationVerified: false,
    volumeL: 0.1,
  }),
  l({
    name: 'Liquid pool chlorine (sodium hypochlorite, unused jug)',
    category: 'pool-spa', correctPath: 'hhw-collection',
    drainHazard: { severity: 'major', mechanism: 'Concentrated chlorine is a strong oxidizer that can react dangerously with other drain or storage chemicals.' },
    explanation: 'Concentrated pool chemicals are reactive and hazardous in bulk — household hazardous waste collection for disposal of leftover/expired product.',
    factCitation: 'Pool chemicals are standard HHW collection items due to their oxidizing/reactive properties.',
    citationVerified: false,
    volumeL: 4,
  }),
  l({
    name: 'Nail polish remover (acetone, mostly empty bottle)',
    category: 'household-chemical', correctPath: 'hhw-collection',
    drainHazard: { severity: 'major', mechanism: 'Acetone is flammable and can vaporize into a flammable atmosphere in enclosed plumbing/sewer spaces.' },
    explanation: 'Acetone-based solvents are flammable — household hazardous waste for any real leftover volume, not the drain.',
    factCitation: 'Acetone and similar solvents are broadly classified as flammable household hazardous waste.',
    citationVerified: false,
    volumeL: 0.1,
  }),
  l({
    name: 'Dilute household bleach (leftover diluted cleaning solution)',
    category: 'household-chemical', correctPath: 'drain',
    drainHazard: { severity: 'minor', mechanism: 'Small, already-dilute quantities are generally accepted by municipal wastewater treatment, unlike concentrated bleach.' },
    explanation: 'Small amounts of already-diluted bleach solution are commonly accepted down the drain per many utilities’ guidance — but never mix bleach with ammonia or other cleaners, and never dump a full concentrated bottle at once.',
    factCitation: 'Municipal wastewater guidance on diluted household bleach varies; treat this as needing local verification rather than a universal rule.',
    citationVerified: false,
  }),
  l({
    name: 'Dish soap / mild dish detergent (leftover, diluted in a basin)',
    category: 'household-chemical', correctPath: 'drain',
    drainHazard: { severity: 'none', mechanism: 'Formulated to be safely wastewater-treatable in normal household quantities.' },
    explanation: 'Mild dish soap is designed to go down the drain — a genuinely safe contrast to the hazardous liquids on this list.',
    factCitation: 'Household dish detergents are formulated for compatibility with residential wastewater treatment in normal-use quantities.',
    citationVerified: false,
  }),
  l({
    name: 'Gasoline (old, from a gas can, not usable in an engine anymore)',
    category: 'motor-fluid', correctPath: 'hhw-collection',
    drainHazard: { severity: 'batch-voiding', mechanism: 'Highly flammable and can create explosive vapor buildup in sewer lines; never trash or drain under any circumstance.' },
    explanation: 'Gasoline is one of the most dangerous liquids a household can generate — always household hazardous waste, never trash, drain, or storm sewer.',
    factCitation: 'Gasoline is universally classified as flammable hazardous waste requiring specialized collection.',
    citationVerified: false,
    volumeL: 2,
  }),
  l({
    name: 'Brake fluid (old, drained during a brake job)',
    category: 'motor-fluid', correctPath: 'hhw-collection',
    drainHazard: { severity: 'major', mechanism: 'Brake fluid is toxic and corrosive to many materials; not accepted in drains or general trash.' },
    explanation: 'Brake fluid is toxic and corrosive — household hazardous waste or an auto-parts take-back program, similar to motor oil.',
    factCitation: 'Brake fluid is commonly listed as HHW; some auto parts retailers accept it alongside used motor oil.',
    citationVerified: false,
    volumeL: 0.5,
  }),
  l({
    name: 'Pesticide/herbicide spray concentrate (leftover in the sprayer)',
    category: 'household-chemical', correctPath: 'hhw-collection',
    drainHazard: { severity: 'major', mechanism: 'Concentrated pesticide runoff is toxic to aquatic ecosystems and is explicitly restricted from storm drains.' },
    explanation: 'Concentrated pesticide/herbicide product is hazardous waste — never drain, storm sewer, or general trash.',
    factCitation: 'Pesticide concentrates are standard HHW collection items with explicit storm-drain disposal restrictions in most jurisdictions.',
    citationVerified: false,
  }),
  l({
    name: 'Fish tank water (routine water change, no medication treatment)',
    category: 'other', correctPath: 'drain',
    drainHazard: { severity: 'none', mechanism: 'Plain aquarium water is a benign contrast case — no meaningful contaminant load for wastewater treatment.' },
    explanation: 'Ordinary aquarium water from a routine water change is safe down the drain — a genuinely benign liquid, unlike most of this list.',
    factCitation: 'Household aquarium water changes are commonly drained without special handling absent recent chemical medication use.',
    citationVerified: false,
    volumeL: 10,
  }),
  l({
    name: 'Expired liquid vitamins/supplements (over-the-counter, non-prescription)',
    category: 'other', correctPath: 'trash',
    drainHazard: { severity: 'minor', mechanism: 'Lower-risk than prescription drugs, but still discouraged from flushing/draining as a wastewater contaminant class.' },
    explanation: 'Unlike prescription medication, most over-the-counter liquid vitamins can go in sealed trash — still avoid flushing/draining them, but they do not require a controlled take-back program.',
    factCitation: 'Disposal guidance commonly distinguishes controlled/prescription pharmaceuticals from general over-the-counter supplements.',
    citationVerified: false,
    volumeL: 0.2,
  }),
  l({
    name: 'Bacon grease / cooking fat (cooled, liquid-ish, in a container)',
    category: 'cooking-oil', correctPath: 'trash',
    drainHazard: { severity: 'major', mechanism: 'Solidifying animal fat is one of the classic causes of home kitchen-sink and lateral sewer-line clogs ("fatbergs" at municipal scale).' },
    explanation: 'Cooking fat should be cooled, contained in a sealed jar or can, and thrown in the trash — never poured down the sink, where it solidifies and blocks pipes; some cities offer FOG (fats/oils/grease) collection as an alternative.',
    factCitation: 'Fats/oils/grease (FOG) buildup from cooking fat is widely cited as a cause of both home plumbing clogs and large municipal sewer blockages ("fatbergs").',
    citationVerified: false,
    volumeL: 0.3,
  }),
  l({
    name: 'Ammonia-based glass/window cleaner (leftover, diluted)',
    category: 'household-chemical', correctPath: 'trash',
    drainHazard: { severity: 'minor', mechanism: 'Dilute ammonia cleaner is lower-risk down the drain than concentrated chemicals, but must never be combined with bleach — the reaction produces toxic chloramine gas.' },
    explanation: 'A small amount of already-diluted ammonia cleaner is generally low-risk, but the critical rule is never mixing it with bleach or bleach-based products, which produces dangerous toxic gas — a mixing hazard, not just a wrong-bin problem.',
    factCitation: 'Mixing ammonia and bleach produces toxic chloramine vapors and is a well-documented household chemical safety hazard independent of disposal method.',
    citationVerified: false,
  }),
];
