import { mk } from "../lib/tiles";

const T = {
  t0:  mk(96),        t1:  mk(128),       t2:  mk(192),       t3:  mk(256),
  t4:  mk(772),       t5:  mk(1020),      t6:  mk(1084),      t7:  mk(1984),
  t8:  mk(2048),      t9:  mk(4096),      t10: mk(16384),     t11: mk(16871),
  t12: mk(24706),     t13: mk(49152),     t14: mk(111104),    t15: mk(131072),
  t16: mk(262144),    t17: mk(270592),    t18: mk(792624),    t19: mk(919584),
  t20: mk(919618),    t21: mk(919640),    t22: mk(1048576),   t23: mk(1118367),
  t24: mk(2097152),   t25: mk(2129920),   t26: mk(2129932),   t27: mk(2130354),
  t28: mk(2137352),   t29: mk(2161664),   t30: mk(2181673),   t31: mk(2232452),
  t32: mk(2253824),   t33: mk(2621704),   t34: mk(3146753),   t35: mk(4259856),
  t36: mk(4326337),   t37: mk(4327489),   t38: mk(5378318),   t39: mk(7082049),
  t40: mk(7618817),   t41: mk(8388608),   t42: mk(8586240),   t43: mk(8617985),
  t44: mk(8659216),   t45: mk(9733157),   t46: mk(10029192),  t47: mk(12582912),
  t48: mk(16777280),  t49: mk(17043457),  t50: mk(17072128),  t51: mk(18092032),
  t52: mk(18092113),  t53: mk(18284544),  t54: mk(20193413),  t55: mk(20317276),
  t56: mk(25504057),
};

export const PEANUTS_10_PUZZLE = {
  id: "pn10",
  title: "Pigpen",
  subtitle: "8×8 · Easy",
  riddle: "I always have a cloud of dust and dirt around me.\nNo matter how hard I try, I can never stay clean.\nWhat am I?",
  solution: [
    [T.t15, T.t6,  T.t19, T.t23, T.t55, T.t49, T.t4,  T.t9 ],  // label 8
    [T.t22, T.t27, T.t40, T.t36, T.t34, T.t39, T.t26, T.t10],  // label 7
    [T.t53, T.t38, T.t33, T.t2,  T.t0,  T.t50, T.t54, T.t21],  // label 6
    [T.t43, T.t56, T.t37, T.t8,  T.t20, T.t13, T.t30, T.t35],  // label 5
    [T.t31, T.t17, T.t51, T.t9,  T.t47, T.t3,  T.t45, T.t44],  // label 4
    [T.t25, T.t19, T.t52, T.t18, T.t7,  T.t32, T.t46, T.t1 ],  // label 3
    [T.t41, T.t16, T.t42, T.t11, T.t5,  T.t14, T.t48, T.t8 ],  // label 2
    [T.t24, T.t8,  T.t16, T.t28, T.t29, T.t12, T.t1,  T.t10],  // label 1
  ],
};
