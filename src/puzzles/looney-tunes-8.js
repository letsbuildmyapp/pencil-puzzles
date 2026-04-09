import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(3),         t2:  mk(16),        t3:  mk(33),        t4:  mk(35),
  t5:  mk(496),       t6:  mk(16864),     t7:  mk(24708),     t8:  mk(24769),
  t9:  mk(33825),     t10: mk(33860),     t11: mk(66593),     t12: mk(135826),
  t13: mk(476223),    t14: mk(1048576),   t15: mk(1081344),   t16: mk(1087760),
  t17: mk(2165215),   t18: mk(2175488),   t19: mk(2232584),   t20: mk(3115552),
  t21: mk(4260864),   t22: mk(4267776),   t23: mk(4327489),   t24: mk(4329604),
  t25: mk(4330264),   t26: mk(4333840),   t27: mk(4472832),   t28: mk(4801796),
  t29: mk(6430984),   t30: mk(7593447),   t31: mk(8521761),   t32: mk(8691972),
  t33: mk(8912896),   t34: mk(9412736),   t35: mk(9620930),   t36: mk(10166532),
  t37: mk(16777216),  t38: mk(16777251),  t39: mk(17309960),  t40: mk(18285064),
  t41: mk(19179092),  t42: mk(25977344),  t43: mk(33554414),
};

export const LOONEY_TUNES_8_PUZZLE = {
  id: "lt08", title: "Tweety Bird", subtitle: "8×8 · Easy",
  riddle: "I tawt I taw a puddy tat!\nMy big blue eyes and yellow feathers are hard to miss.\nI'm the sweetest bird around.\nWhat am I?",
  solution: [
    [T.t0,  T.t1,  T.t22, T.t20, T.t34, T.t8,  T.t2,  T.t0 ],  // label 8
    [T.t3,  T.t27, T.t0,  T.t0,  T.t0,  T.t0,  T.t31, T.t0 ],  // label 7
    [T.t19, T.t12, T.t0,  T.t0,  T.t0,  T.t41, T.t2,  T.t39],  // label 6
    [T.t32, T.t35, T.t7,  T.t0,  T.t16, T.t36, T.t0,  T.t24],  // label 5
    [T.t23, T.t24, T.t17, T.t9,  T.t38, T.t25, T.t0,  T.t26],  // label 4
    [T.t14, T.t28, T.t43, T.t15, T.t30, T.t42, T.t10, T.t37],  // label 3
    [T.t0,  T.t29, T.t4,  T.t13, T.t0,  T.t11, T.t33, T.t0 ],  // label 2
    [T.t0,  T.t21, T.t6,  T.t40, T.t5,  T.t18, T.t0,  T.t0 ],  // label 1
  ],
};
