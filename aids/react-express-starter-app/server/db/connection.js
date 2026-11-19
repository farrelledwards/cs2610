import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Run ./setup.sh, or copy .env.example to .env and fill in your database credentials."
  );
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
