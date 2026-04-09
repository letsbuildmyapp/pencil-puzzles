import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1),
  t2: mk(111110),
  t3: mk(536641),
  t4: mk(3),
  t5: mk(28),
  t6: mk(2166949),
  t7: mk(8929282),
  t8: mk(790528),
  t9: mk(17309960),
  t10: mk(34948),
  t11: mk(13146384),
  t12: mk(3670209),
  t13: mk(790594),
  t14: mk(4261920),
  t15: mk(19439764),
  t16: mk(8388641),
  t17: mk(8929280),
  t18: mk(8693028),
  t19: mk(16777234),
  t20: mk(131104),
  t21: mk(1087266),
  t22: mk(17047815),
  t23: mk(2165140),
  t24: mk(4261921),
  t25: mk(18087952),
  t26: mk(25165824),
  t27: mk(2232600),
  t28: mk(4261989),
  t29: mk(4465428),
  t30: mk(1116225),
  t31: mk(8622344),
  t32: mk(2033697),
  t33: mk(12716098),
  t34: mk(8654952),
  t35: mk(5548610),
  t36: mk(21645608),
  t37: mk(33884),
  t38: mk(1048576),
  t39: mk(4868424),
  t40: mk(1083458),
  t41: mk(4333840),
  t42: mk(4292608),
  t43: mk(4980736),
  t44: mk(8522752),
  t45: mk(155648),
  t46: mk(8650752),
  t47: mk(33792),
  t48: mk(16777216)
};

export const SPONGEBOB_9_PUZZLE = {
  id: "sb09",
  title: "Jellyfish",
  subtitle: "8×8 · Easy",
  riddle: "I drift through Jellyfish Fields all day,\nSpongeBob loves to catch me and let me play.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t0, T.t0, T.t1, T.t2, T.t3, T.t0],  // label 8
    [T.t0, T.t4, T.t5, T.t0, T.t6, T.t7, T.t8, T.t9],  // label 7
    [T.t10, T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t17],  // label 6
    [T.t18, T.t19, T.t20, T.t21, T.t0, T.t22, T.t23, T.t0],  // label 5
    [T.t24, T.t25, T.t26, T.t27, T.t0, T.t28, T.t29, T.t0],  // label 4
    [T.t30, T.t31, T.t32, T.t33, T.t34, T.t35, T.t36, T.t37],  // label 3
    [T.t38, T.t39, T.t40, T.t41, T.t42, T.t43, T.t44, T.t45],  // label 2
    [T.t0, T.t46, T.t47, T.t48, T.t0, T.t0, T.t0, T.t0]  // label 1
  ],
};
