import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1089),
  t2: mk(4065345),
  t3: mk(29462664),
  t4: mk(532616),
  t5: mk(237700),
  t6: mk(17172),
  t7: mk(18129028),
  t8: mk(8684610),
  t9: mk(16777216),
  t10: mk(34),
  t11: mk(476754),
  t12: mk(4261954),
  t13: mk(21173409),
  t14: mk(16),
  t15: mk(2164802),
  t16: mk(4329604),
  t17: mk(2304344),
  t18: mk(19009668),
  t19: mk(2163745),
  t20: mk(1081344),
  t21: mk(8663371),
  t22: mk(4329624),
  t23: mk(2164801),
  t24: mk(1084605),
  t25: mk(8650752),
  t26: mk(4333832),
  t27: mk(1082401),
  t28: mk(2163460),
  t29: mk(8659204),
  t30: mk(1082402),
  t31: mk(4325410),
  t32: mk(772),
  t33: mk(8659208),
  t34: mk(4342280),
  t35: mk(34953),
  t36: mk(29440545),
  t37: mk(3284232),
  t38: mk(17044041),
  t39: mk(2162689),
  t40: mk(8667648),
  t41: mk(7340032),
  t42: mk(17893442),
  t43: mk(4329608),
  t44: mk(8523908),
  t45: mk(31457280),
  t46: mk(16771),
  t47: mk(17301628),
  t48: mk(8667136)
};

export const CHRISTIAN_3_PUZZLE = {
  id: "ch03",
  title: "Butterfly",
  subtitle: "8×8 · Easy",
  riddle: "From darkness I emerge anew,\na symbol of resurrection true.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t0, T.t0],  // label 8
    [T.t5, T.t6, T.t0, T.t7, T.t8, T.t9, T.t10, T.t11],  // label 7
    [T.t12, T.t13, T.t14, T.t15, T.t16, T.t0, T.t17, T.t18],  // label 6
    [T.t19, T.t20, T.t21, T.t22, T.t23, T.t24, T.t25, T.t26],  // label 5
    [T.t27, T.t10, T.t28, T.t29, T.t30, T.t31, T.t32, T.t33],  // label 4
    [T.t20, T.t34, T.t35, T.t36, T.t37, T.t38, T.t39, T.t40],  // label 3
    [T.t0, T.t41, T.t42, T.t23, T.t43, T.t44, T.t45, T.t0],  // label 2
    [T.t0, T.t0, T.t20, T.t46, T.t47, T.t48, T.t0, T.t0]  // label 1
  ],
};
