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
      'The triangle is a resin identification code (the number 1-7 inside it), not a recyclability guarantee. US law requires it on nearly all plastic packaging regardless of whether any local program actually accepts that resin. #1 and #2 are commonly accepted; #3-#7 usually are not, and it varies by city.',
    factCitation: 'The chasing-arrows resin code was standardized by ASTM/SPI for plastic identification, not recyclability certification.',
    citationVerified: false,
  },
  {
    id: 'quiz-pizza-box',
    prompt: 'A greasy pizza box should go in the recycling bin, since cardboard is recyclable.',
    options: ['True', 'False'],
    correctIndex: 1,
    commonMisconception:
      'Most people answer "True" — they correctly remember that cardboard is recyclable and stop reasoning there, without factoring in what is currently on the cardboard.',
    explanation:
      'Cardboard fiber is recyclable, but grease and cheese soaked into that fiber cannot be filtered back out during repulping. A greasy box does not just fail to recycle itself — it can degrade the whole batch of paper it is baled with.',
    factCitation: 'Fiber-embedded oil is not removable by standard paper-mill repulping/screening, unlike surface dirt.',
    citationVerified: false,
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
    factCitation: 'Lithium-ion batteries mis-sorted into trash/recycling are a widely reported cause of waste-collection and MRF fires; alkaline battery risk is comparatively low.',
    citationVerified: false,
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
    factCitation: 'The US has on the order of tens of thousands of separate local recycling programs rather than one national standard; exact figures vary by how "program" is counted.',
    citationVerified: false,
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
    factCitation: 'This models the real 2018 shift in Chinese scrap-import policy commonly referred to as "National Sword." Specific export-share percentages vary by source and are not independently verified here.',
    citationVerified: false,
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
    factCitation: 'PLA and similar bioplastics generally require industrial composting conditions rarely available in home composting.',
    citationVerified: false,
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
    factCitation: 'Recycling industry sources commonly cite "wishcycling" as a significant driver of contamination in single-stream programs.',
    citationVerified: false,
  },
];
