import { plasticItems } from './items/plastics.js';
import { paperCardboardItems } from './items/paperCardboard.js';
import { metalItems } from './items/metal.js';
import { glassItems } from './items/glass.js';
import { organicItems } from './items/organic.js';
import { batteryEwasteItems } from './items/batteryEwaste.js';
import { textileItems } from './items/textile.js';
import { hazardousSolidItems } from './items/hazardousSolid.js';
import { miscItems } from './items/misc.js';
import { additionalItems } from './items/additional.js';
import type { WasteItem } from '../types.js';

export const solidItems: WasteItem[] = [
  ...plasticItems,
  ...paperCardboardItems,
  ...metalItems,
  ...glassItems,
  ...organicItems,
  ...batteryEwasteItems,
  ...textileItems,
  ...hazardousSolidItems,
  ...miscItems,
  ...additionalItems,
];
