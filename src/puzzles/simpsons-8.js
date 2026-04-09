import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(3),         t2:  mk(16),        t3:  mk(30),
  t4:  mk(31),        t5:  mk(33),         t6:  mk(34),        t7:  mk(520),
  t8:  mk(524),       t9:  mk(969),        t10: mk(1055),      t11: mk(1224),
  t12: mk(32008),     t13: mk(63488),      t14: mk(102664),    t15: mk(253952),
  t16: mk(536641),    t17: mk(1048576),    t18: mk(1051648),   t19: mk(1077313),
  t20: mk(1082436),   t21: mk(1142784),    t22: mk(2130944),   t23: mk(2137393),
  t24: mk(2164802),   t25: mk(2165330),    t26: mk(3351056),   t27: mk(4329537),
  t28: mk(6291487),   t29: mk(6562289),    t30: mk(7340032),   t31: mk(8523842),
  t32: mk(8659204),   t33: mk(8659208),    t34: mk(8667396),   t35: mk(8674337),
  t36: mk(8692898),   t37: mk(8912896),    t38: mk(13141025),  t39: mk(16777216),
  t40: mk(16812098),  t41: mk(17047916),   t42: mk(17071104),  t43: mk(17309960),
  t44: mk(19271759),  t45: mk(19833092),   t46: mk(23340008),  t47: mk(25165824),
  t48: mk(25298976),  t49: mk(32640000),
};

export const SIMPSONS_8_PUZZLE = {
  id: "sm08",
  title: "Nelson",
  subtitle: "8×8 · Easy",
  riddle: "Ha-ha! I'm Springfield's resident bully with a big laugh.\\nTough on the outside, soft on the inside.\\nWhat am I?",
  solution: [
    [T.t0,  T.t6,  T.t15, T.t16, T.t4,  T.t1,  T.t0,  T.t0 ],  // label 8
    [T.t0,  T.t27, T.t11, T.t19, T.t0,  T.t17, T.t48, T.t2 ],  // label 7
    [T.t0,  T.t29, T.t46, T.t9,  T.t43, T.t0,  T.t0,  T.t43],  // label 6
    [T.t5,  T.t42, T.t35, T.t21, T.t36, T.t41, T.t7,  T.t33],  // label 5
    [T.t14, T.t47, T.t28, T.t10, T.t7,  T.t18, T.t34, T.t32],  // label 4
    [T.t30, T.t49, T.t45, T.t37, T.t0,  T.t1,  T.t26, T.t44],  // label 3
    [T.t0,  T.t0,  T.t23, T.t12, T.t13, T.t38, T.t40, T.t39],  // label 2
    [T.t0,  T.t20, T.t25, T.t31, T.t0,  T.t24, T.t22, T.t8 ],  // label 1
  ],
};
