import type {
  GameState,
  SortableItem,
  Stream,
  LiquidPath,
  FeedbackEvent,
  WeekResult,
  FireIncident,
  MaterialMarket,
} from '../types.js';
import { solidItems } from '../data/solidItems.js';
import { liquidItems } from '../data/liquidItems.js';
import { getMarketStateForWeek } from '../data/market.js';
import { applyContaminationPenalty, purityMultiplier } from './purity.js';
import { rollFireEvent } from './fire.js';

const STREAMS: Stream[] = ['recycle', 'compost', 'trash', 'hazardous'];
const LIQUID_PATHS: LiquidPath[] = ['drain', 'trash', 'recycling-dropoff', 'hhw-collection', 'take-back-program'];

export const ITEMS_PER_DAY = 12;
export const DAYS_PER_WEEK = 7;
const LIQUID_ITEM_CHANCE = 0.15;

function randomItem(): SortableItem {
  if (Math.random() < LIQUID_ITEM_CHANCE) {
    const item = liquidItems[Math.floor(Math.random() * liquidItems.length)];
    return { kind: 'liquid', item };
  }
  const item = solidItems[Math.floor(Math.random() * solidItems.length)];
  return { kind: 'solid', item };
}

function drawDayQueue(): SortableItem[] {
  return Array.from({ length: ITEMS_PER_DAY }, randomItem);
}

function emptyStreams(): GameState['streams'] {
  return Object.fromEntries(
    STREAMS.map((s) => [s, { collectedKg: 0, purity: 100, materialsKg: {} }])
  ) as GameState['streams'];
}

function emptyLiquidPaths(): GameState['liquidPaths'] {
  return Object.fromEntries(LIQUID_PATHS.map((p) => [p, { collectedL: 0, purity: 100 }])) as GameState['liquidPaths'];
}

export function createInitialState(): GameState {
  const week = 1;
  return {
    week,
    day: 1,
    itemsLeftToday: drawDayQueue(),
    todayItemCount: ITEMS_PER_DAY,
    streams: emptyStreams(),
    liquidPaths: emptyLiquidPaths(),
    totalWasteKgThisWeek: 0,
    market: getMarketStateForWeek(week),
    facilityDowntimeWeeks: 0,
    fireIncidents: [],
    weekHistory: [],
    lastFeedback: null,
    gameOverIncident: null,
  };
}

export interface SortResult {
  state: GameState;
  feedback: FeedbackEvent;
  weekResult?: WeekResult;
}

export function currentItem(state: GameState): SortableItem | null {
  return state.itemsLeftToday[0] ?? null;
}

export function sortCurrentItem(state: GameState, choice: Stream | LiquidPath): SortResult {
  const sortable = currentItem(state);
  if (!sortable) throw new Error('No item to sort');

  // Shallow-clone the pieces we mutate; this is a plain-data reducer, not a mutation in place.
  const next: GameState = {
    ...state,
    streams: {
      recycle: { ...state.streams.recycle, materialsKg: { ...state.streams.recycle.materialsKg } },
      compost: { ...state.streams.compost, materialsKg: { ...state.streams.compost.materialsKg } },
      trash: { ...state.streams.trash, materialsKg: { ...state.streams.trash.materialsKg } },
      hazardous: { ...state.streams.hazardous, materialsKg: { ...state.streams.hazardous.materialsKg } },
    },
    liquidPaths: { ...state.liquidPaths },
    fireIncidents: [...state.fireIncidents],
    weekHistory: [...state.weekHistory],
  };

  let feedback: FeedbackEvent;

  if (sortable.kind === 'solid') {
    const item = sortable.item;
    const chosen = choice as Stream;
    const weight = item.weightKg;
    next.totalWasteKgThisWeek += weight;

    if (chosen === 'recycle' || chosen === 'compost') {
      const batch = next.streams[chosen];
      batch.collectedKg += weight;
      batch.materialsKg[item.material] = (batch.materialsKg[item.material] ?? 0) + weight;
    }

    const contamRule = item.contamination.find((c) => c.intoStream === chosen);
    let purityDelta: FeedbackEvent['purityDelta'];
    if ((chosen === 'recycle' || chosen === 'compost') && (contamRule || chosen !== item.correctStream)) {
      const batch = next.streams[chosen];
      const before = batch.purity;
      // A curated rule sets the severity; otherwise any item that doesn't belong in this
      // stream at all still dilutes/contaminates it by a baseline amount (systemic, not per-item).
      const severity = contamRule ? contamRule.severity : 'minor';
      batch.purity = applyContaminationPenalty(before, severity);
      purityDelta = { stream: chosen, before, after: batch.purity };
    }

    let fireHappened = false;
    if (item.fireRisk && rollFireEvent(item.fireRisk, chosen)) {
      fireHappened = true;
      if (chosen === 'recycle' || chosen === 'compost') {
        next.streams[chosen].purity = 0;
      }
      next.facilityDowntimeWeeks += 2;
      const incident: FireIncident = {
        week: next.week,
        day: next.day,
        itemName: item.name,
        stream: chosen,
        headline: `Fire incident: ${item.name}`,
        body: `${item.name} ignited after being compacted with the rest of the ${chosen} load. That batch is destroyed, and the facility runs at reduced capacity for the next 2 weeks — this is why lithium batteries never belong in ordinary trash or recycling.`,
      };
      next.fireIncidents.push(incident);
    }

    const correct = chosen === item.correctStream;
    feedback = {
      correct: correct && !contamRule && !fireHappened,
      headline: fireHappened
        ? 'FIRE INCIDENT'
        : correct
          ? contamRule
            ? 'Right bin, but contaminated'
            : 'Correct'
          : 'Incorrect',
      detail: fireHappened
        ? `${item.name} ignited in the ${chosen} stream. ${item.explanation}`
        : item.explanation,
      purityDelta,
    };
  } else {
    const item = sortable.item;
    const chosen = choice as LiquidPath;
    const correct = chosen === item.correctPath;
    const volume = item.volumeL;

    if (chosen === 'recycling-dropoff' || chosen === 'hhw-collection') {
      const batch = next.liquidPaths[chosen];
      next.liquidPaths[chosen] = { ...batch, collectedL: batch.collectedL + volume };
      const contamRule = item.contamination.find((c) => c.intoStream === 'recycle');
      if (contamRule) {
        const before = next.liquidPaths[chosen].purity;
        next.liquidPaths[chosen] = {
          ...next.liquidPaths[chosen],
          purity: applyContaminationPenalty(before, contamRule.severity),
        };
      }
    }

    feedback = {
      correct,
      headline: correct ? (item.isValueRecoverable ? 'Correct — value recovered' : 'Correct') : 'Incorrect',
      detail: item.explanation,
      valueRecovered: correct && item.isValueRecoverable ? item.recoveredAs : undefined,
    };
  }

  next.lastFeedback = feedback;
  next.itemsLeftToday = next.itemsLeftToday.slice(1);

  let weekResult: WeekResult | undefined;

  if (next.itemsLeftToday.length === 0) {
    if (next.day < DAYS_PER_WEEK) {
      next.day += 1;
      next.itemsLeftToday = drawDayQueue();
    } else {
      weekResult = computeWeekResult(next);
      next.weekHistory.push(weekResult);
      return { state: startNewWeek(next), feedback, weekResult };
    }
  }

  return { state: next, feedback, weekResult };
}

