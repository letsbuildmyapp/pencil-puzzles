import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1253640),
  t2: mk(25363489),
  t3: mk(8522128),
  t4: mk(2195456),
  t5: mk(920576),
  t6: mk(24706),
  t7: mk(3),
  t8: mk(24),
  t9: mk(1083458),
  t10: mk(1024),
  t11: mk(2440978),
  t12: mk(1048576),
  t13: mk(4857856),
  t14: mk(4260897),
  t15: mk(12),
  t16: mk(4329736),
  t17: mk(2),
  t18: mk(6762499),
  t19: mk(1127),
  t20: mk(29634828),
  t21: mk(33),
  t22: mk(1084288),
  t23: mk(19484240),
  t24: mk(4344368),
  t25: mk(5411986),
  t26: mk(7573000),
  t27: mk(23593098),
  t28: mk(1116292),
  t29: mk(18426148),
  t30: mk(16),
  t31: mk(9570351),
  t32: mk(7879687),
  t33: mk(19030047),
  t34: mk(1116),
  t35: mk(8912896),
  t36: mk(2129920),
  t37: mk(15924224),
  t38: mk(17952905),
  t39: mk(5214355),
  t40: mk(17303),
  t41: mk(922080),
  t42: mk(1),
  t43: mk(9716225),
  t44: mk(18942001),
  t45: mk(21463040),
  t46: mk(1015808),
  t47: mk(16777216)
};

export const GUMBALL_10_PUZZLE = {
  id: "gb10",
  title: "Gumball 10",
  subtitle: "8×8 · Easy",
  riddle: "I'm the star of my own cartoon life,\ncutting through Elmore's everyday strife.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t0, T.t0, T.t0, T.t0],  // label 8
    [T.t0, T.t0, T.t3, T.t4, T.t5, T.t6, T.t7, T.t8],  // label 7
    [T.t0, T.t9, T.t10, T.t11, T.t0, T.t12, T.t13, T.t14],  // label 6
    [T.t15, T.t16, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22],  // label 5
    [T.t23, T.t24, T.t25, T.t26, T.t27, T.t0, T.t28, T.t0],  // label 4
    [T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t35, T.t0],  // label 3
    [T.t36, T.t37, T.t38, T.t39, T.t40, T.t34, T.t41, T.t30],  // label 2
    [T.t0, T.t42, T.t43, T.t44, T.t45, T.t46, T.t46, T.t47]  // label 1
  ],
};
