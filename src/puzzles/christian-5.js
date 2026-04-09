import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1092),
  t2: mk(1015940),
  t3: mk(16644),
  t4: mk(2164868),
  t5: mk(4329736),
  t6: mk(8659472),
  t7: mk(3),
  t8: mk(4329567),
  t9: mk(32641055),
  t10: mk(4329759),
  t11: mk(24),
  t12: mk(4464900),
  t13: mk(8963624),
  t14: mk(16777232),
  t15: mk(3247137),
  t16: mk(528),
  t17: mk(33),
  t18: mk(25977360),
  t19: mk(4327490),
  t20: mk(8654980),
  t21: mk(17309960),
  t22: mk(1048576),
  t23: mk(17588620),
  t24: mk(1150150),
  t25: mk(16777216),
  t26: mk(1082434),
  t27: mk(6390784),
  t28: mk(32074),
  t29: mk(13385728),
  t30: mk(2232456),
  t31: mk(4464913),
  t32: mk(8929792),
  t33: mk(10824017),
  t34: mk(18391304),
  t35: mk(16912),
  t36: mk(1058),
  t37: mk(18382848),
  t38: mk(16904),
  t39: mk(2164769),
  t40: mk(4329538),
  t41: mk(8659076),
  t42: mk(2236959),
  t43: mk(31),
  t44: mk(8521791),
  t45: mk(1083458),
  t46: mk(2166916),
  t47: mk(4333832)
};

export const CHRISTIAN_5_PUZZLE = {
  id: "ch05",
  title: "Holy Communion",
  subtitle: "8×8 · Hard",
  riddle: "Cup and bread, a sacred rite,\nremembrance of that holy night.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t0, T.t4, T.t5, T.t6],  // label 8
    [T.t7, T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t14],  // label 7
    [T.t15, T.t16, T.t0, T.t17, T.t18, T.t19, T.t20, T.t21],  // label 6
    [T.t22, T.t23, T.t0, T.t24, T.t25, T.t26, T.t4, T.t5],  // label 5
    [T.t0, T.t27, T.t28, T.t29, T.t0, T.t30, T.t31, T.t32],  // label 4
    [T.t0, T.t0, T.t33, T.t0, T.t0, T.t20, T.t34, T.t35],  // label 3
    [T.t0, T.t36, T.t37, T.t38, T.t0, T.t39, T.t40, T.t41],  // label 2
    [T.t17, T.t42, T.t43, T.t44, T.t16, T.t45, T.t46, T.t47]  // label 1
  ],
};
