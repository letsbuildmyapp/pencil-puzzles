import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1118480),
  t2: mk(17043521),
  t3: mk(1083460),
  t4: mk(1118472),
  t5: mk(17043522),
  t6: mk(17309956),
  t7: mk(4465969),
  t8: mk(17301504),
  t9: mk(1081344),
  t10: mk(4278865),
  t11: mk(34),
  t12: mk(18477569),
  t13: mk(16253176),
  t14: mk(31490947),
  t15: mk(10265913),
  t16: mk(520),
  t17: mk(4473924),
  t18: mk(8168712),
  t19: mk(528),
  t20: mk(33),
  t21: mk(18401346),
  t22: mk(4277508),
  t23: mk(2232585),
  t24: mk(8667648),
  t25: mk(4327489),
  t26: mk(8654913),
  t27: mk(2167056),
  t28: mk(4333840),
  t29: mk(2163744),
  t30: mk(8523858),
  t31: mk(18358403),
  t32: mk(538656),
  t33: mk(3968),
  t34: mk(17567811),
  t35: mk(9636888),
  t36: mk(24800),
  t37: mk(47616),
  t38: mk(17860760),
  t39: mk(29458432),
  t40: mk(1015808),
  t41: mk(29360128),
  t42: mk(7340032),
  t43: mk(8126464)
};

export const PUZZLES_1_PUZZLE = {
  id: "pz01",
  title: "Trinity Knot",
  subtitle: "8×8 · Medium",
  riddle: "Three loops intertwined in perfect grace,\na Celtic symbol locked in endless space.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t0, T.t1, T.t2, T.t0, T.t0, T.t0],  // label 8
    [T.t0, T.t0, T.t3, T.t4, T.t5, T.t6, T.t0, T.t0],  // label 7
    [T.t0, T.t0, T.t7, T.t8, T.t9, T.t10, T.t0, T.t0],  // label 6
    [T.t0, T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t0],  // label 5
    [T.t11, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22, T.t16],  // label 4
    [T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29, T.t30],  // label 3
    [T.t31, T.t32, T.t33, T.t34, T.t35, T.t36, T.t37, T.t38],  // label 2
    [T.t0, T.t39, T.t40, T.t41, T.t42, T.t40, T.t43, T.t0]  // label 1
  ],
};
