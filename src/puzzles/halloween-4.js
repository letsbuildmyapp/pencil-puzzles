import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(4329608),
  t2: mk(33792),
  t3: mk(1099577),
  t4: mk(4260864),
  t5: mk(528),
  t6: mk(33858),
  t7: mk(1),
  t8: mk(8667648),
  t9: mk(26654127),
  t10: mk(8521761),
  t11: mk(3984),
  t12: mk(4980736),
  t13: mk(2167056),
  t14: mk(924769),
  t15: mk(536),
  t16: mk(15154077),
  t17: mk(786),
  t18: mk(1082401),
  t19: mk(8527358),
  t20: mk(1007616),
  t21: mk(3),
  t22: mk(29826175),
  t23: mk(31457279),
  t24: mk(6976511),
  t25: mk(3407793),
  t26: mk(26738688),
  t27: mk(540932),
  t28: mk(104448),
  t29: mk(33293563),
  t30: mk(33030143),
  t31: mk(33554431),
  t32: mk(32473086),
  t33: mk(1114082),
  t34: mk(17295),
  t35: mk(2163745),
  t36: mk(32914724),
  t37: mk(3382220),
  t38: mk(16227559),
  t39: mk(33552271),
  t40: mk(4875164),
  t41: mk(1048576),
  t42: mk(17859617),
  t43: mk(4329604),
  t44: mk(16540432),
  t45: mk(18222146),
  t46: mk(29392646),
  t47: mk(15669446),
  t48: mk(6491233),
  t49: mk(2164868),
  t50: mk(8659472),
  t51: mk(1082402),
  t52: mk(31946240),
  t53: mk(16775),
  t54: mk(3480),
  t55: mk(8912896)
};

export const HALLOWEEN_4_PUZZLE = {
  id: "hw04",
  title: "Spider",
  subtitle: "8×8 · Medium",
  riddle: "Eight legs, a web I spin with care,\nhanging in corners to give you a scare.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t0, T.t6],  // label 8
    [T.t7, T.t8, T.t0, T.t9, T.t0, T.t10, T.t11, T.t12],  // label 7
    [T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20],  // label 6
    [T.t0, T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27],  // label 5
    [T.t28, T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t35],  // label 4
    [T.t36, T.t37, T.t38, T.t31, T.t39, T.t40, T.t41, T.t42],  // label 3
    [T.t43, T.t44, T.t45, T.t46, T.t47, T.t48, T.t0, T.t49],  // label 2
    [T.t50, T.t0, T.t51, T.t41, T.t52, T.t53, T.t54, T.t55]  // label 1
  ],
};
