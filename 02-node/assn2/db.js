import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export class DB {
  #client;
  constructor() {
    this.#client  = new Client({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: "netflix",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    this.data = new Map();

    process.on('SIGINT', () => this.shutdown('SIGINT'));  // Ctrl+C in terminal
    process.on('SIGTERM', () => this.shutdown('SIGTERM')); // e.g., Docker/Heroku stop
  }

  async connect() {
    await this.#client.connect();
  }

  async cacheData() {
    this.data.set("movies", await this.get("movie", "title"));
    this.data.set("seasons", await this.get("season", "title"));
    this.data.set("shows", await this.get("tv_show", "title"));
}

  getCached(table) {
    return this.data.get(table);
  }

  async get(table, field) {
    let query = "SELECT " + field + " FROM " + table;
    console.log("Make the query: " + query);
    let results = await this.#client.query("SELECT " + field + " FROM " + table);
    return results.rows.map(row => row[field]);
  }
  
  async shutdown(msg) {
    console.log("Received a " + msg + ".  Shutting down...");
    await this.#client.end();
    process.exit();
  }
}

