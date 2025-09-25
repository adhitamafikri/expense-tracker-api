import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  migrations: {
    schema: 'public', // used in PostgreSQL only, `drizzle` by default
  },
});
