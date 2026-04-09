import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(108),       t3:  mk(263),       t4:  mk(772),
  t5:  mk(898),       t6:  mk(992),       t7:  mk(4500),      t8:  mk(31772),
  t9:  mk(34884),     t10: mk(39184),     t11: mk(68232),     t12: mk(102672),
  t13: mk(126976),    t14: mk(202884),    t15: mk(730228),    t16: mk(1015808),
  t17: mk(1082403),   t18: mk(1116226),   t19: mk(1116296),   t20: mk(2129920),
  t21: mk(2130977),   t22: mk(2164804),   t23: mk(2167808),   t24: mk(3047424),
  t25: mk(3145728),   t26: mk(3230323),   t27: mk(3281168),   t28: mk(4325376),
  t29: mk(4327456),   t30: mk(4349952),   t31: mk(4464912),   t32: mk(4599808),
  t33: mk(5476488),   t34: mk(6630233),   t35: mk(8659208),   t36: mk(8659250),
  t37: mk(8912896),   t38: mk(9795616),   t39: mk(12854464),  t40: mk(13173760),
  t41: mk(16515072),  t42: mk(16777216),  t43: mk(16777704),  t44: mk(16778273),
  t45: mk(17047682),  t46: mk(17268739),  t47: mk(17352242),  t48: mk(18117330),
  t49: mk(18716867),  t50: mk(19474764),  t51: mk(21669856),  t52: mk(32505856),
  t53: mk(32538624),  t54: mk(32539681),  t55: mk(33181828),
};

export const PEANUTS_5_PUZZLE = {
  id: "pn05",
  title: "Schroeder",
  subtitle: "8×8 · Easy",
  riddle: "I play Beethoven on my toy piano.\nLucy always leans on it trying to get my attention.\nWhat am I?",
  solution: [
    [T.t0,  T.t7,  T.t14, T.t0,  T.t10, T.t16, T.t8,  T.t4 ],  // label 8
    [T.t17, T.t32, T.t28, T.t18, T.t1,  T.t5,  T.t20, T.t21],  // label 7
    [T.t25, T.t2,  T.t13, T.t24, T.t53, T.t23, T.t11, T.t19],  // label 6
    [T.t9,  T.t44, T.t40, T.t34, T.t0,  T.t3,  T.t36, T.t35],  // label 5
    [T.t31, T.t12, T.t49, T.t45, T.t46, T.t30, T.t39, T.t37],  // label 4
    [T.t47, T.t42, T.t22, T.t48, T.t15, T.t43, T.t6,  T.t6 ],  // label 3
    [T.t50, T.t0,  T.t33, T.t26, T.t51, T.t41, T.t52, T.t52],  // label 2
    [T.t29, T.t6,  T.t38, T.t27, T.t55, T.t52, T.t52, T.t54],  // label 1
  ],
};
