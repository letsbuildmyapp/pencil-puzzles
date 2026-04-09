import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(2),         t3:  mk(4),         t4:  mk(16),
  t5:  mk(32),        t6:  mk(33),        t7:  mk(100),       t8:  mk(520),
  t9:  mk(772),       t10: mk(1279),      t11: mk(3472),      t12: mk(4324),
  t13: mk(8704),      t14: mk(16648),     t15: mk(18882),     t16: mk(24800),
  t17: mk(29695),     t18: mk(33826),     t19: mk(532976),    t20: mk(792608),
  t21: mk(1048978),   t22: mk(1081344),   t23: mk(1082436),   t24: mk(1116376),
  t25: mk(1118480),   t26: mk(2097168),   t27: mk(2129920),   t28: mk(2574336),
  t29: mk(3281720),   t30: mk(4260912),   t31: mk(4292608),   t32: mk(4332672),
  t33: mk(4456448),   t34: mk(4608585),   t35: mk(7478407),   t36: mk(8388608),
  t37: mk(8666512),   t38: mk(8667136),   t39: mk(8912896),   t40: mk(13204062),
  t41: mk(15961120),  t42: mk(16236015),  t43: mk(17047812),  t44: mk(17927399),
  t45: mk(19777073),  t46: mk(19876224),  t47: mk(25165824),  t48: mk(26112990),
  t49: mk(31491744),  t50: mk(32505855),  t51: mk(33129472),  t52: mk(33553304),
  t53: mk(33553633),  t54: mk(33554428),  t55: mk(33554431),
};

export const PEANUTS_9_PUZZLE = {
  id: "pn09",
  title: "Charlie Brown Yelling",
  subtitle: "8×8 · Medium",
  riddle: "AAUGH! Nothing ever goes right for me!\nI can't kick that football and I never will.\nWhat am I?",
  solution: [
    [T.t5,  T.t4,  T.t0,  T.t24, T.t49, T.t8,  T.t1,  T.t13],  // label 8
    [T.t3,  T.t36, T.t25, T.t10, T.t17, T.t30, T.t26, T.t2 ],  // label 7
    [T.t27, T.t18, T.t44, T.t55, T.t55, T.t48, T.t43, T.t33],  // label 6
    [T.t6,  T.t28, T.t42, T.t55, T.t55, T.t50, T.t32, T.t8 ],  // label 5
    [T.t22, T.t15, T.t41, T.t54, T.t53, T.t52, T.t12, T.t38],  // label 4
    [T.t7,  T.t21, T.t20, T.t9,  T.t1,  T.t11, T.t39, T.t0 ],  // label 3
    [T.t35, T.t45, T.t16, T.t34, T.t23, T.t19, T.t29, T.t40],  // label 2
    [T.t31, T.t51, T.t14, T.t0,  T.t47, T.t1,  T.t37, T.t46],  // label 1
  ],
};
