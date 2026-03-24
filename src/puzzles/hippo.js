import { mk } from "../lib/tiles";

const T = {
  t0: mk(0), t1: mk(25496), t2: mk(32), t3: mk(25368), t4: mk(1127),
  t5: mk(16777215), t6: mk(33554431), t7: mk(30375935), t8: mk(536),
  t9: mk(16743423), t10: mk(33013759), t11: mk(33453055), t12: mk(30374878),
  t13: mk(33537251), t14: mk(32469776), t15: mk(1082368), t16: mk(33453039),
  t17: mk(33520639), t18: mk(33013756), t19: mk(811904), t20: mk(202950),
  t21: mk(33825), t22: mk(575025), t23: mk(541200), t24: mk(6798816),
  t25: mk(7069408), t26: mk(811776), t27: mk(1150048), t28: mk(18806688),
  t29: mk(17791936),
};

export const HIPPO_PUZZLE = {
  id: "a04", title: "Hippo", subtitle: "8×8 · Easy",
  riddle: "I love to swim and yawn very wide,\nI'm big and round and grey.\nDon't let my size fool you - I'm fast!\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t1,  T.t0,  T.t0,  T.t2,  T.t3,  T.t0 ],
    [T.t0,  T.t4,  T.t5,  T.t6,  T.t6,  T.t6,  T.t7,  T.t8 ],
    [T.t0,  T.t9,  T.t10, T.t6,  T.t6,  T.t6,  T.t11, T.t12],
    [T.t0,  T.t13, T.t6,  T.t6,  T.t6,  T.t6,  T.t6,  T.t14],
    [T.t0,  T.t15, T.t16, T.t6,  T.t6,  T.t17, T.t18, T.t19],
    [T.t20, T.t20, T.t0,  T.t0,  T.t0,  T.t21, T.t22, T.t23],
    [T.t24, T.t25, T.t26, T.t0,  T.t0,  T.t27, T.t28, T.t29],
    [T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0,  T.t0 ],
  ],
};
