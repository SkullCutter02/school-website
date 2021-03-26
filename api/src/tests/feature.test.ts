import request = require("supertest");

import server from "../server";
import { createOrmConnection, closeOrmConnection } from "../utils/createOrmConnection";

beforeAll(async () => {
  await createOrmConnection();
});

afterAll(async () => {
  await closeOrmConnection();
});

describe("features route", () => {
  describe("POST /features", () => {
    it("should return minimum one character error", async () => {
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      const res = await request(server)
        .post("/features")
        .send({ title: "", body: "Raid Shadow Legends" })
        .set("Cookie", login.header["set-cookie"]);

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual("title must be at least 1 characters");
    });

    it("should return feature object", async () => {
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      const res = await request(server)
        .post("/features")
        .send({ title: "Sponsor", body: "Raid Shadow Legends" })
        .set("Cookie", login.header["set-cookie"]);

      expect(res.status).toEqual(200);
      expect(res.body.title).toEqual("Sponsor");
      expect(res.body.body).toEqual("Raid Shadow Legends");
    });

    it("should return maximum feature number is 4 error", async () => {
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      for (let i = 0; i < 4; i++) {
        await request(server)
          .post("/features")
          .send({ title: "Sponsor", body: "Raid Shadow Legends" })
          .set("Cookie", login.header["set-cookie"]);
      }

      const res = await request(server)
        .post("/features")
        .send({ title: "Sponsor", body: "NordVPN" })
        .set("Cookie", login.header["set-cookie"]);

      expect(res.status).toEqual(400);
      expect(res.body.msg).toEqual("Maximum number of features is 4");
    });
  });
});
