import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(1),         t2:  mk(16),        t3:  mk(24),        t4:  mk(32),
  t5:  mk(465),       t6:  mk(744),       t7:  mk(960),       t8:  mk(3208),
  t9:  mk(16644),     t10: mk(31744),     t11: mk(33858),     t12: mk(52712),
  t13: mk(103168),    t14: mk(111104),    t15: mk(126976),    t16: mk(229376),
  t17: mk(786432),    t18: mk(920576),    t19: mk(921732),    t20: mk(984561),
  t21: mk(1015808),   t22: mk(1048593),   t23: mk(1082401),   t24: mk(1112064),
  t25: mk(1619968),   t26: mk(2166916),   t27: mk(2193440),   t28: mk(2232452),
  t29: mk(3145728),   t30: mk(4263900),   t31: mk(4329538),   t32: mk(4396206),
  t33: mk(7912486),   t34: mk(8260608),   t35: mk(8657920),   t36: mk(9068065),
  t37: mk(10029188),  t38: mk(14731648),  t39: mk(15244327),  t40: mk(16322832),
  t41: mk(16777216),  t42: mk(16778273),  t43: mk(17793024),  t44: mk(23540828),
  t45: mk(25165824),  t46: mk(29360128),  t47: mk(29487104),  t48: mk(29496288),
};

export const PEANUTS_8_PUZZLE = {
  id: "pn08",
  title: "Snoopy Flying",
  subtitle: "8×8 · Easy",
  riddle: "Here's the World War I flying ace soaring through the sky!\nCursing that Red Baron from atop my doghouse.\nWhat am I?",
  solution: [
    [T.t4,  T.t7,  T.t1,  T.t14, T.t18, T.t6,  T.t2,  T.t0 ],  // label 8
    [T.t16, T.t17, T.t26, T.t8,  T.t12, T.t44, T.t43, T.t9 ],  // label 7
    [T.t29, T.t46, T.t31, T.t35, T.t37, T.t0,  T.t0,  T.t32],  // label 6
    [T.t3,  T.t5,  T.t22, T.t20, T.t30, T.t10, T.t15, T.t41],  // label 5
    [T.t33, T.t13, T.t38, T.t40, T.t48, T.t36, T.t0,  T.t0 ],  // label 4
    [T.t45, T.t0,  T.t11, T.t42, T.t39, T.t25, T.t0,  T.t0 ],  // label 3
    [T.t0,  T.t0,  T.t28, T.t27, T.t23, T.t0,  T.t0,  T.t0 ],  // label 2
    [T.t21, T.t34, T.t47, T.t21, T.t24, T.t21, T.t21, T.t19],  // label 1
  ],
};
