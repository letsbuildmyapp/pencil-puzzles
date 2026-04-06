import { ELEPHANT_PUZZLE } from "./elephant";
import { COW_PUZZLE } from "./cow";
import { OWL_PUZZLE } from "./owl";
import { PIG_PUZZLE } from "./pig";
import { HIPPO_PUZZLE } from "./hippo";
import { BEAR_PUZZLE } from "./bear";
import { PENGUIN_PUZZLE } from "./penguin";
import { DRAGON_PUZZLE } from "./dragon";
import { RABBIT_PUZZLE } from "./rabbit";
import { PANDA_PUZZLE } from "./panda";
import { BUTTERFLY_PUZZLE } from "./butterfly";
import { HORSE_PUZZLE } from "./horse";

export const PUZZLE_LIST = [
  { puzzle: ELEPHANT_PUZZLE, free: true,  category: "Animals" },
  { puzzle: COW_PUZZLE,      free: true,  category: "Animals" },
  { puzzle: OWL_PUZZLE,      free: true,  category: "Animals" },
  { puzzle: PIG_PUZZLE,      free: true,  category: "Animals" },
  { puzzle: HIPPO_PUZZLE,    free: true,  category: "Animals" },
  { puzzle: BEAR_PUZZLE,     free: false, category: "Animals" },
  { puzzle: PENGUIN_PUZZLE,  free: false, category: "Animals" },
  { puzzle: DRAGON_PUZZLE,   free: false, category: "Animals" },
  { puzzle: RABBIT_PUZZLE,   free: false, category: "Animals" },
  { puzzle: PANDA_PUZZLE,    free: false, category: "Animals" },
  { puzzle: BUTTERFLY_PUZZLE,free: false, category: "Animals" },
  { puzzle: HORSE_PUZZLE,    free: false, category: "Animals" },
];
