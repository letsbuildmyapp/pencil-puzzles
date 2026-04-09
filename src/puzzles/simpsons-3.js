import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(31744),     t2:  mk(63488),     t3:  mk(127106),
  t4:  mk(540936),    t5:  mk(786432),     t6:  mk(1048592),   t7:  mk(1082401),
  t8:  mk(1082436),   t9:  mk(1116226),    t10: mk(2164802),   t11: mk(2164804),
  t12: mk(2164872),   t13: mk(2793472),    t14: mk(3215624),   t15: mk(4260864),
  t16: mk(4296836),   t17: mk(4327490),    t18: mk(4329614),   t19: mk(4539392),
  t20: mk(6032520),   t21: mk(8654948),    t22: mk(9078784),   t23: mk(15204352),
  t24: mk(15728640),  t25: mk(16252928),   t26: mk(16777218),  t27: mk(17043522),
  t28: mk(17110049),  t29: mk(17991108),   t30: mk(18942880),  t31: mk(29426754),
};

export const SIMPSONS_3_PUZZLE = {
  id: "sm03",
  title: "Bart",
  subtitle: "8×8 · Easy",
  riddle: "Eat my shorts! I skateboard through Springfield causing chaos.\\nThe underachiever and proud of it.\\nWhat am I?",
  solution: [
    [T.t0,  T.t9,  T.t13, T.t19, T.t22, T.t28, T.t0,  T.t0 ],  // label 8
    [T.t0,  T.t10, T.t0,  T.t0,  T.t0,  T.t7,  T.t0,  T.t0 ],  // label 7
    [T.t0,  T.t10, T.t0,  T.t0,  T.t0,  T.t9,  T.t0,  T.t0 ],  // label 6
    [T.t0,  T.t14, T.t31, T.t25, T.t27, T.t11, T.t0,  T.t0 ],  // label 5
    [T.t0,  T.t21, T.t30, T.t6,  T.t12, T.t18, T.t0,  T.t0 ],  // label 4
    [T.t0,  T.t16, T.t5,  T.t24, T.t26, T.t29, T.t0,  T.t0 ],  // label 3
    [T.t0,  T.t15, T.t1,  T.t3,  T.t23, T.t17, T.t0,  T.t0 ],  // label 2
    [T.t0,  T.t0,  T.t0,  T.t8,  T.t2,  T.t20, T.t4,  T.t0 ],  // label 1
  ],
};
