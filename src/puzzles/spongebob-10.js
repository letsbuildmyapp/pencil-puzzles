import { mk } from "../lib/tiles";

const T = {
  t0: mk(532612),
  t1: mk(16647),
  t2: mk(270623),
  t3: mk(8704),
  t4: mk(4161),
  t5: mk(67679),
  t6: mk(2200),
  t7: mk(34),
  t8: mk(4473890),
  t9: mk(13107200),
  t10: mk(1048576),
  t11: mk(17043522),
  t12: mk(2236944),
  t13: mk(0),
  t14: mk(12649504),
  t15: mk(1048592),
  t16: mk(2232450),
  t17: mk(7626487),
  t18: mk(1615147),
  t19: mk(1119413),
  t20: mk(25324378),
  t21: mk(17047824),
  t22: mk(2199824),
  t23: mk(790594),
  t24: mk(8617984),
  t25: mk(21242132),
  t26: mk(10653834),
  t27: mk(4980736),
  t28: mk(102665),
  t29: mk(17696833),
  t30: mk(17344576),
  t31: mk(19948511),
  t32: mk(4063256),
  t33: mk(4194304),
  t34: mk(9437184),
  t35: mk(17268775),
  t36: mk(25280478),
  t37: mk(18130944),
  t38: mk(520),
  t39: mk(16227555),
  t40: mk(33520606),
  t41: mk(32607331),
  t42: mk(33047056),
  t43: mk(33554431),
  t44: mk(30307096),
  t45: mk(201),
  t46: mk(16777223),
  t47: mk(3178496),
  t48: mk(33546627),
  t49: mk(33522688),
  t50: mk(33521667),
  t51: mk(33528208),
  t52: mk(16777216),
  t53: mk(17318409),
  t54: mk(8659168),
  t55: mk(17317888),
  t56: mk(8522752),
  t57: mk(32506848),
  t58: mk(29364096),
  t59: mk(1090),
  t60: mk(6291984)
};

export const SPONGEBOB_10_PUZZLE = {
  id: "sb10",
  title: "Spongebob 2",
  subtitle: "8×8 · Medium",
  riddle: "Square and yellow, ready to go,\nI'm always ready — don't you know?\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t14, T.t15],  // label 7
    [T.t16, T.t13, T.t17, T.t18, T.t19, T.t20, T.t13, T.t21],  // label 6
    [T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29],  // label 5
    [T.t30, T.t31, T.t32, T.t33, T.t34, T.t35, T.t36, T.t37],  // label 4
    [T.t38, T.t39, T.t40, T.t41, T.t42, T.t43, T.t44, T.t45],  // label 3
    [T.t46, T.t47, T.t48, T.t49, T.t50, T.t51, T.t52, T.t53],  // label 2
    [T.t54, T.t55, T.t56, T.t57, T.t58, T.t27, T.t59, T.t60]  // label 1
  ],
};
