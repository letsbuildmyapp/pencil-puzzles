import { mk } from "../lib/tiles";

const T = {
  t0: mk(33554431),
  t1: mk(33553895),
  t2: mk(33553304),
  t3: mk(29885442),
  t4: mk(35519),
  t5: mk(140215),
  t6: mk(280728),
  t7: mk(20771024),
  t8: mk(24765472),
  t9: mk(33554209),
  t10: mk(17319475),
  t11: mk(11780094),
  t12: mk(33554407),
  t13: mk(31326207),
  t14: mk(11190262),
  t15: mk(30278655),
  t16: mk(12651134),
  t17: mk(15483656),
  t18: mk(3391453),
  t19: mk(25920449),
  t20: mk(3162208),
  t21: mk(33004659),
  t22: mk(30407678),
  t23: mk(32404248),
  t24: mk(17318416),
  t25: mk(8660265),
  t26: mk(28142193),
  t27: mk(9473209),
  t28: mk(15241216),
  t29: mk(10012275),
  t30: mk(30342110),
  t31: mk(25977360),
  t32: mk(11931781),
  t33: mk(1111024),
  t34: mk(1972252),
  t35: mk(1685504),
  t36: mk(3382767),
  t37: mk(30303000),
  t38: mk(5412071),
  t39: mk(17825788),
  t40: mk(3208143),
  t41: mk(16912),
  t42: mk(16548249),
  t43: mk(17321688),
  t44: mk(16811041),
  t45: mk(17301504),
  t46: mk(7475330),
  t47: mk(25364228),
  t48: mk(3247820),
  t49: mk(16846040),
  t50: mk(28532736),
  t51: mk(16777216),
  t52: mk(1082434),
  t53: mk(0),
  t54: mk(2129920),
  t55: mk(16864),
  t56: mk(1269760),
  t57: mk(35),
  t58: mk(3407871)
};

export const HALLOWEEN_3_PUZZLE = {
  id: "hw03",
  title: "Scared Man",
  subtitle: "8×8 · Hard",
  riddle: "My eyes are wide, my mouth agape,\nI scream at every monster and specter and shape.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t0, T.t2, T.t3, T.t4, T.t5, T.t6],  // label 8
    [T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t14],  // label 7
    [T.t15, T.t16, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22],  // label 6
    [T.t23, T.t24, T.t25, T.t26, T.t27, T.t28, T.t29, T.t30],  // label 5
    [T.t31, T.t24, T.t32, T.t33, T.t34, T.t35, T.t36, T.t37],  // label 4
    [T.t24, T.t24, T.t38, T.t39, T.t40, T.t41, T.t42, T.t43],  // label 3
    [T.t44, T.t45, T.t46, T.t47, T.t48, T.t49, T.t50, T.t51],  // label 2
    [T.t52, T.t53, T.t54, T.t55, T.t56, T.t53, T.t57, T.t58]  // label 1
  ],
};
