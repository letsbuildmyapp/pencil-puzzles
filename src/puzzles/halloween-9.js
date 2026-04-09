import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(35906),
  t2: mk(33030144),
  t3: mk(29559845),
  t4: mk(16),
  t5: mk(36036),
  t6: mk(1015808),
  t7: mk(549132),
  t8: mk(2164806),
  t9: mk(17053101),
  t10: mk(9191952),
  t11: mk(17576131),
  t12: mk(6397336),
  t13: mk(30720),
  t14: mk(4337944),
  t15: mk(35012),
  t16: mk(29884417),
  t17: mk(126),
  t18: mk(963),
  t19: mk(1153432),
  t20: mk(16777216),
  t21: mk(4329667),
  t22: mk(25563268),
  t23: mk(1153416),
  t24: mk(1048576),
  t25: mk(32903564),
  t26: mk(31555584),
  t27: mk(549344),
  t28: mk(4612608),
  t29: mk(8788065),
  t30: mk(1059),
  t31: mk(9191424),
  t32: mk(35910),
  t33: mk(135302),
  t34: mk(25440390),
  t35: mk(2164803),
  t36: mk(4329666),
  t37: mk(2165793),
  t38: mk(2165808),
  t39: mk(528),
  t40: mk(1081344),
  t41: mk(18741702),
  t42: mk(31686656),
  t43: mk(818400),
  t44: mk(3371776),
  t45: mk(26712064),
  t46: mk(25472460),
  t47: mk(17301504)
};

export const HALLOWEEN_9_PUZZLE = {
  id: "hw09",
  title: "Ghost",
  subtitle: "8×8 · Easy",
  riddle: "I float through walls and say boo!\nYou can almost see right through.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t0, T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t14],  // label 7
    [T.t15, T.t16, T.t17, T.t18, T.t4, T.t0, T.t19, T.t20],  // label 6
    [T.t21, T.t0, T.t0, T.t0, T.t22, T.t23, T.t20, T.t0],  // label 5
    [T.t24, T.t25, T.t26, T.t27, T.t28, T.t29, T.t4, T.t0],  // label 4
    [T.t30, T.t31, T.t32, T.t0, T.t33, T.t0, T.t34, T.t0],  // label 3
    [T.t35, T.t0, T.t36, T.t0, T.t37, T.t4, T.t38, T.t39],  // label 2
    [T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t47]  // label 1
  ],
};
