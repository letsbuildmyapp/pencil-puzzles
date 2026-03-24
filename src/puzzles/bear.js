import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(950152), t2: mk(244962), t3: mk(7864319),
  t4: mk(33554431), t5: mk(549656), t6: mk(3382499), t7: mk(33081343),
  t8: mk(25977368), t9: mk(1082400), t10: mk(33520639), t11: mk(32506879),
  t12: mk(32608255), t13: mk(33453055), t14: mk(16777728), t15: mk(16235744),
  t16: mk(33554400), t17: mk(32471936), t18: mk(212454), t19: mk(35937),
  t20: mk(552816), t21: mk(811800), t22: mk(2097152), t23: mk(8388608),
};

export const BEAR_PUZZLE = {
  id: "a05", title: "Bear", subtitle: "8×8 · Easy",
  riddle: "I sleep all winter long,\nI love honey from the hive.\nBig paws, big claws, big appetite.\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t2 ],
    [T.t0,  T.t3,  T.t4,  T.t4,  T.t4,  T.t4,  T.t4,  T.t5 ],
    [T.t6,  T.t7,  T.t4,  T.t4,  T.t4,  T.t7,  T.t4,  T.t8 ],
    [T.t9,  T.t4,  T.t10, T.t11, T.t12, T.t4,  T.t13, T.t14],
    [T.t0,  T.t15, T.t16, T.t16, T.t16, T.t16, T.t17, T.t0 ],
    [T.t18, T.t18, T.t0,  T.t0,  T.t0,  T.t19, T.t20, T.t21],
    [T.t22, T.t22, T.t0,  T.t0,  T.t0,  T.t0,  T.t23, T.t23],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0 ],
  ],
};
