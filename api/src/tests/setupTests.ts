import { runSeeder, tearDownDatabase, useRefreshDatabase, useSeeding } from "typeorm-seeding";

import { closeOrmConnection, createOrmConnection } from "../utils/createOrmConnection";
import CreateAdmin from "../seeds/create-admin.seed";

beforeAll(async () => {
  await createOrmConnection();
  await useRefreshDatabase({ connection: "test" });
  await useSeeding();
  await runSeeder(CreateAdmin);
});

afterAll(async () => {
  await closeOrmConnection();
  await tearDownDatabase();
});
