import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(34),
  t2: mk(6802670),
  t3: mk(540672),
  t4: mk(3241),
  t5: mk(4178961),
  t6: mk(30408672),
  t7: mk(33521663),
  t8: mk(25380739),
  t9: mk(24771),
  t10: mk(34884),
  t11: mk(19013904),
  t12: mk(31957783),
  t13: mk(817248),
  t14: mk(8945408),
  t15: mk(17071104),
  t16: mk(32927809),
  t17: mk(17309956),
  t18: mk(4498994),
  t19: mk(17860674),
  t20: mk(16777208),
  t21: mk(17589016),
  t22: mk(35955),
  t23: mk(32505825),
  t24: mk(1098256),
  t25: mk(4868690),
  t26: mk(19483218),
  t27: mk(4329605),
  t28: mk(25166616),
  t29: mk(26316015),
  t30: mk(20472734),
  t31: mk(1048675),
  t32: mk(21106836),
  t33: mk(19212882),
  t34: mk(18130085),
  t35: mk(5408833),
  t36: mk(30309359),
  t37: mk(40447),
  t38: mk(549790),
  t39: mk(3382783),
  t40: mk(21647657),
  t41: mk(19484804),
  t42: mk(4262944),
  t43: mk(18358548),
  t44: mk(16502052),
  t45: mk(33553152),
  t46: mk(33528929),
  t47: mk(32404273),
  t48: mk(10045671),
  t49: mk(9204702),
  t50: mk(14746624),
  t51: mk(4277697),
  t52: mk(16799),
  t53: mk(63),
  t54: mk(2240511),
  t55: mk(16777214),
  t56: mk(32469760)
};

export const HALLOWEEN_1_PUZZLE = {
  id: "hw01",
  title: "Pumpkin",
  subtitle: "8×8 · Medium",
  riddle: "I glow in the dark on Halloween night,\ncarved with a grin, a ghoulish delight.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t0, T.t1, T.t2, T.t3, T.t0, T.t0],  // label 8
    [T.t0, T.t4, T.t5, T.t6, T.t7, T.t8, T.t9, T.t0],  // label 7
    [T.t10, T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t17],  // label 6
    [T.t18, T.t19, T.t20, T.t21, T.t22, T.t23, T.t24, T.t25],  // label 5
    [T.t26, T.t27, T.t28, T.t29, T.t30, T.t31, T.t32, T.t33],  // label 4
    [T.t34, T.t35, T.t36, T.t37, T.t38, T.t39, T.t40, T.t41],  // label 3
    [T.t42, T.t43, T.t44, T.t45, T.t46, T.t47, T.t48, T.t49],  // label 2
    [T.t0, T.t50, T.t51, T.t52, T.t53, T.t54, T.t55, T.t56]  // label 1
  ],
};
