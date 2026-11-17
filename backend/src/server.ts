import { createApp } from "./app";
import { loadConfig } from "./config";
import { createPool, pingDatabase } from "./db";

const config = loadConfig();
const pool = config.DATABASE_URL ? createPool(config.DATABASE_URL) : null;

const app = createApp({
  checkDatabase: async () => (pool ? pingDatabase(pool) : false),
});

const server = app.listen(config.PORT, () => {
  console.log(`Vaultly API on http://localhost:${config.PORT} (database ${pool ? "configured" : "not configured"})`);
});

// Close cleanly on Ctrl+C or when the host stops the service.
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    server.close(async () => {
      await pool?.end();
      process.exit(0);
    });
  });
}
