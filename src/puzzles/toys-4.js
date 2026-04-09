import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1),
  t2: mk(3472),
  t3: mk(1015808),
  t4: mk(24706),
  t5: mk(15),
  t6: mk(16),
  t7: mk(6638145),
  t8: mk(1048615),
  t9: mk(1835007),
  t10: mk(33554431),
  t11: mk(30374911),
  t12: mk(1116292),
  t13: mk(1082401),
  t14: mk(18428),
  t15: mk(1564672),
  t16: mk(33537024),
  t17: mk(33553891),
  t18: mk(33520528),
  t19: mk(12854033),
  t20: mk(3355440),
  t21: mk(21266704),
  t22: mk(986140),
  t23: mk(1153189),
  t24: mk(26215192),
  t25: mk(25706760),
  t26: mk(20934788),
  t27: mk(66565),
  t28: mk(524288),
  t29: mk(29363332),
  t30: mk(6390784),
  t31: mk(16912),
  t32: mk(4329604),
  t33: mk(4329602),
  t34: mk(2102336),
  t35: mk(4293135),
  t36: mk(2031679),
  t37: mk(8976),
  t38: mk(4329736),
  t39: mk(2196512),
  t40: mk(5309009),
  t41: mk(512),
  t42: mk(7439360),
  t43: mk(4192256),
  t44: mk(16778282),
  t45: mk(25706496),
  t46: mk(8588288),
  t47: mk(525063),
  t48: mk(8523871),
  t49: mk(14680095),
  t50: mk(12853760)
};

export const TOYS_4_PUZZLE = {
  id: "ty04",
  title: "Baseball",
  subtitle: "8×8 · Easy",
  riddle: "Round and stitched in red and white,\ntoss me high on a sunny day so bright.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t5, T.t6],  // label 8
    [T.t1, T.t7, T.t0, T.t0, T.t8, T.t9, T.t10, T.t11],  // label 7
    [T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t10, T.t18],  // label 6
    [T.t19, T.t20, T.t21, T.t22, T.t23, T.t24, T.t25, T.t0],  // label 5
    [T.t26, T.t27, T.t28, T.t29, T.t30, T.t31, T.t32, T.t0],  // label 4
    [T.t33, T.t34, T.t0, T.t35, T.t36, T.t37, T.t38, T.t0],  // label 3
    [T.t39, T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t0],  // label 2
    [T.t0, T.t46, T.t47, T.t48, T.t49, T.t50, T.t0, T.t0]  // label 1
  ],
};
