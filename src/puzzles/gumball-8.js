import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1),
  t2: mk(2763),
  t3: mk(2269696),
  t4: mk(18790),
  t5: mk(276),
  t6: mk(34),
  t7: mk(1154852),
  t8: mk(10715119),
  t9: mk(25599),
  t10: mk(2228223),
  t11: mk(21200892),
  t12: mk(914),
  t13: mk(2164769),
  t14: mk(19769666),
  t15: mk(3678403),
  t16: mk(33523794),
  t17: mk(33292398),
  t18: mk(1272865),
  t19: mk(2435204),
  t20: mk(1092),
  t21: mk(22984903),
  t22: mk(3702240),
  t23: mk(11009205),
  t24: mk(23621864),
  t25: mk(2307875),
  t26: mk(25714912),
  t27: mk(16),
  t28: mk(4464778),
  t29: mk(3247273),
  t30: mk(33308705),
  t31: mk(17751104),
  t32: mk(16523396),
  t33: mk(8337543),
  t34: mk(8523914),
  t35: mk(17895684),
  t36: mk(17859617),
  t37: mk(1217850),
  t38: mk(2165591),
  t39: mk(5411722),
  t40: mk(4346772),
  t41: mk(29458432),
  t42: mk(18092100),
  t43: mk(2154689),
  t44: mk(1581265),
  t45: mk(10818726),
  t46: mk(26197495),
  t47: mk(28137131),
  t48: mk(17301505),
  t49: mk(39187),
  t50: mk(25205008),
  t51: mk(12681216),
  t52: mk(31647983),
  t53: mk(8634645),
  t54: mk(20097775),
  t55: mk(2541968),
  t56: mk(13107200)
};

export const GUMBALL_8_PUZZLE = {
  id: "gb08",
  title: "Gumball 8",
  subtitle: "8×8 · Easy",
  riddle: "I'm a cat who loves to laugh and play,\ncausing chaos and mischief every day.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t0, T.t0],  // label 8
    [T.t6, T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t0],  // label 7
    [T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t0],  // label 6
    [T.t20, T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27],  // label 5
    [T.t28, T.t29, T.t30, T.t31, T.t32, T.t33, T.t0, T.t34],  // label 4
    [T.t35, T.t36, T.t37, T.t38, T.t39, T.t40, T.t41, T.t42],  // label 3
    [T.t43, T.t44, T.t45, T.t46, T.t47, T.t48, T.t49, T.t50],  // label 2
    [T.t0, T.t51, T.t52, T.t53, T.t54, T.t55, T.t56, T.t0]  // label 1
  ],
};
