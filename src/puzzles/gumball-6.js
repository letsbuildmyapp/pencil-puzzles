import { mk } from "../lib/tiles";

const T = {
  t0: mk(2697600),
  t1: mk(17389225),
  t2: mk(0),
  t3: mk(31),
  t4: mk(34),
  t5: mk(16),
  t6: mk(17238081),
  t7: mk(3031334),
  t8: mk(3560696),
  t9: mk(520),
  t10: mk(29458434),
  t11: mk(17701),
  t12: mk(2697548),
  t13: mk(17320629),
  t14: mk(17047824),
  t15: mk(16760295),
  t16: mk(4904753),
  t17: mk(31519710),
  t18: mk(22170480),
  t19: mk(17176354),
  t20: mk(26308642),
  t21: mk(31778),
  t22: mk(17301504),
  t23: mk(33891),
  t24: mk(1841983),
  t25: mk(33488896),
  t26: mk(100419),
  t27: mk(29363600),
  t28: mk(13513116),
  t29: mk(31527045),
  t30: mk(7576803),
  t31: mk(32404240),
  t32: mk(2233544),
  t33: mk(3555328),
  t34: mk(3145728),
  t35: mk(5379138),
  t36: mk(270356),
  t37: mk(33),
  t38: mk(8929314),
  t39: mk(28738),
  t40: mk(14),
  t41: mk(1048609),
  t42: mk(11201439),
  t43: mk(16384),
  t44: mk(3),
  t45: mk(2236928),
  t46: mk(2132100),
  t47: mk(1130505),
  t48: mk(17859630),
  t49: mk(2166921),
  t50: mk(12863010),
  t51: mk(33493128),
  t52: mk(29360128),
  t53: mk(4292608),
  t54: mk(17047815),
  t55: mk(17048064)
};

export const GUMBALL_6_PUZZLE = {
  id: "gb06",
  title: "Gumball 6",
  subtitle: "8×8 · Hard",
  riddle: "The Amazing World is where I roam,\nElmore Junior High is my second home.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t2, T.t2, T.t4, T.t5],  // label 8
    [T.t6, T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t13],  // label 7
    [T.t2, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20],  // label 6
    [T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28],  // label 5
    [T.t29, T.t2, T.t30, T.t31, T.t2, T.t32, T.t33, T.t34],  // label 4
    [T.t35, T.t36, T.t2, T.t2, T.t37, T.t38, T.t39, T.t40],  // label 3
    [T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t47, T.t48],  // label 2
    [T.t49, T.t50, T.t51, T.t52, T.t2, T.t53, T.t54, T.t55]  // label 1
  ],
};
