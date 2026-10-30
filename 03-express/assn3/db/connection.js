import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();


class Database {
  constructor() {
    this.client = new Client({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async connect() {
    await this.client.connect();
  }

  async query(sql, params = []) {
    const result = await this.client.query(sql, params);
    return result;
  }
}
// Connect to the database
/*await client.connect();

// Execute a SELECT query
const result = await client.query('SELECT * FROM posts ORDER BY created_at DESC');

// The result object contains a 'rows' array with the query results
console.log(result.rows);
// [
//   { id: 1, title: 'First Post', content: '...', created_at: '...' },
//   { id: 2, title: 'Second Post', content: '...', created_at: '...' }
// ]
*/

let database = new Database();
await database.connect();

export default database;
