import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(201859), t2: mk(23812), t3: mk(2940961), t4: mk(55569),
  t5: mk(0), t6: mk(0), t7: mk(3208), t8: mk(4128768), t9: mk(4980840),
  t10: mk(772), t11: mk(232), t12: mk(20349448), t13: mk(920576), t14: mk(6292514),
  t15: mk(25960712), t16: mk(8659204), t17: mk(2190148), t18: mk(17324744), t19: mk(4329608),
  t20: mk(16132363), t21: mk(16777216), t22: mk(2234863), t23: mk(8659472), t24: mk(3145728),
  t25: mk(25166320), t26: mk(7340804), t27: mk(16777216), t28: mk(9708048), t29: mk(540936),
  t30: mk(16236011), t31: mk(19448604), t32: mk(1132870), t33: mk(1118481), t34: mk(36095),
  t35: mk(9200408), t36: mk(9605186), t37: mk(30302208), t38: mk(16515176), t39: mk(17825775),
  t40: mk(7094808), t41: mk(7576673), t42: mk(33554431), t43: mk(30099522), t44: mk(1081344),
  t45: mk(16645), t46: mk(992), t47: mk(1082245), t48: mk(32469264), t49: mk(2136542),
  t50: mk(10485760), t51: mk(2232462), t52: mk(8929823), t53: mk(8523986), t54: mk(1589791),
  t55: mk(541200), t56: mk(541200), t57: mk(920576), t58: mk(7572496), t59: mk(30302308),
  t60: mk(405504), t61: mk(1015808), t62: mk(4247),
};

export const COW_PUZZLE = {
  id: "a01", title: "Cow", subtitle: "8×8 · Medium",
  riddle: "I give you milk every morning,\nand I moo when I'm feeling fine.\nI roam the fields in black and white.\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t2,  T.t61, T.t57, T.t4,  T.t56, T.t6 ],
    [T.t7,  T.t8,  T.t9,  T.t10, T.t11, T.t12, T.t13, T.t5 ],
    [T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20, T.t21],
    [T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29],
    [T.t30, T.t31, T.t32, T.t60, T.t3,  T.t33, T.t34, T.t35],
    [T.t36, T.t37, T.t38, T.t39, T.t40, T.t41, T.t42, T.t43],
    [T.t44, T.t45, T.t46, T.t58, T.t59, T.t47, T.t48, T.t49],
    [T.t50, T.t51, T.t62, T.t53, T.t52, T.t54, T.t55, T.t50],
  ],
};
