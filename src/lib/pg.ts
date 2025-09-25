import { Pool } from 'pg';

export class Postgres {
  private static instance: Pool | undefined = undefined;

  constructor() {
    console.log('PG instance created');
  }

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432'),
    });

    return this.instance;
  }

  public static getClient() {
    return this.getInstance().connect();
  }
}
