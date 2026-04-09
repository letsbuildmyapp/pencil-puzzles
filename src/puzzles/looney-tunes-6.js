import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(3),         t2:  mk(16),        t3:  mk(28),        t4:  mk(33),
  t5:  mk(899),       t6:  mk(1124),      t7:  mk(1226),      t8:  mk(1612),
  t9:  mk(253952),    t10: mk(532744),    t11: mk(541208),    t12: mk(1081344),
  t13: mk(1082368),   t14: mk(1082401),   t15: mk(1088808),   t16: mk(2133888),
  t17: mk(2167944),   t18: mk(2236929),   t19: mk(3112990),   t20: mk(3145728),
  t21: mk(3319344),   t22: mk(3668546),   t23: mk(4064228),   t24: mk(4327490),
  t25: mk(4334080),   t26: mk(4334096),   t27: mk(4473360),   t28: mk(8654980),
  t29: mk(8659076),   t30: mk(8900166),   t31: mk(8912897),   t32: mk(8929280),
  t33: mk(12616738),  t34: mk(12814336),  t35: mk(15153375),  t36: mk(16778306),
  t37: mk(17173538),  t38: mk(17191680),  t39: mk(17301504),  t40: mk(17309960),
  t41: mk(17310912),  t42: mk(17318408),  t43: mk(17318416),  t44: mk(17825792),
  t45: mk(25301132),  t46: mk(29360129),  t47: mk(30310147),  t48: mk(33488896),
};

export const LOONEY_TUNES_6_PUZZLE = {
  id: "lt06", title: "Rooster", subtitle: "8×8 · Easy",
  riddle: "I say, I say, son — pay attention!\nI'm the biggest bird in the barnyard, no question.\nFoghorn is my name!\nWhat am I?",
  solution: [
    [T.t0,  T.t4,  T.t32, T.t6,  T.t23, T.t5,  T.t26, T.t0 ],  // label 8
    [T.t0,  T.t0,  T.t41, T.t31, T.t30, T.t45, T.t28, T.t0 ],  // label 7
    [T.t0,  T.t1,  T.t3,  T.t15, T.t35, T.t47, T.t19, T.t10],  // label 6
    [T.t0,  T.t27, T.t20, T.t48, T.t38, T.t33, T.t36, T.t43],  // label 5
    [T.t14, T.t0,  T.t0,  T.t0,  T.t1,  T.t18, T.t25, T.t42],  // label 4
    [T.t12, T.t11, T.t7,  T.t9,  T.t46, T.t21, T.t2,  T.t29],  // label 3
    [T.t0,  T.t34, T.t44, T.t37, T.t22, T.t0,  T.t40, T.t24],  // label 2
    [T.t0,  T.t0,  T.t0,  T.t17, T.t16, T.t8,  T.t39, T.t13],  // label 1
  ],
};
