import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1122),
  t2: mk(16531526),
  t3: mk(31686657),
  t4: mk(999393),
  t5: mk(536),
  t6: mk(6693682),
  t7: mk(4618801),
  t8: mk(2097152),
  t9: mk(3583),
  t10: mk(25590750),
  t11: mk(1082401),
  t12: mk(16813260),
  t13: mk(17301504),
  t14: mk(18611695),
  t15: mk(33554431),
  t16: mk(32505855),
  t17: mk(31),
  t18: mk(16),
  t19: mk(1082400),
  t20: mk(9191463),
  t21: mk(40835),
  t22: mk(16761087),
  t23: mk(33046428),
  t24: mk(17285120),
  t25: mk(1048039),
  t26: mk(34987),
  t27: mk(29999103),
  t28: mk(16776121),
  t29: mk(32960226),
  t30: mk(17301505),
  t31: mk(29196832),
  t32: mk(7573097),
  t33: mk(33554392),
  t34: mk(16777199),
  t35: mk(33554399),
  t36: mk(17229016),
  t37: mk(23491484),
  t38: mk(1089804),
  t39: mk(30752),
  t40: mk(5935256),
  t41: mk(16912),
  t42: mk(15961284),
  t43: mk(31156947),
  t44: mk(18466540),
  t45: mk(29765830),
  t46: mk(7441456),
  t47: mk(30389694),
  t48: mk(837828),
  t49: mk(16777216),
  t50: mk(14327782),
  t51: mk(2226245),
  t52: mk(2133400),
  t53: mk(7335085),
  t54: mk(8603152),
  t55: mk(527),
  t56: mk(12854032)
};

export const HALLOWEEN_2_PUZZLE = {
  id: "hw02",
  title: "Witch",
  subtitle: "8×8 · Medium",
  riddle: "I fly on a broomstick under the moon,\nstirring my cauldron with a magical tune.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t0, T.t0],  // label 8
    [T.t0, T.t6, T.t7, T.t8, T.t9, T.t10, T.t0, T.t0],  // label 7
    [T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t18],  // label 6
    [T.t19, T.t20, T.t21, T.t22, T.t23, T.t24, T.t25, T.t16],  // label 5
    [T.t26, T.t27, T.t28, T.t29, T.t30, T.t31, T.t32, T.t33],  // label 4
    [T.t34, T.t35, T.t36, T.t37, T.t38, T.t39, T.t40, T.t41],  // label 3
    [T.t42, T.t43, T.t44, T.t45, T.t46, T.t47, T.t48, T.t49],  // label 2
    [T.t50, T.t51, T.t52, T.t53, T.t54, T.t55, T.t56, T.t0]  // label 1
  ],
};
