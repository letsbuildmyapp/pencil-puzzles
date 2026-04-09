import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(16),        t2:  mk(33),        t3:  mk(34),        t4:  mk(496),
  t5:  mk(899),       t6:  mk(1056),      t7:  mk(1058),      t8:  mk(1092),
  t9:  mk(6208),      t10: mk(7440),      t11: mk(24706),     t12: mk(25088),
  t13: mk(67679),     t14: mk(253953),    t15: mk(507919),    t16: mk(540932),
  t17: mk(541184),    t18: mk(541200),    t19: mk(792608),    t20: mk(799211),
  t21: mk(919612),    t22: mk(1048576),   t23: mk(1049128),   t24: mk(1116225),
  t25: mk(1116226),   t26: mk(1116296),   t27: mk(1258388),   t28: mk(1589791),
  t29: mk(2129920),   t30: mk(2162704),   t31: mk(2163744),   t32: mk(2197504),
  t33: mk(2232474),   t34: mk(2236928),   t35: mk(3018883),   t36: mk(3145728),
  t37: mk(4327456),   t38: mk(4481287),   t39: mk(8527000),   t40: mk(8667137),
  t41: mk(11094081),  t42: mk(16253926),  t43: mk(16777216),  t44: mk(17043521),
  t45: mk(17047831),  t46: mk(17277200),  t47: mk(17301504),  t48: mk(17317888),
  t49: mk(21512226),  t50: mk(21580321),  t51: mk(23806432),  t52: mk(28117888),
  t53: mk(29427704),
};

export const GOAT_PUZZLE = {
  id: "a12", title: "Billy Goat", subtitle: "8×8 · Easy",
  riddle: "I balance on rocky cliffs with ease,\nmy beard and curved horns make me bold.\nI'll munch on almost anything.\nWhat am I?",
  solution: [
    [T.t3,  T.t15, T.t19, T.t1,  T.t3,  T.t14, T.t21, T.t1 ],  // label 8
    [T.t32, T.t43, T.t45, T.t46, T.t35, T.t33, T.t29, T.t48],  // label 7
    [T.t6,  T.t42, T.t8,  T.t11, T.t10, T.t23, T.t53, T.t0 ],  // label 6
    [T.t2,  T.t41, T.t37, T.t52, T.t51, T.t40, T.t50, T.t0 ],  // label 5
    [T.t25, T.t22, T.t16, T.t9,  T.t12, T.t26, T.t22, T.t18],  // label 4
    [T.t31, T.t1,  T.t36, T.t20, T.t27, T.t43, T.t7,  T.t47],  // label 3
    [T.t0,  T.t44, T.t4,  T.t30, T.t49, T.t5,  T.t34, T.t0 ],  // label 2
    [T.t0,  T.t24, T.t13, T.t39, T.t38, T.t28, T.t17, T.t0 ],  // label 1
  ],
};
