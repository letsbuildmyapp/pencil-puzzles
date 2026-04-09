import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(100),
  t2: mk(254480),
  t3: mk(1015808),
  t4: mk(790624),
  t5: mk(16),
  t6: mk(1058),
  t7: mk(8912896),
  t8: mk(17318416),
  t9: mk(34),
  t10: mk(253953),
  t11: mk(792624),
  t12: mk(8521809),
  t13: mk(2309615),
  t14: mk(2232452),
  t15: mk(3382503),
  t16: mk(26112924),
  t17: mk(18132331),
  t18: mk(549656),
  t19: mk(16235714),
  t20: mk(17318423),
  t21: mk(4329554),
  t22: mk(7576673),
  t23: mk(30307088),
  t24: mk(11906611),
  t25: mk(25977344),
  t26: mk(2129920),
  t27: mk(28768),
  t28: mk(17548256),
  t29: mk(1573391),
  t30: mk(793724),
  t31: mk(1271744),
  t32: mk(4472832),
  t33: mk(33),
  t34: mk(524048),
  t35: mk(17318420),
  t36: mk(2198594),
  t37: mk(948451),
  t38: mk(1082468),
  t39: mk(17318660),
  t40: mk(17334249),
  t41: mk(2194372),
  t42: mk(3383556),
  t43: mk(532752),
  t44: mk(4259840),
  t45: mk(4456448),
  t46: mk(9747966),
  t47: mk(4354974)
};

export const GUMBALL_11_PUZZLE = {
  id: "gb11",
  title: "Gumball 11",
  subtitle: "8×8 · Medium",
  riddle: "A cat with heart and curiosity too,\nno matter the problem I'll see it through.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t3, T.t4, T.t5, T.t0],  // label 8
    [T.t6, T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t0],  // label 7
    [T.t13, T.t0, T.t8, T.t14, T.t15, T.t16, T.t17, T.t18],  // label 6
    [T.t19, T.t0, T.t20, T.t21, T.t22, T.t23, T.t24, T.t25],  // label 5
    [T.t26, T.t27, T.t28, T.t29, T.t30, T.t31, T.t32, T.t0],  // label 4
    [T.t0, T.t33, T.t34, T.t35, T.t36, T.t37, T.t0, T.t0],  // label 3
    [T.t0, T.t38, T.t39, T.t40, T.t41, T.t42, T.t43, T.t0],  // label 2
    [T.t0, T.t44, T.t45, T.t46, T.t47, T.t0, T.t0, T.t0]  // label 1
  ],
};
