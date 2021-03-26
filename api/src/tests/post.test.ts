import request = require("supertest");

import server from "../server";
import { createOrmConnection, closeOrmConnection } from "../utils/createOrmConnection";

beforeAll(async () => {
  await createOrmConnection();
});

afterAll(async () => {
  await closeOrmConnection();
});

describe("post route", () => {
  describe("POST /posts", () => {
    it("should return a post object", async () => {
      const res = await request(server)
        .post("/posts")
        .send({ user: "Alan", title: "Hello", body: "Bonjour" });

      expect(res.status).toEqual(200);
      expect(res.body.user).toEqual("Alan");
      expect(res.body.title).toEqual("Hello");
      expect(res.body.body).toEqual("Bonjour");
      expect(res.body.views).toEqual(0);
      expect(res.body.createdAt).toBeTruthy();
      expect(res.body.updatedAt).toBeTruthy();
      expect(res.body.uuid).toBeTruthy();
    });

    it("should return required field error", async () => {
      const res = await request(server).post("/posts").send({ title: "Hello", body: "Bonjour" });

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual("user is a required field");
    });

    it("should return minimum one character error", async () => {
      const res = await request(server).post("/posts").send({ user: "", title: "Hello", body: "Bonjour" });

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual("user must be at least 1 characters");
    });
  });
});
