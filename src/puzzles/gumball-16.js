import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(32),
  t2: mk(24785),
  t3: mk(2232453),
  t4: mk(8667756),
  t5: mk(16),
  t6: mk(3),
  t7: mk(8523648),
  t8: mk(26476544),
  t9: mk(18054144),
  t10: mk(16833),
  t11: mk(1),
  t12: mk(4473344),
  t13: mk(7299079),
  t14: mk(3244032),
  t15: mk(9064526),
  t16: mk(1082401),
  t17: mk(31),
  t18: mk(1087),
  t19: mk(16531999),
  t20: mk(17360319),
  t21: mk(33063967),
  t22: mk(541464),
  t23: mk(1048576),
  t24: mk(3788304),
  t25: mk(32505856),
  t26: mk(32539680),
  t27: mk(16244248),
  t28: mk(33469880),
  t29: mk(16226875),
  t30: mk(25977344),
  t31: mk(17318402),
  t32: mk(13860864),
  t33: mk(16777216),
  t34: mk(15762465),
  t35: mk(1083494),
  t36: mk(2241156),
  t37: mk(34),
  t38: mk(574796),
  t39: mk(1049106),
  t40: mk(540932),
  t41: mk(4464912),
  t42: mk(4456448),
  t43: mk(8388608),
  t44: mk(3212321),
  t45: mk(31457280)
};

export const GUMBALL_16_PUZZLE = {
  id: "gb16",
  title: "Gumball 16",
  subtitle: "8×8 · Hard",
  riddle: "Always getting into quite a fix,\nblue cat trouble is part of the mix.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t0, T.t0],  // label 8
    [T.t0, T.t6, T.t7, T.t8, T.t9, T.t10, T.t5, T.t0],  // label 7
    [T.t11, T.t12, T.t0, T.t0, T.t13, T.t14, T.t15, T.t0],  // label 6
    [T.t16, T.t11, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22],  // label 5
    [T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29, T.t30],  // label 4
    [T.t11, T.t31, T.t0, T.t0, T.t32, T.t33, T.t34, T.t0],  // label 3
    [T.t35, T.t36, T.t0, T.t0, T.t37, T.t38, T.t39, T.t40],  // label 2
    [T.t0, T.t41, T.t0, T.t0, T.t42, T.t43, T.t44, T.t45]  // label 1
  ],
};
