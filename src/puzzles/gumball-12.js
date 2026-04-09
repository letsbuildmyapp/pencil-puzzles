import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(32801),
  t2: mk(3555336),
  t3: mk(17268740),
  t4: mk(16708),
  t5: mk(5311554),
  t6: mk(4325376),
  t7: mk(4464640),
  t8: mk(11077698),
  t9: mk(2164802),
  t10: mk(2097152),
  t11: mk(2166949),
  t12: mk(2573314),
  t13: mk(8720),
  t14: mk(89362),
  t15: mk(2147625),
  t16: mk(5412137),
  t17: mk(4194304),
  t18: mk(8659216),
  t19: mk(1024),
  t20: mk(18358536),
  t21: mk(9741609),
  t22: mk(9928704),
  t23: mk(34),
  t24: mk(17317888),
  t25: mk(8523841),
  t26: mk(7340063),
  t27: mk(1032720),
  t28: mk(4980736),
  t29: mk(7),
  t30: mk(17449716),
  t31: mk(1345321),
  t32: mk(28),
  t33: mk(8929280),
  t34: mk(20464098),
  t35: mk(17860552),
  t36: mk(2129920)
};

export const GUMBALL_12_PUZZLE = {
  id: "gb12",
  title: "Gumball 12",
  subtitle: "8×8 · Hard",
  riddle: "My wacky world is full of surprise,\nElmore's funniest kid before your eyes.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t0],  // label 8
    [T.t0, T.t0, T.t5, T.t6, T.t7, T.t8, T.t0, T.t0],  // label 7
    [T.t0, T.t0, T.t9, T.t0, T.t10, T.t11, T.t12, T.t13],  // label 6
    [T.t0, T.t14, T.t15, T.t0, T.t0, T.t16, T.t17, T.t18],  // label 5
    [T.t19, T.t20, T.t21, T.t0, T.t0, T.t22, T.t23, T.t24],  // label 4
    [T.t0, T.t25, T.t26, T.t0, T.t0, T.t27, T.t28, T.t0],  // label 3
    [T.t0, T.t0, T.t29, T.t30, T.t31, T.t32, T.t0, T.t0],  // label 2
    [T.t0, T.t0, T.t33, T.t34, T.t35, T.t36, T.t0, T.t0]  // label 1
  ],
};
