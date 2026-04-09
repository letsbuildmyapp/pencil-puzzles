import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(108),
  t2: mk(399481),
  t3: mk(34),
  t4: mk(772),
  t5: mk(1),
  t6: mk(16986928),
  t7: mk(419430),
  t8: mk(10601),
  t9: mk(2896083),
  t10: mk(7),
  t11: mk(1073),
  t12: mk(8142848),
  t13: mk(17698882),
  t14: mk(8650785),
  t15: mk(17285632),
  t16: mk(921666),
  t17: mk(12966480),
  t18: mk(9690416),
  t19: mk(16),
  t20: mk(33552520),
  t21: mk(32539648),
  t22: mk(527),
  t23: mk(32503961),
  t24: mk(29460269),
  t25: mk(9898117),
  t26: mk(32766),
  t27: mk(15745934),
  t28: mk(19009601),
  t29: mk(1048638),
  t30: mk(540673),
  t31: mk(511),
  t32: mk(12529812),
  t33: mk(5310496),
  t34: mk(32505083),
  t35: mk(16675839),
  t36: mk(30402367),
  t37: mk(1042239),
  t38: mk(33148927),
  t39: mk(20578302),
  t40: mk(21647768),
  t41: mk(12681216),
  t42: mk(32633327),
  t43: mk(33529631),
  t44: mk(33553439),
  t45: mk(33522672),
  t46: mk(26341376),
  t47: mk(16777216),
  t48: mk(9715199),
  t49: mk(25453064)
};

export const WIMPY_KID_3_PUZZLE = {
  id: "dw03",
  title: "Fregley",
  subtitle: "8×8 · Hard",
  riddle: "The weirdest kid on the whole block,\nI'll show you my secret if you're not in shock.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t0],  // label 8
    [T.t0, T.t5, T.t6, T.t7, T.t8, T.t9, T.t0, T.t0],  // label 7
    [T.t10, T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t0],  // label 6
    [T.t17, T.t18, T.t19, T.t20, T.t21, T.t22, T.t23, T.t24],  // label 5
    [T.t25, T.t26, T.t27, T.t28, T.t29, T.t30, T.t31, T.t32],  // label 4
    [T.t33, T.t34, T.t35, T.t36, T.t37, T.t38, T.t39, T.t40],  // label 3
    [T.t0, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t47],  // label 2
    [T.t0, T.t0, T.t48, T.t49, T.t0, T.t0, T.t0, T.t0]  // label 1
  ],
};
