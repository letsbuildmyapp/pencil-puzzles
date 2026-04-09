import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(3),         t2:  mk(16),        t3:  mk(24),
  t4:  mk(34),        t5:  mk(161),        t6:  mk(772),       t7:  mk(1000),
  t8:  mk(1240),      t9:  mk(14896),      t10: mk(28704),     t11: mk(47636),
  t12: mk(540936),    t13: mk(787456),     t14: mk(792608),    t15: mk(917534),
  t16: mk(1015808),   t17: mk(1269891),    t18: mk(1576960),   t19: mk(1816229),
  t20: mk(2031647),   t21: mk(2130695),    t22: mk(2130976),   t23: mk(2162816),
  t24: mk(2163780),   t25: mk(2164769),    t26: mk(2164812),   t27: mk(2232456),
  t28: mk(2704945),   t29: mk(3146255),    t30: mk(4329538),   t31: mk(4329736),
  t32: mk(4361250),   t33: mk(4933700),    t34: mk(5378114),   t35: mk(5410882),
  t36: mk(5521424),   t37: mk(5689964),    t38: mk(8521801),   t39: mk(8809474),
  t40: mk(8929280),   t41: mk(9441282),    t42: mk(9750098),   t43: mk(13246736),
  t44: mk(13943910),  t45: mk(16777216),   t46: mk(17047684),  t47: mk(17172513),
  t48: mk(18400555),  t49: mk(18944133),   t50: mk(19474761),  t51: mk(25927940),
  t52: mk(31526072),  t53: mk(32505884),
};

export const PEANUTS_14_PUZZLE = {
  id: "pn14",
  title: "Peppermint Patty",
  subtitle: "8×8 · Easy",
  riddle: "I wear sandals, speak my mind, and call my teacher 'sir'.\\nI'm brash and bold but loyal to the end.\\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t4,  T.t17, T.t53, T.t14, T.t2,  T.t0 ],  // label 8
    [T.t1,  T.t3,  T.t24, T.t9,  T.t29, T.t15, T.t38, T.t0 ],  // label 7
    [T.t37, T.t33, T.t42, T.t5,  T.t10, T.t25, T.t34, T.t12],  // label 6
    [T.t47, T.t32, T.t49, T.t18, T.t13, T.t41, T.t28, T.t30],  // label 5
    [T.t0,  T.t50, T.t31, T.t51, T.t16, T.t43, T.t48, T.t27],  // label 4
    [T.t0,  T.t35, T.t39, T.t21, T.t20, T.t8,  T.t44, T.t40],  // label 3
    [T.t0,  T.t22, T.t36, T.t19, T.t52, T.t7,  T.t6,  T.t0 ],  // label 2
    [T.t0,  T.t0,  T.t46, T.t23, T.t11, T.t45, T.t26, T.t0 ],  // label 1
  ],
};
