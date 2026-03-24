import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(424908), t2: mk(212454), t3: mk(7864319),
  t4: mk(33554431), t5: mk(549656), t6: mk(3382503), t7: mk(33080895),
  t8: mk(32505887), t9: mk(32742655), t10: mk(33452959), t11: mk(33013247),
  t12: mk(25977616), t13: mk(7576803), t14: mk(33047551), t15: mk(32608255),
  t16: mk(33486847), t17: mk(33520639), t18: mk(32506879), t19: mk(33013759),
  t20: mk(17588752), t21: mk(1082400), t22: mk(33271711), t23: mk(33378783),
  t24: mk(32539711), t25: mk(17318424), t26: mk(1048576), t27: mk(17589016),
  t28: mk(3651968), t29: mk(16236031), t30: mk(33554400), t31: mk(33554401),
  t32: mk(32472030), t33: mk(26163392), t34: mk(33553408), t35: mk(1082368),
  t36: mk(32471040),
};

export const OWL_PUZZLE = {
  id: "a02", title: "Owl", subtitle: "8×8 · Easy",
  riddle: "I sleep all day and wake at night,\nmy head can spin almost all the way round.\nWho-who could I be?\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t2 ],
    [T.t0,  T.t3,  T.t4,  T.t4,  T.t4,  T.t4,  T.t4,  T.t5 ],
    [T.t6,  T.t7,  T.t4,  T.t8,  T.t9,  T.t10, T.t11, T.t12],
    [T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20],
    [T.t21, T.t4,  T.t8,  T.t22, T.t23, T.t24, T.t4,  T.t25],
    [T.t0,  T.t26, T.t4,  T.t4,  T.t4,  T.t4,  T.t27, T.t0 ],
    [T.t0,  T.t28, T.t29, T.t30, T.t31, T.t32, T.t33, T.t0 ],
    [T.t0,  T.t0,  T.t34, T.t0,  T.t35, T.t36, T.t0,  T.t0 ],
  ],
};
