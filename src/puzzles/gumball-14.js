import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(39184),
  t2: mk(8126464),
  t3: mk(29458432),
  t4: mk(792608),
  t5: mk(520),
  t6: mk(1118472),
  t7: mk(32772),
  t8: mk(29360142),
  t9: mk(34),
  t10: mk(12649220),
  t11: mk(4261921),
  t12: mk(1057),
  t13: mk(17301504),
  t14: mk(2137121),
  t15: mk(17872301),
  t16: mk(4330793),
  t17: mk(2214514),
  t18: mk(524800),
  t19: mk(17318152),
  t20: mk(2164801),
  t21: mk(1),
  t22: mk(1081368),
  t23: mk(13683072),
  t24: mk(9707651),
  t25: mk(19009808),
  t26: mk(8659208),
  t27: mk(1081344),
  t28: mk(2181713),
  t29: mk(4260932),
  t30: mk(775),
  t31: mk(3970),
  t32: mk(476160),
  t33: mk(561),
  t34: mk(17317888),
  t35: mk(8654914),
  t36: mk(25432160),
  t37: mk(2166943),
  t38: mk(1048700),
  t39: mk(1794048),
  t40: mk(2167056),
  t41: mk(1092),
  t42: mk(1065220),
  t43: mk(532611),
  t44: mk(16),
  t45: mk(46),
  t46: mk(1126912),
  t47: mk(4333840),
  t48: mk(4327489),
  t49: mk(32784),
  t50: mk(33454344),
  t51: mk(16777216)
};

export const GUMBALL_14_PUZZLE = {
  id: "gb14",
  title: "Gumball 14",
  subtitle: "8×8 · Easy",
  riddle: "You know my name, it's quite a treat,\na bubbly blue cat you'll always meet.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t0],  // label 8
    [T.t0, T.t6, T.t7, T.t8, T.t9, T.t10, T.t11, T.t0],  // label 7
    [T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19],  // label 6
    [T.t20, T.t21, T.t22, T.t23, T.t24, T.t25, T.t0, T.t26],  // label 5
    [T.t27, T.t28, T.t29, T.t30, T.t31, T.t32, T.t33, T.t34],  // label 4
    [T.t0, T.t35, T.t36, T.t37, T.t38, T.t39, T.t40, T.t0],  // label 3
    [T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t0, T.t0],  // label 2
    [T.t47, T.t48, T.t49, T.t50, T.t51, T.t0, T.t0, T.t0]  // label 1
  ],
};
