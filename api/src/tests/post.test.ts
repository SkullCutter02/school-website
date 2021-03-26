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
  describe("GET /posts", () => {
    it("should return an array", async () => {
      const res = await request(server).get("/posts?page=1&limit=10&filter=");

      expect(res.body.posts).toBeTruthy();
      expect(Array.isArray(res.body.posts)).toBe(true);
      expect(typeof res.body.hasMore).toEqual("boolean");
    });
  });

  describe("GET /posts/:uuid", () => {
    it("should return a post object", async () => {
      const post = await request(server)
        .post("/posts")
        .send({ user: "Alan", title: "Hello", body: "Bonjour" });

      const res = await request(server).get(`/posts/${post.body.uuid}`);

      expect(res.status).toEqual(200);
      expect(res.body.user).toEqual("Alan");
      expect(res.body.title).toEqual("Hello");
      expect(res.body.body).toEqual("Bonjour");
      expect(res.body.views).not.toBeLessThan(0);
      expect(res.body.createdAt).toBeTruthy();
      expect(res.body.updatedAt).toBeTruthy();
      expect(res.body.uuid).toBeTruthy();
    });
  });

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
