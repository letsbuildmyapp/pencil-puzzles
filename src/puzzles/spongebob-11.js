import { mk } from "../lib/tiles";

const T = {
  t0: mk(16),
  t1: mk(0),
  t2: mk(4356368),
  t3: mk(24960),
  t4: mk(8659208),
  t5: mk(8521760),
  t6: mk(1118340),
  t7: mk(26415797),
  t8: mk(25301124),
  t9: mk(1118480),
  t10: mk(32784),
  t11: mk(4327608),
  t12: mk(4338272),
  t13: mk(4334150),
  t14: mk(8659076),
  t15: mk(33),
  t16: mk(17047684),
  t17: mk(11127911),
  t18: mk(1048564),
  t19: mk(32469896),
  t20: mk(5443856),
  t21: mk(32768),
  t22: mk(2232592),
  t23: mk(2163744),
  t24: mk(16190472),
  t25: mk(126976),
  t26: mk(16777216),
  t27: mk(1),
  t28: mk(34884),
  t29: mk(33858),
  t30: mk(16777344),
  t31: mk(1024),
  t32: mk(32),
  t33: mk(8671362),
  t34: mk(2265155),
  t35: mk(16646),
  t36: mk(168032),
  t37: mk(512),
  t38: mk(38),
  t39: mk(2303526),
  t40: mk(2164769),
  t41: mk(18222080),
  t42: mk(25412033),
  t43: mk(31775),
  t44: mk(508152),
  t45: mk(25276928),
  t46: mk(27332744)
};

export const SPONGEBOB_11_PUZZLE = {
  id: "sb11",
  title: "Patrick 2",
  subtitle: "8×8 · Easy",
  riddle: "I may not be the sharpest tool,\nbut being a starfish is pretty cool.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t1, T.t2, T.t3, T.t4, T.t1, T.t1],  // label 8
    [T.t5, T.t0, T.t6, T.t7, T.t8, T.t4, T.t1, T.t9],  // label 7
    [T.t10, T.t5, T.t11, T.t12, T.t13, T.t14, T.t9, T.t15],  // label 6
    [T.t16, T.t15, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22],  // label 5
    [T.t23, T.t22, T.t24, T.t25, T.t26, T.t27, T.t28, T.t26],  // label 4
    [T.t29, T.t30, T.t1, T.t31, T.t1, T.t32, T.t33, T.t1],  // label 3
    [T.t34, T.t35, T.t36, T.t37, T.t1, T.t38, T.t39, T.t1],  // label 2
    [T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t1]  // label 1
  ],
};
