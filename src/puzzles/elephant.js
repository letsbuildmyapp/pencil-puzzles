import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(236), t2: mk(31744), t3: mk(31776), t4: mk(772),
  t5: mk(1092), t6: mk(64610), t7: mk(25690113), t8: mk(28), t9: mk(3),
  t10: mk(2129936), t11: mk(32520), t12: mk(16644), t13: mk(12988812),
  t14: mk(2232452), t15: mk(2232450), t16: mk(2143650), t17: mk(4468068),
  t18: mk(12716100), t19: mk(25440652), t20: mk(4329604), t21: mk(12720195),
  t22: mk(4329538), t23: mk(1048608), t24: mk(29363344), t25: mk(3170433),
  t26: mk(25166336), t27: mk(12988696), t28: mk(4596240), t29: mk(3246113),
  t30: mk(18317312), t31: mk(6612265), t32: mk(18162441), t33: mk(18155634),
  t34: mk(13192786), t35: mk(18777123), t36: mk(541184), t37: mk(1048576),
  t38: mk(540933), t39: mk(10617824), t40: mk(10752148), t41: mk(10555525),
  t42: mk(3217628), t43: mk(6426756), t44: mk(1057), t45: mk(13242496),
  t46: mk(6494406), t47: mk(7477472), t48: mk(14240736), t49: mk(540416),
  t50: mk(5589088), t51: mk(23392224), t52: mk(29766400),
};

export const ELEPHANT_PUZZLE = {
  id: "elephant", title: "Elephant", subtitle: "8×8 · Easy",
  riddle: "I never forget a thing, and I'm the largest on land.\nI carry my trunk wherever I go — but I don't pack a bag.\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t1,  T.t2,  T.t3,  T.t4,  T.t0,  T.t0 ],
    [T.t5,  T.t6,  T.t7,  T.t8,  T.t9,  T.t10, T.t11, T.t12],
    [T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20],
    [T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27, T.t28],
    [T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t35, T.t36],
    [T.t37, T.t38, T.t39, T.t40, T.t41, T.t39, T.t42, T.t0 ],
    [T.t0,  T.t43, T.t44, T.t45, T.t46, T.t0,  T.t13, T.t0 ],
    [T.t0,  T.t47, T.t48, T.t49, T.t50, T.t51, T.t52, T.t0 ],
  ],
};
