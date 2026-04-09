import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(16),        t2:  mk(108),       t3:  mk(512),       t4:  mk(1058),
  t5:  mk(1092),      t6:  mk(1122),      t7:  mk(3237),      t8:  mk(16912),
  t9:  mk(24576),     t10: mk(24578),     t11: mk(28768),     t12: mk(34948),
  t13: mk(126979),    t14: mk(532612),    t15: mk(540932),    t16: mk(791616),
  t17: mk(1015808),   t18: mk(1015833),   t19: mk(1016895),   t20: mk(1020047),
  t21: mk(1048576),   t22: mk(1083392),   t23: mk(2130977),   t24: mk(3145752),
  t25: mk(4328448),   t26: mk(4330240),   t27: mk(4334080),   t28: mk(4464864),
  t29: mk(5376032),   t30: mk(6291611),   t31: mk(7340032),   t32: mk(8521760),
  t33: mk(8523842),   t34: mk(8659472),   t35: mk(9180224),   t36: mk(16777216),
  t37: mk(17301504),  t38: mk(17309956),  t39: mk(25165827),  t40: mk(25166932),
  t41: mk(29360144),
};

export const PEANUTS_1_PUZZLE = {
  id: "pn01",
  title: "Charlie Brown",
  subtitle: "8×8 · Easy",
  riddle: "Good grief! I can never kick that football.\nI always hope, but nothing ever goes right for me.\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t2,  T.t13, T.t18, T.t11, T.t1,  T.t0 ],  // label 8
    [T.t0,  T.t12, T.t36, T.t28, T.t30, T.t3,  T.t33, T.t0 ],  // label 7
    [T.t0,  T.t34, T.t21, T.t40, T.t10, T.t0,  T.t23, T.t0 ],  // label 6
    [T.t7,  T.t37, T.t0,  T.t25, T.t9,  T.t0,  T.t22, T.t14],  // label 5
    [T.t29, T.t8,  T.t15, T.t0,  T.t0,  T.t5,  T.t6,  T.t26],  // label 4
    [T.t0,  T.t32, T.t24, T.t17, T.t17, T.t39, T.t27, T.t0 ],  // label 3
    [T.t0,  T.t0,  T.t31, T.t20, T.t19, T.t41, T.t0,  T.t0 ],  // label 2
    [T.t0,  T.t0,  T.t4,  T.t35, T.t16, T.t38, T.t0,  T.t0 ],  // label 1
  ],
};
