import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(101475),
  t2: mk(541200),
  t3: mk(1127),
  t4: mk(4193891),
  t5: mk(17792625),
  t6: mk(536),
  t7: mk(495),
  t8: mk(15086591),
  t9: mk(3248127),
  t10: mk(17318911),
  t11: mk(29766655),
  t12: mk(924),
  t13: mk(15728640),
  t14: mk(32911815),
  t15: mk(32607331),
  t16: mk(33047057),
  t17: mk(32912280),
  t18: mk(29360128),
  t19: mk(3178496),
  t20: mk(20970595),
  t21: mk(20970000),
  t22: mk(16777216),
  t23: mk(3247203),
  t24: mk(17318416),
  t25: mk(3247200),
  t26: mk(17318400)
};

export const CHRISTIAN_7_PUZZLE = {
  id: "ch07",
  title: "Celtic Cross",
  subtitle: "8×8 · Hard",
  riddle: "A cross embraced by heaven's ring,\nancient faith in stone I bring.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t0, T.t1, T.t2, T.t0, T.t0, T.t0],  // label 8
    [T.t0, T.t0, T.t3, T.t4, T.t5, T.t6, T.t0, T.t0],  // label 7
    [T.t0, T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t0],  // label 6
    [T.t0, T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t0],  // label 5
    [T.t0, T.t0, T.t19, T.t20, T.t21, T.t22, T.t0, T.t0],  // label 4
    [T.t0, T.t0, T.t0, T.t23, T.t24, T.t0, T.t0, T.t0],  // label 3
    [T.t0, T.t0, T.t0, T.t23, T.t24, T.t0, T.t0, T.t0],  // label 2
    [T.t0, T.t0, T.t0, T.t25, T.t26, T.t0, T.t0, T.t0]  // label 1
  ],
};
