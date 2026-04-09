import { mk } from "../lib/tiles";

const T = {
  t0: mk(2130441),
  t1: mk(17015),
  t2: mk(262140),
  t3: mk(33554403),
  t4: mk(33554424),
  t5: mk(950247),
  t6: mk(1853),
  t7: mk(8912946),
  t8: mk(7341155),
  t9: mk(33520631),
  t10: mk(105585),
  t11: mk(1866545),
  t12: mk(17144958),
  t13: mk(1860131),
  t14: mk(33030137),
  t15: mk(29377304),
  t16: mk(7585230),
  t17: mk(19956110),
  t18: mk(26115567),
  t19: mk(20565561),
  t20: mk(32355),
  t21: mk(8387484),
  t22: mk(16781790),
  t23: mk(30308814),
  t24: mk(32472063),
  t25: mk(15177009),
  t26: mk(7573638),
  t27: mk(31420547),
  t28: mk(7585361),
  t29: mk(33030399),
  t30: mk(31920281),
  t31: mk(16236543),
  t32: mk(33553374),
  t33: mk(20058575),
  t34: mk(33423423),
  t35: mk(18152348),
  t36: mk(25304567),
  t37: mk(12719004),
  t38: mk(18437070),
  t39: mk(33537519),
  t40: mk(15154407),
  t41: mk(16191489),
  t42: mk(7585788),
  t43: mk(26016768),
  t44: mk(20506425),
  t45: mk(32472291),
  t46: mk(14877209),
  t47: mk(15170460),
  t48: mk(3245063),
  t49: mk(20971487),
  t50: mk(25726064),
  t51: mk(16544577),
  t52: mk(18463856),
  t53: mk(18641664),
  t54: mk(31440383),
  t55: mk(25968668),
  t56: mk(9961506),
  t57: mk(24756224),
  t58: mk(30407904),
  t59: mk(4194303),
  t60: mk(26214399),
  t61: mk(8388480),
  t62: mk(31228928),
  t63: mk(18907656)
};

export const PUZZLES_6_PUZZLE = {
  id: "pz06",
  title: "The Labyrinth",
  subtitle: "8×8 · Hard",
  riddle: "Enter my twisting dark design,\nfind your way through every winding line.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t7],  // label 8
    [T.t8, T.t9, T.t10, T.t11, T.t12, T.t13, T.t14, T.t15],  // label 7
    [T.t16, T.t17, T.t18, T.t19, T.t20, T.t21, T.t22, T.t23],  // label 6
    [T.t24, T.t25, T.t26, T.t27, T.t28, T.t29, T.t30, T.t31],  // label 5
    [T.t32, T.t33, T.t34, T.t35, T.t36, T.t37, T.t38, T.t39],  // label 4
    [T.t40, T.t41, T.t42, T.t43, T.t44, T.t45, T.t46, T.t47],  // label 3
    [T.t48, T.t49, T.t50, T.t51, T.t52, T.t53, T.t54, T.t55],  // label 2
    [T.t56, T.t57, T.t58, T.t59, T.t60, T.t61, T.t62, T.t63]  // label 1
  ],
};
