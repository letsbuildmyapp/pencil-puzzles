import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1),
  t2: mk(7936),
  t3: mk(30752),
  t4: mk(772),
  t5: mk(2238032),
  t6: mk(16384),
  t7: mk(2138244),
  t8: mk(16904),
  t9: mk(1082434),
  t10: mk(99),
  t11: mk(792),
  t12: mk(8659076),
  t13: mk(33),
  t14: mk(2164830),
  t15: mk(3244033),
  t16: mk(16),
  t17: mk(3),
  t18: mk(25952272),
  t19: mk(4329604),
  t20: mk(1082402),
  t21: mk(6570512),
  t22: mk(2232452),
  t23: mk(2232450),
  t24: mk(8522752),
  t25: mk(4472832),
  t26: mk(8659472),
  t27: mk(4432144),
  t28: mk(13107200),
  t29: mk(4329538),
  t30: mk(1048576),
  t31: mk(539648),
  t32: mk(1269760),
  t33: mk(33860),
  t34: mk(16777216),
  t35: mk(2130020),
  t36: mk(24769),
  t37: mk(31),
  t38: mk(3475),
  t39: mk(8912896),
  t40: mk(8650752),
  t41: mk(17043584)
};

export const GUMBALL_15_PUZZLE = {
  id: "gb15",
  title: "Gumball 15",
  subtitle: "8×8 · Medium",
  riddle: "My adventures on screen are quite a blast,\nfrom first to last the laughs are unsurpassed.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t0],  // label 8
    [T.t0, T.t0, T.t5, T.t6, T.t0, T.t7, T.t8, T.t0],  // label 7
    [T.t0, T.t9, T.t10, T.t0, T.t0, T.t11, T.t12, T.t13],  // label 6
    [T.t1, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20],  // label 5
    [T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28],  // label 4
    [T.t0, T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t0],  // label 3
    [T.t0, T.t35, T.t36, T.t37, T.t38, T.t39, T.t0, T.t0],  // label 2
    [T.t0, T.t40, T.t0, T.t0, T.t0, T.t41, T.t0, T.t0]  // label 1
  ],
};
