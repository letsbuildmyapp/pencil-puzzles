import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(1),         t2:  mk(3),         t3:  mk(100),
  t4:  mk(496),       t5:  mk(520),        t6:  mk(899),       t7:  mk(961),
  t8:  mk(16648),     t9:  mk(31771),      t10: mk(39680),     t11: mk(536641),
  t12: mk(1032964),   t13: mk(1081344),    t14: mk(1082401),   t15: mk(1152264),
  t16: mk(2130976),   t17: mk(2163715),    t18: mk(2232468),   t19: mk(4063232),
  t20: mk(4328515),   t21: mk(4473360),    t22: mk(6570000),   t23: mk(8388640),
  t24: mk(8524548),   t25: mk(8659209),    t26: mk(8675396),   t27: mk(8692864),
  t28: mk(9500673),   t29: mk(9740552),    t30: mk(14746657),  t31: mk(16252928),
  t32: mk(16777216),  t33: mk(17047684),   t34: mk(17082760),  t35: mk(17309960),
  t36: mk(21127300),  t37: mk(21594136),   t38: mk(25182468),  t39: mk(25668576),
  t40: mk(29433938),  t41: mk(31490048),
};

export const SIMPSONS_9_PUZZLE = {
  id: "sm09",
  title: "Apu",
  subtitle: "8×8 · Easy",
  riddle: "Thank you, come again! I run the Kwik-E-Mart day and night.\\nSpringfield's most dedicated (and overworked) shopkeeper.\\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t10, T.t31, T.t41, T.t11, T.t0,  T.t0 ],  // label 8
    [T.t2,  T.t18, T.t1,  T.t4,  T.t6,  T.t0,  T.t35, T.t0 ],  // label 7
    [T.t21, T.t23, T.t22, T.t0,  T.t0,  T.t34, T.t32, T.t0 ],  // label 6
    [T.t33, T.t0,  T.t25, T.t7,  T.t3,  T.t24, T.t0,  T.t0 ],  // label 5
    [T.t16, T.t40, T.t29, T.t28, T.t20, T.t36, T.t0,  T.t0 ],  // label 4
    [T.t0,  T.t30, T.t26, T.t17, T.t9,  T.t37, T.t8,  T.t0 ],  // label 3
    [T.t0,  T.t14, T.t27, T.t39, T.t12, T.t19, T.t32, T.t0 ],  // label 2
    [T.t0,  T.t15, T.t5,  T.t13, T.t38, T.t0,  T.t0,  T.t0 ],  // label 1
  ],
};
