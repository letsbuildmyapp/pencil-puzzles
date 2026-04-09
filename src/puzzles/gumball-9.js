import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(38),
  t2: mk(253952),
  t3: mk(16252928),
  t4: mk(32505856),
  t5: mk(920576),
  t6: mk(782),
  t7: mk(1058),
  t8: mk(8912896),
  t9: mk(3215427),
  t10: mk(18411050),
  t11: mk(25432344),
  t12: mk(4333832),
  t13: mk(34),
  t14: mk(278528),
  t15: mk(14680064),
  t16: mk(4329538),
  t17: mk(8659208),
  t18: mk(17318417),
  t19: mk(145092),
  t20: mk(13143271),
  t21: mk(524288),
  t22: mk(2164868),
  t23: mk(23872544),
  t24: mk(32095),
  t25: mk(7369368),
  t26: mk(4333840),
  t27: mk(1048576),
  t28: mk(532611),
  t29: mk(16),
  t30: mk(15958016),
  t31: mk(16777216),
  t32: mk(1126912),
  t33: mk(15762465),
  t34: mk(5285),
  t35: mk(8659204),
  t36: mk(22618305),
  t37: mk(5308447),
  t38: mk(4261328)
};

export const GUMBALL_9_PUZZLE = {
  id: "gb09",
  title: "Carrie",
  subtitle: "8×8 · Medium",
  riddle: "I'm a ghost girl, transparent and pale,\nfloating through Elmore without fail.\nWhat am I?",
  solution: [
    [T.t0, T.t1, T.t2, T.t3, T.t4, T.t5, T.t6, T.t0],  // label 8
    [T.t7, T.t8, T.t0, T.t0, T.t0, T.t9, T.t10, T.t11],  // label 7
    [T.t12, T.t0, T.t0, T.t0, T.t13, T.t14, T.t15, T.t16],  // label 6
    [T.t17, T.t0, T.t18, T.t19, T.t20, T.t21, T.t0, T.t22],  // label 5
    [T.t16, T.t0, T.t23, T.t24, T.t25, T.t0, T.t0, T.t26],  // label 4
    [T.t27, T.t28, T.t29, T.t30, T.t31, T.t1, T.t32, T.t0],  // label 3
    [T.t0, T.t0, T.t33, T.t34, T.t34, T.t35, T.t0, T.t0],  // label 2
    [T.t0, T.t0, T.t0, T.t36, T.t37, T.t38, T.t14, T.t0]  // label 1
  ],
};
