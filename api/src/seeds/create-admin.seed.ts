import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";

import Admin from "../entity/Admin";

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const admin = await Admin.findOne({ username: "admin" });

    if (!admin) await factory(Admin)().create();
  }
}
