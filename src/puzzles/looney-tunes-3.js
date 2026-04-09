import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(6),         t2:  mk(7),         t3:  mk(16),        t4:  mk(34),
  t5:  mk(520),       t6:  mk(528),       t7:  mk(992),       t8:  mk(1116),
  t9:  mk(1644),      t10: mk(32768),     t11: mk(34952),     t12: mk(70824),
  t13: mk(201860),    t14: mk(413828),    t15: mk(536673),    t16: mk(786432),
  t17: mk(1048576),   t18: mk(1115136),   t19: mk(2130916),   t20: mk(2130944),
  t21: mk(2164802),   t22: mk(2164868),   t23: mk(2181412),   t24: mk(2234036),
  t25: mk(4532478),   t26: mk(4861968),   t27: mk(5376057),   t28: mk(5377090),
  t29: mk(8404992),   t30: mk(8532439),   t31: mk(8654978),   t32: mk(8659205),
  t33: mk(8659208),   t34: mk(9736399),   t35: mk(10034052),  t36: mk(15373443),
  t37: mk(16337028),  t38: mk(17301504),  t39: mk(17310488),  t40: mk(19174497),
  t41: mk(19212642),  t42: mk(21647946),  t43: mk(25165824),  t44: mk(25332963),
  t45: mk(25723904),  t46: mk(28189184),  t47: mk(29426688),  t48: mk(32400144),
};

export const LOONEY_TUNES_3_PUZZLE = {
  id: "lt03", title: "Porky Pig", subtitle: "8×8 · Easy",
  riddle: "I stutter through every sentence I say,\nmy bow tie and round belly give me away.\nTh-th-th-that's all folks!\nWhat am I?",
  solution: [
    [T.t0,  T.t0,  T.t0,  T.t2,  T.t7,  T.t9,  T.t14, T.t0 ],  // label 8
    [T.t0,  T.t1,  T.t11, T.t43, T.t0,  T.t45, T.t41, T.t3 ],  // label 7
    [T.t0,  T.t28, T.t38, T.t10, T.t47, T.t0,  T.t0,  T.t31],  // label 6
    [T.t4,  T.t24, T.t16, T.t0,  T.t12, T.t3,  T.t0,  T.t21],  // label 5
    [T.t26, T.t42, T.t13, T.t5,  T.t32, T.t39, T.t0,  T.t22],  // label 4
    [T.t29, T.t34, T.t23, T.t30, T.t27, T.t46, T.t3,  T.t33],  // label 3
    [T.t44, T.t48, T.t40, T.t36, T.t25, T.t37, T.t8,  T.t38],  // label 2
    [T.t18, T.t5,  T.t17, T.t15, T.t19, T.t35, T.t20, T.t6 ],  // label 1
  ],
};
