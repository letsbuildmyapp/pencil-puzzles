import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(12),        t3:  mk(33),        t4:  mk(34),
  t5:  mk(1109),      t6:  mk(1535),      t7:  mk(3580),      t8:  mk(4095),
  t9:  mk(15872),     t10: mk(16384),     t11: mk(17166),     t12: mk(25088),
  t13: mk(25571),     t14: mk(32764),     t15: mk(34753),     t16: mk(409607),
  t17: mk(536673),    t18: mk(793665),    t19: mk(1000448),   t20: mk(1029939),
  t21: mk(1048582),   t22: mk(1082368),   t23: mk(1084655),   t24: mk(1118472),
  t25: mk(1150055),   t26: mk(1154323),   t27: mk(1589776),   t28: mk(2323386),
  t29: mk(3179553),   t30: mk(3247137),   t31: mk(3636727),   t32: mk(4473345),
  t33: mk(6503423),   t34: mk(6536703),   t35: mk(6569984),   t36: mk(7577071),
  t37: mk(8347648),   t38: mk(9742418),   t39: mk(12512048),  t40: mk(13501196),
  t41: mk(15597568),  t42: mk(15965282),  t43: mk(16235751),  t44: mk(16678895),
  t45: mk(18455552),  t46: mk(22325850),  t47: mk(26349342),  t48: mk(27601232),
  t49: mk(28311014),  t50: mk(29078315),  t51: mk(29088136),  t52: mk(30137932),
  t53: mk(30146561),  t54: mk(31773058),  t55: mk(32463046),  t56: mk(32546946),
  t57: mk(33043037),  t58: mk(33553504),  t59: mk(33554304),
};

export const LOONEY_TUNES_11_PUZZLE = {
  id: "lt11",
  title: "Pepe Le Pew",
  subtitle: "8×8 · Medium",
  riddle: "I'm a skunk with a big heart and a bigger smell.\nI'm always in love, even if my date runs away.\nWhat am I?",
  solution: [
    [T.t0,  T.t4,  T.t9,  T.t54, T.t17, T.t5,  T.t12, T.t3 ],  // label 8
    [T.t1,  T.t32, T.t6,  T.t14, T.t13, T.t38, T.t2,  T.t25],  // label 7
    [T.t22, T.t35, T.t26, T.t51, T.t56, T.t49, T.t55, T.t36],  // label 6
    [T.t4,  T.t15, T.t46, T.t24, T.t48, T.t34, T.t41, T.t43],  // label 5
    [T.t44, T.t47, T.t40, T.t52, T.t45, T.t58, T.t11, T.t30],  // label 4
    [T.t42, T.t59, T.t53, T.t20, T.t19, T.t10, T.t29, T.t27],  // label 3
    [T.t21, T.t18, T.t31, T.t28, T.t16, T.t7,  T.t37, T.t1 ],  // label 2
    [T.t33, T.t8,  T.t39, T.t50, T.t57, T.t0,  T.t0,  T.t23],  // label 1
  ],
};
