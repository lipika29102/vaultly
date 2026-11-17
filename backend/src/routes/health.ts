import { Router } from "express";

/**
 * GET /health: is the server up, and can it reach the database?
 * `checkDatabase` is passed in so tests can answer it without a real database.
 */
export function healthRouter(checkDatabase: () => Promise<boolean>): Router {
  const router = Router();
  router.get("/", async (_req, res) => {
    const database = await checkDatabase();
    res.status(database ? 200 : 503).json({
      status: database ? "ok" : "degraded",
      database: database ? "up" : "down",
      time: new Date().toISOString(),
    });
  });
  return router;
}
