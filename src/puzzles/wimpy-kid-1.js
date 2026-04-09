import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(12483),
  t2: mk(49),
  t3: mk(418304),
  t4: mk(1),
  t5: mk(8080),
  t6: mk(28835047),
  t7: mk(261888),
  t8: mk(1047552),
  t9: mk(553443),
  t10: mk(24),
  t11: mk(3145728),
  t12: mk(1059),
  t13: mk(15622656),
  t14: mk(25165824),
  t15: mk(102),
  t16: mk(3349148),
  t17: mk(30306304),
  t18: mk(15153152),
  t19: mk(12853516),
  t20: mk(12718214),
  t21: mk(32505856),
  t22: mk(25563276),
  t23: mk(6389760),
  t24: mk(15565856),
  t25: mk(536),
  t26: mk(255),
  t27: mk(1023),
  t28: mk(32539746),
  t29: mk(1162132),
  t30: mk(29559910),
  t31: mk(25183119),
  t32: mk(31),
  t33: mk(25167100),
  t34: mk(6709248),
  t35: mk(3217548),
  t36: mk(23932325),
  t37: mk(6693648),
  t38: mk(1048576),
  t39: mk(16777216)
};

export const WIMPY_KID_1_PUZZLE = {
  id: "dw01",
  title: "Greg",
  subtitle: "8×8 · Medium",
  riddle: "I write it all down so the world will know,\nthe wimpy kid with nowhere left to grow.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t0, T.t0, T.t0, T.t0],  // label 8
    [T.t4, T.t5, T.t6, T.t7, T.t8, T.t9, T.t10, T.t0],  // label 7
    [T.t11, T.t12, T.t13, T.t0, T.t0, T.t0, T.t14, T.t0],  // label 6
    [T.t15, T.t16, T.t0, T.t0, T.t17, T.t0, T.t18, T.t0],  // label 5
    [T.t19, T.t20, T.t0, T.t0, T.t0, T.t0, T.t21, T.t22],  // label 4
    [T.t23, T.t24, T.t25, T.t26, T.t27, T.t10, T.t28, T.t14],  // label 3
    [T.t4, T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t0],  // label 2
    [T.t35, T.t36, T.t37, T.t38, T.t21, T.t39, T.t0, T.t0]  // label 1
  ],
};
