import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(33), t2: mk(7864319), t3: mk(17593310),
  t4: mk(33537519), t5: mk(30338939), t6: mk(1048376), t7: mk(1048575),
  t8: mk(17176), t9: mk(1127), t10: mk(33554431), t11: mk(31457279),
  t12: mk(32473087), t13: mk(16777199), t14: mk(202950), t15: mk(33825),
  t16: mk(575025), t17: mk(541200), t18: mk(6536687), t19: mk(6774519),
  t20: mk(25368), t21: mk(1084515), t22: mk(18741181), t23: mk(17333214),
};

export const HORSE_PUZZLE = {
  id: "a11", title: "Horse", subtitle: "8×8 · Hard",
  riddle: "I carry kings and cowboys both,\nmy mane flows in the breeze.\nI gallop fast on four strong legs.\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t2,  T.t3,  T.t0,  T.t0,  T.t0,  T.t0 ],
    [T.t0,  T.t0,  T.t4,  T.t5,  T.t6,  T.t7,  T.t7,  T.t8 ],
    [T.t0,  T.t9,  T.t10, T.t11, T.t10, T.t10, T.t10, T.t12],
    [T.t0,  T.t13, T.t10, T.t10, T.t10, T.t10, T.t10, T.t10],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0 ],
    [T.t14, T.t14, T.t0,  T.t0,  T.t0,  T.t15, T.t16, T.t17],
    [T.t18, T.t19, T.t20, T.t0,  T.t0,  T.t21, T.t22, T.t23],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0 ],
  ],
};
