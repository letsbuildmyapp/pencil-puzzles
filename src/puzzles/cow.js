import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(0), t2: mk(0), t3: mk(0), t4: mk(55569),
  t5: mk(0), t6: mk(0), t7: mk(0), t8: mk(0), t9: mk(0),
  t10: mk(772), t11: mk(0), t12: mk(0), t13: mk(0), t14: mk(0),
  t15: mk(0), t16: mk(0), t17: mk(0), t18: mk(0), t19: mk(4329608),
  t20: mk(0), t21: mk(0), t22: mk(0), t23: mk(0), t24: mk(3145728),
  t25: mk(0), t26: mk(0), t27: mk(0), t28: mk(0), t29: mk(0),
  t30: mk(0), t31: mk(0), t32: mk(0), t33: mk(0), t34: mk(0),
  t35: mk(9200408), t36: mk(0), t37: mk(30302208), t38: mk(0), t39: mk(0),
  t40: mk(7094808), t41: mk(7576673), t42: mk(0), t43: mk(0), t44: mk(0),
  t45: mk(0), t46: mk(992), t47: mk(0), t48: mk(32469264), t49: mk(2136542),
  t50: mk(0), t51: mk(0), t52: mk(0), t53: mk(0), t54: mk(0),
  t55: mk(0), t56: mk(0), t57: mk(0),
};

export const COW_PUZZLE = {
  id: "a01", title: "Cow", subtitle: "8×8 · Easy",
  riddle: "I give you milk every morning,\nand I moo when I'm feeling fine.\nI roam the fields in black and white.\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t2,  T.t0,  T.t57, T.t4,  T.t56, T.t6 ],
    [T.t7,  T.t8,  T.t9,  T.t10, T.t11, T.t12, T.t13, T.t5 ],
    [T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20, T.t21],
    [T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29],
    [T.t30, T.t31, T.t32, T.t11, T.t3,  T.t33, T.t34, T.t35],
    [T.t36, T.t37, T.t38, T.t39, T.t40, T.t41, T.t42, T.t43],
    [T.t44, T.t45, T.t46, T.t7,  T.t1,  T.t47, T.t48, T.t49],
    [T.t50, T.t51, T.t52, T.t53, T.t52, T.t54, T.t55, T.t50],
  ],
};
