import { mk } from "../lib/tiles";

const T = {
  t0: mk(33824),
  t1: mk(33554431),
  t2: mk(33554336),
  t3: mk(33553408),
  t4: mk(16807968),
  t5: mk(524),
  t6: mk(0),
  t7: mk(1092),
  t8: mk(13111296),
  t9: mk(20972612),
  t10: mk(476160),
  t11: mk(507907),
  t12: mk(2154496),
  t13: mk(16648),
  t14: mk(5513744),
  t15: mk(262144),
  t16: mk(34816),
  t17: mk(16252935),
  t18: mk(4980786),
  t19: mk(25166596),
  t20: mk(4329608),
  t21: mk(7),
  t22: mk(17309956),
  t23: mk(33),
  t24: mk(8929280),
  t25: mk(12719004),
  t26: mk(2178510),
  t27: mk(8912903),
  t28: mk(8934044),
  t29: mk(2129920),
  t30: mk(539648),
  t31: mk(1242268),
  t32: mk(528),
  t33: mk(30307300),
  t34: mk(15153772),
  t35: mk(8618504),
  t36: mk(3099218),
  t37: mk(1116225),
  t38: mk(2404846),
  t39: mk(8618511),
  t40: mk(5116060),
  t41: mk(5311521),
  t42: mk(8667137),
  t43: mk(18366977),
  t44: mk(1081344),
  t45: mk(7589416),
  t46: mk(819199),
  t47: mk(4354972),
  t48: mk(1082401),
  t49: mk(1116292),
  t50: mk(2707785),
  t51: mk(1),
  t52: mk(4429733),
  t53: mk(7372564),
  t54: mk(21193728),
  t55: mk(1142818),
  t56: mk(8667136),
  t57: mk(5312784)
};

export const SPONGEBOB_3_PUZZLE = {
  id: "sb03",
  title: "Squidward",
  subtitle: "8×8 · Medium",
  riddle: "I play my clarinet off-key with pride,\nliving next door with nowhere to hide.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t6],  // label 8
    [T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t6],  // label 7
    [T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20, T.t21],  // label 6
    [T.t22, T.t6, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28],  // label 5
    [T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t35, T.t36],  // label 4
    [T.t6, T.t37, T.t38, T.t39, T.t40, T.t41, T.t42, T.t43],  // label 3
    [T.t6, T.t44, T.t45, T.t46, T.t47, T.t48, T.t49, T.t50],  // label 2
    [T.t6, T.t51, T.t52, T.t53, T.t54, T.t55, T.t56, T.t57]  // label 1
  ],
};
