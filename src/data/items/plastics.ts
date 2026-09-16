import { w, FILM_JAM_CONTAM, LIQUID_RESIDUE_CONTAM } from './factory.js';
import type { WasteItem } from '../../types.js';

// #1 PET — the most commonly accepted curbside plastic.
const pet: WasteItem[] = [
  w('plastic', {
    name: 'PET water bottle (empty, rinsed)',
    category: 'plastic', correctStream: 'recycle', material: 'pet-1', resinCode: 1,
    residueState: 'rinsed',
    explanation: 'Resin code #1 (PET) is one of the two plastics almost every curbside program accepts.',
    factCitation: 'PET and HDPE (#1, #2) have the highest curbside acceptance rates of any resin codes in the US.',
  }),
  w('plastic', {
    name: 'PET soda bottle (empty, rinsed)',
    category: 'plastic', correctStream: 'recycle', material: 'pet-1', resinCode: 1,
    residueState: 'rinsed',
    explanation: 'Clear/colored PET soda bottles recycle the same way as water bottles.',
    factCitation: 'PET soda and water bottles are chemically identical resin, just different additives/colorants.',
  }),
  w('plastic', {
    name: 'PET soda bottle, half-full of soda',
    category: 'plastic', correctStream: 'recycle', material: 'pet-1', resinCode: 1,
    residueState: 'unrinsed',
    contamination: LIQUID_RESIDUE_CONTAM('minor'),
    explanation: 'The bottle material is recyclable, but leftover sugary liquid attracts pests and soaks nearby paper — empty it first.',
    factCitation: 'MRFs ask residents to empty and rinse containers because residual liquid contaminates paper bales.',
  }),
  w('plastic', {
    name: 'PET salad clamshell container',
    category: 'plastic', correctStream: 'recycle', material: 'pet-1', resinCode: 1,
    municipalityVariance: 'varies-by-city',
    explanation: 'Many programs now take rigid PET clamshells, but some still reject them because their shape confuses optical sorters.',
    factCitation: 'PET thermoform (clamshell) acceptance varies by MRF sorting equipment, unlike bottle-grade PET which is almost universal.',
  }),
  w('plastic', {
    name: 'PET mouthwash bottle (empty, rinsed)',
    category: 'plastic', correctStream: 'recycle', material: 'pet-1', resinCode: 1,
    residueState: 'rinsed',
    explanation: 'Same PET resin as beverage bottles once emptied and rinsed.',
    factCitation: 'Resin code alone does not distinguish "food grade" from other PET containers for recycling purposes.',
  }),
  w('plastic', {
    name: 'PET peanut butter jar (empty, rinsed)',
    category: 'plastic', correctStream: 'recycle', material: 'pet-1', resinCode: 1,
    residueState: 'rinsed',
    explanation: 'Rinsed PET jars recycle fine; the issue is almost always leftover product, not the plastic itself.',
    factCitation: 'Peanut butter jars are commonly PET or PP depending on brand — check the resin code, not just the shape.',
  }),
  w('plastic', {
    name: 'PET peanut butter jar, unscraped (thick residue)',
    category: 'plastic', correctStream: 'recycle', material: 'pet-1', resinCode: 1,
    residueState: 'unrinsed',
    contamination: [{ intoStream: 'recycle', severity: 'major', reason: 'Thick oily residue coats other items in the same bale and attracts pests during storage/transport.' }],
    explanation: 'Peanut butter residue is thick and oily — a quick rinse isn’t enough; scrape it out or it contaminates the whole bale.',
    factCitation: 'Oily/greasy residue is one of the most common contamination sources cited by MRF operators.',
  }),
  w('plastic', {
    name: 'PET clear plastic clamshell berry container',
    category: 'plastic', correctStream: 'recycle', material: 'pet-1', resinCode: 1,
    municipalityVariance: 'varies-by-city',
    explanation: 'Thin, brittle PET clamshells are recyclable in many places but often too lightweight for older optical sorters to catch.',
    factCitation: 'Thin-gauge PET packaging has lower/variable acceptance compared to bottle-grade PET.',
  }),
];

