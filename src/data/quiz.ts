import type { QuizQuestion } from '../types.js';

// Each question targets a specific, common belief — the "commonMisconception" field
// names that belief and why people hold it, revealed only after the player answers,
// never before. This is a pre-game self-assessment, not a tutorial.
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-arrows',
    prompt: 'The chasing-arrows triangle printed on a plastic item means it will be recycled.',
    options: ['True', 'False'],
    correctIndex: 1,
    commonMisconception:
      'Most people answer "True" — the triangle looks like an official recycling seal of approval, so it reads as a promise, not a label.',
    explanation:
      'The triangle is a resin identification code (the number 1-7 inside it), not a recyclability guarantee — it is a packaging-labeling standard, not a promise that any program accepts that resin. #1 and #2 are commonly accepted; #3-#7 usually are not, and it varies by city.',
    factCitation: 'The resin identification code system (originated by the Society of the Plastics Industry, now ASTM D7611) identifies plastic composition for sorting purposes; it is not a certification of recyclability.',
    citationVerified: true,
  },
  {
    id: 'quiz-pizza-box',
    prompt: 'A pizza box with a couple of grease spots and a few bits of stuck-on cheese should never go in the recycling bin.',
    options: ['True', 'False'],
    correctIndex: 1,
    commonMisconception:
      'Most people answer "True" — "greasy pizza box, don’t recycle it" has become such a well-known rule of thumb that it gets applied to any amount of grease, not just heavy saturation.',
    explanation:
      'The rule is more forgiving than its reputation: industry testing (WestRock) found boxes with up to roughly 2% grease content — typical spots and stray cheese — do not meaningfully hurt paper-fiber quality, and many modern mills accept them. It is a fully soaked, saturated box that should be torn/thrown away, not a lightly-used one.',
    factCitation: 'A WestRock industry study found pizza boxes with grease content up to about 2% did not significantly affect recycled paperboard quality; typical small boxes average 1-2% grease.',
    citationVerified: true,
  },
  {
    id: 'quiz-one-item',
    prompt: 'If you put one wrong item in your recycling bin, it only ruins that one item — the rest of your recycling is unaffected.',
    options: ['True', 'False'],
    correctIndex: 1,
    commonMisconception:
      'Most people answer "True" because they think of recycling like sorting mail — one wrong envelope doesn’t affect the others. Recycling is processed as a shared physical batch, not itemized.',
    explanation:
      'A single greasy container, a plastic bag, or a bit of leftover liquid can contaminate everything baled or processed alongside it. Contamination is systemic — it degrades or voids a whole batch, not just the offending item.',
    factCitation: 'Single-stream recycling bales mix material together before sorting, so per-item contamination becomes a batch-level problem.',
    citationVerified: false,
  },
  {
    id: 'quiz-batteries',
    prompt: 'A dead battery is always safe to throw straight in the trash.',
    options: ['True, all batteries are fine in the trash', 'False, it depends on the battery type', 'False, no battery is ever safe in the trash'],
    correctIndex: 1,
    commonMisconception:
      'Most people answer based on whatever battery they use most — if it’s alkaline AAs, they say "True"; if they’ve heard a news story about a fire, they overcorrect to "never." The real answer depends on chemistry.',
    explanation:
      'Standard alkaline batteries are low fire-risk and, in many US municipalities, fine in the trash. Lithium-ion and other rechargeable batteries are a genuinely different hazard: if compacted or crushed in a truck or sorting facility, they can ignite. Those need battery drop-off or hazardous-waste collection, not the trash or recycling bin.',
    factCitation: 'An EPA analysis identified 240+ lithium-ion battery-related fires at 64 US waste-management facilities between 2013-2020; industry group estimates put total recycling/waste-facility fires in the thousands annually, with battery-linked incidents rising sharply in recent years.',
    citationVerified: true,
  },
  {
    id: 'quiz-collection-equals-recycling',
    prompt: 'Once your recycling gets picked up by the truck, it gets recycled.',
    options: ['True', 'False'],
    correctIndex: 1,
    commonMisconception:
      'Most people answer "True" — collection is the only part of the process anyone actually sees, so it feels like the whole story.',
    explanation:
      'Collection is just the first step. The material still needs to pass a purity threshold and find a buyer with market demand for that specific material. Contaminated batches get landfilled after collection, and even clean material gets landfilled if there is no buyer — something that happened at large scale after a real 2018 shift in international scrap-buying policy.',
    factCitation: 'Municipal "recycling rate" statistics typically measure collected weight, not verified reprocessed weight — the two numbers diverge for the reasons above.',
    citationVerified: false,
  },
  {
    id: 'quiz-national-standard',
    prompt: 'Every US city recycles the same materials, the same way.',
    options: ['True', 'False'],
    correctIndex: 1,
    commonMisconception:
      'Most people answer "True" — school, if it covered recycling at all, taught one generic set of rules ("paper, plastic, glass, metal"), so it feels like a national standard exists.',
    explanation:
      'There is no single US recycling system. Recycling policy is set locally — roughly by county or municipality — so acceptance rules for the same exact item can differ block to block, let alone state to state. What’s recyclable in one city can be trash-only or even a contaminant two towns over.',
    factCitation: 'The Recycling Partnership’s National Recycling Database tracks upwards of 9,000 distinct US community recycling programs, each independently setting its own accepted-materials list; there is no national curbside recycling standard.',
    citationVerified: true,
  },
  {
    id: 'quiz-national-sword',
    prompt: 'For decades, most US recyclables were reprocessed domestically inside the United States.',
    options: ['True', 'False'],
    correctIndex: 1,
    commonMisconception:
      'Most people answer "True" — if you put something in a US recycling bin, it feels reasonable to assume it stays and gets processed in the US.',
    explanation:
      'For a long stretch, a large share of US recyclables — especially mixed plastic and paper — was exported overseas, historically much of it to China. When that market abruptly tightened import standards in 2018, many US collectors had nowhere to sell material that had been "successfully recycled" for years, and a meaningful share was quietly redirected to landfill.',
    factCitation: 'China’s 2018 "National Sword" policy banned imports of 24 recyclable material categories and imposed a 0.5% contamination limit on the rest; US container exports to China (previously ~4,000/day in 2016) dropped an estimated 90-95%.',
    citationVerified: true,
  },
  {
    id: 'quiz-compostable-label',
    prompt: 'A cup labeled "compostable" will break down if you put it in your backyard compost bin.',
    options: ['True', 'False'],
    correctIndex: 1,
    commonMisconception:
      'Most people answer "True" — the word "compostable" reads as a plain description of what will happen, not a qualified industrial claim.',
    explanation:
      '"Compostable" packaging (often PLA bioplastic) almost always requires sustained industrial composting heat and humidity that a backyard bin, and most curbside organics programs, never reach. Without that, it persists like ordinary plastic litter.',
    factCitation: 'PLA requires sustained heat of roughly 131-140°F (55-60°C) to soften and hydrolyze — thermophilic conditions industrial facilities maintain but backyard piles rarely reach.',
    citationVerified: true,
  },
  {
    id: 'quiz-rinsing',
    prompt: 'Rinsing food residue off a container before recycling it doesn’t really matter, as long as the material itself is recyclable.',
    options: ['True', 'False'],
    correctIndex: 1,
    commonMisconception:
      'Most people answer "True" — once they’ve identified the material as recyclable, the leftover food feels like a minor afterthought, not a disqualifying factor.',
    explanation:
      'A container being made of a recyclable material and a container being clean enough to recycle are two different questions. Residue — especially oily or sugary residue — is a common, real cause of batch contamination, even when the underlying plastic, glass, or metal is exactly the right type.',
    factCitation: 'Food and liquid residue on otherwise-recyclable containers is a frequently cited contamination source by material recovery facilities.',
    citationVerified: false,
  },
  {
    id: 'quiz-wishcycling',
    prompt: '"Wishcycling" — putting something in the recycling bin when you’re not sure, just in case — improves your household’s recycling rate.',
    options: ['True', 'False'],
    correctIndex: 1,
    commonMisconception:
      'Most people answer "True" — it feels like the cautious, pro-environment choice: better to try than to send something recyclable to the trash by mistake.',
    explanation:
      'Wishcycling increases contamination risk without a matching benefit — an item that isn’t actually accepted still has to be sorted out (or worse, contaminates the batch first) at extra cost, and can drag down the purity of material that was sorted correctly. When genuinely unsure, checking local rules first is more effective than guessing optimistically.',
    factCitation: '"Wishcycling" is a recognized industry term for aspirational, uncertain recycling that drives contamination; recycling educators and reporting on rising contamination rates cite it as a significant factor.',
    citationVerified: true,
  },
];
