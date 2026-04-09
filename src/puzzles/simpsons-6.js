import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(1),         t2:  mk(3),         t3:  mk(16),
  t4:  mk(33),        t5:  mk(100),        t6:  mk(527),       t7:  mk(899),
  t8:  mk(16912),     t9:  mk(24769),      t10: mk(31810),     t11: mk(34952),
  t12: mk(126976),    t13: mk(127560),     t14: mk(411722),    t15: mk(792608),
  t16: mk(793617),    t17: mk(1015808),    t18: mk(1048576),   t19: mk(1116226),
  t20: mk(1287714),   t21: mk(2163712),    t22: mk(2164768),   t23: mk(2666628),
  t24: mk(4327489),   t25: mk(4329604),    t26: mk(4349952),   t27: mk(4985633),
  t28: mk(7364608),   t29: mk(8617999),    t30: mk(8675328),   t31: mk(8688804),
  t32: mk(8929808),   t33: mk(9748992),    t34: mk(13108290),  t35: mk(16268800),
  t36: mk(16777216),  t37: mk(17047715),   t38: mk(17245448),  t39: mk(17309828),
  t40: mk(25436432),  t41: mk(25690112),   t42: mk(29458470),  t43: mk(32505856),
  t44: mk(32600064),
};

export const SIMPSONS_6_PUZZLE = {
  id: "sm06",
  title: "Mr. Burns",
  subtitle: "8×8 · Easy",
  riddle: "Excellent! I run the nuclear power plant and scheme against everyone.\\nSpringfield's richest and most villainous old man.\\nWhat am I?",
  solution: [
    [T.t0,  T.t2,  T.t5,  T.t12, T.t17, T.t9,  T.t0,  T.t0 ],  // label 8
    [T.t11, T.t34, T.t41, T.t0,  T.t0,  T.t0,  T.t39, T.t0 ],  // label 7
    [T.t32, T.t22, T.t3,  T.t0,  T.t0,  T.t0,  T.t25, T.t0 ],  // label 6
    [T.t37, T.t14, T.t31, T.t16, T.t10, T.t13, T.t40, T.t0 ],  // label 5
    [T.t18, T.t23, T.t26, T.t29, T.t27, T.t28, T.t15, T.t3 ],  // label 4
    [T.t0,  T.t24, T.t4,  T.t7,  T.t3,  T.t43, T.t38, T.t30],  // label 3
    [T.t1,  T.t20, T.t0,  T.t42, T.t35, T.t44, T.t36, T.t0 ],  // label 2
    [T.t19, T.t21, T.t6,  T.t33, T.t8,  T.t0,  T.t0,  T.t0 ],  // label 1
  ],
};
