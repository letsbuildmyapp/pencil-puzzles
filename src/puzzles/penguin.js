import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(245759), t2: mk(1048575), t3: mk(949247),
  t4: mk(33554431), t5: mk(16784615), t6: mk(7458419), t7: mk(30307228),
  t8: mk(17825791), t9: mk(8388607), t10: mk(29901328), t11: mk(33012963),
  t12: mk(17588736), t13: mk(114175), t14: mk(1860376), t15: mk(32742631),
  t16: mk(32404380), t17: mk(101475), t18: mk(818143), t19: mk(33792),
  t20: mk(33553408), t21: mk(30373888), t22: mk(16776192), t23: mk(32504832),
  t24: mk(7846912), t25: mk(540672),
};

export const PENGUIN_PUZZLE = {
  id: "a06", title: "Penguin", subtitle: "8×8 · Medium",
  riddle: "I wear a tuxedo every day,\nI swim but cannot fly.\nI waddle on the ice with pride.\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t1,  T.t2,  T.t2,  T.t3,  T.t0,  T.t0 ],
    [T.t0,  T.t0,  T.t4,  T.t5,  T.t6,  T.t7,  T.t0,  T.t0 ],
    [T.t0,  T.t0,  T.t4,  T.t8,  T.t9,  T.t10, T.t0,  T.t0 ],
    [T.t0,  T.t0,  T.t11, T.t4,  T.t4,  T.t12, T.t0,  T.t0 ],
    [T.t0,  T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t0 ],
    [T.t19, T.t20, T.t21, T.t22, T.t23, T.t24, T.t20, T.t25],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0 ],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0 ],
  ],
};
