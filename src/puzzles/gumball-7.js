import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(16),
  t2: mk(248),
  t3: mk(996),
  t4: mk(1142892),
  t5: mk(17318400),
  t6: mk(1092),
  t7: mk(26083328),
  t8: mk(1118472),
  t9: mk(3213380),
  t10: mk(16777216),
  t11: mk(4464912),
  t12: mk(1057),
  t13: mk(17308942),
  t14: mk(3735),
  t15: mk(4473096),
  t16: mk(17318152),
  t17: mk(2164802),
  t18: mk(14909672),
  t19: mk(24216544),
  t20: mk(8929800),
  t21: mk(8523841),
  t22: mk(2164799),
  t23: mk(24849570),
  t24: mk(32571329),
  t25: mk(21636088),
  t26: mk(899),
  t27: mk(28),
  t28: mk(1081344),
  t29: mk(1589768),
  t30: mk(32505856),
  t31: mk(8659074),
  t32: mk(3145728),
  t33: mk(17047824),
  t34: mk(4260864),
  t35: mk(520),
  t36: mk(1048576),
  t37: mk(532610),
  t38: mk(1513536),
  t39: mk(4305424),
  t40: mk(31744),
  t41: mk(1112064),
  t42: mk(790658)
};

export const GUMBALL_7_PUZZLE = {
  id: "gb07",
  title: "Gumball 7",
  subtitle: "8×8 · Medium",
  riddle: "My family is loud, my life's a show,\nwatch my adventures on Cartoon Network's glow.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t0, T.t2, T.t3, T.t4, T.t5, T.t0],  // label 8
    [T.t6, T.t7, T.t8, T.t0, T.t9, T.t10, T.t0, T.t0],  // label 7
    [T.t11, T.t12, T.t13, T.t14, T.t15, T.t0, T.t0, T.t0],  // label 6
    [T.t16, T.t17, T.t18, T.t19, T.t20, T.t0, T.t0, T.t0],  // label 5
    [T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t0],  // label 4
    [T.t0, T.t28, T.t29, T.t30, T.t31, T.t0, T.t32, T.t33],  // label 3
    [T.t0, T.t0, T.t34, T.t35, T.t36, T.t37, T.t38, T.t0],  // label 2
    [T.t0, T.t0, T.t0, T.t39, T.t40, T.t41, T.t42, T.t0]  // label 1
  ],
};
