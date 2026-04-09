import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(2164935),
  t2: mk(240194),
  t3: mk(3686912),
  t4: mk(541208),
  t5: mk(73208),
  t6: mk(11263),
  t7: mk(291779),
  t8: mk(6422528),
  t9: mk(2196548),
  t10: mk(16768),
  t11: mk(8656929),
  t12: mk(16777216),
  t13: mk(14680135),
  t14: mk(1048647),
  t15: mk(4431343),
  t16: mk(2097151),
  t17: mk(33554431),
  t18: mk(541464),
  t19: mk(13631488),
  t20: mk(31195136),
  t21: mk(1225),
  t22: mk(16205022),
  t23: mk(32538462),
  t24: mk(32537967),
  t25: mk(29614573),
  t26: mk(538686),
  t27: mk(16),
  t28: mk(1154559),
  t29: mk(25165789),
  t30: mk(32455644),
  t31: mk(2168964),
  t32: mk(8663172),
  t33: mk(14104807),
  t34: mk(33549742),
  t35: mk(17726463),
  t36: mk(33524736),
  t37: mk(28572769),
  t38: mk(30303000),
  t39: mk(3417075),
  t40: mk(25200636),
  t41: mk(7441969),
  t42: mk(25162520),
  t43: mk(16515072),
  t44: mk(1048576),
  t45: mk(25960712),
  t46: mk(18353288),
  t47: mk(25194561),
  t48: mk(18383905),
  t49: mk(3670015),
  t50: mk(26113023),
  t51: mk(31),
  t52: mk(12976191),
  t53: mk(3391487),
  t54: mk(26181631)
};

export const HALLOWEEN_8_PUZZLE = {
  id: "hw08",
  title: "Witch 2",
  subtitle: "8×8 · Medium",
  riddle: "My pointy hat and crooked nose,\nI cast my spells wherever I go.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t0, T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t14],  // label 7
    [T.t0, T.t0, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20],  // label 6
    [T.t0, T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27],  // label 5
    [T.t28, T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t35],  // label 4
    [T.t36, T.t37, T.t38, T.t39, T.t40, T.t41, T.t42, T.t43],  // label 3
    [T.t0, T.t44, T.t45, T.t46, T.t47, T.t48, T.t12, T.t0],  // label 2
    [T.t49, T.t17, T.t50, T.t51, T.t52, T.t53, T.t17, T.t54]  // label 1
  ],
};
