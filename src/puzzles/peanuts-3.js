import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(8),         t3:  mk(16),        t4:  mk(34),
  t5:  mk(233),       t6:  mk(520),       t7:  mk(1092),      t8:  mk(1480),
  t9:  mk(4228),      t10: mk(8456),      t11: mk(55552),     t12: mk(126976),
  t13: mk(536672),    t14: mk(539648),    t15: mk(1015808),   t16: mk(1048576),
  t17: mk(1096226),   t18: mk(1121156),   t19: mk(2129920),   t20: mk(2130444),
  t21: mk(2164802),   t22: mk(2166916),   t23: mk(2232592),   t24: mk(3094560),
  t25: mk(3145728),   t26: mk(4071687),   t27: mk(4329604),   t28: mk(7144448),
  t29: mk(7356416),   t30: mk(8181760),   t31: mk(8618000),   t32: mk(8654980),
  t33: mk(8667664),   t34: mk(16777216),  t35: mk(16778316),  t36: mk(17047824),
  t37: mk(17268736),  t38: mk(17270876),  t39: mk(17315888),  t40: mk(17318151),
  t41: mk(21106754),  t42: mk(26087490),  t43: mk(29360162),  t44: mk(29488160),
  t45: mk(29494272),
};

export const PEANUTS_3_PUZZLE = {
  id: "pn03",
  title: "Lucy",
  subtitle: "8×8 · Easy",
  riddle: "I run a psychiatric booth for five cents.\nI'm bossy, loud, and always right — just ask me.\nWhat am I?",
  solution: [
    [T.t0,  T.t7,  T.t15, T.t11, T.t15, T.t13, T.t3,  T.t0 ],  // label 8
    [T.t0,  T.t33, T.t5,  T.t4,  T.t3,  T.t2,  T.t32, T.t0 ],  // label 7
    [T.t0,  T.t37, T.t36, T.t43, T.t31, T.t41, T.t21, T.t0 ],  // label 6
    [T.t1,  T.t18, T.t16, T.t45, T.t29, T.t16, T.t24, T.t3 ],  // label 5
    [T.t22, T.t27, T.t9,  T.t0,  T.t0,  T.t10, T.t8,  T.t42],  // label 4
    [T.t19, T.t28, T.t20, T.t14, T.t12, T.t35, T.t40, T.t23],  // label 3
    [T.t0,  T.t0,  T.t25, T.t38, T.t26, T.t34, T.t0,  T.t0 ],  // label 2
    [T.t0,  T.t1,  T.t17, T.t30, T.t44, T.t39, T.t6,  T.t0 ],  // label 1
  ],
};
