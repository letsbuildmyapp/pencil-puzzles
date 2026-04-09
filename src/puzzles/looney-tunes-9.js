import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(33),        t2:  mk(34),        t3:  mk(799),       t4:  mk(3577),
  t5:  mk(16644),     t6:  mk(28672),     t7:  mk(32768),     t8:  mk(261888),
  t9:  mk(418052),    t10: mk(524288),    t11: mk(786904),    t12: mk(790594),
  t13: mk(818400),    t14: mk(1048576),   t15: mk(1055024),   t16: mk(2164802),
  t17: mk(2664856),   t18: mk(2700764),   t19: mk(3245353),   t20: mk(3555487),
  t21: mk(4261954),   t22: mk(4329542),   t23: mk(4329740),   t24: mk(4333832),
  t25: mk(4464904),   t26: mk(4835199),   t27: mk(4989887),   t28: mk(5178399),
  t29: mk(5873792),   t30: mk(6494670),   t31: mk(6527248),   t32: mk(6697752),
  t33: mk(7378466),   t34: mk(7576675),   t35: mk(7576689),   t36: mk(8128059),
  t37: mk(8659204),   t38: mk(9773202),   t39: mk(10798626),  t40: mk(12784945),
  t41: mk(15931591),  t42: mk(16675265),  t43: mk(16777319),  t44: mk(16888385),
  t45: mk(17071104),  t46: mk(17172799),  t47: mk(17179912),  t48: mk(18231494),
  t49: mk(18944306),  t50: mk(19456130),  t51: mk(24233891),  t52: mk(25707074),
  t53: mk(29367296),  t54: mk(29999901),  t55: mk(30307088),  t56: mk(30307096),
  t57: mk(32401112),  t58: mk(33013760),  t59: mk(33528832),
};

export const LOONEY_TUNES_9_PUZZLE = {
  id: "lt09",
  title: "Tazmanian Devil",
  subtitle: "8×8 · Medium",
  riddle: "I spin like a tornado and eat everything in sight.\nI'm wild, I'm loud, and I never stop.\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t9,  T.t4,  T.t11, T.t40, T.t0,  T.t0 ],  // label 8
    [T.t0,  T.t15, T.t17, T.t44, T.t29, T.t18, T.t12, T.t0 ],  // label 7
    [T.t2,  T.t45, T.t42, T.t46, T.t20, T.t31, T.t28, T.t5 ],  // label 6
    [T.t25, T.t41, T.t47, T.t35, T.t55, T.t33, T.t30, T.t21],  // label 5
    [T.t37, T.t34, T.t26, T.t36, T.t54, T.t27, T.t56, T.t16],  // label 4
    [T.t22, T.t19, T.t57, T.t58, T.t59, T.t51, T.t52, T.t23],  // label 3
    [T.t39, T.t38, T.t43, T.t8,  T.t13, T.t3,  T.t49, T.t50],  // label 2
    [T.t24, T.t48, T.t53, T.t10, T.t7,  T.t6,  T.t32, T.t14],  // label 1
  ],
};
