import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),         t1:  mk(3),         t2:  mk(7),         t3:  mk(16),
  t4:  mk(24),        t5:  mk(33),         t6:  mk(38),        t7:  mk(228),
  t8:  mk(524),       t9:  mk(1492),       t10: mk(1985),      t11: mk(7936),
  t12: mk(34816),     t13: mk(39184),      t14: mk(127760),    t15: mk(242306),
  t16: mk(413832),    t17: mk(539875),     t18: mk(792670),    t19: mk(793608),
  t20: mk(1118475),   t21: mk(1118595),    t22: mk(2129920),   t23: mk(2163712),
  t24: mk(2163778),   t25: mk(2164517),    t26: mk(2164706),   t27: mk(4163650),
  t28: mk(4309252),   t29: mk(4331956),    t30: mk(4472832),   t31: mk(7077988),
  t32: mk(8126482),   t33: mk(8667136),    t34: mk(8667648),   t35: mk(8912896),
  t36: mk(8929280),   t37: mk(15960064),   t38: mk(16254208),  t39: mk(16777223),
  t40: mk(17047816),  t41: mk(17051969),   t42: mk(18972703),  t43: mk(22233088),
  t44: mk(25165824),  t45: mk(25165825),   t46: mk(25706824),  t47: mk(25969650),
  t48: mk(29900800),  t49: mk(31592614),   t50: mk(32505856),  t51: mk(32538628),
  t52: mk(33537535),
};

export const SIMPSONS_10_PUZZLE = {
  id: "sm10",
  title: "Chief Wiggum",
  subtitle: "8×8 · Easy",
  riddle: "Uh, put down the doughnut and step away from the vehicle.\\nI'm Springfield's finest — well, only — police chief.\\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t7,  T.t11, T.t32, T.t19, T.t16, T.t0 ],  // label 8
    [T.t0,  T.t1,  T.t34, T.t2,  T.t52, T.t47, T.t36, T.t0 ],  // label 7
    [T.t5,  T.t48, T.t13, T.t44, T.t37, T.t42, T.t18, T.t0 ],  // label 6
    [T.t21, T.t20, T.t15, T.t27, T.t51, T.t46, T.t40, T.t0 ],  // label 5
    [T.t0,  T.t49, T.t25, T.t23, T.t10, T.t38, T.t41, T.t3 ],  // label 4
    [T.t0,  T.t24, T.t43, T.t0,  T.t0,  T.t39, T.t9,  T.t33],  // label 3
    [T.t6,  T.t26, T.t4,  T.t12, T.t50, T.t45, T.t29, T.t8 ],  // label 2
    [T.t35, T.t22, T.t28, T.t17, T.t14, T.t31, T.t30, T.t22],  // label 1
  ],
};
