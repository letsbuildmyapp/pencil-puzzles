import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(34952),
  t2: mk(16252928),
  t3: mk(31490048),
  t4: mk(532610),
  t5: mk(8929808),
  t6: mk(7619088),
  t7: mk(29426721),
  t8: mk(2130977),
  t9: mk(17318416),
  t10: mk(33047056),
  t11: mk(32505856),
  t12: mk(32539681),
  t13: mk(17318408),
  t14: mk(17318151),
  t15: mk(17318431),
  t16: mk(1082431),
  t17: mk(1082401),
  t18: mk(1082460),
  t19: mk(1082402),
  t20: mk(8521760),
  t21: mk(527),
  t22: mk(31),
  t23: mk(62),
  t24: mk(2236928)
};

export const PUZZLES_2_PUZZLE = {
  id: "pz02",
  title: "Infinite Loop",
  subtitle: "8×8 · Medium",
  riddle: "I twist and turn and never end,\na circle of loops that loves to bend.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t0],  // label 8
    [T.t0, T.t0, T.t5, T.t6, T.t7, T.t8, T.t0, T.t0],  // label 7
    [T.t1, T.t2, T.t9, T.t10, T.t11, T.t11, T.t3, T.t4],  // label 6
    [T.t5, T.t6, T.t9, T.t10, T.t12, T.t12, T.t7, T.t8],  // label 5
    [T.t13, T.t14, T.t15, T.t15, T.t16, T.t17, T.t18, T.t19],  // label 4
    [T.t20, T.t21, T.t22, T.t22, T.t16, T.t17, T.t23, T.t24],  // label 3
    [T.t0, T.t0, T.t13, T.t14, T.t18, T.t19, T.t0, T.t0],  // label 2
    [T.t0, T.t0, T.t20, T.t21, T.t23, T.t24, T.t0, T.t0]  // label 1
  ],
};