// #2 HDPE — the other commonly accepted plastic.
const hdpe: WasteItem[] = [
  w('plastic', {
    name: 'HDPE milk jug (empty, rinsed)',
    category: 'plastic', correctStream: 'recycle', material: 'hdpe-2', resinCode: 2,
    residueState: 'rinsed',
    explanation: 'Resin code #2 (HDPE) is the other plastic almost every curbside program accepts.',
    factCitation: 'HDPE milk/detergent jugs are among the highest-value recycled plastics due to consistent, clean supply.',
  }),
  w('plastic', {
    name: 'HDPE laundry detergent bottle (empty, rinsed)',
    category: 'plastic', correctStream: 'recycle', material: 'hdpe-2', resinCode: 2,
    residueState: 'rinsed',
    explanation: 'Same HDPE resin as milk jugs; rinse out residual detergent first.',
    factCitation: 'HDPE bottles are reprocessed into new bottles, pipe, and plastic lumber.',
  }),
  w('plastic', {
    name: 'HDPE shampoo bottle (empty, rinsed)',
    category: 'plastic', correctStream: 'recycle', material: 'hdpe-2', resinCode: 2,
    residueState: 'rinsed',
    explanation: 'HDPE personal-care bottles recycle the same as jugs once emptied.',
    factCitation: 'Bottle shape/color does not change the underlying HDPE resin’s recyclability.',
  }),
  w('plastic', {
    name: 'HDPE motor oil bottle, empty and drained',
    category: 'plastic', correctStream: 'recycle', material: 'hdpe-2', resinCode: 2,
    municipalityVariance: 'varies-by-city',
    contamination: [{ intoStream: 'recycle', severity: 'major', reason: 'Residual motor oil is a petroleum contaminant that ruins food-grade plastic bales even in small amounts.' }],
    explanation: 'The empty bottle is HDPE, but many programs still reject it since any oil residue is very hard to fully drain.',
    factCitation: 'Some municipalities exclude motor oil containers from curbside recycling regardless of resin code.',
  }),
  w('plastic', {
    name: 'HDPE yogurt tub (large, empty, rinsed)',
    category: 'plastic', correctStream: 'recycle', material: 'hdpe-2', resinCode: 2,
    residueState: 'rinsed',
    explanation: 'Some larger yogurt/sour cream tubs are HDPE rather than PP — check the number, not just the product.',
    factCitation: 'Packaging resin varies by manufacturer even for visually similar products.',
  }),
  w('plastic', {
    name: 'HDPE butter tub (empty, rinsed)',
    category: 'plastic', correctStream: 'recycle', material: 'hdpe-2', resinCode: 2,
    residueState: 'rinsed',
    explanation: 'Rinsed HDPE tubs are recyclable; leftover butter residue is a common contaminant if skipped.',
    factCitation: 'Fat residue behaves like grease contamination even in small tub-sized quantities.',
  }),
  w('plastic', {
    name: 'HDPE grocery-store gallon water jug',
    category: 'plastic', correctStream: 'recycle', material: 'hdpe-2', resinCode: 2,
    explanation: 'Standard HDPE jug, universally accepted once empty.',
    factCitation: 'HDPE is one of the two "universal" curbside plastics alongside PET.',
  }),
  w('plastic', {
    name: 'HDPE bleach bottle, empty and rinsed',
    category: 'plastic', correctStream: 'recycle', material: 'hdpe-2', resinCode: 2,
    residueState: 'rinsed',
    explanation: 'Empty and well-rinsed household chemical bottles are usually fine — it is the leftover chemical, not the container, that matters.',
    factCitation: 'Container recyclability is generally independent of what it held, once fully empty and rinsed.',
    citationVerified: false,
  }),
];

