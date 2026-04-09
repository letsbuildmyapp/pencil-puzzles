import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(16),        t3:  mk(31),        t4:  mk(35),
  t5:  mk(127),       t6:  mk(536),       t7:  mk(799),       t8:  mk(1116),
  t9:  mk(202755),    t10: mk(405528),    t11: mk(1082434),   t12: mk(1082471),
  t13: mk(1150052),   t14: mk(1310719),   t15: mk(2130977),   t16: mk(2236679),
  t17: mk(2252816),   t18: mk(3247207),   t19: mk(3247343),   t20: mk(4300144),
  t21: mk(4327456),   t22: mk(4334080),   t23: mk(5010241),   t24: mk(7572593),
  t25: mk(7847407),   t26: mk(7864281),   t27: mk(7864319),   t28: mk(8521820),
  t29: mk(8522753),   t30: mk(8929808),   t31: mk(15965283),  t32: mk(17309827),
  t33: mk(17318152),  t34: mk(17318684),  t35: mk(17588996),  t36: mk(17727487),
  t37: mk(25977628),  t38: mk(25977758),  t39: mk(30302993),  t40: mk(30374878),
  t41: mk(30375411),  t42: mk(30375935),  t43: mk(32404248),  t44: mk(33522688),
  t45: mk(33537251),  t46: mk(33538048),  t47: mk(33553304),  t48: mk(33554403),
  t49: mk(33554424),  t50: mk(33554431),
};

export const PENGUIN_PUZZLE = {
  id: "a06", title: "Penguin", subtitle: "8×8 · Hard",
  riddle: "I wear a tuxedo every day,\nI swim but cannot fly.\nI waddle on the ice with pride.\nWhat am I?",
  solution: [
    [T.t0,  T.t4,  T.t14, T.t50, T.t50, T.t36, T.t6,  T.t0 ],  // label 8
    [T.t1,  T.t27, T.t47, T.t44, T.t46, T.t45, T.t42, T.t2 ],  // label 7
    [T.t13, T.t48, T.t38, T.t9,  T.t10, T.t19, T.t49, T.t35],  // label 6
    [T.t30, T.t12, T.t50, T.t23, T.t20, T.t50, T.t34, T.t15],  // label 5
    [T.t33, T.t25, T.t43, T.t0,  T.t0,  T.t31, T.t40, T.t11],  // label 4
    [T.t21, T.t24, T.t37, T.t0,  T.t0,  T.t18, T.t39, T.t22],  // label 3
    [T.t0,  T.t29, T.t41, T.t7,  T.t5,  T.t26, T.t17, T.t0 ],  // label 2
    [T.t0,  T.t16, T.t3,  T.t8,  T.t32, T.t3,  T.t28, T.t0 ],  // label 1
  ],
};
