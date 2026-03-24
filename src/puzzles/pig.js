import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(816024), t2: mk(204006), t3: mk(1057),
  t4: mk(16777215), t5: mk(33554431), t6: mk(30310399), t7: mk(16912),
  t8: mk(7576807), t9: mk(33148927), t10: mk(32743423), t11: mk(17723920),
  t12: mk(7576673), t13: mk(33554200), t14: mk(17317888), t15: mk(1082368),
  t16: mk(30310368), t17: mk(15171552), t18: mk(7602144), t19: mk(30309248),
  t20: mk(4669376), t21: mk(6494406), t22: mk(1082401), t23: mk(18400817),
  t24: mk(17318416), t25: mk(16235520), t26: mk(3247104), t27: mk(29223936),
  t28: mk(25976832),
};

export const PIG_PUZZLE = {
  id: "a03", title: "Pig", subtitle: "8×8 · Easy",
  riddle: "I roll in mud to keep cool,\nmy tail curls like a spring.\nOink oink - do you know me?\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t2 ],
    [T.t3,  T.t4,  T.t5,  T.t5,  T.t5,  T.t5,  T.t6,  T.t7 ],
    [T.t8,  T.t9,  T.t5,  T.t5,  T.t5,  T.t5,  T.t10, T.t11],
    [T.t12, T.t5,  T.t5,  T.t5,  T.t5,  T.t5,  T.t13, T.t14],
    [T.t15, T.t16, T.t17, T.t17, T.t17, T.t18, T.t19, T.t0 ],
    [T.t0,  T.t0,  T.t0,  T.t20, T.t0,  T.t0,  T.t0,  T.t0 ],
    [T.t21, T.t21, T.t0,  T.t0,  T.t0,  T.t22, T.t23, T.t24],
    [T.t25, T.t25, T.t0,  T.t0,  T.t0,  T.t26, T.t27, T.t28],
  ],
};
