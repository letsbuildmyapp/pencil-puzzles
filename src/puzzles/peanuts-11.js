import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(16),        t3:  mk(31),        t4:  mk(34),
  t5:  mk(48),        t6:  mk(62),        t7:  mk(496),       t8:  mk(520),
  t9:  mk(961),       t10: mk(2212),      t11: mk(14880),     t12: mk(16647),
  t13: mk(16673),     t14: mk(30786),     t15: mk(31744),     t16: mk(31880),
  t17: mk(32033),     t18: mk(32293),     t19: mk(126976),    t20: mk(137520),
  t21: mk(206050),    t22: mk(412552),    t23: mk(920576),    t24: mk(1082434),
  t25: mk(1151240),   t26: mk(2097152),   t27: mk(2130976),   t28: mk(2163746),
  t29: mk(2175584),   t30: mk(2252800),   t31: mk(3145728),   t32: mk(4260864),
  t33: mk(4292608),   t34: mk(4465168),   t35: mk(4980736),   t36: mk(8519680),
  t37: mk(8521809),   t38: mk(8522752),   t39: mk(8620130),   t40: mk(8659208),
  t41: mk(8667136),   t42: mk(8912912),   t43: mk(17318408),  t44: mk(18400348),
  t45: mk(33094811),
};

export const PEANUTS_11_PUZZLE = {
  id: "pn11",
  title: "Lucy Mad",
  subtitle: "8×8 · Easy",
  riddle: "BLOCKHEAD! You're impossible!\nI'm pulling the football away — again.\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t4,  T.t19, T.t23, T.t8,  T.t0,  T.t0 ],  // label 8
    [T.t0,  T.t0,  T.t34, T.t0,  T.t0,  T.t32, T.t11, T.t2 ],  // label 7
    [T.t0,  T.t24, T.t10, T.t6,  T.t12, T.t20, T.t2,  T.t40],  // label 6
    [T.t1,  T.t29, T.t41, T.t16, T.t18, T.t17, T.t39, T.t42],  // label 5
    [T.t25, T.t14, T.t0,  T.t36, T.t31, T.t26, T.t27, T.t37],  // label 4
    [T.t43, T.t28, T.t5,  T.t15, T.t15, T.t15, T.t13, T.t44],  // label 3
    [T.t33, T.t35, T.t38, T.t9,  T.t3,  T.t7,  T.t30, T.t0 ],  // label 2
    [T.t0,  T.t0,  T.t0,  T.t21, T.t45, T.t22, T.t0,  T.t0 ],  // label 1
  ],
};
