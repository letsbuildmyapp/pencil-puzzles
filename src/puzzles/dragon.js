import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(6789127), t2: mk(32782), t3: mk(17580032),
  t4: mk(1059), t5: mk(16777116), t6: mk(30375904), t7: mk(16408),
  t8: mk(7847167), t9: mk(33554431), t10: mk(26214399), t11: mk(30103959),
  t12: mk(1154543), t13: mk(33554396), t14: mk(33408000), t15: mk(33554380),
  t16: mk(28935168), t17: mk(26181615), t18: mk(25567), t19: mk(7439360),
  t20: mk(30306304), t21: mk(3178496), t22: mk(541196), t23: mk(26180572),
  t24: mk(6491233), t25: mk(528), t26: mk(16236028), t27: mk(30162944),
};

export const DRAGON_PUZZLE = {
  id: "a07", title: "Dragon", subtitle: "8×8 · Medium",
  riddle: "I have scales and breathe fire,\nI soar high above the clouds.\nKings and knights both fear my name.\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t1,  T.t2,  T.t3,  T.t0,  T.t0,  T.t0 ],
    [T.t0,  T.t4,  T.t5,  T.t6,  T.t7,  T.t0,  T.t0,  T.t0 ],
    [T.t0,  T.t8,  T.t9,  T.t10, T.t11, T.t0,  T.t0,  T.t0 ],
    [T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t0 ],
    [T.t19, T.t20, T.t0,  T.t21, T.t22, T.t19, T.t9,  T.t23],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t24, T.t25, T.t26, T.t27],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0 ],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0 ],
  ],
};
