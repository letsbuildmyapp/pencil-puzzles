import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1),
  t2: mk(7936),
  t3: mk(33554400),
  t4: mk(127012),
  t5: mk(795144),
  t6: mk(2232618),
  t7: mk(7753864),
  t8: mk(21574686),
  t9: mk(20332545),
  t10: mk(25299529),
  t11: mk(22207),
  t12: mk(66594),
  t13: mk(19517199),
  t14: mk(17885522),
  t15: mk(2130977),
  t16: mk(2164802),
  t17: mk(5411996),
  t18: mk(13243032),
  t19: mk(18393419),
  t20: mk(10621576),
  t21: mk(6424644),
  t22: mk(1081409),
  t23: mk(3399104),
  t24: mk(2334736),
  t25: mk(30155016),
  t26: mk(17344842),
  t27: mk(11348846),
  t28: mk(8701473),
  t29: mk(25165824),
  t30: mk(64),
  t31: mk(33504480),
  t32: mk(16810512),
  t33: mk(9770181),
  t34: mk(409816),
  t35: mk(16257298),
  t36: mk(17048080),
  t37: mk(256),
  t38: mk(7340032),
  t39: mk(6460036),
  t40: mk(2031616),
  t41: mk(4500052),
  t42: mk(29999632),
  t43: mk(920608),
  t44: mk(28784),
  t45: mk(2098146),
  t46: mk(15888),
  t47: mk(3086676),
  t48: mk(4211168),
  t49: mk(17330272),
  t50: mk(526),
  t51: mk(8522752),
  t52: mk(4571169),
  t53: mk(10158080),
  t54: mk(4329736)
};

export const SPONGEBOB_8_PUZZLE = {
  id: "sb08",
  title: "Mrs. Puff",
  subtitle: "8×8 · Medium",
  riddle: "I teach boating school in Bikini Bottom town,\none student's driving always makes me drown.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t0, T.t0],  // label 8
    [T.t0, T.t6, T.t7, T.t8, T.t9, T.t10, T.t0, T.t11],  // label 7
    [T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19],  // label 6
    [T.t20, T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27],  // label 5
    [T.t28, T.t29, T.t30, T.t29, T.t31, T.t32, T.t33, T.t34],  // label 4
    [T.t35, T.t36, T.t37, T.t0, T.t38, T.t0, T.t39, T.t40],  // label 3
    [T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t47, T.t0],  // label 2
    [T.t48, T.t49, T.t50, T.t51, T.t52, T.t53, T.t54, T.t0]  // label 1
  ],
};