function computeWeekResult(state: GameState): WeekResult {
  const reasons: string[] = [];
  const streamBreakdown = {} as WeekResult['streamBreakdown'];

  let totalCollected = 0;
  let totalReprocessed = 0;
  const facilityPenalty = state.facilityDowntimeWeeks > 0 ? 0.5 : 1;

  for (const stream of STREAMS) {
    const batch = state.streams[stream];
    totalCollected += batch.collectedKg;

    if (stream !== 'recycle' && stream !== 'compost') {
      streamBreakdown[stream] = { collectedKg: batch.collectedKg, reprocessedKg: 0, purity: batch.purity };
      continue;
    }

    const purityMult = purityMultiplier(batch.purity);
    let reprocessed = 0;
    const weakMarkets = new Set<string>();

    for (const [material, kg] of Object.entries(batch.materialsKg) as [MaterialMarket, number][]) {
      const marketMultiplier = state.market.demand[material];
      reprocessed += kg * purityMult * marketMultiplier * facilityPenalty;
      if (marketMultiplier < 0.5) weakMarkets.add(material);
    }

    totalReprocessed += reprocessed;
    streamBreakdown[stream] = { collectedKg: batch.collectedKg, reprocessedKg: reprocessed, purity: batch.purity };

    if (batch.collectedKg > 0) {
      if (batch.purity < 50) {
        reasons.push(`${stream}: purity fell to ${batch.purity.toFixed(0)}% — the whole batch was rejected and landfilled.`);
      } else if (batch.purity < 95) {
        reasons.push(`${stream}: purity was ${batch.purity.toFixed(0)}% — part of the batch was downgraded to landfill.`);
      }
      if (weakMarkets.size > 0) {
        reasons.push(`${stream}: weak buyer demand for ${[...weakMarkets].join(', ')} sent otherwise-clean material to landfill anyway.`);
      }
    }
  }

  if (state.fireIncidents.some((i) => i.week === state.week)) {
    reasons.push('A battery fire destroyed part of this week’s collected material and cut facility capacity.');
  }
  if (reasons.length === 0) {
    reasons.push('Clean sort, strong markets — this week reprocessed close to what was collected.');
  }

  const reportedRate = state.totalWasteKgThisWeek > 0 ? totalCollected / state.totalWasteKgThisWeek : 0;
  const trueRate = state.totalWasteKgThisWeek > 0 ? totalReprocessed / state.totalWasteKgThisWeek : 0;

  return { week: state.week, reportedRate, trueRate, reasons, streamBreakdown };
}

function startNewWeek(state: GameState): GameState {
  const week = state.week + 1;
  return {
    ...state,
    week,
    day: 1,
    itemsLeftToday: drawDayQueue(),
    streams: emptyStreams(),
    liquidPaths: emptyLiquidPaths(),
    totalWasteKgThisWeek: 0,
    market: getMarketStateForWeek(week),
    facilityDowntimeWeeks: Math.max(0, state.facilityDowntimeWeeks - 1),
  };
}
