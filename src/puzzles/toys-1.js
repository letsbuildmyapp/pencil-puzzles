import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(33),
  t2: mk(16531459),
  t3: mk(540432),
  t4: mk(28768),
  t5: mk(222744),
  t6: mk(528),
  t7: mk(1081344),
  t8: mk(7102992),
  t9: mk(3169),
  t10: mk(3198),
  t11: mk(12814402),
  t12: mk(16777216),
  t13: mk(31),
  t14: mk(17318680),
  t15: mk(3215492),
  t16: mk(1251346),
  t17: mk(2706132),
  t18: mk(1083458),
  t19: mk(21039172),
  t20: mk(29426688),
  t21: mk(2220256),
  t22: mk(13696768),
  t23: mk(9421857),
  t24: mk(25299010),
  t25: mk(13384705),
  t26: mk(16896),
  t27: mk(16384),
  t28: mk(1055874),
  t29: mk(2846720),
  t30: mk(1082371),
  t31: mk(540),
  t32: mk(16777728),
  t33: mk(2165896),
  t34: mk(899),
  t35: mk(16),
  t36: mk(13583888),
  t37: mk(2097680),
  t38: mk(2232584),
  t39: mk(17048080),
  t40: mk(17310119),
  t41: mk(17318014),
  t42: mk(111104),
  t43: mk(29458432),
  t44: mk(539648),
  t45: mk(8715264),
  t46: mk(17301504)
};

export const TOYS_1_PUZZLE = {
  id: "ty01",
  title: "Teddy Bear",
  subtitle: "8×8 · Easy",
  riddle: "Soft and cuddly, I sit on your bed,\na stuffed companion for hugs instead.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t0],  // label 8
    [T.t0, T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t0],  // label 7
    [T.t0, T.t13, T.t14, T.t15, T.t16, T.t17, T.t0, T.t0],  // label 6
    [T.t18, T.t19, T.t20, T.t21, T.t22, T.t23, T.t24, T.t0],  // label 5
    [T.t7, T.t25, T.t26, T.t0, T.t27, T.t28, T.t29, T.t0],  // label 4
    [T.t0, T.t30, T.t31, T.t0, T.t32, T.t33, T.t34, T.t35],  // label 3
    [T.t0, T.t36, T.t37, T.t0, T.t0, T.t0, T.t38, T.t39],  // label 2
    [T.t0, T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46]  // label 1
  ],
};
