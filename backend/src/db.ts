import { Pool } from "pg";

/**
 * One connection pool for the whole server. Money moves inside database transactions,
 * so every request borrows a client from this pool rather than opening its own connection.
 */
export function createPool(databaseUrl: string): Pool {
  return new Pool({
    connectionString: databaseUrl,
    max: 10,
    // Supabase requires TLS; local Docker Postgres does not.
    ssl: /supabase\.(co|com)/.test(databaseUrl) ? { rejectUnauthorized: false } : undefined,
  });
}

/** True when the database answers a trivial query. */
export async function pingDatabase(pool: Pool): Promise<boolean> {
  try {
    await pool.query("select 1");
    return true;
  } catch {
    return false;
  }
}
