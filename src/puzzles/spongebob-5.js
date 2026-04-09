import { mk } from "../lib/tiles";

const T = {
  t0: mk(2129920),
  t1: mk(4793474),
  t2: mk(520),
  t3: mk(21571877),
  t4: mk(415),
  t5: mk(1024),
  t6: mk(34345),
  t7: mk(1092),
  t8: mk(4),
  t9: mk(1052804),
  t10: mk(8978428),
  t11: mk(30368782),
  t12: mk(17044114),
  t13: mk(4219970),
  t14: mk(8408328),
  t15: mk(2129935),
  t16: mk(4341763),
  t17: mk(2443297),
  t18: mk(4327489),
  t19: mk(15138832),
  t20: mk(10790194),
  t21: mk(1082450),
  t22: mk(8659472),
  t23: mk(4328448),
  t24: mk(18358922),
  t25: mk(541992),
  t26: mk(15761077),
  t27: mk(7154143),
  t28: mk(22734916),
  t29: mk(0),
  t30: mk(5309440),
  t31: mk(5112582),
  t32: mk(16235652),
  t33: mk(33547553),
  t34: mk(4464772),
  t35: mk(1082368),
  t36: mk(2164240),
  t37: mk(1084288),
  t38: mk(4329604),
  t39: mk(17047812),
  t40: mk(3),
  t41: mk(4465416),
  t42: mk(5412002),
  t43: mk(30441472),
  t44: mk(8667136)
};

export const SPONGEBOB_5_PUZZLE = {
  id: "sb05",
  title: "Plankton",
  subtitle: "8×8 · Hard",
  riddle: "One eye, one goal, one tiny dream,\nsteal that secret recipe by any scheme.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t8, T.t9, T.t1, T.t10, T.t11, T.t12, T.t13, T.t14],  // label 7
    [T.t15, T.t16, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22],  // label 6
    [T.t7, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29],  // label 5
    [T.t29, T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t29],  // label 4
    [T.t29, T.t29, T.t29, T.t35, T.t36, T.t37, T.t38, T.t29],  // label 3
    [T.t29, T.t29, T.t29, T.t29, T.t39, T.t40, T.t41, T.t29],  // label 2
    [T.t29, T.t29, T.t29, T.t29, T.t42, T.t43, T.t44, T.t29]  // label 1
  ],
};
