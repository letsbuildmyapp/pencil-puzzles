import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(1),         t2:  mk(16),        t3:  mk(19),
  t4:  mk(520),       t5:  mk(524),        t6:  mk(1089),      t7:  mk(6448),
  t8:  mk(16864),     t9:  mk(31744),      t10: mk(35712),     t11: mk(63520),
  t12: mk(152146),    t13: mk(536130),     t14: mk(571936),    t15: mk(920576),
  t16: mk(1024465),   t17: mk(1098816),    t18: mk(2163712),   t19: mk(2163745),
  t20: mk(2462472),   t21: mk(3285520),    t22: mk(3382369),   t23: mk(4326996),
  t24: mk(4328584),   t25: mk(4329604),    t26: mk(4985922),   t27: mk(6354944),
  t28: mk(8618190),   t29: mk(8659137),    t30: mk(9310270),   t31: mk(10004612),
  t32: mk(10556160),  t33: mk(12582912),   t34: mk(16269584),  t35: mk(17173504),
  t36: mk(17301504),  t37: mk(19440768),   t38: mk(21038668),  t39: mk(21383724),
  t40: mk(27949096),  t41: mk(31220720),
};

export const SIMPSONS_5_PUZZLE = {
  id: "sm05",
  title: "Maggie",
  subtitle: "8×8 · Easy",
  riddle: "I'm always seen with my red pacifier, crawling around.\\nThe baby of the family, but full of surprises.\\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t7,  T.t3,  T.t2,  T.t0,  T.t0,  T.t0 ],  // label 8
    [T.t1,  T.t34, T.t14, T.t33, T.t29, T.t0,  T.t0,  T.t0 ],  // label 7
    [T.t18, T.t20, T.t31, T.t26, T.t6,  T.t36, T.t0,  T.t0 ],  // label 6
    [T.t0,  T.t24, T.t39, T.t32, T.t13, T.t36, T.t0,  T.t0 ],  // label 5
    [T.t0,  T.t28, T.t16, T.t30, T.t40, T.t5,  T.t0,  T.t0 ],  // label 4
    [T.t22, T.t41, T.t10, T.t12, T.t25, T.t19, T.t0,  T.t0 ],  // label 3
    [T.t0,  T.t0,  T.t21, T.t37, T.t23, T.t17, T.t15, T.t4 ],  // label 2
    [T.t0,  T.t0,  T.t35, T.t11, T.t38, T.t8,  T.t9,  T.t27],  // label 1
  ],
};
