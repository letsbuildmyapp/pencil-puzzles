import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1059),
  t2: mk(3666432),
  t3: mk(30379008),
  t4: mk(25356),
  t5: mk(3348678),
  t6: mk(12785862),
  t7: mk(6494406),
  t8: mk(6495430),
  t9: mk(17164),
  t10: mk(4329880),
  t11: mk(7542982),
  t12: mk(16777216),
  t13: mk(6495456),
  t14: mk(32738),
  t15: mk(32740),
  t16: mk(6519744),
  t17: mk(2164802),
  t18: mk(4329604),
  t19: mk(2164832),
  t20: mk(4330368),
};

export const POPSICLE_PUZZLE = {
  id: "fd13",
  title: "Popsicle",
  subtitle: "8×8 · Easy",
  riddle: "I'm frozen on a stick\nI come in every flavor and color\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t0],
    [T.t0, T.t0, T.t5, T.t0, T.t0, T.t6, T.t0, T.t0],
    [T.t0, T.t0, T.t7, T.t0, T.t0, T.t8, T.t9, T.t0],
    [T.t0, T.t0, T.t7, T.t0, T.t0, T.t7, T.t10, T.t0],
    [T.t0, T.t0, T.t7, T.t0, T.t0, T.t11, T.t12, T.t0],
    [T.t0, T.t0, T.t13, T.t14, T.t15, T.t16, T.t0, T.t0],
    [T.t0, T.t0, T.t0, T.t17, T.t18, T.t0, T.t0, T.t0],
    [T.t0, T.t0, T.t0, T.t19, T.t20, T.t0, T.t0, T.t0],
  ],
};
