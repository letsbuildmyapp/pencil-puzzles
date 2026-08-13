import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(2),
  t2: mk(4),
  t3: mk(3213410),
  t4: mk(791117),
  t5: mk(104856),
  t6: mk(1015939),
  t7: mk(1015884),
  t8: mk(923745),
  t9: mk(34971),
  t10: mk(13243268),
  t11: mk(2165826),
  t12: mk(444568),
  t13: mk(9187523),
  t14: mk(102431),
  t15: mk(17172511),
  t16: mk(1084636),
  t17: mk(888897),
  t18: mk(4354196),
  t19: mk(3211264),
  t20: mk(12713984),
};

export const CANDY_PUZZLE = {
  id: "fd14",
  title: "Candy",
  subtitle: "8×8 · Easy",
  riddle: "I'm wrapped up in a shiny wrapper\nI'm sweet and come in many flavors\nWhat am I?",
  solution: [
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0],
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0],
    [T.t1, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t2],
    [T.t3, T.t4, T.t5, T.t6, T.t7, T.t8, T.t9, T.t10],
    [T.t11, T.t12, T.t13, T.t14, T.t15, T.t16, T.t17, T.t18],
    [T.t19, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t20],
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0],
    [T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0, T.t0],
  ],
};
