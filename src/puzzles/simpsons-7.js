import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(16),        t2:  mk(24),        t3:  mk(34),
  t4:  mk(100),       t5:  mk(554),        t6:  mk(898),       t7:  mk(4255),
  t8:  mk(4406),      t9:  mk(24708),      t10: mk(131071),    t11: mk(532612),
  t12: mk(541184),    t13: mk(541196),     t14: mk(819199),    t15: mk(1048583),
  t16: mk(1048705),   t17: mk(1083484),    t18: mk(1116361),   t19: mk(2129953),
  t20: mk(2130992),   t21: mk(2164802),    t22: mk(2167089),   t23: mk(2169136),
  t24: mk(2196512),   t25: mk(2232386),    t26: mk(2582821),   t27: mk(3145728),
  t28: mk(3213218),   t29: mk(3285304),    t30: mk(4194304),   t31: mk(4292636),
  t32: mk(4297472),   t33: mk(4329000),    t34: mk(4464770),   t35: mk(4511744),
  t36: mk(6394624),   t37: mk(7456036),    t38: mk(8126467),   t39: mk(8526128),
  t40: mk(8659208),   t41: mk(8921312),    t42: mk(8929816),   t43: mk(9768960),
  t44: mk(10824010),  t45: mk(14852356),   t46: mk(17044034),  t47: mk(17317996),
  t48: mk(17318416),  t49: mk(17383944),   t50: mk(20192310),  t51: mk(21109034),
  t52: mk(21233664),  t53: mk(21242128),   t54: mk(25395224),  t55: mk(29424390),
  t56: mk(32400178),  t57: mk(32776452),   t58: mk(33080354),
};

export const SIMPSONS_7_PUZZLE = {
  id: "sm07",
  title: "Krusty the Clown",
  subtitle: "8×8 · Easy",
  riddle: "Hey hey! I host the most popular kids' show in Springfield.\\nBehind the greasepaint, I'm a mess — but the show goes on!\\nWhat am I?",
  solution: [
    [T.t45, T.t9,  T.t0,  T.t18, T.t8,  T.t36, T.t11, T.t0 ],  // label 8
    [T.t34, T.t27, T.t13, T.t48, T.t0,  T.t0,  T.t21, T.t3 ],  // label 7
    [T.t25, T.t0,  T.t19, T.t47, T.t6,  T.t4,  T.t28, T.t52],  // label 6
    [T.t24, T.t2,  T.t0,  T.t49, T.t15, T.t42, T.t16, T.t12],  // label 5
    [T.t5,  T.t33, T.t29, T.t54, T.t41, T.t32, T.t38, T.t46],  // label 4
    [T.t44, T.t40, T.t31, T.t37, T.t14, T.t10, T.t56, T.t35],  // label 3
    [T.t30, T.t43, T.t22, T.t26, T.t57, T.t58, T.t51, T.t1 ],  // label 2
    [T.t7,  T.t17, T.t23, T.t20, T.t50, T.t55, T.t53, T.t39],  // label 1
  ],
};
