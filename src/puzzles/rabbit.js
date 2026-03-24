import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(6494406), t2: mk(25977624), t3: mk(6494311),
  t4: mk(1023), t5: mk(25976848), t6: mk(16774031), t7: mk(33554431),
  t8: mk(33553375), t9: mk(33537535), t10: mk(26115038), t11: mk(7576803),
  t12: mk(32736255), t13: mk(33522687), t14: mk(33489919), t15: mk(33030143),
  t16: mk(32505855), t17: mk(16400), t18: mk(1048576), t19: mk(32604160),
  t20: mk(33521664), t21: mk(25165824), t22: mk(405900), t23: mk(101475),
  t24: mk(13090272), t25: mk(3247200),
};

export const RABBIT_PUZZLE = {
  id: "a08", title: "Rabbit", subtitle: "8×8 · Medium",
  riddle: "My ears are long, my tail is short,\nI hop around all day.\nI love to munch on carrots fresh.\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t0,  T.t0,  T.t0,  T.t0,  T.t2,  T.t0 ],
    [T.t0,  T.t3,  T.t4,  T.t4,  T.t4,  T.t4,  T.t5,  T.t0 ],
    [T.t0,  T.t6,  T.t7,  T.t7,  T.t8,  T.t9,  T.t10, T.t0 ],
    [T.t0,  T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t17],
    [T.t0,  T.t18, T.t19, T.t20, T.t20, T.t20, T.t20, T.t21],
    [T.t22, T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t23],
    [T.t24, T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t25],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0 ],
  ],
};
