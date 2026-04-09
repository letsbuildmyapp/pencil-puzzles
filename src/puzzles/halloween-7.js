import { mk } from "../lib/tiles";

const T = {
  t0: mk(2016),
  t1: mk(32512),
  t2: mk(63624),
  t3: mk(16252928),
  t4: mk(25363456),
  t5: mk(1177734),
  t6: mk(19014164),
  t7: mk(9200408),
  t8: mk(17326470),
  t9: mk(15888),
  t10: mk(16777737),
  t11: mk(1116),
  t12: mk(16752127),
  t13: mk(25028400),
  t14: mk(25978674),
  t15: mk(25690112),
  t16: mk(3178496),
  t17: mk(24116735),
  t18: mk(1067743),
  t19: mk(17927422),
  t20: mk(25903085),
  t21: mk(16),
  t22: mk(7341091),
  t23: mk(1117254),
  t24: mk(5377122),
  t25: mk(29115361),
  t26: mk(31661168),
  t27: mk(13695239),
  t28: mk(16780556),
  t29: mk(6391304),
  t30: mk(16648),
  t31: mk(4659299),
  t32: mk(7585263),
  t33: mk(17726461),
  t34: mk(16777216),
  t35: mk(12688622),
  t36: mk(4278874),
  t37: mk(6324484),
  t38: mk(4346260),
  t39: mk(1082401),
  t40: mk(24231952),
  t41: mk(30163214),
  t42: mk(1),
  t43: mk(10878974),
  t44: mk(26112916),
  t45: mk(4439935),
  t46: mk(16806880),
  t47: mk(0),
  t48: mk(25566242),
  t49: mk(16773120),
  t50: mk(33522688),
  t51: mk(10877952),
  t52: mk(30302208),
  t53: mk(33009135),
  t54: mk(553057),
  t55: mk(2196480),
  t56: mk(17159),
  t57: mk(34047),
  t58: mk(25599),
  t59: mk(65407),
  t60: mk(33258256)
};

export const HALLOWEEN_7_PUZZLE = {
  id: "hw07",
  title: "Werewolf",
  subtitle: "8×8 · Hard",
  riddle: "The full moon rises and so do I,\nhowling my name to the Halloween sky.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t14, T.t15],  // label 7
    [T.t16, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22, T.t15],  // label 6
    [T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29, T.t30],  // label 5
    [T.t31, T.t32, T.t33, T.t34, T.t35, T.t36, T.t37, T.t38],  // label 4
    [T.t39, T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46],  // label 3
    [T.t47, T.t48, T.t49, T.t50, T.t51, T.t52, T.t53, T.t54],  // label 2
    [T.t47, T.t55, T.t56, T.t57, T.t58, T.t59, T.t60, T.t47]  // label 1
  ],
};
