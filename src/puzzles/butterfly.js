import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(36351), t2: mk(33548081), t3: mk(33554431),
  t4: mk(33537519), t5: mk(32499512), t6: mk(29695), t7: mk(16),
  t8: mk(1154543), t9: mk(33518488), t10: mk(1082401), t11: mk(16236015),
  t12: mk(25977624), t13: mk(15961120), t14: mk(26115071), t15: mk(16777214),
  t16: mk(17317888), t17: mk(1048576), t18: mk(33537251), t19: mk(16776088),
  t20: mk(25165824), t21: mk(30303000), t22: mk(16777216), t23: mk(236783),
  t24: mk(16777215), t25: mk(30358755), t26: mk(799), t27: mk(111),
  t28: mk(15974399), t29: mk(33553176), t30: mk(32736256), t31: mk(32505313),
  t32: mk(1048575), t33: mk(4194303), t34: mk(33554384), t35: mk(33046528),
  t36: mk(15828001), t37: mk(32260624),
};

export const BUTTERFLY_PUZZLE = {
  id: "a10", title: "Butterfly", subtitle: "8×8 · Hard",
  riddle: "I start as something that creeps and crawls,\nthen wrap myself away.\nI emerge with wings of colour.\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t2,  T.t3,  T.t4,  T.t5,  T.t6,  T.t7 ],
    [T.t8,  T.t9,  T.t10, T.t3,  T.t11, T.t12, T.t13, T.t14],
    [T.t15, T.t16, T.t17, T.t18, T.t19, T.t20, T.t0,  T.t11],
    [T.t21, T.t0,  T.t0,  T.t17, T.t22, T.t0,  T.t23, T.t24],
    [T.t25, T.t26, T.t0,  T.t0,  T.t0,  T.t27, T.t28, T.t29],
    [T.t0,  T.t30, T.t31, T.t32, T.t33, T.t34, T.t35, T.t22],
    [T.t0,  T.t0,  T.t0,  T.t36, T.t37, T.t0,  T.t0,  T.t0 ],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0 ],
  ],
};