// #3 PVC — almost never accepted.
const pvc: WasteItem[] = [
  w('plastic', {
    name: '#3 PVC pipe offcut',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 3,
    municipalityVariance: 'rarely-accepted',
    explanation: 'PVC (#3) is almost never accepted curbside — it can off-gas corrosive chlorine compounds if it contaminates a PET/HDPE reprocessing batch.',
    factCitation: 'PVC is widely considered one of the least recyclable common plastics and is explicitly excluded by most MRFs.',
  }),
  w('plastic', {
    name: '#3 PVC shower curtain liner',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 3,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Despite the arrows symbol, #3 PVC shower liners are not curbside recyclable in almost any US municipality.',
    factCitation: 'PVC film products are excluded from virtually all residential single-stream programs.',
  }),
  w('plastic', {
    name: '#3 PVC blister pack (pill/toy packaging)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 3,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Rigid clamshell "blister" packaging is frequently PVC and rarely recyclable curbside.',
    factCitation: 'Blister-pack resin varies by manufacturer; many are PVC or PVC-laminated.',
  }),
  w('plastic', {
    name: '#3 PVC vinyl siding scrap',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 3,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Construction-grade PVC needs a specialty recycler, not curbside pickup.',
    factCitation: 'Rigid PVC building materials generally require dedicated take-back or C&D recycling programs.',
  }),
  w('plastic', {
    name: '#3 PVC garden hose (old, cracked)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 3,
    municipalityVariance: 'rarely-accepted',
    contamination: [{ intoStream: 'recycle', severity: 'major', reason: 'Hoses tangle in sorting equipment and PVC content contaminates other resin bales.' }],
    explanation: 'Hoses are notorious for tangling around MRF sorting equipment even when the plastic itself were recyclable.',
    factCitation: 'Long flexible items like hoses, cords, and hangers are commonly cited MRF "tanglers."',
  }),
];

// #4 LDPE — mostly film/bags, handled via store drop-off, not curbside bin.
const ldpe: WasteItem[] = [
  w('plastic', {
    name: '#4 LDPE plastic grocery bag',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 4,
    municipalityVariance: 'rarely-accepted',
    contamination: FILM_JAM_CONTAM,
    explanation: 'Plastic film bags are the single most common curbside-recycling contaminant — they belong at store drop-off bins, never in the curbside bin.',
    factCitation: 'Plastic film wrapping around MRF sorting augers is one of the most cited causes of facility shutdowns for cleaning.',
  }),
  w('plastic', {
    name: '#4 LDPE bread bag',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 4,
    municipalityVariance: 'rarely-accepted',
    contamination: FILM_JAM_CONTAM,
    explanation: 'Same film problem as grocery bags — take it to a store drop-off bin instead.',
    factCitation: 'Store take-back bins for LDPE film exist specifically because curbside systems cannot process it.',
  }),
  w('plastic', {
    name: '#4 LDPE dry-cleaning bag',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 4,
    municipalityVariance: 'rarely-accepted',
    contamination: FILM_JAM_CONTAM,
    explanation: 'Thin film plastic, same jamming risk as grocery bags.',
    factCitation: 'Film thickness/flexibility, not resin code alone, is what makes it unsuitable for single-stream sorting lines.',
  }),
  w('plastic', {
    name: '#4 LDPE shrink wrap (from a case of water bottles)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 4,
    municipalityVariance: 'rarely-accepted',
    contamination: FILM_JAM_CONTAM,
    explanation: 'Large sheets of shrink wrap are even more prone to jamming than small bags.',
    factCitation: 'Larger film pieces increase the chance of wrapping fully around a rotating shaft.',
  }),
  w('plastic', {
    name: '#4 LDPE sandwich bag (used)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 4,
    municipalityVariance: 'rarely-accepted',
    contamination: FILM_JAM_CONTAM,
    explanation: 'Food residue plus film plastic is a double contamination risk in the recycling stream.',
    factCitation: 'Film contamination compounds with food-residue contamination when both are present on one item.',
  }),
  w('plastic', {
    name: '#4 LDPE squeeze bottle (honey/mustard, empty & rinsed)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 4,
    municipalityVariance: 'varies-by-city',
    explanation: 'Rigid-ish LDPE squeeze bottles are sometimes accepted, but the resin is generally lower-value and inconsistently collected.',
    factCitation: 'LDPE bottle acceptance is markedly less consistent across US municipalities than PET/HDPE.',
  }),
  w('plastic', {
    name: '#4 LDPE bubble wrap',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 4,
    municipalityVariance: 'rarely-accepted',
    contamination: FILM_JAM_CONTAM,
    explanation: 'Another film product — store drop-off only, never the curbside bin.',
    factCitation: 'Bubble wrap is polyethylene film, subject to the same sorting-line jam risk as bags.',
  }),
];

