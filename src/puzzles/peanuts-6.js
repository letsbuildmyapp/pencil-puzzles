import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(16),        t2:  mk(28),        t3:  mk(76),        t4:  mk(152),
  t5:  mk(224),       t6:  mk(248),       t7:  mk(512),       t8:  mk(1057),
  t9:  mk(1073),      t10: mk(6448),      t11: mk(8456),      t12: mk(14880),
  t13: mk(16384),     t14: mk(33840),     t15: mk(39184),     t16: mk(395308),
  t17: mk(524321),    t18: mk(791152),    t19: mk(2129920),   t20: mk(2185600),
  t21: mk(2691072),   t22: mk(2705704),   t23: mk(3145728),   t24: mk(4063232),
  t25: mk(4718592),   t26: mk(4803139),   t27: mk(6743172),   t28: mk(8964480),
  t29: mk(9708048),   t30: mk(12681216),  t31: mk(13190404),  t32: mk(13222408),
  t33: mk(16777216),  t34: mk(16777232),  t35: mk(17178406),  t36: mk(17309920),
  t37: mk(17698952),  t38: mk(21631107),
};

export const PEANUTS_6_PUZZLE = {
  id: "pn06",
  title: "Woodstock",
  subtitle: "8×8 · Easy",
  riddle: "I'm Snoopy's best friend — a tiny yellow bird.\nI chirp in symbols and can't quite fly straight.\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t5,  T.t9,  T.t17, T.t13, T.t0,  T.t0 ],  // label 8
    [T.t0,  T.t0,  T.t0,  T.t29, T.t21, T.t10, T.t0,  T.t0 ],  // label 7
    [T.t0,  T.t15, T.t24, T.t11, T.t0,  T.t16, T.t4,  T.t0 ],  // label 6
    [T.t0,  T.t36, T.t2,  T.t3,  T.t0,  T.t22, T.t7,  T.t0 ],  // label 5
    [T.t0,  T.t0,  T.t23, T.t37, T.t32, T.t25, T.t0,  T.t0 ],  // label 4
    [T.t0,  T.t0,  T.t8,  T.t38, T.t26, T.t6,  T.t12, T.t1 ],  // label 3
    [T.t0,  T.t0,  T.t31, T.t35, T.t27, T.t18, T.t14, T.t34],  // label 2
    [T.t0,  T.t0,  T.t19, T.t20, T.t28, T.t33, T.t30, T.t33],  // label 1
  ],
};
