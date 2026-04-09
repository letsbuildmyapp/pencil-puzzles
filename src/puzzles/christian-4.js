import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(3171),
  t2: mk(25368),
  t3: mk(3),
  t4: mk(31),
  t5: mk(3247231),
  t6: mk(25977631),
  t7: mk(24),
  t8: mk(3244032),
  t9: mk(33521664),
  t10: mk(33524835),
  t11: mk(33547032),
  t12: mk(25952256),
  t13: mk(16),
  t14: mk(3247203),
  t15: mk(25977624),
  t16: mk(1),
  t17: mk(99),
  t18: mk(3248127),
  t19: mk(17318911),
  t20: mk(3247731),
  t21: mk(25977657),
  t22: mk(1083391),
  t23: mk(25977855),
  t24: mk(792),
  t25: mk(3145728),
  t26: mk(32607331),
  t27: mk(33047056),
  t28: mk(20024419),
  t29: mk(27026200),
  t30: mk(32539681),
  t31: mk(33317656),
  t32: mk(25165824),
  t33: mk(17318416),
  t34: mk(3247104),
  t35: mk(25976832),
  t36: mk(1082401),
  t37: mk(3247200),
  t38: mk(17318400),
  t39: mk(1082400),
  t40: mk(25977600)
};

export const CHRISTIAN_4_PUZZLE = {
  id: "ch04",
  title: "Three Crosses",
  subtitle: "8×8 · Medium",
  riddle: "On Calvary's hill we stand in a row,\nthree wooden beams where love did flow.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t0, T.t1, T.t2, T.t0, T.t0, T.t0],  // label 8
    [T.t0, T.t3, T.t4, T.t5, T.t6, T.t4, T.t7, T.t0],  // label 7
    [T.t0, T.t8, T.t9, T.t10, T.t11, T.t9, T.t12, T.t0],  // label 6
    [T.t0, T.t3, T.t13, T.t14, T.t15, T.t16, T.t7, T.t0],  // label 5
    [T.t17, T.t18, T.t19, T.t20, T.t21, T.t22, T.t23, T.t24],  // label 4
    [T.t25, T.t26, T.t27, T.t28, T.t29, T.t30, T.t31, T.t32],  // label 3
    [T.t0, T.t14, T.t33, T.t34, T.t35, T.t36, T.t15, T.t0],  // label 2
    [T.t0, T.t37, T.t38, T.t0, T.t0, T.t39, T.t40, T.t0]  // label 1
  ],
};
