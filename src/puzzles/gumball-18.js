import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1057),
  t2: mk(17301504),
  t3: mk(4261921),
  t4: mk(1116228),
  t5: mk(4261954),
  t6: mk(1048576),
  t7: mk(540932),
  t8: mk(1082401),
  t9: mk(4329604),
  t10: mk(4333840),
  t11: mk(1),
  t12: mk(2208256),
  t13: mk(32505856),
  t14: mk(18287616),
  t15: mk(520),
  t16: mk(1116227),
  t17: mk(32),
  t18: mk(492481),
  t19: mk(1016056),
  t20: mk(525056),
  t21: mk(8523916),
  t22: mk(3247202),
  t23: mk(26188981),
  t24: mk(25567),
  t25: mk(1263),
  t26: mk(1571674),
  t27: mk(30290324),
  t28: mk(2164802),
  t29: mk(19173441),
  t30: mk(30537981),
  t31: mk(29237195),
  t32: mk(21285016),
  t33: mk(21106820),
  t34: mk(1246272),
  t35: mk(540244),
  t36: mk(5405959),
  t37: mk(10583598),
  t38: mk(31874),
  t39: mk(9118352),
  t40: mk(7475330),
  t41: mk(25602559),
  t42: mk(1415151),
  t43: mk(31524948)
};

export const GUMBALL_18_PUZZLE = {
  id: "gb18",
  title: "Gumball 18",
  subtitle: "8×8 · Easy",
  riddle: "From Elmore with love I bring the fun,\na blue cat's story never truly done.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t5, T.t0],  // label 8
    [T.t0, T.t6, T.t7, T.t8, T.t9, T.t0, T.t10, T.t0],  // label 7
    [T.t0, T.t11, T.t12, T.t13, T.t13, T.t14, T.t15, T.t0],  // label 6
    [T.t0, T.t16, T.t17, T.t18, T.t19, T.t20, T.t21, T.t0],  // label 5
    [T.t0, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t0],  // label 4
    [T.t0, T.t28, T.t29, T.t30, T.t31, T.t32, T.t33, T.t0],  // label 3
    [T.t0, T.t34, T.t35, T.t36, T.t37, T.t38, T.t39, T.t0],  // label 2
    [T.t0, T.t0, T.t40, T.t41, T.t42, T.t43, T.t0, T.t0]  // label 1
  ],
};
