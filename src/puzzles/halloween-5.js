import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1260),
  t2: mk(517120),
  t3: mk(33047014),
  t4: mk(29604352),
  t5: mk(919585),
  t6: mk(16),
  t7: mk(26107411),
  t8: mk(53120),
  t9: mk(25419776),
  t10: mk(1015811),
  t11: mk(792632),
  t12: mk(17572616),
  t13: mk(33),
  t14: mk(29904784),
  t15: mk(476414),
  t16: mk(32751),
  t17: mk(29392668),
  t18: mk(17391),
  t19: mk(8663196),
  t20: mk(1082401),
  t21: mk(1179647),
  t22: mk(26017752),
  t23: mk(33308672),
  t24: mk(32628960),
  t25: mk(33553436),
  t26: mk(25977100),
  t27: mk(1048576),
  t28: mk(32403984),
  t29: mk(1124),
  t30: mk(253952),
  t31: mk(801792),
  t32: mk(30752),
  t33: mk(4330392),
  t34: mk(26012036),
  t35: mk(33292288),
  t36: mk(32505859),
  t37: mk(17797392),
  t38: mk(1016835),
  t39: mk(25977616),
  t40: mk(1),
  t41: mk(7577587),
  t42: mk(1016848),
  t43: mk(29391872),
  t44: mk(63488),
  t45: mk(6065390),
  t46: mk(17301504),
  t47: mk(1566256),
  t48: mk(16547840),
  t49: mk(1065480),
  t50: mk(26181631),
  t51: mk(32736),
  t52: mk(262019),
  t53: mk(33470322),
  t54: mk(31777),
  t55: mk(29851367)
};

export const HALLOWEEN_5_PUZZLE = {
  id: "hw05",
  title: "Mummy",
  subtitle: "8×8 · Medium",
  riddle: "Wrapped in bandages from head to toe,\nI rise from the tomb with a shuffling slow.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t0],  // label 8
    [T.t0, T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t0],  // label 7
    [T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t0],  // label 6
    [T.t20, T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t0],  // label 5
    [T.t27, T.t28, T.t29, T.t30, T.t31, T.t32, T.t33, T.t0],  // label 4
    [T.t0, T.t34, T.t35, T.t36, T.t37, T.t38, T.t39, T.t0],  // label 3
    [T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t47],  // label 2
    [T.t48, T.t49, T.t50, T.t51, T.t52, T.t53, T.t54, T.t55]  // label 1
  ],
};
