import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(16),        t3:  mk(24),        t4:  mk(32),
  t5:  mk(34),        t6:  mk(63),        t7:  mk(103),       t8:  mk(775),
  t9:  mk(898),       t10: mk(3164),      t11: mk(3472),      t12: mk(16384),
  t13: mk(16833),     t14: mk(16920),     t15: mk(31744),     t16: mk(32131),
  t17: mk(98304),     t18: mk(102664),    t19: mk(126976),    t20: mk(137381),
  t21: mk(412214),    t22: mk(524288),    t23: mk(920576),    t24: mk(991362),
  t25: mk(1081351),   t26: mk(1082415),   t27: mk(1082586),   t28: mk(2129920),
  t29: mk(2234047),   t30: mk(2358032),   t31: mk(2435402),   t32: mk(4194304),
  t33: mk(4299103),   t34: mk(4465168),   t35: mk(6503388),   t36: mk(6563080),
  t37: mk(7340032),   t38: mk(8126464),   t39: mk(8654913),   t40: mk(9741477),
  t41: mk(11788304),  t42: mk(12681216),  t43: mk(13146384),  t44: mk(15746047),
  t45: mk(16199944),  t46: mk(16743416),  t47: mk(16777216),  t48: mk(16777250),
  t49: mk(16785155),  t50: mk(17170432),  t51: mk(17318416),  t52: mk(17859780),
  t53: mk(18942020),  t54: mk(22091008),  t55: mk(25133529),  t56: mk(25197534),
  t57: mk(25363457),  t58: mk(26884339),  t59: mk(30181598),  t60: mk(30350433),
  t61: mk(31265137),  t62: mk(32759939),
};

export const LOONEY_TUNES_12_PUZZLE = {
  id: "lt12",
  title: "Speedy Gonzales",
  subtitle: "8×8 · Medium",
  riddle: "¡Ándale! ¡Ándale! ¡Arriba! ¡Arriba!\nI'm the fastest mouse in all of Mexico.\nWhat am I?",
  solution: [
    [T.t18, T.t48, T.t12, T.t5,  T.t7,  T.t30, T.t24, T.t28],  // label 8
    [T.t47, T.t32, T.t4,  T.t29, T.t46, T.t9,  T.t25, T.t14],  // label 7
    [T.t11, T.t16, T.t8,  T.t45, T.t21, T.t58, T.t56, T.t33],  // label 6
    [T.t51, T.t0,  T.t57, T.t49, T.t55, T.t41, T.t59, T.t53],  // label 5
    [T.t39, T.t3,  T.t36, T.t43, T.t60, T.t44, T.t35, T.t34],  // label 4
    [T.t1,  T.t37, T.t54, T.t13, T.t6,  T.t62, T.t61, T.t10],  // label 3
    [T.t2,  T.t50, T.t17, T.t22, T.t26, T.t20, T.t27, T.t23],  // label 2
    [T.t42, T.t15, T.t19, T.t38, T.t52, T.t40, T.t31, T.t0 ],  // label 1
  ],
};
