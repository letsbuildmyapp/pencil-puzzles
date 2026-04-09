import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(16),        t2:  mk(34),        t3:  mk(996),
  t4:  mk(1000),      t5:  mk(1116),       t6:  mk(3204),      t7:  mk(10784),
  t8:  mk(16648),     t9:  mk(63762),      t10: mk(254082),    t11: mk(393224),
  t12: mk(476201),    t13: mk(532744),     t14: mk(540936),    t15: mk(786441),
  t16: mk(1015808),   t17: mk(1048576),    t18: mk(1083624),   t19: mk(1245252),
  t20: mk(1839352),   t21: mk(2142289),    t22: mk(2235392),   t23: mk(2320740),
  t24: mk(4194304),   t25: mk(4262016),    t26: mk(4292608),   t27: mk(4333840),
  t28: mk(4436480),   t29: mk(5116168),    t30: mk(6298888),   t31: mk(8524609),
  t32: mk(8659220),   t33: mk(8671297),    t34: mk(8912896),   t35: mk(9187394),
  t36: mk(9775272),   t37: mk(12651076),   t38: mk(15034464),  t39: mk(15872872),
  t40: mk(16777249),  t41: mk(18089549),   t42: mk(19179041),  t43: mk(19269383),
  t44: mk(19276288),  t45: mk(19440833),   t46: mk(21104824),  t47: mk(25715176),
  t48: mk(27397120),  t49: mk(30039552),   t50: mk(30162951),  t51: mk(33004560),
};

export const PEANUTS_18_PUZZLE = {
  id: "pn18",
  title: "Freida",
  subtitle: "8×8 · Easy",
  riddle: "I'm proud of my naturally curly hair and love to chat.\\nI'm Snoopy's neighbor and Charlie Brown's classmate.\\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t2,  T.t10, T.t9,  T.t13, T.t0,  T.t0 ],  // label 8
    [T.t0,  T.t5,  T.t23, T.t43, T.t41, T.t46, T.t12, T.t1 ],  // label 7
    [T.t18, T.t21, T.t32, T.t15, T.t11, T.t19, T.t30, T.t37],  // label 6
    [T.t45, T.t25, T.t29, T.t22, T.t0,  T.t36, T.t7,  T.t42],  // label 5
    [T.t0,  T.t48, T.t33, T.t51, T.t50, T.t31, T.t20, T.t44],  // label 4
    [T.t6,  T.t38, T.t4,  T.t39, T.t47, T.t3,  T.t49, T.t8 ],  // label 3
    [T.t26, T.t1,  T.t35, T.t24, T.t40, T.t28, T.t1,  T.t34],  // label 2
    [T.t0,  T.t0,  T.t27, T.t0,  T.t17, T.t14, T.t0,  T.t0 ],  // label 1
  ],
};
