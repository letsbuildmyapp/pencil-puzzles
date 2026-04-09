import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(7),
  t2: mk(35039),
  t3: mk(13173823),
  t4: mk(1092),
  t5: mk(8916366),
  t6: mk(32567361),
  t7: mk(17301504),
  t8: mk(25365729),
  t9: mk(20372),
  t10: mk(28737),
  t11: mk(1),
  t12: mk(4465971),
  t13: mk(33554398),
  t14: mk(1082434),
  t15: mk(3548127),
  t16: mk(29426720),
  t17: mk(18907152),
  t18: mk(1099306),
  t19: mk(2236946),
  t20: mk(3247136),
  t21: mk(30302983),
  t22: mk(5418867),
  t23: mk(33520540),
  t24: mk(10957196),
  t25: mk(21774634),
  t26: mk(50176),
  t27: mk(33094192),
  t28: mk(20748172),
  t29: mk(25953248),
  t30: mk(4334080),
  t31: mk(8659216),
  t32: mk(4260864),
  t33: mk(775),
  t34: mk(17563072),
  t35: mk(8912896),
  t36: mk(16945),
  t37: mk(4228),
  t38: mk(33858),
  t39: mk(16777216),
  t40: mk(34948),
  t41: mk(897684),
  t42: mk(30386242),
  t43: mk(6612265),
  t44: mk(9756896),
  t45: mk(4280192),
  t46: mk(4980736),
  t47: mk(4328448),
  t48: mk(10609794),
  t49: mk(1968680),
  t50: mk(10265649)
};

export const GUMBALL_1_PUZZLE = {
  id: "gb01",
  title: "Gumball 1",
  subtitle: "8×8 · Medium",
  riddle: "I'm a blue cat with a knack for trouble,\nmy adventures always burst the bubble.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t0, T.t0, T.t0],  // label 8
    [T.t0, T.t4, T.t5, T.t6, T.t7, T.t8, T.t9, T.t10],  // label 7
    [T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t18],  // label 6
    [T.t19, T.t20, T.t21, T.t22, T.t23, T.t14, T.t0, T.t24],  // label 5
    [T.t25, T.t26, T.t27, T.t28, T.t29, T.t30, T.t0, T.t31],  // label 4
    [T.t32, T.t33, T.t34, T.t35, T.t36, T.t37, T.t38, T.t39],  // label 3
    [T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t0],  // label 2
    [T.t47, T.t48, T.t49, T.t50, T.t0, T.t0, T.t0, T.t0]  // label 1
  ],
};
