import { mk } from "../lib/tiles";

const T = {
  t0: mk(532626),
  t1: mk(1116250),
  t2: mk(17078283),
  t3: mk(792152),
  t4: mk(16678),
  t5: mk(521),
  t6: mk(16),
  t7: mk(0),
  t8: mk(9583880),
  t9: mk(21631112),
  t10: mk(4464938),
  t11: mk(5335290),
  t12: mk(292896),
  t13: mk(6307864),
  t14: mk(8586274),
  t15: mk(528),
  t16: mk(4292608),
  t17: mk(17352208),
  t18: mk(31557132),
  t19: mk(27486786),
  t20: mk(6609609),
  t21: mk(17318416),
  t22: mk(2232593),
  t23: mk(8654978),
  t24: mk(1083457),
  t25: mk(65536),
  t26: mk(3284166),
  t27: mk(26231273),
  t28: mk(8327166),
  t29: mk(263970),
  t30: mk(17301504),
  t31: mk(4473360),
  t32: mk(1116225),
  t33: mk(4),
  t34: mk(7576803),
  t35: mk(27262975),
  t36: mk(32469916),
  t37: mk(4329608),
  t38: mk(51266),
  t39: mk(16777216),
  t40: mk(1082401),
  t41: mk(24816),
  t42: mk(3245084),
  t43: mk(19006060),
  t44: mk(8667136),
  t45: mk(8694097),
  t46: mk(31497516),
  t47: mk(14712832),
  t48: mk(29138019),
  t49: mk(17778619),
  t50: mk(59121),
  t51: mk(16785155),
  t52: mk(19317264),
  t53: mk(8538404),
  t54: mk(1048576),
  t55: mk(25665800),
  t56: mk(3207528),
  t57: mk(25690638),
  t58: mk(13730849),
  t59: mk(13107203),
  t60: mk(17318400),
  t61: mk(2166914)
};

export const SPONGEBOB_1_PUZZLE = {
  id: "sb01",
  title: "Spongebob",
  subtitle: "8×8 · Medium",
  riddle: "I live in a pineapple under the sea,\nfrying Krabby Patties is the job for me.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t14, T.t15],  // label 7
    [T.t16, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22, T.t23],  // label 6
    [T.t24, T.t25, T.t26, T.t27, T.t28, T.t29, T.t30, T.t31],  // label 5
    [T.t32, T.t33, T.t34, T.t35, T.t36, T.t37, T.t38, T.t39],  // label 4
    [T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t6],  // label 3
    [T.t40, T.t47, T.t48, T.t49, T.t50, T.t51, T.t52, T.t53],  // label 2
    [T.t54, T.t55, T.t56, T.t57, T.t58, T.t59, T.t60, T.t61]  // label 1
  ],
};
