import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(16),        t2:  mk(64),        t3:  mk(100),
  t4:  mk(232),       t5:  mk(774),        t6:  mk(16648),     t7:  mk(16771),
  t8:  mk(31744),     t9:  mk(42677),      t10: mk(63556),     t11: mk(63652),
  t12: mk(73360),     t13: mk(925961),     t14: mk(1048576),   t15: mk(1082401),
  t16: mk(1082864),   t17: mk(1083458),    t18: mk(1086793),   t19: mk(1142815),
  t20: mk(2164801),   t21: mk(2742580),    t22: mk(3014656),   t23: mk(4327490),
  t24: mk(6570496),   t25: mk(8388641),    t26: mk(8523906),   t27: mk(8523908),
  t28: mk(8586256),   t29: mk(8912920),    t30: mk(8929800),   t31: mk(9749008),
  t32: mk(9750032),   t33: mk(16252928),   t34: mk(16777280),  t35: mk(17046529),
  t36: mk(21524488),  t37: mk(29458432),   t38: mk(32505887),
};

export const SIMPSONS_1_PUZZLE = {
  id: "sm01",
  title: "Homer",
  subtitle: "8×8 · Easy",
  riddle: "D'oh! I work at the nuclear plant and love donuts.\\nFather of three, husband of Marge.\\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t21, T.t33, T.t37, T.t6,  T.t0,  T.t0 ],  // label 8
    [T.t0,  T.t17, T.t0,  T.t0,  T.t0,  T.t23, T.t0,  T.t0 ],  // label 7
    [T.t0,  T.t20, T.t0,  T.t4,  T.t5,  T.t16, T.t1,  T.t0 ],  // label 6
    [T.t0,  T.t18, T.t9,  T.t34, T.t15, T.t2,  T.t27, T.t0 ],  // label 5
    [T.t0,  T.t25, T.t36, T.t35, T.t19, T.t38, T.t30, T.t0 ],  // label 4
    [T.t0,  T.t14, T.t13, T.t24, T.t0,  T.t0,  T.t26, T.t0 ],  // label 3
    [T.t0,  T.t3,  T.t32, T.t12, T.t8,  T.t10, T.t22, T.t0 ],  // label 2
    [T.t0,  T.t31, T.t7,  T.t28, T.t11, T.t29, T.t0,  T.t0 ],  // label 1
  ],
};
