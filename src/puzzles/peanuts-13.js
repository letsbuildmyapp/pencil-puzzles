import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(31),        t3:  mk(35),        t4:  mk(520),
  t5:  mk(1224),      t6:  mk(3472),      t7:  mk(4164),      t8:  mk(7936),
  t9:  mk(16644),     t10: mk(16904),     t11: mk(28737),     t12: mk(267201),
  t13: mk(1048576),   t14: mk(1116292),   t15: mk(2129920),   t16: mk(2129921),
  t17: mk(2146510),   t18: mk(2164869),   t19: mk(2166916),   t20: mk(2233218),
  t21: mk(3285504),   t22: mk(3407079),   t23: mk(4260864),   t24: mk(5420674),
  t25: mk(7439262),   t26: mk(8523842),   t27: mk(8659204),   t28: mk(8663370),
  t29: mk(8667664),   t30: mk(8912897),   t31: mk(9531392),   t32: mk(14865824),
  t33: mk(16777215),  t34: mk(17043586),  t35: mk(17628985),  t36: mk(25299044),
  t37: mk(26738688),  t38: mk(28683104),  t39: mk(29360128),  t40: mk(29426688),
  t41: mk(30375902),  t42: mk(32374784),  t43: mk(33520540),
};

export const PEANUTS_13_PUZZLE = {
  id: "pn13",
  title: "Cool Snoopy",
  subtitle: "8×8 · Easy",
  riddle: "Joe Cool here — the hippest beagle on campus.\nI wear my shades and lean against the wall.\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t5,  T.t11, T.t0,  T.t0 ],  // label 8
    [T.t1,  T.t8,  T.t22, T.t35, T.t41, T.t9,  T.t34, T.t0 ],  // label 7
    [T.t19, T.t3,  T.t25, T.t37, T.t42, T.t16, T.t17, T.t10],  // label 6
    [T.t27, T.t13, T.t39, T.t0,  T.t7,  T.t18, T.t33, T.t28],  // label 5
    [T.t23, T.t12, T.t2,  T.t6,  T.t30, T.t24, T.t43, T.t29],  // label 4
    [T.t0,  T.t0,  T.t13, T.t36, T.t20, T.t15, T.t31, T.t0 ],  // label 3
    [T.t0,  T.t0,  T.t1,  T.t21, T.t40, T.t4,  T.t0,  T.t0 ],  // label 2
    [T.t0,  T.t0,  T.t14, T.t32, T.t38, T.t26, T.t0,  T.t0 ],  // label 1
  ],
};
