import { mk } from "../lib/tiles";

const T = {
  t0: mk(540),
  t1: mk(0),
  t2: mk(4396337),
  t3: mk(20471336),
  t4: mk(17254339),
  t5: mk(16786),
  t6: mk(796),
  t7: mk(1127324),
  t8: mk(17318416),
  t9: mk(8659074),
  t10: mk(28615046),
  t11: mk(30405384),
  t12: mk(30372864),
  t13: mk(1100742),
  t14: mk(1048576),
  t15: mk(29591618),
  t16: mk(3678208),
  t17: mk(8388608),
  t18: mk(3178496),
  t19: mk(541448),
  t20: mk(2164802),
  t21: mk(33825),
  t22: mk(32513519),
  t23: mk(549656),
  t24: mk(8659335),
  t25: mk(24),
  t26: mk(2164801),
  t27: mk(32997384),
  t28: mk(25690112),
  t29: mk(2232454),
  t30: mk(4786244),
  t31: mk(1082368),
  t32: mk(528),
  t33: mk(12815392),
  t34: mk(25596),
  t35: mk(3273255),
  t36: mk(25173907),
  t37: mk(17309960),
  t38: mk(16269312),
  t39: mk(17268736),
  t40: mk(31988207),
  t41: mk(7572480)
};

export const CHRISTMAS_2_PUZZLE = {
  id: "xm02",
  title: "Reindeer",
  subtitle: "8×8 · Medium",
  riddle: "I soar through the sky pulling Santa's sleigh,\nguiding the way on that cold Christmas day.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t1, T.t1, T.t1, T.t2, T.t1, T.t1],  // label 8
    [T.t3, T.t4, T.t5, T.t6, T.t7, T.t1, T.t8, T.t1],  // label 7
    [T.t9, T.t1, T.t10, T.t11, T.t12, T.t13, T.t1, T.t1],  // label 6
    [T.t14, T.t15, T.t16, T.t17, T.t1, T.t18, T.t19, T.t1],  // label 5
    [T.t1, T.t20, T.t1, T.t21, T.t22, T.t23, T.t24, T.t25],  // label 4
    [T.t1, T.t26, T.t1, T.t1, T.t27, T.t28, T.t29, T.t30],  // label 3
    [T.t1, T.t31, T.t32, T.t1, T.t33, T.t34, T.t35, T.t36],  // label 2
    [T.t1, T.t1, T.t37, T.t1, T.t38, T.t39, T.t40, T.t41]  // label 1
  ],
};
