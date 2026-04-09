import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(7),         t2:  mk(102),       t3:  mk(402),       t4:  mk(520),
  t5:  mk(528),       t6:  mk(1008),      t7:  mk(1092),      t8:  mk(7570),
  t9:  mk(28768),     t10: mk(31744),     t11: mk(34816),     t12: mk(34882),
  t13: mk(34948),     t14: mk(39184),     t15: mk(102706),    t16: mk(133698),
  t17: mk(279120),    t18: mk(410140),    t19: mk(532480),    t20: mk(791134),
  t21: mk(1046563),   t22: mk(1049666),   t23: mk(1082368),   t24: mk(1082401),
  t25: mk(1118472),   t26: mk(2130977),   t27: mk(2131936),   t28: mk(2164802),
  t29: mk(2166916),   t30: mk(4195362),   t31: mk(4329604),   t32: mk(4472832),
  t33: mk(7619784),   t34: mk(8388608),   t35: mk(8586263),   t36: mk(8659472),
  t37: mk(8675600),   t38: mk(8692240),   t39: mk(8912904),   t40: mk(9707648),
  t41: mk(9769232),   t42: mk(11359880),  t43: mk(16777216),  t44: mk(16879888),
  t45: mk(17302528),  t46: mk(17352242),  t47: mk(17793024),  t48: mk(17859618),
  t49: mk(18399752),  t50: mk(21144904),  t51: mk(21648004),  t52: mk(25201833),
  t53: mk(26362161),  t54: mk(26808584),  t55: mk(29360174),
};

export const PEANUTS_4_PUZZLE = {
  id: "pn04",
  title: "Linus",
  subtitle: "8×8 · Easy",
  riddle: "I carry my security blanket everywhere I go.\nI know the true meaning of Christmas.\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t15, T.t33, T.t21, T.t20, T.t0,  T.t0 ],  // label 8
    [T.t13, T.t52, T.t50, T.t44, T.t55, T.t27, T.t4,  T.t3 ],  // label 7
    [T.t12, T.t49, T.t40, T.t11, T.t19, T.t0,  T.t41, T.t24],  // label 6
    [T.t22, T.t37, T.t17, T.t18, T.t16, T.t25, T.t7,  T.t28],  // label 5
    [T.t26, T.t43, T.t34, T.t0,  T.t30, T.t45, T.t39, T.t28],  // label 4
    [T.t23, T.t5,  T.t0,  T.t10, T.t29, T.t8,  T.t51, T.t28],  // label 3
    [T.t2,  T.t35, T.t9,  T.t6,  T.t38, T.t53, T.t32, T.t31],  // label 2
    [T.t42, T.t54, T.t14, T.t47, T.t46, T.t48, T.t0,  T.t36],  // label 1
  ],
};
