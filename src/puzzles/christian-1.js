import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1),
  t2: mk(114587),
  t3: mk(933102),
  t4: mk(518108),
  t5: mk(553935),
  t6: mk(24),
  t7: mk(3355067),
  t8: mk(21163656),
  t9: mk(28180480),
  t10: mk(13599744),
  t11: mk(33021286),
  t12: mk(17781629),
  t13: mk(512),
  t14: mk(1057),
  t15: mk(27959090),
  t16: mk(25690127),
  t17: mk(16),
  t18: mk(3),
  t19: mk(3178556),
  t20: mk(15859451),
  t21: mk(17695518),
  t22: mk(1116358),
  t23: mk(4549598),
  t24: mk(17017856),
  t25: mk(8921088),
  t26: mk(4576784),
  t27: mk(2904064),
  t28: mk(27155313),
  t29: mk(29768220),
  t30: mk(6495329),
  t31: mk(32071411),
  t32: mk(528),
  t33: mk(4),
  t34: mk(25977492),
  t35: mk(33827),
  t36: mk(28180479),
  t37: mk(15221532),
  t38: mk(1082401),
  t39: mk(29359595),
  t40: mk(19922943),
  t41: mk(2929256),
  t42: mk(9018146),
  t43: mk(8388607),
  t44: mk(33554430),
  t45: mk(31519488),
  t46: mk(1117409),
  t47: mk(14338503),
  t48: mk(33554415),
  t49: mk(7884604),
  t50: mk(29419111),
  t51: mk(33520573),
  t52: mk(33449938),
  t53: mk(16801822),
  t54: mk(2168928),
  t55: mk(12557430),
  t56: mk(24757248),
  t57: mk(33554407),
  t58: mk(33554392),
  t59: mk(28937455),
  t60: mk(18611102),
  t61: mk(16801792)
};

export const CHRISTIAN_1_PUZZLE = {
  id: "ch01",
  title: "Face of Jesus",
  subtitle: "8×8 · Medium",
  riddle: "Crowned with thorns, a face divine,\nthe Son of God, a love supreme.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t0],  // label 8
    [T.t0, T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t13],  // label 7
    [T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20, T.t21],  // label 6
    [T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29],  // label 5
    [T.t30, T.t31, T.t32, T.t33, T.t34, T.t35, T.t36, T.t37],  // label 4
    [T.t38, T.t39, T.t40, T.t41, T.t42, T.t43, T.t44, T.t45],  // label 3
    [T.t46, T.t47, T.t48, T.t49, T.t50, T.t51, T.t52, T.t53],  // label 2
    [T.t54, T.t55, T.t56, T.t57, T.t58, T.t59, T.t60, T.t61]  // label 1
  ],
};
