import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(4),         t3:  mk(7),         t4:  mk(16),
  t5:  mk(28),        t6:  mk(68),        t7:  mk(1090),      t8:  mk(3208),
  t9:  mk(16770),     t10: mk(16864),     t11: mk(16904),     t12: mk(63471),
  t13: mk(63874),     t14: mk(984064),    t15: mk(1081344),   t16: mk(1090724),
  t17: mk(1116226),   t18: mk(1118472),   t19: mk(2164868),   t20: mk(2333796),
  t21: mk(3145728),   t22: mk(3382499),   t23: mk(4261954),   t24: mk(4329604),
  t25: mk(4329744),   t26: mk(4472832),   t27: mk(4473344),   t28: mk(8659076),
  t29: mk(8912896),   t30: mk(16777216),  t31: mk(17047683),  t32: mk(17047684),
  t33: mk(17318416),  t34: mk(18907664),  t35: mk(25165824),  t36: mk(25363456),
  t37: mk(31524368),
};

export const PEANUTS_2_PUZZLE = {
  id: "pn02",
  title: "Snoopy",
  subtitle: "8×8 · Easy",
  riddle: "I'm Charlie Brown's loyal beagle.\nI sleep on top of my doghouse and dream of being a WWI flying ace.\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t3,  T.t5,  T.t8,  T.t14, T.t9,  T.t0 ],  // label 8
    [T.t0,  T.t18, T.t35, T.t21, T.t34, T.t0,  T.t15, T.t11],  // label 7
    [T.t22, T.t33, T.t0,  T.t0,  T.t30, T.t0,  T.t2,  T.t28],  // label 6
    [T.t0,  T.t31, T.t0,  T.t0,  T.t6,  T.t7,  T.t29, T.t23],  // label 5
    [T.t0,  T.t0,  T.t36, T.t13, T.t29, T.t24, T.t0,  T.t19],  // label 4
    [T.t0,  T.t0,  T.t0,  T.t20, T.t12, T.t37, T.t10, T.t26],  // label 3
    [T.t0,  T.t0,  T.t1,  T.t27, T.t16, T.t4,  T.t0,  T.t0 ],  // label 2
    [T.t0,  T.t0,  T.t17, T.t0,  T.t25, T.t32, T.t0,  T.t0 ],  // label 1
  ],
};
