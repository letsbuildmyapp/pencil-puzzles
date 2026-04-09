import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1092),
  t2: mk(8126464),
  t3: mk(29458432),
  t4: mk(24706),
  t5: mk(1),
  t6: mk(4465564),
  t7: mk(35),
  t8: mk(3180444),
  t9: mk(528),
  t10: mk(2306935),
  t11: mk(25166616),
  t12: mk(424908),
  t13: mk(7576807),
  t14: mk(32473087),
  t15: mk(17318416),
  t16: mk(24895080),
  t17: mk(17301504),
  t18: mk(7576815),
  t19: mk(33554431),
  t20: mk(26208024),
  t21: mk(16652),
  t22: mk(6390784),
  t23: mk(17351),
  t24: mk(124),
  t25: mk(16252911),
  t26: mk(30307224),
  t27: mk(2196513),
  t28: mk(790595),
  t29: mk(1057),
  t30: mk(25757793),
  t31: mk(3),
  t32: mk(16227448),
  t33: mk(33554368),
  t34: mk(25969048),
  t35: mk(18400854),
  t36: mk(1082368),
  t37: mk(1066465),
  t38: mk(29884416),
  t39: mk(4292608),
  t40: mk(10066052),
  t41: mk(1059),
  t42: mk(32391680),
  t43: mk(1081344),
  t44: mk(549344),
  t45: mk(62),
  t46: mk(4330464),
  t47: mk(126),
  t48: mk(3357440)
};

export const TOYS_2_PUZZLE = {
  id: "ty02",
  title: "Puppy Dog",
  subtitle: "8×8 · Medium",
  riddle: "I wag my tail and love to play,\nyour furry toy friend any day.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t0, T.t0],  // label 8
    [T.t5, T.t6, T.t0, T.t7, T.t8, T.t9, T.t0, T.t0],  // label 7
    [T.t10, T.t11, T.t12, T.t13, T.t14, T.t15, T.t0, T.t0],  // label 6
    [T.t16, T.t17, T.t0, T.t18, T.t19, T.t20, T.t21, T.t0],  // label 5
    [T.t22, T.t23, T.t24, T.t25, T.t19, T.t26, T.t27, T.t28],  // label 4
    [T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t0, T.t35],  // label 3
    [T.t36, T.t37, T.t38, T.t39, T.t40, T.t0, T.t41, T.t42],  // label 2
    [T.t0, T.t43, T.t44, T.t45, T.t46, T.t47, T.t48, T.t0]  // label 1
  ],
};
