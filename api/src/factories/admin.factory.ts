import { define } from "typeorm-seeding";

import Admin from "../entity/Admin";

define(Admin, () => {
  try {
    const username = "admin";
    const hash = "$argon2i$v=19$m=16,t=2,p=1$ZHc5ZG93ZHdtZG13b21kb3c$j0x4BZXsBB9VF7TvaGKoxQ";

    const admin = new Admin();
    admin.username = username;
    admin.hash = hash;

    return admin;
  } catch (err) {
    return null;
  }
});