// #5 PP — increasingly collected in some cities, still inconsistent.
const pp: WasteItem[] = [
  w('plastic', {
    name: '#5 PP yogurt cup',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 5,
    municipalityVariance: 'varies-by-city',
    explanation: 'PP carries the chasing-arrows symbol, which many people read as "always recyclable" — but #5 acceptance is genuinely city-dependent, and defaults to trash in most US programs.',
    factCitation: 'Resin codes #3-7 are commonly not accepted curbside; #5 (PP) is the most likely of that group to be accepted, but far from universal.',
  }),
  w('plastic', {
    name: '#5 PP prescription pill bottle (empty)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 5,
    municipalityVariance: 'varies-by-city',
    explanation: 'Small rigid PP items are frequently rejected by sorters even where PP is nominally accepted, due to their size.',
    factCitation: 'Items smaller than roughly 2 inches often fall through MRF screens into the wrong stream regardless of resin.',
  }),
  w('plastic', {
    name: '#5 PP ketchup bottle (squeeze, empty & rinsed)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 5,
    municipalityVariance: 'varies-by-city',
    explanation: 'Same PP-acceptance uncertainty as yogurt cups — check local rules rather than assuming from the symbol.',
    factCitation: 'PP condiment bottles are a commonly cited "wishcycled" item.',
  }),
  w('plastic', {
    name: '#5 PP plastic bottle caps (loose, off the bottle)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 5,
    municipalityVariance: 'varies-by-city',
    explanation: 'Loose caps are small enough to fall through sorting screens and get lost to residue/landfill even in PP-accepting cities — leaving caps on the (correctly sorted) bottle is usually recommended instead.',
    factCitation: 'Many recycling programs specifically instruct residents to leave small caps attached to their bottle rather than loose.',
  }),
  w('plastic', {
    name: '#5 PP food container with lid (deli container, empty & rinsed)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 5,
    municipalityVariance: 'varies-by-city',
    explanation: 'PP deli containers are common "maybe" items — correct handling depends entirely on the local program.',
    factCitation: 'Municipal acceptance lists for #5 vary block to block within the same country.',
  }),
  w('plastic', {
    name: '#5 PP plastic straws (loose)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 5,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Straws are almost universally too small and lightweight for sorting equipment to capture, even in PP-friendly cities.',
    factCitation: 'Small, thin plastic items are commonly excluded from recycling instructions regardless of resin type.',
  }),
  w('plastic', {
    name: '#5 PP reusable food-storage lid (cracked, being thrown out)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 5,
    municipalityVariance: 'varies-by-city',
    explanation: 'Same PP rules apply whether an item started as "reusable" or "single-use" packaging.',
    factCitation: 'Recyclability is a property of resin and program acceptance, not of how the item was marketed.',
  }),
  w('plastic', {
    name: '#5 PP margarine tub (empty, rinsed)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 5,
    municipalityVariance: 'varies-by-city',
    explanation: 'Another classic PP tub in the "check locally" category.',
    factCitation: 'PP tub acceptance correlates with whether a MRF has invested in near-infrared sorting for #5.',
  }),
];

