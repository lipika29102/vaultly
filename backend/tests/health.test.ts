import request from "supertest";
import { createApp } from "../src/app";
import { loadConfig } from "../src/config";

describe("GET /health", () => {
  it("answers ok when the database is reachable", async () => {
    const app = createApp({ checkDatabase: async () => true });
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: "ok", database: "up" });
  });

  it("answers 503 when the database is down", async () => {
    const app = createApp({ checkDatabase: async () => false });
    const res = await request(app).get("/health");
    expect(res.status).toBe(503);
    expect(res.body).toMatchObject({ status: "degraded", database: "down" });
  });

  it("unknown routes are a JSON 404", async () => {
    const app = createApp({ checkDatabase: async () => true });
    const res = await request(app).get("/nope");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "not_found" });
  });
});

describe("config", () => {
  it("defaults the port and accepts a missing database URL", () => {
    expect(loadConfig({})).toMatchObject({ PORT: 4000, NODE_ENV: "development" });
  });

  it("rejects a malformed database URL", () => {
    expect(() => loadConfig({ DATABASE_URL: "not a url" })).toThrow(/DATABASE_URL/);
  });
});
