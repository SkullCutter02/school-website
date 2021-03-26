import { createOrmConnection, closeOrmConnection } from "../utils/createOrmConnection";

beforeAll(async () => {
  await createOrmConnection();
});

afterAll(async () => {
  await closeOrmConnection();
});

describe("POST /auth/login", () => {
  test("hello", () => {
    expect(1).toEqual(1);
  });
});
