import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(3),
  t2: mk(3968),
  t3: mk(1523727),
  t4: mk(29427748),
  t5: mk(16),
  t6: mk(33),
  t7: mk(4472833),
  t8: mk(898),
  t9: mk(26758894),
  t10: mk(2672144),
  t11: mk(12650033),
  t12: mk(2167048),
  t13: mk(2166920),
  t14: mk(1048576),
  t15: mk(7881001),
  t16: mk(253952),
  t17: mk(19732545),
  t18: mk(124),
  t19: mk(8929792),
  t20: mk(17318416),
  t21: mk(72935),
  t22: mk(4330392),
  t23: mk(17309826),
  t24: mk(1048585),
  t25: mk(540932),
  t26: mk(33028),
  t27: mk(17309829),
  t28: mk(17318152),
  t29: mk(7572545),
  t30: mk(30373823),
  t31: mk(1082892),
  t32: mk(4330000),
  t33: mk(21651720),
  t34: mk(2662532),
  t35: mk(9566273),
  t36: mk(12785761),
  t37: mk(1048592),
  t38: mk(16768491),
  t39: mk(15592159),
  t40: mk(8650421),
  t41: mk(17301504),
  t42: mk(9723907),
  t43: mk(25559056),
  t44: mk(18350080),
  t45: mk(26093860),
  t46: mk(7507025),
  t47: mk(28309486),
  t48: mk(10486288),
  t49: mk(8388400),
  t50: mk(25428481),
  t51: mk(3285537),
  t52: mk(19220616),
  t53: mk(8521760),
  t54: mk(22480832)
};

export const GUMBALL_13_PUZZLE = {
  id: "gb13",
  title: "Gumball 13",
  subtitle: "8×8 · Medium",
  riddle: "In Elmore strange things happen each day,\nand I'm the blue cat leading the way.\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t0],  // label 8
    [T.t0, T.t6, T.t7, T.t8, T.t9, T.t10, T.t11, T.t0],  // label 7
    [T.t0, T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t0],  // label 6
    [T.t18, T.t19, T.t20, T.t21, T.t22, T.t23, T.t24, T.t25],  // label 5
    [T.t26, T.t27, T.t28, T.t29, T.t30, T.t31, T.t32, T.t33],  // label 4
    [T.t34, T.t35, T.t36, T.t37, T.t38, T.t39, T.t40, T.t41],  // label 3
    [T.t42, T.t43, T.t44, T.t45, T.t46, T.t47, T.t48, T.t0],  // label 2
    [T.t49, T.t50, T.t51, T.t52, T.t53, T.t54, T.t41, T.t0]  // label 1
  ],
};
