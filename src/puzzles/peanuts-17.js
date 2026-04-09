import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(14),        t2:  mk(15),        t3:  mk(30),
  t4:  mk(1090),      t5:  mk(3204),       t6:  mk(3224),      t7:  mk(24847),
  t8:  mk(32706),     t9:  mk(34784),      t10: mk(34882),     t11: mk(50696),
  t12: mk(99458),     t13: mk(128032),     t14: mk(282720),    t15: mk(540672),
  t16: mk(541184),    t17: mk(790663),     t18: mk(793601),    t19: mk(1015808),
  t20: mk(1048576),   t21: mk(1081344),    t22: mk(1116193),   t23: mk(1523712),
  t24: mk(3305840),   t25: mk(4262088),    t26: mk(4278833),   t27: mk(6324224),
  t28: mk(6430992),   t29: mk(7136448),    t30: mk(7340037),   t31: mk(8128536),
  t32: mk(8929280),   t33: mk(9655040),    t34: mk(9977856),   t35: mk(10683392),
  t36: mk(15204368),  t37: mk(16777390),   t38: mk(17318400),  t39: mk(18253892),
  t40: mk(18400580),  t41: mk(18857984),   t42: mk(21107864),  t43: mk(25174528),
  t44: mk(29729296),  t45: mk(30165641),   t46: mk(32511520),  t47: mk(33554400),
};

export const PEANUTS_17_PUZZLE = {
  id: "pn17",
  title: "Mean Lucy",
  subtitle: "8×8 · Easy",
  riddle: "I pull away the football and fuss and shout.\\nI'm the self-proclaimed queen of the block.\\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t2,  T.t6,  T.t19, T.t38, T.t25, T.t0 ],  // label 8
    [T.t0,  T.t10, T.t37, T.t14, T.t14, T.t14, T.t26, T.t0 ],  // label 7
    [T.t0,  T.t20, T.t42, T.t46, T.t31, T.t43, T.t40, T.t0 ],  // label 6
    [T.t0,  T.t22, T.t32, T.t2,  T.t3,  T.t0,  T.t30, T.t16],  // label 5
    [T.t0,  T.t21, T.t11, T.t47, T.t47, T.t15, T.t28, T.t0 ],  // label 4
    [T.t9,  T.t17, T.t27, T.t18, T.t8,  T.t23, T.t4,  T.t7 ],  // label 3
    [T.t45, T.t1,  T.t44, T.t24, T.t29, T.t13, T.t36, T.t12],  // label 2
    [T.t35, T.t34, T.t39, T.t0,  T.t0,  T.t5,  T.t41, T.t33],  // label 1
  ],
};
