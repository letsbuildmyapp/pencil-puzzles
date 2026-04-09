import { mk } from "../lib/tiles";

const T = {
  t0: mk(33),
  t1: mk(508004),
  t2: mk(16270180),
  t3: mk(17277448),
  t4: mk(984467),
  t5: mk(24769),
  t6: mk(16),
  t7: mk(0),
  t8: mk(1083524),
  t9: mk(9184456),
  t10: mk(4481252),
  t11: mk(10010624),
  t12: mk(25301144),
  t13: mk(8521772),
  t14: mk(4427912),
  t15: mk(9190400),
  t16: mk(8912929),
  t17: mk(24706),
  t18: mk(19440770),
  t19: mk(8655506),
  t20: mk(8667664),
  t21: mk(1081344),
  t22: mk(2343477),
  t23: mk(920594),
  t24: mk(51584),
  t25: mk(2663729),
  t26: mk(10823845),
  t27: mk(17318152),
  t28: mk(1556481),
  t29: mk(2281797),
  t30: mk(11671828),
  t31: mk(12134738),
  t32: mk(26248226),
  t33: mk(8654978),
  t34: mk(7390760),
  t35: mk(3695583),
  t36: mk(3782687),
  t37: mk(15237404),
  t38: mk(16912),
  t39: mk(2164868),
  t40: mk(2129920),
  t41: mk(16678),
  t42: mk(4261856),
  t43: mk(33005161),
  t44: mk(11898844),
  t45: mk(26808607),
  t46: mk(50),
  t47: mk(8667136),
  t48: mk(7),
  t49: mk(7476192),
  t50: mk(920600),
  t51: mk(12968160),
  t52: mk(2039680),
  t53: mk(127014),
  t54: mk(13246208),
  t55: mk(774)
};

export const SPONGEBOB_6_PUZZLE = {
  id: "sb06",
  title: "Sandy",
  subtitle: "8×8 · Medium",
  riddle: "A Texas squirrel in a dome of air,\nkarate and science — I do it all with flair.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t8, T.t9, T.t10, T.t11, T.t5, T.t12, T.t13, T.t6],  // label 7
    [T.t14, T.t15, T.t16, T.t17, T.t7, T.t7, T.t18, T.t19],  // label 6
    [T.t20, T.t7, T.t21, T.t22, T.t23, T.t24, T.t25, T.t26],  // label 5
    [T.t27, T.t0, T.t28, T.t29, T.t30, T.t31, T.t7, T.t32],  // label 4
    [T.t33, T.t21, T.t34, T.t35, T.t36, T.t37, T.t38, T.t39],  // label 3
    [T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t47],  // label 2
    [T.t48, T.t49, T.t50, T.t51, T.t52, T.t53, T.t54, T.t55]  // label 1
  ],
};
