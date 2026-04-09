import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(16),        t2:  mk(34),        t3:  mk(47),        t4:  mk(1008),
  t5:  mk(1095),      t6:  mk(3473),      t7:  mk(16647),     t8:  mk(16913),
  t9:  mk(17152),     t10: mk(98304),     t11: mk(232228),    t12: mk(255008),
  t13: mk(538673),    t14: mk(1082112),   t15: mk(1083463),   t16: mk(1116313),
  t17: mk(1142849),   t18: mk(1142880),   t19: mk(1163521),   t20: mk(1253888),
  t21: mk(2097214),   t22: mk(2129920),   t23: mk(2236935),   t24: mk(2697282),
  t25: mk(3015108),   t26: mk(3907071),   t27: mk(3936392),   t28: mk(4327522),
  t29: mk(4331216),   t30: mk(4464900),   t31: mk(5416547),   t32: mk(6390785),
  t33: mk(7025061),   t34: mk(7037858),   t35: mk(8521761),   t36: mk(8656806),
  t37: mk(8667664),   t38: mk(9179263),   t39: mk(10083715),  t40: mk(10641408),
  t41: mk(12651268),  t42: mk(14872576),  t43: mk(15977780),  t44: mk(16252928),
  t45: mk(16777216),  t46: mk(17039360),  t47: mk(17309960),  t48: mk(19448332),
  t49: mk(23874696),  t50: mk(24639281),  t51: mk(25165824),  t52: mk(25305368),
  t53: mk(25315422),  t54: mk(27017744),  t55: mk(29255239),  t56: mk(29630728),
  t57: mk(33439774),
};

export const LOONEY_TUNES_5_PUZZLE = {
  id: "lt05", title: "Yosemite Sam", subtitle: "8×8 · Medium",
  riddle: "I've got the longest mustache in the West,\ntwo pistols blazing, I'm the roughest of the rest.\nRassafrassin' varmint!\nWhat am I?",
  solution: [
    [T.t37, T.t0,  T.t5,  T.t42, T.t8,  T.t6,  T.t9,  T.t0 ],  // label 8
    [T.t47, T.t0,  T.t15, T.t41, T.t49, T.t19, T.t52, T.t0 ],  // label 7
    [T.t36, T.t44, T.t33, T.t29, T.t27, T.t26, T.t55, T.t53],  // label 6
    [T.t24, T.t0,  T.t32, T.t34, T.t39, T.t57, T.t51, T.t17],  // label 5
    [T.t14, T.t7,  T.t21, T.t23, T.t31, T.t54, T.t46, T.t0 ],  // label 4
    [T.t12, T.t13, T.t11, T.t38, T.t50, T.t45, T.t3,  T.t4 ],  // label 3
    [T.t2,  T.t40, T.t22, T.t43, T.t16, T.t20, T.t56, T.t35],  // label 2
    [T.t30, T.t10, T.t18, T.t48, T.t25, T.t0,  T.t28, T.t1 ],  // label 1
  ],
};
