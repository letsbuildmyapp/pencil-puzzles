import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(7475332),
  t2: mk(32506864),
  t3: mk(25299496),
  t4: mk(3285554),
  t5: mk(32506849),
  t6: mk(29495428),
  t7: mk(32272),
  t8: mk(4277508),
  t9: mk(8522281),
  t10: mk(4400675),
  t11: mk(12716601),
  t12: mk(2236962),
  t13: mk(4473924),
  t14: mk(31777),
  t15: mk(20531794),
  t16: mk(2662530),
  t17: mk(6447399),
  t18: mk(7851576),
  t19: mk(32399923),
  t20: mk(4607544),
  t21: mk(8947864),
  t22: mk(26518825),
  t23: mk(19439747),
  t24: mk(3301923),
  t25: mk(3728287),
  t26: mk(30369315),
  t27: mk(15961692),
  t28: mk(29953263),
  t29: mk(8523356),
  t30: mk(9996424),
  t31: mk(2236978),
  t32: mk(7659650),
  t33: mk(32399655),
  t34: mk(7660446),
  t35: mk(25742823),
  t36: mk(32738872),
  t37: mk(25726104),
  t38: mk(25299497),
  t39: mk(19483219),
  t40: mk(3285538),
  t41: mk(3728580),
  t42: mk(26774767),
  t43: mk(3729372),
  t44: mk(29953164),
  t45: mk(8522280),
  t46: mk(9741625),
  t47: mk(17333248),
  t48: mk(8947848),
  t49: mk(20488326),
  t50: mk(25741700),
  t51: mk(19439746),
  t52: mk(1113088),
  t53: mk(4329607),
  t54: mk(17793055),
  t55: mk(9996440),
  t56: mk(2662531),
  t57: mk(2064415),
  t58: mk(4329628)
};

export const PUZZLES_5_PUZZLE = {
  id: "pz05",
  title: "Diamond Cross",
  subtitle: "8×8 · Hard",
  riddle: "Four points of a diamond, a cross inside,\nblack and white in perfect geometric pride.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t0],  // label 8
    [T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t14],  // label 7
    [T.t15, T.t16, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22],  // label 6
    [T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29, T.t30],  // label 5
    [T.t31, T.t32, T.t33, T.t34, T.t35, T.t36, T.t37, T.t38],  // label 4
    [T.t39, T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46],  // label 3
    [T.t47, T.t13, T.t48, T.t49, T.t50, T.t51, T.t8, T.t52],  // label 2
    [T.t0, T.t53, T.t54, T.t55, T.t56, T.t57, T.t58, T.t0]  // label 1
  ],
};
