import request = require("supertest");

import server from "../server";

describe("auth route", () => {
  describe("POST /auth/login", () => {
    it("should not return a user object because incorrect password", async () => {
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

    it("should not return a user object because incorrect username", async () => {
      const res = await request(server).post("/auth/login").send({ username: "bla", password: "dwdw" });

      expect(res.status).toEqual(500);
    });
  });

  describe("POST /auth/logout", () => {
    it("should return logout successful", async () => {
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      const res = await request(server).post("/auth/logout").set("Cookie", login.header["set-cookie"]);

      expect(res.status).toEqual(200);
      expect(res.body.logout).toEqual("Successful");
    });

    it("should return logout failed", async () => {
      const res = await request(server).post("/auth/logout");

      expect(res.status).toEqual(403);
    });
  });

  describe("POST /auth/refresh", () => {
    it("should return a user object", async () => {
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      const res = await request(server).post("/auth/refresh").set("Cookie", login.header["set-cookie"]);

      expect(res.status).toEqual(200);
      expect(res.body.username).toBeTruthy();
      expect(res.body.createdAt).toBeTruthy();
      expect(res.body.updatedAt).toBeTruthy();
      expect(res.body.uuid).toBeTruthy();
    });

    it("should not return a user object", async () => {
      const res = await request(server).post("/auth/refresh");

      expect(res.status).toEqual(403);
    });
  });
});
