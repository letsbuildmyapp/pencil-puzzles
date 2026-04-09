import { mk } from "../lib/tiles";

const T = {
  t0: mk(1),
  t1: mk(30),
  t2: mk(0),
  t3: mk(24),
  t4: mk(7440),
  t5: mk(16644),
  t6: mk(2164803),
  t7: mk(3145728),
  t8: mk(532610),
  t9: mk(3213345),
  t10: mk(5312660),
  t11: mk(31),
  t12: mk(4329620),
  t13: mk(1081344),
  t14: mk(541448),
  t15: mk(1048576),
  t16: mk(541103),
  t17: mk(40838),
  t18: mk(28835840),
  t19: mk(16777324),
  t20: mk(12865601),
  t21: mk(3),
  t22: mk(12721252),
  t23: mk(1557536),
  t24: mk(25707423),
  t25: mk(3247614),
  t26: mk(8527144),
  t27: mk(1121024),
  t28: mk(16007696),
  t29: mk(29628481),
  t30: mk(15728640),
  t31: mk(25169296),
  t32: mk(508960),
  t33: mk(8912912),
  t34: mk(18468392),
  t35: mk(18637312),
  t36: mk(541200),
  t37: mk(1083463),
  t38: mk(8521793),
  t39: mk(8525856),
  t40: mk(1084288),
  t41: mk(32505856),
  t42: mk(25165824),
  t43: mk(25565216),
  t44: mk(524),
  t45: mk(540936),
  t46: mk(793600),
  t47: mk(9191424)
};

export const TOYS_3_PUZZLE = {
  id: "ty03",
  title: "Airplane",
  subtitle: "8×8 · Medium",
  riddle: "I soar through clouds both high and free,\na toy that lets your imagination fly with me.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t2, T.t2, T.t3, T.t4, T.t5],  // label 8
    [T.t6, T.t7, T.t8, T.t2, T.t9, T.t10, T.t11, T.t12],  // label 7
    [T.t13, T.t14, T.t15, T.t16, T.t17, T.t18, T.t19, T.t20],  // label 6
    [T.t21, T.t22, T.t23, T.t24, T.t25, T.t2, T.t26, T.t27],  // label 5
    [T.t28, T.t29, T.t2, T.t30, T.t31, T.t32, T.t33, T.t2],  // label 4
    [T.t34, T.t35, T.t36, T.t37, T.t2, T.t2, T.t38, T.t2],  // label 3
    [T.t39, T.t40, T.t41, T.t42, T.t43, T.t44, T.t15, T.t45],  // label 2
    [T.t2, T.t2, T.t2, T.t2, T.t2, T.t7, T.t46, T.t47]  // label 1
  ],
};
