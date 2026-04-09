import { mk } from "../lib/tiles";

const T = {
  t0: mk(4598089),
  t1: mk(0),
  t2: mk(1),
  t3: mk(4608644),
  t4: mk(9703562),
  t5: mk(532610),
  t6: mk(1082434),
  t7: mk(4262473),
  t8: mk(390),
  t9: mk(4),
  t10: mk(10788996),
  t11: mk(1065223),
  t12: mk(1618016),
  t13: mk(17180),
  t14: mk(17043521),
  t15: mk(7),
  t16: mk(2405555),
  t17: mk(12861580),
  t18: mk(2129953),
  t19: mk(28736),
  t20: mk(16777216),
  t21: mk(3145730),
  t22: mk(18093252),
  t23: mk(8945664),
  t24: mk(9741486),
  t25: mk(8912902),
  t26: mk(17270916),
  t27: mk(919584),
  t28: mk(1048576),
  t29: mk(25165824),
  t30: mk(33825),
  t31: mk(17859616),
  t32: mk(13107200),
  t33: mk(2129920),
  t34: mk(31744),
  t35: mk(31280),
  t36: mk(3247202),
  t37: mk(46),
  t38: mk(14819840),
  t39: mk(6501136),
  t40: mk(15826944),
  t41: mk(17575116),
  t42: mk(13372620),
  t43: mk(1642760)
};

export const CHRISTIAN_6_PUZZLE = {
  id: "ch06",
  title: "Holy Dove",
  subtitle: "8×8 · Easy",
  riddle: "White wings spread in peaceful flight,\nthe Spirit descended like my light.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t1, T.t1, T.t1, T.t1],  // label 8
    [T.t4, T.t5, T.t6, T.t7, T.t1, T.t1, T.t8, T.t9],  // label 7
    [T.t10, T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t17],  // label 6
    [T.t18, T.t19, T.t20, T.t21, T.t22, T.t23, T.t24, T.t25],  // label 5
    [T.t1, T.t26, T.t27, T.t28, T.t29, T.t30, T.t31, T.t32],  // label 4
    [T.t1, T.t33, T.t34, T.t35, T.t1, T.t36, T.t1, T.t1],  // label 3
    [T.t1, T.t1, T.t37, T.t38, T.t2, T.t39, T.t1, T.t1],  // label 2
    [T.t1, T.t40, T.t41, T.t42, T.t43, T.t1, T.t1, T.t1]  // label 1
  ],
};
