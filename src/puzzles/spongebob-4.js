import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(1082368),
  t2: mk(5411410),
  t3: mk(4346450),
  t4: mk(1),
  t5: mk(7936),
  t6: mk(520),
  t7: mk(3244032),
  t8: mk(19757778),
  t9: mk(20709202),
  t10: mk(2232584),
  t11: mk(1025),
  t12: mk(8914497),
  t13: mk(23813074),
  t14: mk(8654978),
  t15: mk(32800),
  t16: mk(18925720),
  t17: mk(101),
  t18: mk(19551997),
  t19: mk(21631256),
  t20: mk(1048576),
  t21: mk(539649),
  t22: mk(20104),
  t23: mk(1090),
  t24: mk(13256259),
  t25: mk(920639),
  t26: mk(32788562),
  t27: mk(2271880),
  t28: mk(16777216),
  t29: mk(3472),
  t30: mk(3098142),
  t31: mk(16771),
  t32: mk(16),
  t33: mk(1081345),
  t34: mk(6669916),
  t35: mk(24749214),
  t36: mk(25691105),
  t37: mk(15728640),
  t38: mk(31457311),
  t39: mk(8523866),
  t40: mk(10912),
  t41: mk(20736),
  t42: mk(31964464),
  t43: mk(2097120),
  t44: mk(506911),
  t45: mk(8117400),
  t46: mk(540936)
};

export const SPONGEBOB_4_PUZZLE = {
  id: "sb04",
  title: "Mr. Krabs",
  subtitle: "8×8 · Hard",
  riddle: "Money, money, money is all I adore,\nthe Krabby Patty secret I keep in store.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6],  // label 8
    [T.t0, T.t0, T.t7, T.t8, T.t9, T.t10, T.t11, T.t12],  // label 7
    [T.t0, T.t0, T.t0, T.t13, T.t13, T.t14, T.t15, T.t16],  // label 6
    [T.t0, T.t0, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22],  // label 5
    [T.t0, T.t23, T.t24, T.t25, T.t26, T.t4, T.t27, T.t28],  // label 4
    [T.t29, T.t30, T.t31, T.t32, T.t33, T.t34, T.t28, T.t0],  // label 3
    [T.t35, T.t36, T.t32, T.t37, T.t38, T.t39, T.t0, T.t0],  // label 2
    [T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t0]  // label 1
  ],
};
