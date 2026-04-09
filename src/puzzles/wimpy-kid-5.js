import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(3),
  t2: mk(34),
  t3: mk(1048824),
  t4: mk(24018822),
  t5: mk(512),
  t6: mk(99),
  t7: mk(1048576),
  t8: mk(16777612),
  t9: mk(2196513),
  t10: mk(16176),
  t11: mk(536),
  t12: mk(1092),
  t13: mk(31744),
  t14: mk(6586385),
  t15: mk(8659728),
  t16: mk(4260930),
  t17: mk(33047056),
  t18: mk(32780512),
  t19: mk(32826880),
  t20: mk(32559040),
  t21: mk(32505856),
  t22: mk(31558755),
  t23: mk(17592778),
  t24: mk(3251398),
  t25: mk(11964610),
  t26: mk(541452),
  t27: mk(6494406),
  t28: mk(2195456),
  t29: mk(30038346)
};

export const WIMPY_KID_5_PUZZLE = {
  id: "dw05",
  title: "Manny",
  subtitle: "8×8 · Easy",
  riddle: "The youngest Heffley, spoiled and small,\nI get away with everything — that's all.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t0, T.t0, T.t1, T.t2, T.t0, T.t0],  // label 8
    [T.t0, T.t0, T.t0, T.t0, T.t3, T.t4, T.t5, T.t0],  // label 7
    [T.t0, T.t0, T.t6, T.t7, T.t8, T.t9, T.t10, T.t11],  // label 6
    [T.t12, T.t13, T.t13, T.t0, T.t0, T.t0, T.t14, T.t15],  // label 5
    [T.t16, T.t13, T.t13, T.t0, T.t0, T.t0, T.t17, T.t0],  // label 4
    [T.t7, T.t18, T.t19, T.t20, T.t21, T.t22, T.t23, T.t0],  // label 3
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t24, T.t25, T.t26],  // label 2
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t27, T.t28, T.t29]  // label 1
  ],
};
