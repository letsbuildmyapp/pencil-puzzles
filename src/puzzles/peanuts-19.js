import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(33),        t2:  mk(224),       t3:  mk(248),
  t4:  mk(520),       t5:  mk(772),        t6:  mk(1056),      t7:  mk(1092),
  t8:  mk(3204),      t9:  mk(3972),       t10: mk(15840),     t11: mk(32290),
  t12: mk(32768),     t13: mk(34953),      t14: mk(237931),    t15: mk(253959),
  t16: mk(507904),    t17: mk(532744),     t18: mk(540672),    t19: mk(1082368),
  t20: mk(1462368),   t21: mk(2131012),    t22: mk(2131456),   t23: mk(2164872),
  t24: mk(2777088),   t25: mk(4130904),    t26: mk(4292608),   t27: mk(4327490),
  t28: mk(4690192),   t29: mk(4871002),    t30: mk(8916104),   t31: mk(8929280),
  t32: mk(9314528),   t33: mk(9742080),    t34: mk(11703362),  t35: mk(11904224),
  t36: mk(16646624),  t37: mk(16761352),   t38: mk(16777216),  t39: mk(16863619),
  t40: mk(17047823),  t41: mk(17313888),   t42: mk(27357184),  t43: mk(27943708),
  t44: mk(29428100),  t45: mk(32519101),
};

export const PEANUTS_19_PUZZLE = {
  id: "pn19",
  title: "Jumping Snoopy",
  subtitle: "8×8 · Easy",
  riddle: "I leap for joy on top of my doghouse roof.\\nHappiness is a warm puppy — especially me!\\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t13, T.t45, T.t18, T.t0,  T.t14, T.t17],  // label 8
    [T.t0,  T.t0,  T.t35, T.t43, T.t3,  T.t5,  T.t34, T.t29],  // label 7
    [T.t0,  T.t7,  T.t16, T.t36, T.t2,  T.t22, T.t37, T.t42],  // label 6
    [T.t1,  T.t31, T.t10, T.t0,  T.t0,  T.t0,  T.t27, T.t0 ],  // label 5
    [T.t19, T.t4,  T.t0,  T.t0,  T.t21, T.t0,  T.t23, T.t0 ],  // label 4
    [T.t0,  T.t26, T.t41, T.t9,  T.t30, T.t15, T.t38, T.t0 ],  // label 3
    [T.t6,  T.t25, T.t40, T.t28, T.t32, T.t33, T.t44, T.t0 ],  // label 2
    [T.t12, T.t39, T.t11, T.t0,  T.t8,  T.t20, T.t24, T.t0 ],  // label 1
  ],
};
