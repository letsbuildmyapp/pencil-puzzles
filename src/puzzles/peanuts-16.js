import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(16),        t2:  mk(33),        t3:  mk(38),
  t4:  mk(201),       t5:  mk(574),        t6:  mk(772),       t7:  mk(1259),
  t8:  mk(27780),     t9:  mk(66560),      t10: mk(98304),     t11: mk(540672),
  t12: mk(540932),    t13: mk(793600),     t14: mk(1016866),   t15: mk(1048576),
  t16: mk(1048590),   t17: mk(1048614),    t18: mk(1082368),   t19: mk(1082401),
  t20: mk(1084582),   t21: mk(1116192),    t22: mk(2031616),   t23: mk(2167056),
  t24: mk(2269712),   t25: mk(2351112),    t26: mk(3285256),   t27: mk(4183775),
  t28: mk(4261921),   t29: mk(4590156),    t30: mk(7714019),   t31: mk(8126464),
  t32: mk(8617984),   t33: mk(8659728),    t34: mk(8667169),   t35: mk(8912896),
  t36: mk(9576962),   t37: mk(14638079),   t38: mk(14712832),  t39: mk(15613952),
  t40: mk(16777224),  t41: mk(17047683),   t42: mk(17317888),  t43: mk(17595261),
  t44: mk(17834578),  t45: mk(25165825),   t46: mk(29377024),  t47: mk(29458960),
  t48: mk(29622272),  t49: mk(31448924),   t50: mk(31530752),  t51: mk(32538624),
};

export const PEANUTS_16_PUZZLE = {
  id: "pn16",
  title: "Franklin",
  subtitle: "8×8 · Easy",
  riddle: "I'm Charlie Brown's thoughtful friend, calm and wise.\\nI quote the Bible and keep a cool head.\\nWhat am I?",
  solution: [
    [T.t0,  T.t7,  T.t27, T.t37, T.t43, T.t0,  T.t0,  T.t0 ],  // label 8
    [T.t20, T.t49, T.t39, T.t48, T.t51, T.t12, T.t0,  T.t0 ],  // label 7
    [T.t30, T.t46, T.t10, T.t16, T.t40, T.t28, T.t1,  T.t0 ],  // label 6
    [T.t19, T.t0,  T.t15, T.t17, T.t11, T.t18, T.t33, T.t0 ],  // label 5
    [T.t26, T.t0,  T.t0,  T.t0,  T.t3,  T.t34, T.t42, T.t0 ],  // label 4
    [T.t32, T.t41, T.t38, T.t22, T.t45, T.t23, T.t4,  T.t6 ],  // label 3
    [T.t2,  T.t8,  T.t47, T.t14, T.t50, T.t5,  T.t36, T.t29],  // label 2
    [T.t21, T.t44, T.t13, T.t25, T.t31, T.t9,  T.t24, T.t35],  // label 1
  ],
};
