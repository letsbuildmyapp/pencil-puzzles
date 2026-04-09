import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(7),         t3:  mk(16),        t4:  mk(24),
  t5:  mk(124),       t6:  mk(520),       t7:  mk(32264),     t8:  mk(111491),
  t9:  mk(792608),    t10: mk(1048576),   t11: mk(1082368),   t12: mk(1556487),
  t13: mk(2165136),   t14: mk(2670863),   t15: mk(2716605),   t16: mk(3388184),
  t17: mk(3570948),   t18: mk(4329736),   t19: mk(4426784),   t20: mk(6359107),
  t21: mk(6913602),   t22: mk(7094800),   t23: mk(7340032),   t24: mk(7618595),
  t25: mk(8126447),   t26: mk(8126488),   t27: mk(8521761),   t28: mk(8523908),
  t29: mk(8540490),   t30: mk(8571172),   t31: mk(8659204),   t32: mk(10635556),
  t33: mk(12782624),  t34: mk(13107200),  t35: mk(13195726),  t36: mk(16236015),
  t37: mk(16252927),  t38: mk(17301504),  t39: mk(18944900),  t40: mk(19439746),
  t41: mk(20565627),  t42: mk(21042449),  t43: mk(27197439),  t44: mk(29427864),
  t45: mk(29458432),  t46: mk(31357874),  t47: mk(31425537),  t48: mk(32438205),
  t49: mk(32488943),  t50: mk(32505856),  t51: mk(32569440),  t52: mk(32607343),
  t53: mk(32742342),  t54: mk(33309203),  t55: mk(33538052),
};

export const LOONEY_TUNES_10_PUZZLE = {
  id: "lt10",
  title: "Marvin the Martian",
  subtitle: "8×8 · Medium",
  riddle: "I come from outer space with a helmet and a ray gun.\nI want to destroy Earth, but where's the kaboom?\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t0,  T.t11, T.t7,  T.t12, T.t30, T.t42],  // label 8
    [T.t1,  T.t5,  T.t8,  T.t26, T.t50, T.t45, T.t40, T.t32],  // label 7
    [T.t22, T.t0,  T.t0,  T.t23, T.t9,  T.t3,  T.t10, T.t14],  // label 6
    [T.t31, T.t0,  T.t2,  T.t3,  T.t0,  T.t27, T.t4,  T.t28],  // label 5
    [T.t19, T.t53, T.t52, T.t54, T.t49, T.t15, T.t35, T.t18],  // label 4
    [T.t6,  T.t20, T.t36, T.t41, T.t37, T.t46, T.t21, T.t38],  // label 3
    [T.t29, T.t16, T.t25, T.t43, T.t48, T.t34, T.t13, T.t0 ],  // label 2
    [T.t39, T.t33, T.t24, T.t55, T.t47, T.t17, T.t51, T.t44],  // label 1
  ],
};
