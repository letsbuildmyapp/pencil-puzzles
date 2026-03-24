import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(950152), t2: mk(244962), t3: mk(7864319),
  t4: mk(33554431), t5: mk(549656), t6: mk(3382503), t7: mk(33541759),
  t8: mk(33529087), t9: mk(26112912), t10: mk(7572512), t11: mk(33455103),
  t12: mk(32605183), t13: mk(33453055), t14: mk(32606207), t15: mk(17588736),
  t16: mk(15728640), t17: mk(32505856), t18: mk(31457280), t19: mk(212454),
  t20: mk(35937), t21: mk(552816), t22: mk(811800), t23: mk(2097152),
  t24: mk(8388608),
};

export const PANDA_PUZZLE = {
  id: "a09", title: "Panda", subtitle: "8×8 · Medium",
  riddle: "I'm black and white and love bamboo,\nI'm rare and very round.\nChina calls me a national treasure.\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t2 ],
    [T.t0,  T.t3,  T.t4,  T.t4,  T.t4,  T.t4,  T.t4,  T.t5 ],
    [T.t6,  T.t7,  T.t4,  T.t4,  T.t4,  T.t4,  T.t8,  T.t9 ],
    [T.t10, T.t11, T.t12, T.t4,  T.t13, T.t14, T.t4,  T.t15],
    [T.t0,  T.t16, T.t17, T.t17, T.t17, T.t17, T.t18, T.t0 ],
    [T.t19, T.t19, T.t0,  T.t0,  T.t0,  T.t20, T.t21, T.t22],
    [T.t23, T.t23, T.t0,  T.t0,  T.t0,  T.t0,  T.t24, T.t24],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0 ],
  ],
};
