import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(3),         t3:  mk(8),         t4:  mk(16),
  t5:  mk(528),       t6:  mk(898),       t7:  mk(1224),      t8:  mk(3456),
  t9:  mk(4178),      t10: mk(16771),     t11: mk(28736),     t12: mk(31744),
  t13: mk(31779),     t14: mk(34884),     t15: mk(95239),     t16: mk(127244),
  t17: mk(139778),    t18: mk(253952),    t19: mk(841728),    t20: mk(984962),
  t21: mk(1082368),   t22: mk(1082816),   t23: mk(1083528),   t24: mk(1142816),
  t25: mk(2097152),   t26: mk(3145728),   t27: mk(4464900),   t28: mk(4464912),
  t29: mk(5378416),   t30: mk(11094432),  t31: mk(16777216),  t32: mk(16809984),
  t33: mk(17043522),  t34: mk(17318416),  t35: mk(17326740),  t36: mk(21651984),
  t37: mk(25301057),  t38: mk(25395200),
};

export const PEANUTS_12_PUZZLE = {
  id: "pn12",
  title: "Charlie Brown 2",
  subtitle: "8×8 · Easy",
  riddle: "Good grief, it's me again!\nJust a round-headed kid with a zigzag shirt.\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t7,  T.t18, T.t20, T.t10, T.t0,  T.t0 ],  // label 8
    [T.t0,  T.t14, T.t32, T.t15, T.t24, T.t4,  T.t33, T.t0 ],  // label 7
    [T.t0,  T.t28, T.t1,  T.t17, T.t6,  T.t9,  T.t21, T.t5 ],  // label 6
    [T.t2,  T.t34, T.t21, T.t0,  T.t22, T.t25, T.t0,  T.t35],  // label 5
    [T.t27, T.t3,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t36],  // label 4
    [T.t26, T.t37, T.t0,  T.t8,  T.t12, T.t11, T.t23, T.t0 ],  // label 3
    [T.t0,  T.t0,  T.t38, T.t13, T.t12, T.t16, T.t31, T.t0 ],  // label 2
    [T.t0,  T.t0,  T.t0,  T.t29, T.t19, T.t30, T.t4,  T.t0 ],  // label 1
  ],
};
