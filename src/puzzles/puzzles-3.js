import { mk } from "../lib/tiles";

const T = {
  t0: mk(34952),
  t1: mk(1015823),
  t2: mk(1015838),
  t3: mk(532610),
  t4: mk(8693033),
  t5: mk(16777216),
  t6: mk(1049072),
  t7: mk(2706034),
  t8: mk(8693728),
  t9: mk(16778177),
  t10: mk(1048576),
  t11: mk(2706002),
  t12: mk(9741608),
  t13: mk(1116242),
  t14: mk(102664),
  t15: mk(19515986),
  t16: mk(1025321),
  t17: mk(790594),
  t18: mk(17047817),
  t19: mk(19483202),
  t20: mk(8521760),
  t21: mk(14748610),
  t22: mk(15999464),
  t23: mk(32506866),
  t24: mk(26519337),
  t25: mk(32506850),
  t26: mk(31458280),
  t27: mk(2236928),
  t28: mk(3112975),
  t29: mk(9404447),
  t30: mk(19515987),
  t31: mk(10453023),
  t32: mk(3082334),
  t33: mk(8888590),
  t34: mk(18942017),
  t35: mk(8654944),
  t36: mk(19483616),
  t37: mk(9742121),
  t38: mk(2167552),
  t39: mk(9707792),
  t40: mk(16),
  t41: mk(17268737),
  t42: mk(1034818),
  t43: mk(10265896),
  t44: mk(2031632),
  t45: mk(1),
  t46: mk(15729632),
  t47: mk(31458272)
};

export const PUZZLES_3_PUZZLE = {
  id: "pz03",
  title: "Celtic Weave",
  subtitle: "8×8 · Hard",
  riddle: "Over and under, I weave my tale,\nan ancient pattern that will never fail.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t0, T.t1, T.t2, T.t3],  // label 8
    [T.t4, T.t5, T.t6, T.t7, T.t8, T.t9, T.t10, T.t11],  // label 7
    [T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19],  // label 6
    [T.t20, T.t21, T.t22, T.t23, T.t24, T.t25, T.t26, T.t27],  // label 5
    [T.t0, T.t28, T.t29, T.t30, T.t31, T.t32, T.t33, T.t3],  // label 4
    [T.t4, T.t34, T.t35, T.t36, T.t37, T.t38, T.t39, T.t11],  // label 3
    [T.t12, T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t19],  // label 2
    [T.t20, T.t46, T.t47, T.t27, T.t20, T.t46, T.t47, T.t27]  // label 1
  ],
};
