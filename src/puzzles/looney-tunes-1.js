import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(760),       t2:  mk(1090),      t3:  mk(6424),      t4:  mk(9785),
  t5:  mk(16905),     t6:  mk(39184),     t7:  mk(134145),    t8:  mk(541649),
  t9:  mk(1048576),   t10: mk(1142908),   t11: mk(1874020),   t12: mk(2031616),
  t13: mk(2165859),   t14: mk(2167977),   t15: mk(2252800),   t16: mk(2260104),
  t17: mk(3245112),   t18: mk(3273659),   t19: mk(3939840),   t20: mk(4260864),
  t21: mk(4291649),   t22: mk(4354972),   t23: mk(4792580),   t24: mk(4860229),
  t25: mk(5395103),   t26: mk(5425493),   t27: mk(6341088),   t28: mk(7078112),
  t29: mk(8539523),   t30: mk(8714370),   t31: mk(10651680),  t32: mk(11094879),
  t33: mk(11161872),  t34: mk(11667489),  t35: mk(12018200),  t36: mk(13717768),
  t37: mk(17045536),  t38: mk(17956449),  t39: mk(18047537),  t40: mk(21635370),
  t41: mk(25165824),  t42: mk(25395200),  t43: mk(25904920),  t44: mk(26115856),
  t45: mk(29407744),  t46: mk(29757293),  t47: mk(30302993),  t48: mk(32212036),
  t49: mk(33004771),  t50: mk(33553372),
};

export const LOONEY_TUNES_1_PUZZLE = {
  id: "lt01", title: "Bugs Bunny", subtitle: "8×8 · Medium",
  riddle: "I outsmart hunters with a carrot and a grin,\nmy long ears and buck teeth are my trademark.\nWhat's up, Doc?\nWhat am I?",
  solution: [
    [T.t0,  T.t31, T.t26, T.t5,  T.t4,  T.t40, T.t33, T.t0 ],  // label 8
    [T.t0,  T.t0,  T.t34, T.t35, T.t48, T.t36, T.t0,  T.t0 ],  // label 7
    [T.t0,  T.t0,  T.t14, T.t23, T.t2,  T.t24, T.t0,  T.t0 ],  // label 6
    [T.t7,  T.t1,  T.t32, T.t22, T.t13, T.t25, T.t8,  T.t3 ],  // label 5
    [T.t16, T.t27, T.t19, T.t46, T.t18, T.t45, T.t28, T.t21],  // label 4
    [T.t30, T.t12, T.t49, T.t43, T.t39, T.t50, T.t42, T.t11],  // label 3
    [T.t9,  T.t37, T.t17, T.t44, T.t38, T.t47, T.t6,  T.t41],  // label 2
    [T.t0,  T.t0,  T.t20, T.t29, T.t10, T.t15, T.t0,  T.t0 ],  // label 1
  ],
};
