import { mk } from "../lib/tiles";

const T = {
  t0: mk(7622292),
  t1: mk(29451429),
  t2: mk(0),
  t3: mk(102698),
  t4: mk(791114),
  t5: mk(21646599),
  t6: mk(5436605),
  t7: mk(31775),
  t8: mk(10845215),
  t9: mk(10841435),
  t10: mk(21658655),
  t11: mk(5432412),
  t12: mk(5412005),
  t13: mk(33551162),
  t14: mk(28158826),
  t15: mk(12551146),
  t16: mk(33529451),
  t17: mk(21648020),
  t18: mk(6259685),
  t19: mk(11502570),
  t20: mk(11381610),
  t21: mk(21746420),
  t22: mk(10784864),
  t23: mk(6199205),
  t24: mk(11502586),
  t25: mk(11381611),
  t26: mk(21988340),
  t27: mk(11080448),
  t28: mk(28111871),
  t29: mk(12165119),
  t30: mk(32537765),
  t31: mk(32537600),
  t32: mk(28667210),
  t33: mk(32537930),
  t34: mk(24796820)
};

export const PUZZLES_4_PUZZLE = {
  id: "pz04",
  title: "Mind Bender",
  subtitle: "8×8 · Hard",
  riddle: "Stare too long and you might lose your way,\nmy tangled paths are here to make you stay.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t2, T.t0, T.t1],  // label 8
    [T.t5, T.t6, T.t7, T.t8, T.t9, T.t7, T.t10, T.t11],  // label 7
    [T.t2, T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t2],  // label 6
    [T.t3, T.t18, T.t14, T.t19, T.t20, T.t15, T.t21, T.t4],  // label 5
    [T.t22, T.t23, T.t24, T.t20, T.t19, T.t25, T.t26, T.t27],  // label 4
    [T.t2, T.t12, T.t28, T.t24, T.t25, T.t29, T.t17, T.t2],  // label 3
    [T.t0, T.t30, T.t31, T.t32, T.t33, T.t31, T.t34, T.t1],  // label 2
    [T.t5, T.t11, T.t2, T.t22, T.t27, T.t2, T.t5, T.t11]  // label 1
  ],
};
