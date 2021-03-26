import request = require("supertest");
import { useRefreshDatabase, useSeeding, runSeeder, tearDownDatabase } from "typeorm-seeding";

import server from "../server";
import { createOrmConnection, closeOrmConnection } from "../utils/createOrmConnection";
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

describe("POST /auth/login", () => {
  it("should not return a user object", async () => {
    const res = await request(server).post("/auth/login").send({ username: "admin", password: "dwdw" });

    expect(res.status).toEqual(403);
  });

  it("should return a user object", async () => {
    const res = await request(server)
      .post("/auth/login")
      .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

    expect(res.status).toEqual(200);
    expect(res.body.username).toEqual("admin");
    expect(res.body.createdAt).toBeTruthy();
    expect(res.body.updatedAt).toBeTruthy();
    expect(res.body.uuid).toBeTruthy();
  });
});
