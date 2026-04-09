import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(33825),    t2:  mk(29470785), t3:  mk(1270272),  t4:  mk(32505856),
  t5:  mk(17173536), t6:  mk(8132880),  t7:  mk(541200),
  t8:  mk(19542280), t9:  mk(15894),    t10: mk(17738),    t11: mk(30777),
  t12: mk(9607234),
  t13: mk(1058),     t14: mk(17318416), t15: mk(23609824), t16: mk(10824224),
  t17: mk(26249152), t18: mk(1082401),  t19: mk(16904),    t20: mk(24),
  t21: mk(2232584),  t22: mk(17309956), t23: mk(34882),    t24: mk(32506747),
  t25: mk(532744),   t26: mk(1083460),  t27: mk(9605186),  t28: mk(4286532),
  t29: mk(8659208),  t30: mk(4260864),  t31: mk(2164236),  t32: mk(992),
  t33: mk(8667174),  t34: mk(4472832),  t35: mk(3213378),  t36: mk(25165824),
  t37: mk(8659076),  t38: mk(3145728),  t39: mk(2164868),
  t40: mk(2163712),  t41: mk(521),      t42: mk(961),      t43: mk(496),
  t44: mk(50),       t45: mk(8667136),
  t46: mk(6426755),  t47: mk(270623),   t48: mk(18295121), t49: mk(67679),
  t50: mk(12718232),
};

export const PIG_PUZZLE = {
  id: "a03", title: "Pig", subtitle: "8×8 · Easy",
  riddle: "I roll in mud to keep cool,\nmy tail curls like a spring.\nOink oink - do you know me?\nWhat am I?",
  solution: [
    [T.t1,  T.t2,  T.t3,  T.t4,  T.t5,  T.t6,  T.t7,  T.t0 ],  // label 8
    [T.t0,  T.t8,  T.t9,  T.t10, T.t11, T.t12, T.t0,  T.t0 ],  // label 7
    [T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20],  // label 6
    [T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28],  // label 5
    [T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t35, T.t36],  // label 4
    [T.t37, T.t0,  T.t38, T.t4,  T.t36, T.t0,  T.t39, T.t0 ],  // label 3
    [T.t40, T.t41, T.t42, T.t0,  T.t43, T.t44, T.t45, T.t0 ],  // label 2
    [T.t0,  T.t46, T.t47, T.t48, T.t49, T.t50, T.t0,  T.t0 ],  // label 1
  ],
};
