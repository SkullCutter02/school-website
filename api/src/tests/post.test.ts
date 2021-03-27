import request = require("supertest");

import server from "../server";

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
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      const post = await request(server)
        .post("/posts")
        .send({ user: "Alan", title: "Hello", body: "Bonjour" })
        .set("Cookie", login.header["set-cookie"]);

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
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      const res = await request(server)
        .post("/posts")
        .send({ user: "Alan", title: "Hello", body: "Bonjour" })
        .set("Cookie", login.header["set-cookie"]);

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
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      const res = await request(server)
        .post("/posts")
        .send({ title: "Hello", body: "Bonjour" })
        .set("Cookie", login.header["set-cookie"]);

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual("user is a required field");
    });

    it("should return minimum one character error", async () => {
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      const res = await request(server)
        .post("/posts")
        .send({ user: "", title: "Hello", body: "Bonjour" })
        .set("Cookie", login.header["set-cookie"]);

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual("user must be at least 1 characters");
    });
  });

  describe("PATCH /posts/:uuid", () => {
    it("should change the title", async () => {
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      const post = await request(server)
        .post("/posts")
        .send({ user: "Alan", title: "Hello", body: "Bonjour" })
        .set("Cookie", login.header["set-cookie"]);

      const res = await request(server)
        .patch(`/posts/${post.body.uuid}`)
        .send({ title: "Bye" })
        .set("Cookie", login.header["set-cookie"]);

      expect(res.status).toEqual(200);
      expect(res.body.title).toEqual("Bye");
    });
  });

  describe("DELETE /posts/:uuid", () => {
    it("should delete the post", async () => {
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      const post = await request(server)
        .post("/posts")
        .send({ user: "Alan", title: "Hello", body: "Bonjour" })
        .set("Cookie", login.header["set-cookie"]);

      const res = await request(server)
        .delete(`/posts/${post.body.uuid}`)
        .set("Cookie", login.header["set-cookie"]);

      expect(res.status).toEqual(200);
      expect(res.body.msg).toEqual("Post deleted successfully");
    });
  });

  describe("PATCH /posts/:uuid/views", () => {
    it("should increment the view count by 1", async () => {
      const login = await request(server)
        .post("/auth/login")
        .send({ username: "admin", password: process.env.ADMIN_PASSWORD });

      const post = await request(server)
        .post("/posts")
        .send({ user: "Alan", title: "Hello", body: "Bonjour" })
        .set("Cookie", login.header["set-cookie"]);

      const res = await request(server).patch(`/posts/${post.body.uuid}/views`);

      expect(res.status).toEqual(200);
      expect(res.body.views).toEqual(1);
    });
  });
});
