import { mk } from "../lib/tiles";

const T = {
  t0: mk(3208),
  t1: mk(1015808),
  t2: mk(919584),
  t3: mk(521),
  t4: mk(3555840),
  t5: mk(32505856),
  t6: mk(29458432),
  t7: mk(16912),
  t8: mk(8929800),
  t9: mk(0),
  t10: mk(9606210),
  t11: mk(46),
  t12: mk(17317888),
  t13: mk(8586240),
  t14: mk(31744),
  t15: mk(24769),
  t16: mk(1082415),
  t17: mk(1087),
  t18: mk(16252952),
  t19: mk(16777216),
  t20: mk(1118481),
  t21: mk(16777482),
  t22: mk(6324224),
  t23: mk(16650),
  t24: mk(1057),
  t25: mk(17399808),
  t26: mk(24495665),
  t27: mk(549790),
  t28: mk(36351),
  t29: mk(30177544),
  t30: mk(1082401),
  t31: mk(18366984),
  t32: mk(31364265),
  t33: mk(32970752),
  t34: mk(8659220),
  t35: mk(1088808),
  t36: mk(541470),
  t37: mk(7340032),
  t38: mk(32816259),
  t39: mk(17293824),
  t40: mk(18942018),
  t41: mk(15025),
  t42: mk(8934880),
  t43: mk(18096640),
  t44: mk(17236993),
  t45: mk(32420),
  t46: mk(31792),
  t47: mk(5235680),
  t48: mk(18394048)
};

export const GUMBALL_5_PUZZLE = {
  id: "gb05",
  title: "Gumball 5",
  subtitle: "8×8 · Medium",
  riddle: "I live on Elmore's most chaotic street,\na cartoon cat you're destined to meet.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t8, T.t9, T.t9, T.t10, T.t9, T.t9, T.t11, T.t12],  // label 7
    [T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t9],  // label 6
    [T.t9, T.t9, T.t20, T.t21, T.t9, T.t22, T.t23, T.t9],  // label 5
    [T.t9, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29, T.t9],  // label 4
    [T.t9, T.t30, T.t9, T.t31, T.t32, T.t33, T.t34, T.t9],  // label 3
    [T.t9, T.t35, T.t36, T.t37, T.t38, T.t39, T.t40, T.t41],  // label 2
    [T.t9, T.t42, T.t43, T.t44, T.t45, T.t46, T.t47, T.t48]  // label 1
  ],
};
