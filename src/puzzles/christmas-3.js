import { mk } from "../lib/tiles";

const T = {
  t0: mk(26095811),
  t1: mk(3178496),
  t2: mk(17588614),
  t3: mk(6360096),
  t4: mk(33891),
  t5: mk(30306964),
  t6: mk(3346688),
  t7: mk(1),
  t8: mk(1048576),
  t9: mk(17571840),
  t10: mk(2196480),
  t11: mk(17160),
  t12: mk(7585279),
  t13: mk(21106820),
  t14: mk(3355392),
  t15: mk(549888),
  t16: mk(32719),
  t17: mk(30776),
  t18: mk(36833),
  t19: mk(32472030),
  t20: mk(4329671),
  t21: mk(2097168),
  t22: mk(1124),
  t23: mk(17344),
  t24: mk(7372800),
  t25: mk(32505059),
  t26: mk(556030),
  t27: mk(29759470),
  t28: mk(16777184),
  t29: mk(32505824),
  t30: mk(556007),
  t31: mk(111),
  t32: mk(15248),
  t33: mk(1082434),
  t34: mk(29918311),
  t35: mk(29224563),
  t36: mk(550876),
  t37: mk(1523712),
  t38: mk(25165828),
  t39: mk(29884416),
  t40: mk(0),
  t41: mk(4334131),
  t42: mk(16777180),
  t43: mk(1099049),
  t44: mk(30307228),
  t45: mk(137313),
  t46: mk(3178512),
  t47: mk(1127184),
  t48: mk(1083461),
  t49: mk(7863192),
  t50: mk(25166883),
  t51: mk(4327489),
  t52: mk(30307212),
  t53: mk(1048584),
  t54: mk(26097891),
  t55: mk(7846656),
  t56: mk(16777216),
  t57: mk(2300300),
  t58: mk(13529996),
  t59: mk(12720195)
};

export const CHRISTMAS_3_PUZZLE = {
  id: "xm03",
  title: "Christmas Star",
  subtitle: "8×8 · Easy",
  riddle: "I shine at the top of the evergreen tree,\nwinkling with hope for all those who see.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t7, T.t14],  // label 7
    [T.t15, T.t16, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22],  // label 6
    [T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29, T.t30],  // label 5
    [T.t31, T.t32, T.t33, T.t34, T.t35, T.t36, T.t37, T.t38],  // label 4
    [T.t39, T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46],  // label 3
    [T.t47, T.t48, T.t49, T.t50, T.t51, T.t52, T.t53, T.t54],  // label 2
    [T.t40, T.t55, T.t56, T.t57, T.t8, T.t58, T.t59, T.t8]  // label 1
  ],
};
