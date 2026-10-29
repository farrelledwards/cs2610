import { Client } from 'pg';
import { readFileSync, writeFileSync } from 'fs';
import dotenv from 'dotenv';


dotenv.config();

const client  = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: "netflix",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

try {
  await client.connect();
  
  const result = await client.query("SELECT * FROM movie");
  
  //  let titles = result.rows.slice(0, 15).map(row => {
  let titles = result.rows.map(row => {
    return `<li>
        <h2>${row.title}</h2>
      </li>`;
  }).join("\n");
  
  const template = readFileSync("movies.html", "utf-8");
  const html = template.replace("{{MOVIES_LIST}}", titles);
  writeFileSync("output.html", html, "utf8");
}
finally {
  await client.end();
}
