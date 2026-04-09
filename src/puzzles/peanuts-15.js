import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(1),         t2:  mk(3),         t3:  mk(7),
  t4:  mk(24),        t5:  mk(772),        t6:  mk(1057),      t7:  mk(2000),
  t8:  mk(3208),      t9:  mk(16864),      t10: mk(16879),     t11: mk(16904),
  t12: mk(24706),     t13: mk(31874),      t14: mk(31880),     t15: mk(33825),
  t16: mk(34952),     t17: mk(126976),     t18: mk(532612),    t19: mk(793600),
  t20: mk(1015808),   t21: mk(1048576),    t22: mk(1083614),   t23: mk(1116226),
  t24: mk(1269760),   t25: mk(2130977),    t26: mk(2163763),   t27: mk(2164804),
  t28: mk(2166920),   t29: mk(2197570),    t30: mk(2197572),   t31: mk(3145728),
  t32: mk(3145828),   t33: mk(4261954),    t34: mk(4329537),   t35: mk(4329604),
  t36: mk(9183492),   t37: mk(9308226),    t38: mk(9372672),   t39: mk(9420800),
  t40: mk(10260677),  t41: mk(12866122),   t42: mk(16777216),  t43: mk(17301504),
  t44: mk(21580372),  t45: mk(21645568),   t46: mk(25165824),  t47: mk(25165924),
  t48: mk(27296516),  t49: mk(29360900),   t50: mk(30408704),
};

export const PEANUTS_15_PUZZLE = {
  id: "pn15",
  title: "Marcie",
  subtitle: "8×8 · Easy",
  riddle: "I wear big glasses and always say 'sir' to my friend.\\nI'm quiet and studious, always there to help.\\nWhat am I?",
  solution: [
    [T.t0,  T.t16, T.t20, T.t19, T.t9,  T.t17, T.t18, T.t0 ],  // label 8
    [T.t6,  T.t43, T.t3,  T.t2,  T.t5,  T.t3,  T.t26, T.t0 ],  // label 7
    [T.t23, T.t15, T.t47, T.t49, T.t32, T.t48, T.t41, T.t0 ],  // label 6
    [T.t27, T.t29, T.t36, T.t30, T.t37, T.t30, T.t40, T.t11],  // label 5
    [T.t35, T.t25, T.t31, T.t46, T.t50, T.t46, T.t33, T.t44],  // label 4
    [T.t34, T.t22, T.t0,  T.t1,  T.t4,  T.t0,  T.t28, T.t45],  // label 3
    [T.t0,  T.t21, T.t19, T.t10, T.t7,  T.t24, T.t42, T.t0 ],  // label 2
    [T.t0,  T.t8,  T.t13, T.t39, T.t38, T.t14, T.t12, T.t0 ],  // label 1
  ],
};
