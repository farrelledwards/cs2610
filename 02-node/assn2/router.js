import { readFileSync } from 'fs';
import { Response } from './response.js';
import { DB } from './db.js';

let db = new DB();
await db.connect();
await db.cacheData();

function getIndex() {
  return readFileSync("templates/index.html", "utf-8");
}

function getData(title, intro, table) {
  let template = readFileSync("templates/data.html", "utf-8");
  let titles = db.getCached(table).map(row => {
    return `<li>
        <h2>${row}</h2>
      </li>`;
  }).join("\n");
  return template.replace("{{TITLE}}", title).replace("{{INTRODUCTION}}", intro).replace("{{DATA}}", titles);
}

let map = new Map();
map.set("/", getIndex);
map.set("/movies", () => getData("All Movies", "Titles for all movies at Netflix", "movies"));
map.set("/seasons", () => getData("All Movies", "Titles for all movies at Netflix", "seasons"));
map.set("/tvshows", () => getData("All Movies", "Titles for all movies at Netflix", "shows"));


function route(request) {
  let response = new Response();
  if (map.has(request.path)) {
    response.html = map.get(request.path)();
  }
  else if (request.path === "/films") {
    response.redirect("/movies");
  }
  else {
    response.notFound();
  }
  return response;
}

export function createRouter() {
  return function (request) {
    return route(request);
  }
}

