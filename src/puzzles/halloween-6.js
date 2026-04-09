import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(33825),
  t2: mk(8727390),
  t3: mk(528),
  t4: mk(32488943),
  t5: mk(26148863),
  t6: mk(20840447),
  t7: mk(25977624),
  t8: mk(2123),
  t9: mk(22730751),
  t10: mk(270682),
  t11: mk(16236542),
  t12: mk(33485199),
  t13: mk(33279615),
  t14: mk(17354359),
  t15: mk(33554431),
  t16: mk(542525),
  t17: mk(32472028),
  t18: mk(7572577),
  t19: mk(33410303),
  t20: mk(7577071),
  t21: mk(30307096),
  t22: mk(1048576),
  t23: mk(33503684),
  t24: mk(16236014),
  t25: mk(33520540),
  t26: mk(33013223),
  t27: mk(25707008),
  t28: mk(1),
  t29: mk(15660985),
  t30: mk(25977360),
  t31: mk(7576807),
  t32: mk(24877516),
  t33: mk(1084654),
  t34: mk(26788899),
  t35: mk(17301504),
  t36: mk(6762904),
  t37: mk(12870160)
};

export const HALLOWEEN_6_PUZZLE = {
  id: "hw06",
  title: "Black Cat",
  subtitle: "8×8 · Easy",
  riddle: "I arch my back and hiss at night,\ncrossing your path gives many a fright.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t1, T.t2],  // label 8
    [T.t3, T.t1, T.t3, T.t0, T.t0, T.t0, T.t0, T.t4],  // label 7
    [T.t5, T.t6, T.t7, T.t8, T.t9, T.t10, T.t0, T.t11],  // label 6
    [T.t12, T.t13, T.t14, T.t15, T.t15, T.t15, T.t16, T.t17],  // label 5
    [T.t18, T.t19, T.t20, T.t15, T.t15, T.t15, T.t15, T.t21],  // label 4
    [T.t22, T.t23, T.t24, T.t25, T.t0, T.t26, T.t15, T.t27],  // label 3
    [T.t0, T.t28, T.t29, T.t30, T.t0, T.t31, T.t32, T.t0],  // label 2
    [T.t0, T.t33, T.t34, T.t35, T.t0, T.t36, T.t37, T.t0]  // label 1
  ],
};
