import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(34),        t3:  mk(62),        t4:  mk(248),
  t5:  mk(899),       t6:  mk(1057),      t7:  mk(7936),      t8:  mk(16384),
  t9:  mk(16648),     t10: mk(24769),     t11: mk(34949),     t12: mk(139536),
  t13: mk(267958),    t14: mk(1082402),   t15: mk(1083624),   t16: mk(1117020),
  t17: mk(1117321),   t18: mk(1127012),   t19: mk(1722696),   t20: mk(2040436),
  t21: mk(2048264),   t22: mk(2164769),   t23: mk(2165660),   t24: mk(2165858),
  t25: mk(3129864),   t26: mk(3145728),   t27: mk(3215528),   t28: mk(3682400),
  t29: mk(4260902),   t30: mk(4261953),   t31: mk(4291584),   t32: mk(7371776),
  t33: mk(8126495),   t34: mk(8388609),   t35: mk(8667648),   t36: mk(8667672),
  t37: mk(8929283),   t38: mk(10618913),  t39: mk(12649496),  t40: mk(13174817),
  t41: mk(13205550),  t42: mk(16904192),  t43: mk(17043588),  t44: mk(17045564),
  t45: mk(17272921),  t46: mk(17301504),  t47: mk(17302594),  t48: mk(17309956),
  t49: mk(17317888),  t50: mk(17318433),  t51: mk(17893508),  t52: mk(18105312),
  t53: mk(21250576),  t54: mk(25166088),  t55: mk(25205504),  t56: mk(26292492),
  t57: mk(29360128),  t58: mk(29426726),  t59: mk(29590465),  t60: mk(31490574),
};

export const LOONEY_TUNES_4_PUZZLE = {
  id: "lt04", title: "Elmer Fudd", subtitle: "8×8 · Easy",
  riddle: "I hunt that wascally wabbit every day,\nmy rifle and hunting cap give me away.\nShhh, be vewy vewy quiet!\nWhat am I?",
  solution: [
    [T.t1,  T.t50, T.t49, T.t3,  T.t5,  T.t39, T.t13, T.t46],  // label 8
    [T.t14, T.t15, T.t33, T.t4,  T.t7,  T.t32, T.t59, T.t10],  // label 7
    [T.t24, T.t47, T.t12, T.t0,  T.t0,  T.t26, T.t19, T.t21],  // label 6
    [T.t22, T.t0,  T.t51, T.t43, T.t6,  T.t40, T.t34, T.t35],  // label 5
    [T.t11, T.t48, T.t30, T.t23, T.t22, T.t16, T.t17, T.t9 ],  // label 4
    [T.t29, T.t53, T.t2,  T.t56, T.t58, T.t54, T.t38, T.t36],  // label 3
    [T.t37, T.t44, T.t60, T.t28, T.t55, T.t41, T.t18, T.t31],  // label 2
    [T.t57, T.t27, T.t52, T.t45, T.t20, T.t42, T.t25, T.t8 ],  // label 1
  ],
};
