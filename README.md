# Waste World

An educational browser simulation about how genuinely difficult correct recycling is. Most players (and most people generally) believe they recycle well and are wrong — every mechanic here is built to surface a specific, real way that belief breaks down.

No backend. All state is in-memory and resets on page reload.

## Core teaching goals

1. The chasing-arrows symbol does not mean recyclable. Resin codes #1/#2 are commonly accepted; #3–#7 usually are not, and acceptance varies by municipality.
2. Contamination is systemic, not per-item — one wrong item (grease, liquid residue, a plastic bag) degrades or voids an entire batch's purity, not just its own fate.
3. Lithium-ion batteries are a probabilistic fire hazard when mis-sorted into a compacting stream (trash/recycling), not just "wrong bin."
4. Collection ≠ recycling. Material needs a downstream buyer with market demand; a scripted market shock (modeled loosely on the real 2018 shift in Chinese import policy) strands correctly-sorted material into landfill anyway.
5. The publicly reported "recycling rate" (naive collected weight) visibly diverges from the true reprocessing rate, revealed at the end of each week. That gap is the point.

## Stack, and why it's not React + Vite

This was originally scoped as React + Vite. The sandbox this was built in has no outbound network access to `registry.npmjs.org` or any JS CDN, so neither could be installed. Rather than block on that, this is plain TypeScript compiled straight to native browser ES modules — zero bundler, zero runtime dependencies. It is fully portable to React/Vite later if desired; the engine (`src/engine`, `src/data`) has no DOM/UI coupling and could be dropped into a component framework directly.

## Running it

```bash
npm install     # only needed for local `tsc`/`serve`, no runtime deps
npm run build   # compiles src/ -> dist/
npm start       # serves the project on http://localhost:5173
```

Or, without npm at all, as long as `tsc` and any static file server are on your PATH:

```bash
tsc
serve .   # or: python3 -m http.server, npx http-server, etc.
```

Open the served `index.html`.

## Project layout

- `src/types.ts` — shared data model (no runtime dependencies).
- `src/data/` — the item database (~270 real household items across solids and liquids) and market-demand data.
- `src/engine/` — pure functions: contamination/purity math, fire-event rolls, the turn/week state machine. No DOM.
- `src/ui/` — vanilla-DOM rendering for each screen.
- `src/main.ts` — wires engine state to the UI and handles the turn loop.

## Fact-checking status

Every item and market claim carries a `citationVerified` flag. Many are `false` — these are plausible, commonly-cited claims (sewer-blockage mechanics, specific fire-risk probabilities, exact municipal acceptance rules, biodiesel conversion economics) that read as accurate but have **not** been checked against a primary source. Search `citationVerified: false` before treating any specific claim as publication-ready; the general shape of each lesson (arrows ≠ recyclable, FOG clogs sewers, lithium batteries cause MRF fires, National-Sword-style market shocks strand material) is well-established, but specific numbers throughout are illustrative for gameplay pacing, not audited statistics.

## V1 scope

Household-scale only. City/region scaling, multiplayer, truck routing/logistics, and a budget/economy layer are explicitly out of scope for this version.
