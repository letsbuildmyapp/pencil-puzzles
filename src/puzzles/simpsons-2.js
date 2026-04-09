import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(3),         t2:  mk(136),       t3:  mk(512),
  t4:  mk(1024),      t5:  mk(1092),       t6:  mk(4096),      t7:  mk(16384),
  t8:  mk(16660),     t9:  mk(17875),      t10: mk(34816),     t11: mk(34984),
  t12: mk(1048576),   t13: mk(1081344),    t14: mk(2129953),   t15: mk(2163778),
  t16: mk(4261921),   t17: mk(4329608),    t18: mk(4472832),   t19: mk(4477576),
  t20: mk(8521794),   t21: mk(8660239),    t22: mk(8808852),   t23: mk(8921220),
  t24: mk(9150960),   t25: mk(9775429),    t26: mk(12582912),  t27: mk(13124036),
  t28: mk(13313729),  t29: mk(16784384),   t30: mk(16793864),  t31: mk(17268752),
  t32: mk(17285236),  t33: mk(17309832),   t34: mk(22417540),  t35: mk(25165824),
  t36: mk(25823302),  t37: mk(32505856),   t38: mk(32575752),
};

export const SIMPSONS_2_PUZZLE = {
  id: "sm02",
  title: "Marge",
  subtitle: "8×8 · Easy",
  riddle: "My tall blue beehive hairdo towers over Springfield.\\nI'm the patient, loving heart of my family.\\nWhat am I?",
  solution: [
    [T.t0,  T.t15, T.t1,  T.t0,  T.t0,  T.t10, T.t30, T.t0 ],  // label 8
    [T.t0,  T.t14, T.t7,  T.t0,  T.t0,  T.t4,  T.t23, T.t0 ],  // label 7
    [T.t0,  T.t13, T.t8,  T.t11, T.t24, T.t32, T.t19, T.t0 ],  // label 6
    [T.t0,  T.t0,  T.t33, T.t25, T.t6,  T.t21, T.t17, T.t0 ],  // label 5
    [T.t0,  T.t0,  T.t20, T.t27, T.t31, T.t29, T.t36, T.t0 ],  // label 4
    [T.t0,  T.t0,  T.t12, T.t34, T.t37, T.t38, T.t35, T.t0 ],  // label 3
    [T.t0,  T.t0,  T.t1,  T.t28, T.t9,  T.t22, T.t0,  T.t0 ],  // label 2
    [T.t0,  T.t5,  T.t18, T.t2,  T.t26, T.t16, T.t0,  T.t0 ],  // label 1
  ],
};
