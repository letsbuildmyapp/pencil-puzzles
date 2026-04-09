import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(3),
  t2: mk(992),
  t3: mk(961),
  t4: mk(16),
  t5: mk(1092),
  t6: mk(13107200),
  t7: mk(4096),
  t8: mk(32768),
  t9: mk(12649572),
  t10: mk(898),
  t11: mk(24730),
  t12: mk(4464912),
  t13: mk(262145),
  t14: mk(927),
  t15: mk(262144),
  t16: mk(9809188),
  t17: mk(18671138),
  t18: mk(9740550),
  t19: mk(31384652),
  t20: mk(17383944),
  t21: mk(3381447),
  t22: mk(24216836),
  t23: mk(17589148),
  t24: mk(3153920),
  t25: mk(30036626),
  t26: mk(3213378),
  t27: mk(17318416),
  t28: mk(8659076),
  t29: mk(3245056),
  t30: mk(7303168),
  t31: mk(15154140),
  t32: mk(10822829),
  t33: mk(2166949),
  t34: mk(17317888),
  t35: mk(4261921),
  t36: mk(33891),
  t37: mk(30171664),
  t38: mk(35),
  t39: mk(14341301),
  t40: mk(5416266),
  t41: mk(1132),
  t42: mk(17761155),
  t43: mk(7584671),
  t44: mk(229407),
  t45: mk(29362112),
  t46: mk(31118368),
  t47: mk(11383303),
  t48: mk(532752),
  t49: mk(16904192),
  t50: mk(539648),
  t51: mk(920576),
  t52: mk(253952),
  t53: mk(63488),
  t54: mk(793600),
  t55: mk(7371776),
  t56: mk(8667136)
};

export const SPONGEBOB_7_PUZZLE = {
  id: "sb07",
  title: "Gary",
  subtitle: "8×8 · Easy",
  riddle: "I meow like a cat but live in the sea,\nSpongeBob's faithful pet is what I be.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t0, T.t0],  // label 8
    [T.t5, T.t6, T.t7, T.t8, T.t9, T.t10, T.t5, T.t11],  // label 7
    [T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19],  // label 6
    [T.t20, T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27],  // label 5
    [T.t28, T.t29, T.t30, T.t31, T.t0, T.t32, T.t33, T.t34],  // label 4
    [T.t35, T.t0, T.t36, T.t37, T.t38, T.t39, T.t40, T.t0],  // label 3
    [T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t47, T.t48],  // label 2
    [T.t49, T.t50, T.t51, T.t52, T.t53, T.t54, T.t55, T.t56]  // label 1
  ],
};