// #6 PS — foam and rigid polystyrene, rarely recyclable curbside.
const ps: WasteItem[] = [
  w('plastic', {
    name: '#6 EPS foam coffee cup',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 6,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Expanded polystyrene foam is bulky, low-value, and rejected by nearly all curbside programs — foam requires specialty drop-off, if available at all.',
    factCitation: 'EPS foam recycling requires specialized densifying equipment most MRFs do not have.',
  }),
  w('plastic', {
    name: '#6 EPS foam meat tray',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 6,
    municipalityVariance: 'rarely-accepted',
    contamination: [{ intoStream: 'recycle', severity: 'minor', reason: 'Foam breaks into small beads that scatter through paper/plastic bales and are hard to fully remove.' }],
    explanation: 'Same foam-recycling gap, plus raw meat residue makes this one of the least recyclable items in a typical kitchen.',
    factCitation: 'Foam trays combine two contamination problems: unrecyclable-in-practice resin and food residue.',
  }),
  w('plastic', {
    name: '#6 EPS packing peanuts (foam)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 6,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Foam packing peanuts are not curbside recyclable; some shipping stores accept them for reuse (not the same as municipal recycling).',
    factCitation: 'Peanut/void-fill foam recycling exists mainly through voluntary retail take-back, not municipal programs.',
  }),
  w('plastic', {
    name: '#6 rigid polystyrene disposable cutlery',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 6,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Small rigid PS items are excluded from almost every curbside stream.',
    factCitation: 'Utensil-sized plastic items are near-universally excluded due to sorting-line size limits.',
  }),
  w('plastic', {
    name: '#6 polystyrene CD/DVD case (cracked)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 6,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Rigid PS jewel cases are not curbside recyclable in most places, despite looking "hard plastic."',
    factCitation: 'Hardness/rigidity of a plastic item says nothing about its resin-based recyclability.',
  }),
  w('plastic', {
    name: '#6 foam takeout clamshell',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 6,
    municipalityVariance: 'rarely-accepted',
    contamination: [{ intoStream: 'recycle', severity: 'minor', reason: 'Foam crumbles and food residue frequently accompanies it.' }],
    explanation: 'Foam takeout containers combine the foam problem with near-certain food contamination.',
    factCitation: 'Foam foodservice ware is one of the most frequently "wishcycled" items despite low real acceptance.',
  }),
];

// #7 Other — catch-all, mixed/multilayer, generally not curbside recyclable.
const other7: WasteItem[] = [
  w('plastic', {
    name: '#7 polycarbonate reusable water bottle (broken, being discarded)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 7,
    municipalityVariance: 'rarely-accepted',
    explanation: '#7 is a catch-all "everything else" code, including polycarbonate — almost never accepted curbside.',
    factCitation: 'Resin code 7 covers multiple distinct polymers and blends, which is precisely why it is hard to recycle at scale.',
  }),
  w('plastic', {
    name: '#7 large water-cooler bottle (empty)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 7,
    municipalityVariance: 'varies-by-city',
    explanation: 'Some water-cooler suppliers run their own bottle take-back/refill program; curbside acceptance is inconsistent.',
    factCitation: 'Reusable water-cooler bottles are often handled through supplier deposit/refill systems rather than public recycling.',
    citationVerified: false,
  }),
  w('plastic', {
    name: '#7 "compostable" plastic cutlery (industrial-compostable only)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 7,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Labeled "compostable" almost always means industrial/commercial composting facilities only — it will not break down in a home compost bin or curbside organics program without one.',
    factCitation: 'PLA and similar bioplastics typically require sustained industrial composting temperatures not reached in backyard compost.',
  }),
  w('plastic', {
    name: '#7 toothpaste tube (mixed plastic/foil laminate)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 7,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Multi-layer laminate tubes bond several materials together, making mechanical separation impractical for most recyclers.',
    factCitation: 'Multi-material laminates are one of the least recyclable common packaging formats due to separation cost.',
    citationVerified: false,
  }),
  w('plastic', {
    name: '#7 sunglasses (broken, cheap pair)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 7,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Mixed plastic/metal/glass-lens items are not curbside recyclable as a unit.',
    factCitation: 'Products combining multiple material classes generally need disassembly before any part can be recycled.',
    citationVerified: false,
  }),
  w('plastic', {
    name: '#7 snack chip bag (multi-layer laminate)',
    category: 'plastic', correctStream: 'trash', material: 'mixed-plastics-3-7', resinCode: 7,
    municipalityVariance: 'rarely-accepted',
    explanation: 'Metallized multi-layer film looks foil-like but is mostly plastic laminate — not recyclable through standard curbside streams.',
    factCitation: 'Snack-bag laminates combine plastic and thin metallization, a common "wishcycled" item.',
  }),
];

export const plasticItems: WasteItem[] = [...pet, ...hdpe, ...pvc, ...ldpe, ...pp, ...ps, ...other7];
