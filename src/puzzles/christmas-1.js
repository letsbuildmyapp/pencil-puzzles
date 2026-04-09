import { mk } from "../lib/tiles";

const T = {
  t0: mk(600071),
  t1: mk(139280),
  t2: mk(1240),
  t3: mk(507904),
  t4: mk(32505856),
  t5: mk(31490048),
  t6: mk(540936),
  t7: mk(0),
  t8: mk(9132560),
  t9: mk(28717544),
  t10: mk(34663),
  t11: mk(17301612),
  t12: mk(31744),
  t13: mk(4348870),
  t14: mk(8618322),
  t15: mk(25692452),
  t16: mk(3246212),
  t17: mk(16780425),
  t18: mk(31768),
  t19: mk(31751),
  t20: mk(1097988),
  t21: mk(541200),
  t22: mk(4332936),
  t23: mk(12401128),
  t24: mk(6384632),
  t25: mk(26762214),
  t26: mk(21757732),
  t27: mk(16777752),
  t28: mk(36034),
  t29: mk(25690112),
  t30: mk(17318409),
  t31: mk(17579520),
  t32: mk(2322497),
  t33: mk(2164804),
  t34: mk(13574278),
  t35: mk(63),
  t36: mk(2199521),
  t37: mk(1082400),
  t38: mk(8126480),
  t39: mk(1059),
  t40: mk(1048592),
  t41: mk(26444834),
  t42: mk(6490183),
  t43: mk(33554431),
  t44: mk(1099312),
  t45: mk(541326),
  t46: mk(17173504),
  t47: mk(3406944),
  t48: mk(17595904),
  t49: mk(2506755),
  t50: mk(13001232),
  t51: mk(25981918),
  t52: mk(11567104),
  t53: mk(550113),
  t54: mk(17167),
  t55: mk(35992),
  t56: mk(7758336),
  t57: mk(1084655)
};

export const CHRISTMAS_1_PUZZLE = {
  id: "xm01",
  title: "Santa",
  subtitle: "8×8 · Hard",
  riddle: "I fly through the night with a jolly ho ho,\ndelivering gifts through the ice and the snow.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t8, T.t9, T.t10, T.t11, T.t12, T.t12, T.t13, T.t7],  // label 7
    [T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20, T.t21],  // label 6
    [T.t7, T.t7, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27],  // label 5
    [T.t7, T.t28, T.t29, T.t30, T.t31, T.t32, T.t33, T.t34],  // label 4
    [T.t35, T.t36, T.t37, T.t38, T.t39, T.t40, T.t41, T.t42],  // label 3
    [T.t43, T.t44, T.t45, T.t46, T.t47, T.t48, T.t49, T.t50],  // label 2
    [T.t43, T.t51, T.t52, T.t53, T.t54, T.t55, T.t56, T.t57]  // label 1
  ],
};
