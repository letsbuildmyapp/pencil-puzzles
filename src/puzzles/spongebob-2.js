import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(8659208),
  t2: mk(262144),
  t3: mk(142),
  t4: mk(8659358),
  t5: mk(32768),
  t6: mk(30162951),
  t7: mk(7440451),
  t8: mk(16),
  t9: mk(8929808),
  t10: mk(33),
  t11: mk(8929280),
  t12: mk(21237892),
  t13: mk(8523908),
  t14: mk(1082434),
  t15: mk(1082428),
  t16: mk(13529480),
  t17: mk(13529476),
  t18: mk(1224),
  t19: mk(4670464),
  t20: mk(520),
  t21: mk(8659074),
  t22: mk(8617984),
  t23: mk(21070881),
  t24: mk(8912896),
  t25: mk(16777216),
  t26: mk(8658945),
  t27: mk(1061442),
  t28: mk(17268736),
  t29: mk(2064484),
  t30: mk(29495444),
  t31: mk(6176),
  t32: mk(1984),
  t33: mk(2252800),
  t34: mk(2326528),
  t35: mk(31490056),
  t36: mk(8667664),
  t37: mk(10651713),
  t38: mk(16648),
  t39: mk(8),
  t40: mk(8388608),
  t41: mk(3),
  t42: mk(39680),
  t43: mk(17047812),
  t44: mk(17825792),
  t45: mk(4868421)
};

export const SPONGEBOB_2_PUZZLE = {
  id: "sb02",
  title: "Patrick",
  subtitle: "8×8 · Easy",
  riddle: "I'm the best friend a sponge could need,\nnapping under my rock is all I need.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t0],  // label 8
    [T.t0, T.t0, T.t1, T.t5, T.t6, T.t7, T.t8, T.t0],  // label 7
    [T.t0, T.t0, T.t9, T.t10, T.t11, T.t12, T.t13, T.t0],  // label 6
    [T.t0, T.t14, T.t0, T.t15, T.t8, T.t16, T.t17, T.t0],  // label 5
    [T.t18, T.t19, T.t20, T.t21, T.t22, T.t23, T.t24, T.t0],  // label 4
    [T.t25, T.t0, T.t26, T.t27, T.t28, T.t29, T.t30, T.t0],  // label 3
    [T.t31, T.t32, T.t33, T.t34, T.t35, T.t36, T.t37, T.t38],  // label 2
    [T.t39, T.t0, T.t40, T.t41, T.t42, T.t43, T.t44, T.t45]  // label 1
  ],
};
