import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(1065481),   t3:  mk(1082368),   t4:  mk(1082401),
  t5:  mk(1149064),   t6:  mk(1240),      t7:  mk(1540096),   t8:  mk(1650688),
  t9:  mk(2036002),   t10: mk(2233511),   t11: mk(3245089),   t12: mk(3473),
  t13: mk(4472832),   t14: mk(4980736),   t15: mk(5383070),   t16: mk(5952346),
  t17: mk(6573440),   t18: mk(7971040),   t19: mk(9015580),   t20: mk(16646),
  t21: mk(16777215),  t22: mk(17330753),  t23: mk(17593246),  t24: mk(17594332),
  t25: mk(18432386),  t26: mk(18641226),  t27: mk(18671417),  t28: mk(27026200),
  t29: mk(27194318),  t30: mk(30374871),  t31: mk(30375935),  t32: mk(31229020),
  t33: mk(33486781),  t34: mk(33520606),  t35: mk(33528953),  t36: mk(33554407),
  t37: mk(40960),     t38: mk(524288),    t39: mk(541200),    t40: mk(984114),
};

export const LOONEY_TUNES_2_PUZZLE = {
  id: "lt02", title: "Daffy Duck", subtitle: "8×8 · Easy",
  riddle: "I've got a lisp and a jealous streak,\nmy bill flaps with every crazy scheme.\nYou're despicable!\nWhat am I?",
  solution: [
    [T.t0,  T.t10, T.t19, T.t38, T.t0,  T.t0,  T.t0,  T.t0 ],  // label 8
    [T.t1,  T.t21, T.t36, T.t23, T.t0,  T.t0,  T.t0,  T.t0 ],  // label 7
    [T.t4,  T.t34, T.t11, T.t28, T.t39, T.t0,  T.t0,  T.t0 ],  // label 6
    [T.t5,  T.t35, T.t27, T.t30, T.t22, T.t0,  T.t12, T.t40],  // label 5
    [T.t25, T.t26, T.t8,  T.t37, T.t7,  T.t9,  T.t17, T.t14],  // label 4
    [T.t3,  T.t16, T.t20, T.t0,  T.t6,  T.t13, T.t0,  T.t0 ],  // label 3
    [T.t24, T.t29, T.t2,  T.t33, T.t0,  T.t0,  T.t0,  T.t0 ],  // label 2
    [T.t31, T.t15, T.t18, T.t32, T.t0,  T.t0,  T.t0,  T.t0 ],  // label 1
  ],
};
