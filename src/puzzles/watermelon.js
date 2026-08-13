import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1082401),
  t2: mk(33542810),
  t3: mk(33521664),
  t4: mk(33521680),
  t5: mk(33523781),
  t6: mk(25977624),
  t7: mk(28145126),
  t8: mk(71256),
  t9: mk(1048576),
  t10: mk(8912896),
  t11: mk(141441),
  t12: mk(5418998),
  t13: mk(17317888),
  t14: mk(7439360),
  t15: mk(13367239),
  t16: mk(9068793),
  t17: mk(1116105),
  t18: mk(3894526),
  t19: mk(15622656),
  t20: mk(3145728),
  t21: mk(32997376),
  t22: mk(29360128),
};

export const WATERMELON_PUZZLE = {
  id: "fd09",
  title: "Watermelon",
  subtitle: "8×8 · Easy",
  riddle: "I'm green on the outside, red inside\nI'm full of seeds and summer vibes\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0],
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0],
    [T.t1, T.t2, T.t3, T.t3, T.t4, T.t3, T.t5, T.t6],
    [T.t0, T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t13],
    [T.t0, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t0],
    [T.t0, T.t0, T.t20, T.t21, T.t3, T.t22, T.t0, T.t0],
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0],
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0],
  ],
};
