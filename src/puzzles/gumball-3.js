import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1),
  t2: mk(111111),
  t3: mk(16926),
  t4: mk(38),
  t5: mk(6944),
  t6: mk(16),
  t7: mk(34952),
  t8: mk(8126936),
  t9: mk(25165824),
  t10: mk(1048608),
  t11: mk(25364236),
  t12: mk(16644),
  t13: mk(17318416),
  t14: mk(1057),
  t15: mk(19439778),
  t16: mk(30752),
  t17: mk(7440),
  t18: mk(59523),
  t19: mk(2138628),
  t20: mk(17318408),
  t21: mk(2164802),
  t22: mk(11771111),
  t23: mk(17593244),
  t24: mk(8688805),
  t25: mk(30375935),
  t26: mk(1081344),
  t27: mk(8929808),
  t28: mk(8654980),
  t29: mk(7576807),
  t30: mk(30307228),
  t31: mk(5412009),
  t32: mk(33554431),
  t33: mk(33),
  t34: mk(17317888),
  t35: mk(4329604),
  t36: mk(2164872),
  t37: mk(7571537),
  t38: mk(25691228),
  t39: mk(10008725),
  t40: mk(32391431),
  t41: mk(2167058),
  t42: mk(4464912),
  t43: mk(9773186),
  t44: mk(140868),
  t45: mk(14697920),
  t46: mk(17301504),
  t47: mk(1314880),
  t48: mk(559256),
  t49: mk(16777216),
  t50: mk(1048576),
  t51: mk(920576),
  t52: mk(31744),
  t53: mk(31777),
  t54: mk(4080136)
};

export const GUMBALL_3_PUZZLE = {
  id: "gb03",
  title: "Gumball 3",
  subtitle: "8×8 · Easy",
  riddle: "Blue and goofy, I never back down,\nthe funniest kid in all of Elmore town.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6],  // label 8
    [T.t0, T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t13],  // label 7
    [T.t14, T.t15, T.t16, T.t6, T.t17, T.t18, T.t19, T.t20],  // label 6
    [T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28],  // label 5
    [T.t21, T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t35],  // label 4
    [T.t36, T.t37, T.t38, T.t39, T.t40, T.t41, T.t12, T.t42],  // label 3
    [T.t43, T.t44, T.t26, T.t45, T.t46, T.t47, T.t48, T.t49],  // label 2
    [T.t50, T.t51, T.t52, T.t53, T.t0, T.t54, T.t0, T.t0]  // label 1
  ],
};
