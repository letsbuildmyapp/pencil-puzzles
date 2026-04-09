import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(34),
  t2: mk(15886),
  t3: mk(31744),
  t4: mk(961),
  t5: mk(24),
  t6: mk(4333867),
  t7: mk(17855057),
  t8: mk(1051854),
  t9: mk(29442308),
  t10: mk(6324224),
  t11: mk(532610),
  t12: mk(100),
  t13: mk(20565603),
  t14: mk(18400817),
  t15: mk(15153614),
  t16: mk(4329604),
  t17: mk(1048576),
  t18: mk(540936),
  t19: mk(8667668),
  t20: mk(20293977),
  t21: mk(18383906),
  t22: mk(15147268),
  t23: mk(4329609),
  t24: mk(768),
  t25: mk(8659208),
  t26: mk(20193410),
  t27: mk(8522752),
  t28: mk(29360903),
  t29: mk(3145852),
  t30: mk(18954784),
  t31: mk(12657905),
  t32: mk(25395200),
  t33: mk(950098),
  t34: mk(32767),
  t35: mk(16871),
  t36: mk(1016),
  t37: mk(2285568),
  t38: mk(15822848),
  t39: mk(19476480),
  t40: mk(30036626),
  t41: mk(19483176),
  t42: mk(8523928),
  t43: mk(19483218),
  t44: mk(8659076)
};

export const GUMBALL_2_PUZZLE = {
  id: "gb02",
  title: "Gumball 2",
  subtitle: "8×8 · Medium",
  riddle: "Elmore's favorite troublemaker, that's me,\na cat with dreams as wide as the sea.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t0, T.t0],  // label 8
    [T.t0, T.t6, T.t7, T.t8, T.t9, T.t10, T.t11, T.t0],  // label 7
    [T.t12, T.t13, T.t14, T.t15, T.t16, T.t0, T.t17, T.t18],  // label 6
    [T.t19, T.t20, T.t21, T.t22, T.t23, T.t24, T.t0, T.t25],  // label 5
    [T.t26, T.t27, T.t28, T.t29, T.t30, T.t5, T.t0, T.t31],  // label 4
    [T.t17, T.t32, T.t33, T.t34, T.t35, T.t36, T.t37, T.t38],  // label 3
    [T.t0, T.t0, T.t39, T.t40, T.t41, T.t42, T.t0, T.t0],  // label 2
    [T.t0, T.t0, T.t0, T.t43, T.t44, T.t0, T.t0, T.t0]  // label 1
  ],
};
