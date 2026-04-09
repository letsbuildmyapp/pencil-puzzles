import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(199),
  t2: mk(7),
  t3: mk(405919),
  t4: mk(51),
  t5: mk(528),
  t6: mk(3251608),
  t7: mk(33292288),
  t8: mk(32505856),
  t9: mk(33000480),
  t10: mk(16896),
  t11: mk(1),
  t12: mk(3181694),
  t13: mk(17301504),
  t14: mk(1015008),
  t15: mk(25344),
  t16: mk(3168),
  t17: mk(1048320),
  t18: mk(1048812),
  t19: mk(31863708),
  t20: mk(236768),
  t21: mk(947072),
  t22: mk(25707032),
  t23: mk(12988812),
  t24: mk(229376),
  t25: mk(923714),
  t26: mk(12812288),
  t27: mk(30349411),
  t28: mk(1285152),
  t29: mk(17318684),
  t30: mk(15458),
  t31: mk(2322432),
  t32: mk(1048576),
  t33: mk(17592783),
  t34: mk(15959056),
  t35: mk(1047552),
  t36: mk(811047),
  t37: mk(6709760),
  t38: mk(33),
  t39: mk(14443024),
  t40: mk(30391576),
  t41: mk(32243712)
};

export const WIMPY_KID_4_PUZZLE = {
  id: "dw04",
  title: "Rodrick",
  subtitle: "8×8 · Medium",
  riddle: "Greg's older brother, I front the band,\nLoded Diper rocks across the land.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t0],  // label 8
    [T.t0, T.t1, T.t6, T.t7, T.t8, T.t9, T.t10, T.t0],  // label 7
    [T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t0],  // label 6
    [T.t18, T.t19, T.t0, T.t20, T.t0, T.t0, T.t21, T.t0],  // label 5
    [T.t22, T.t23, T.t0, T.t0, T.t0, T.t0, T.t24, T.t25],  // label 4
    [T.t26, T.t27, T.t28, T.t29, T.t0, T.t0, T.t30, T.t31],  // label 3
    [T.t0, T.t32, T.t33, T.t34, T.t35, T.t36, T.t37, T.t0],  // label 2
    [T.t0, T.t38, T.t39, T.t40, T.t35, T.t41, T.t0, T.t0]  // label 1
  ],
};
