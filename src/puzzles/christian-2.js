import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(124),
  t2: mk(47616),
  t3: mk(7110656),
  t4: mk(16648),
  t5: mk(1127),
  t6: mk(3555856),
  t7: mk(128),
  t8: mk(2621580),
  t9: mk(131072),
  t10: mk(4328001),
  t11: mk(6693128),
  t12: mk(25964942),
  t13: mk(262144),
  t14: mk(6491233),
  t15: mk(3580),
  t16: mk(1179650),
  t17: mk(540936),
  t18: mk(4361313),
  t19: mk(32361505),
  t20: mk(8389138),
  t21: mk(8347648),
  t22: mk(25964934),
  t23: mk(4327456),
  t24: mk(16),
  t25: mk(1048576),
  t26: mk(4096),
  t27: mk(6392865),
  t28: mk(528),
  t29: mk(17047684),
  t30: mk(4327489),
  t31: mk(6397437),
  t32: mk(26091566),
  t33: mk(7936),
  t34: mk(4997648),
  t35: mk(25960708),
  t36: mk(25968408),
  t37: mk(4063232),
  t38: mk(16777217),
  t39: mk(248),
  t40: mk(12738560),
  t41: mk(4262944),
  t42: mk(17327096),
  t43: mk(126976),
  t44: mk(15204352)
};

export const CHRISTIAN_2_PUZZLE = {
  id: "ch02",
  title: "Ichthys Fish",
  subtitle: "8×8 · Easy",
  riddle: "Two arcs that cross to form a sign,\na ancient symbol, faith's design.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t0],  // label 8
    [T.t5, T.t6, T.t7, T.t8, T.t9, T.t10, T.t0, T.t0],  // label 7
    [T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t0],  // label 6
    [T.t18, T.t19, T.t20, T.t21, T.t22, T.t7, T.t23, T.t24],  // label 5
    [T.t25, T.t17, T.t22, T.t26, T.t27, T.t28, T.t0, T.t29],  // label 4
    [T.t0, T.t30, T.t31, T.t28, T.t0, T.t32, T.t33, T.t34],  // label 3
    [T.t0, T.t0, T.t35, T.t36, T.t37, T.t38, T.t39, T.t40],  // label 2
    [T.t0, T.t0, T.t41, T.t42, T.t43, T.t44, T.t0, T.t0]  // label 1
  ],
};
