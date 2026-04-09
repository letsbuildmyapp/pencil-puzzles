import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(24),        t2:  mk(34),        t3:  mk(1023),      t4:  mk(1058),
  t5:  mk(3104),      t6:  mk(16644),     t7:  mk(30760),     t8:  mk(33859),
  t9:  mk(47620),     t10: mk(90305),     t11: mk(157217),    t12: mk(786432),
  t13: mk(1081344),   t14: mk(1167620),   t15: mk(1311944),   t16: mk(1526940),
  t17: mk(2105392),   t18: mk(2129920),   t19: mk(2138244),   t20: mk(2164769),
  t21: mk(2165728),   t22: mk(2200320),   t23: mk(2506752),   t24: mk(3240961),
  t25: mk(4063233),   t26: mk(4195328),   t27: mk(4330464),   t28: mk(4466268),
  t29: mk(4589762),   t30: mk(5079040),   t31: mk(5398528),   t32: mk(6033985),
  t33: mk(7340559),   t34: mk(8521793),   t35: mk(8540820),   t36: mk(8659208),
  t37: mk(8660193),   t38: mk(8913125),   t39: mk(9183496),   t40: mk(17046535),
  t41: mk(17068128),  t42: mk(17309960),  t43: mk(17714704),  t44: mk(17957120),
  t45: mk(18356520),  t46: mk(19466308),  t47: mk(25336617),  t48: mk(29360128),
  t49: mk(29360152),  t50: mk(30588962),  t51: mk(31457311),  t52: mk(31544963),
};

export const PEANUTS_7_PUZZLE = {
  id: "pn07",
  title: "Sally",
  subtitle: "8×8 · Easy",
  riddle: "I'm Charlie Brown's little sister.\nI have a crush on Linus and call him my Sweet Babboo.\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t2,  T.t16, T.t47, T.t6,  T.t0,  T.t0 ],  // label 8
    [T.t0,  T.t43, T.t14, T.t24, T.t52, T.t28, T.t39, T.t0 ],  // label 7
    [T.t0,  T.t42, T.t19, T.t25, T.t49, T.t34, T.t36, T.t0 ],  // label 6
    [T.t4,  T.t45, T.t12, T.t26, T.t31, T.t13, T.t35, T.t0 ],  // label 5
    [T.t20, T.t37, T.t5,  T.t3,  T.t3,  T.t11, T.t46, T.t0 ],  // label 4
    [T.t0,  T.t40, T.t41, T.t33, T.t51, T.t22, T.t38, T.t1 ],  // label 3
    [T.t8,  T.t50, T.t7,  T.t21, T.t27, T.t9,  T.t32, T.t29],  // label 2
    [T.t18, T.t30, T.t10, T.t44, T.t17, T.t15, T.t23, T.t48],  // label 1
  ],
};
