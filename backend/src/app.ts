import express, { Express } from "express";
import { healthRouter } from "./routes/health";

export type AppDeps = {
  checkDatabase: () => Promise<boolean>;
};

/**
 * Builds the Express app without starting it, so tests can call it directly
 * (supertest) and the server file stays a thin start-up wrapper.
 */
export function createApp(deps: AppDeps): Express {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json({ limit: "100kb" }));

  app.use("/health", healthRouter(deps.checkDatabase));

  app.use((_req, res) => {
    res.status(404).json({ error: "not_found" });
  });

  return app;
}
