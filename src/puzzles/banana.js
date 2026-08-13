import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(98),
  t2: mk(776),
  t3: mk(2196582),
  t4: mk(9191688),
  t5: mk(12853776),
  t6: mk(8654980),
  t7: mk(33890),
  t8: mk(17301504),
  t9: mk(4329864),
  t10: mk(6435600),
  t11: mk(1),
  t12: mk(8667648),
  t13: mk(1153432),
  t14: mk(3215632),
  t15: mk(1116362),
  t16: mk(124),
  t17: mk(3629056),
  t18: mk(16646144),
};

export const BANANA_PUZZLE = {
  id: "fd06",
  title: "Banana",
  subtitle: "8×8 · Easy",
  riddle: "I'm yellow and curved\nMonkeys love me the most\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t1, T.t2, T.t0],
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t3, T.t4, T.t0],
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t5, T.t6, T.t0],
    [T.t0, T.t0, T.t0, T.t0, T.t7, T.t8, T.t9, T.t0],
    [T.t0, T.t0, T.t0, T.t0, T.t10, T.t11, T.t12, T.t0],
    [T.t0, T.t0, T.t0, T.t13, T.t11, T.t14, T.t0, T.t0],
    [T.t0, T.t0, T.t15, T.t16, T.t17, T.t0, T.t0, T.t0],
    [T.t0, T.t0, T.t18, T.t0, T.t0, T.t0, T.t0, T.t0],
  ],
};
