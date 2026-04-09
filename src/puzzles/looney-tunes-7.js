import { mk } from "../lib/tiles";

const T = {
  t0:  mk(0),
  t1:  mk(7),         t2:  mk(33),        t3:  mk(34),        t4:  mk(96),
  t5:  mk(1056),      t6:  mk(1127),      t7:  mk(24974),     t8:  mk(32768),
  t9:  mk(35040),     t10: mk(35203),     t11: mk(36079),     t12: mk(69788),
  t13: mk(102465),    t14: mk(139264),    t15: mk(511112),    t16: mk(537169),
  t17: mk(1081344),   t18: mk(1082436),   t19: mk(2146832),   t20: mk(2164805),
  t21: mk(2429330),   t22: mk(3014656),   t23: mk(4194304),   t24: mk(4464912),
  t25: mk(4472848),   t26: mk(5122592),   t27: mk(5245519),   t28: mk(7341124),
  t29: mk(7463136),   t30: mk(8654996),   t31: mk(9633792),   t32: mk(13240386),
  t33: mk(16252959),  t34: mk(16672340),  t35: mk(16777215),  t36: mk(16777216),
  t37: mk(16781584),  t38: mk(16888359),  t39: mk(19242083),  t40: mk(20971519),
  t41: mk(25301760),  t42: mk(25395232),  t43: mk(25412120),  t44: mk(25690112),
  t45: mk(27566616),  t46: mk(30302993),  t47: mk(30307224),  t48: mk(30370336),
  t49: mk(30405377),  t50: mk(31515840),  t51: mk(32504832),  t52: mk(32977820),
  t53: mk(33554428),
};

export const LOONEY_TUNES_7_PUZZLE = {
  id: "lt07", title: "Sylvester", subtitle: "8×8 · Medium",
  riddle: "I'm always chasing that little yellow bird,\nbut catching Tweety stays just a dream.\nSufferin' succotash!\nWhat am I?",
  solution: [
    [T.t5,  T.t30, T.t24, T.t0,  T.t0,  T.t2,  T.t15, T.t16],  // label 8
    [T.t0,  T.t39, T.t40, T.t43, T.t7,  T.t20, T.t31, T.t18],  // label 7
    [T.t13, T.t33, T.t53, T.t51, T.t29, T.t26, T.t42, T.t32],  // label 6
    [T.t0,  T.t28, T.t44, T.t3,  T.t11, T.t48, T.t27, T.t21],  // label 5
    [T.t4,  T.t25, T.t14, T.t23, T.t34, T.t50, T.t17, T.t19],  // label 4
    [T.t10, T.t37, T.t1,  T.t12, T.t49, T.t41, T.t8,  T.t36],  // label 3
    [T.t9,  T.t38, T.t52, T.t45, T.t22, T.t0,  T.t0,  T.t0 ],  // label 2
    [T.t6,  T.t35, T.t46, T.t47, T.t0,  T.t0,  T.t0,  T.t0 ],  // label 1
  ],
};
