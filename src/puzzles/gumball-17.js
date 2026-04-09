import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(3559),
  t2: mk(9978652),
  t3: mk(541200),
  t4: mk(1090),
  t5: mk(126976),
  t6: mk(4063235),
  t7: mk(31490049),
  t8: mk(17313904),
  t9: mk(526),
  t10: mk(2164802),
  t11: mk(3),
  t12: mk(4197509),
  t13: mk(17738),
  t14: mk(8413332),
  t15: mk(1048600),
  t16: mk(25436424),
  t17: mk(4328448),
  t18: mk(21594514),
  t19: mk(11042816),
  t20: mk(6062281),
  t21: mk(4349952),
  t22: mk(8659208),
  t23: mk(24),
  t24: mk(2164801),
  t25: mk(18094112),
  t26: mk(18285102),
  t27: mk(17904128),
  t28: mk(9741615),
  t29: mk(14985570),
  t30: mk(17043521),
  t31: mk(31),
  t32: mk(34968),
  t33: mk(21038112),
  t34: mk(18942036),
  t35: mk(105844),
  t36: mk(5958573),
  t37: mk(491411),
  t38: mk(774),
  t39: mk(33858),
  t40: mk(21242384),
  t41: mk(1116192),
  t42: mk(8929556),
  t43: mk(14071279),
  t44: mk(17318416),
  t45: mk(26412032),
  t46: mk(22464896)
};

export const GUMBALL_17_PUZZLE = {
  id: "gb17",
  title: "Gumball 17",
  subtitle: "8×8 · Medium",
  riddle: "Life in Elmore is never dull,\nI'm the blue cat keeping it full.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t0, T.t0, T.t0],  // label 8
    [T.t4, T.t5, T.t6, T.t7, T.t8, T.t9, T.t0, T.t0],  // label 7
    [T.t10, T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t0],  // label 6
    [T.t10, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22, T.t23],  // label 5
    [T.t24, T.t0, T.t25, T.t26, T.t27, T.t0, T.t28, T.t29],  // label 4
    [T.t0, T.t30, T.t31, T.t23, T.t31, T.t32, T.t33, T.t34],  // label 3
    [T.t0, T.t0, T.t35, T.t36, T.t37, T.t38, T.t39, T.t40],  // label 2
    [T.t0, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t0]  // label 1
  ],
};
