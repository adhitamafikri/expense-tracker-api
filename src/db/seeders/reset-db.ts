import { db } from '../../lib/drizzle';

async function resetDB() {
  await db.execute(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      -- Drop all tables
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;
  `);
  console.log('✅ Database reset complete');
}

resetDB().then(() => process.exit(0));
