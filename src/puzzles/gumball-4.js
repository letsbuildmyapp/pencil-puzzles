import { mk } from "../lib/tiles";

const T = {
  t0: mk(1224),
  t1: mk(29792),
  t2: mk(16252944),
  t3: mk(790594),
  t4: mk(0),
  t5: mk(8929808),
  t6: mk(8523842),
  t7: mk(1081344),
  t8: mk(16912),
  t9: mk(8654913),
  t10: mk(1),
  t11: mk(1084816),
  t12: mk(511040),
  t13: mk(9421848),
  t14: mk(553049),
  t15: mk(96),
  t16: mk(19271964),
  t17: mk(3181600),
  t18: mk(5420476),
  t19: mk(4338076),
  t20: mk(17311047),
  t21: mk(524424),
  t22: mk(229379),
  t23: mk(17580572),
  t24: mk(1048576),
  t25: mk(17043687),
  t26: mk(3280415),
  t27: mk(558335),
  t28: mk(16777756),
  t29: mk(18157700),
  t30: mk(17318416),
  t31: mk(32768),
  t32: mk(13240352),
  t33: mk(29760639),
  t34: mk(16252892),
  t35: mk(17301504),
  t36: mk(4329604),
  t37: mk(34),
  t38: mk(17333248),
  t39: mk(16647),
  t40: mk(31),
  t41: mk(396319),
  t42: mk(1269791),
  t43: mk(4331708),
  t44: mk(4471344),
  t45: mk(558),
  t46: mk(4334080),
  t47: mk(25298976),
  t48: mk(7717921),
  t49: mk(30230032),
  t50: mk(3285504),
  t51: mk(4330692)
};

export const GUMBALL_4_PUZZLE = {
  id: "gb04",
  title: "Gumball 4",
  subtitle: "8×8 · Hard",
  riddle: "My wild schemes never go as planned,\nbut with Darwin by my side, I make a stand.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t4, T.t4, T.t4],  // label 8
    [T.t5, T.t4, T.t6, T.t7, T.t8, T.t4, T.t4, T.t4],  // label 7
    [T.t9, T.t10, T.t11, T.t12, T.t13, T.t14, T.t4, T.t4],  // label 6
    [T.t15, T.t16, T.t4, T.t17, T.t18, T.t19, T.t20, T.t21],  // label 5
    [T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29],  // label 4
    [T.t4, T.t30, T.t31, T.t32, T.t33, T.t34, T.t35, T.t36],  // label 3
    [T.t37, T.t38, T.t39, T.t40, T.t41, T.t42, T.t40, T.t43],  // label 2
    [T.t44, T.t45, T.t46, T.t47, T.t48, T.t49, T.t50, T.t51]  // label 1
  ],
};
