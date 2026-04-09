import { mk } from "../lib/tiles";

const T = {
  t0: mk(35),
  t1: mk(113424),
  t2: mk(6552),
  t3: mk(9017),
  t4: mk(4290),
  t5: mk(124174),
  t6: mk(24966),
  t7: mk(0),
  t8: mk(2097152),
  t9: mk(1081344),
  t10: mk(17859584),
  t11: mk(18350080),
  t12: mk(20504832),
  t13: mk(3720192),
  t14: mk(2113548),
  t15: mk(99),
  t16: mk(101472),
  t17: mk(541184),
  t18: mk(33824),
  t19: mk(811776),
  t20: mk(12988847),
  t21: mk(796),
  t22: mk(3247203),
  t23: mk(2236680),
  t24: mk(17043588),
  t25: mk(8491008),
  t26: mk(6891586),
  t27: mk(239),
  t28: mk(12814111),
  t29: mk(64543),
  t30: mk(13369599),
  t31: mk(926),
  t32: mk(13088140),
  t33: mk(7233536),
  t34: mk(15154671),
  t35: mk(1085439),
  t36: mk(32473087),
  t37: mk(32472028),
  t38: mk(12988812),
  t39: mk(7438352),
  t40: mk(33537024),
  t41: mk(33553408),
  t42: mk(33550336),
  t43: mk(25690112),
  t44: mk(12988828),
  t45: mk(3179553),
  t46: mk(33538576),
  t47: mk(17824768),
  t48: mk(1047552),
  t49: mk(2096128),
  t50: mk(33521664),
  t51: mk(30306700)
};

export const WIMPY_KID_2_PUZZLE = {
  id: "dw02",
  title: "Rowley",
  subtitle: "8×8 · Easy",
  riddle: "Greg's loyal best friend, cheerful and round,\nthe happiest sidekick to ever be found.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t14, T.t7],  // label 7
    [T.t15, T.t16, T.t17, T.t7, T.t18, T.t19, T.t20, T.t21],  // label 6
    [T.t22, T.t7, T.t23, T.t7, T.t24, T.t7, T.t25, T.t26],  // label 5
    [T.t22, T.t27, T.t28, T.t29, T.t30, T.t31, T.t32, T.t33],  // label 4
    [T.t22, T.t34, T.t35, T.t36, T.t35, T.t37, T.t38, T.t7],  // label 3
    [T.t22, T.t39, T.t40, T.t41, T.t42, T.t43, T.t44, T.t7],  // label 2
    [T.t45, T.t46, T.t47, T.t48, T.t49, T.t50, T.t51, T.t7]  // label 1
  ],
};
