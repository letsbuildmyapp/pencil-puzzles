import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(5411904),   t2: mk(32844416),  t3: mk(32674880),  t4: mk(27601536),
  t5: mk(18125888),  t6: mk(1049351),   t7: mk(536672),    t8: mk(3968),
  t9: mk(8912942),   t10: mk(18436352),
  t11: mk(4327489),  t12: mk(4329538),  t13: mk(2168898),  t14: mk(4331652),
  t15: mk(4329736),  t16: mk(4333840),
  t17: mk(17318152), t18: mk(2166916),  t19: mk(99366),    t20: mk(13107200),
  t21: mk(3145728),  t22: mk(925958),   t23: mk(8654980),  t24: mk(1082434),
  t25: mk(4473360),  t26: mk(8521794),  t27: mk(17313888), t28: mk(102308),
  t29: mk(947058),   t30: mk(19538184), t31: mk(4260897),
  t32: mk(33859),    t33: mk(17859633), t34: mk(208358),   t35: mk(8659209),
  t36: mk(17047704),
  t37: mk(4690192),  t38: mk(1024528),  t39: mk(5113888),  t40: mk(2199824),
  t41: mk(1016832),  t42: mk(3115568),  t43: mk(16),
  t44: mk(3),        t45: mk(3135),     t46: mk(508164),   t47: mk(1015842),
  t48: mk(28943),    t49: mk(28),
};

export const OWL_PUZZLE = {
  id: "a02", title: "Owl", subtitle: "8×8 · Easy",
  riddle: "I sleep all day and wake at night,\nmy head can spin almost all the way round.\nWho-who could I be?\nWhat am I?",
  solution: [
    [T.t0,  T.t44, T.t45, T.t46, T.t47, T.t48, T.t49, T.t0 ],
    [T.t0,  T.t37, T.t38, T.t39, T.t40, T.t41, T.t42, T.t43],
    [T.t32, T.t33, T.t0,  T.t34, T.t34, T.t0,  T.t35, T.t36],
    [T.t25, T.t26, T.t27, T.t28, T.t29, T.t8,  T.t30, T.t31],
    [T.t17, T.t18, T.t19, T.t20, T.t21, T.t22, T.t23, T.t24],
    [T.t11, T.t12, T.t13, T.t0,  T.t0,  T.t14, T.t15, T.t16],
    [T.t0,  T.t5,  T.t6,  T.t7,  T.t8,  T.t9,  T.t10, T.t0 ],
    [T.t0,  T.t0,  T.t1,  T.t2,  T.t3,  T.t4,  T.t0,  T.t0 ],
  ],
};
