import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7 reads the migration connection from this file. The schema no longer
// accepts `url` or `directUrl`. Supabase migrations need the session/direct
// connection (DIRECT_URL). DATABASE_URL is the transaction pooler and is not
// valid for Migrate.
const migrationUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  ...(migrationUrl
    ? {
        datasource: {
          url: migrationUrl,
        },
      }
    : {}),
});
