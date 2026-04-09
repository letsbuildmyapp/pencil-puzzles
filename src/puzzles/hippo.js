import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(16),        t3:  mk(100),       t4:  mk(232),
  t5:  mk(772),       t6:  mk(1058),      t7:  mk(3968),      t8:  mk(16648),
  t9:  mk(16833),     t10: mk(34949),     t11: mk(508099),    t12: mk(730431),
  t13: mk(888991),    t14: mk(921360),    t15: mk(1048600),   t16: mk(1049096),
  t17: mk(1081593),   t18: mk(1650695),   t19: mk(2164868),   t20: mk(2232584),
  t21: mk(2955416),   t22: mk(2975812),   t23: mk(3145927),   t24: mk(4260880),
  t25: mk(4261920),   t26: mk(4261954),   t27: mk(4329608),   t28: mk(4444944),
  t29: mk(5376070),   t30: mk(7340033),   t31: mk(7356676),   t32: mk(7438336),
  t33: mk(8126464),   t34: mk(8659204),   t35: mk(8667672),   t36: mk(8912930),
  t37: mk(8929280),   t38: mk(8929808),   t39: mk(9218243),   t40: mk(11077700),
  t41: mk(11936272),  t42: mk(16252928),  t43: mk(16778008),  t44: mk(17047684),
  t45: mk(17318152),  t46: mk(17521160),  t47: mk(17524007),  t48: mk(21368898),
  t49: mk(21579304),  t50: mk(25165824),  t51: mk(25200776),  t52: mk(25363456),
  t53: mk(25690112),  t54: mk(29458432),
};

export const HIPPO_PUZZLE = {
  id: "a04", title: "Hippo", subtitle: "8×8 · Easy",
  riddle: "I spend my days in rivers and lakes,\nmy huge mouth opens wide to yawn.\nShort legs, barrel body - who am I?\nWhat am I?",
  solution: [
    [T.t0,  T.t10, T.t14, T.t33, T.t52, T.t11, T.t8,  T.t0 ],  // label 8
    [T.t0,  T.t29, T.t3,  T.t5,  T.t4,  T.t16, T.t35, T.t0 ],  // label 7
    [T.t6,  T.t40, T.t34, T.t22, T.t46, T.t27, T.t49, T.t2 ],  // label 6
    [T.t20, T.t38, T.t23, T.t50, T.t30, T.t43, T.t26, T.t44],  // label 5
    [T.t34, T.t45, T.t32, T.t1,  T.t17, T.t53, T.t19, T.t27],  // label 4
    [T.t25, T.t24, T.t9,  T.t15, T.t18, T.t7,  T.t36, T.t37],  // label 3
    [T.t0,  T.t41, T.t54, T.t31, T.t51, T.t42, T.t48, T.t0 ],  // label 2
    [T.t0,  T.t47, T.t13, T.t28, T.t39, T.t12, T.t21, T.t0 ],  // label 1
  ],
};
