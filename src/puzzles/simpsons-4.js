import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(1),         t2:  mk(16),        t3:  mk(24),
  t4:  mk(100),       t5:  mk(521),        t6:  mk(528),       t7:  mk(1116),
  t8:  mk(4864),      t9:  mk(15872),      t10: mk(16648),     t11: mk(16864),
  t12: mk(16904),     t13: mk(34952),      t14: mk(63619),     t15: mk(84464),
  t16: mk(131073),    t17: mk(139792),     t18: mk(201992),    t19: mk(540672),
  t20: mk(632481),    t21: mk(1048576),    t22: mk(1081344),   t23: mk(1082406),
  t24: mk(2163744),   t25: mk(2164273),    t26: mk(2166880),   t27: mk(2269696),
  t28: mk(2765424),   t29: mk(4292608),    t30: mk(5335234),   t31: mk(6291456),
  t32: mk(6326408),   t33: mk(7077888),    t34: mk(7610632),   t35: mk(8617984),
  t36: mk(8655185),   t37: mk(9013330),    t38: mk(10641538),  t39: mk(14240688),
  t40: mk(16252961),  t41: mk(16809992),   t42: mk(17043524),  t43: mk(17301504),
  t44: mk(17302592),  t45: mk(18157848),   t46: mk(25165824),  t47: mk(26524160),
  t48: mk(30475392),
};

export const SIMPSONS_4_PUZZLE = {
  id: "sm04",
  title: "Lisa",
  subtitle: "8×8 · Easy",
  riddle: "I play saxophone, love jazz, and fight for causes.\\nThe smartest Simpson by far.\\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t18, T.t5,  T.t27, T.t12, T.t0,  T.t0 ],  // label 8
    [T.t4,  T.t9,  T.t43, T.t31, T.t0,  T.t35, T.t40, T.t19],  // label 7
    [T.t24, T.t2,  T.t0,  T.t0,  T.t6,  T.t2,  T.t26, T.t3 ],  // label 6
    [T.t13, T.t41, T.t15, T.t45, T.t48, T.t17, T.t0,  T.t32],  // label 5
    [T.t29, T.t30, T.t16, T.t36, T.t7,  T.t44, T.t10, T.t42],  // label 4
    [T.t0,  T.t21, T.t28, T.t8,  T.t1,  T.t20, T.t37, T.t46],  // label 3
    [T.t0,  T.t22, T.t11, T.t14, T.t33, T.t23, T.t38, T.t0 ],  // label 2
    [T.t0,  T.t0,  T.t0,  T.t34, T.t39, T.t47, T.t25, T.t0 ],  // label 1
  ],
};
