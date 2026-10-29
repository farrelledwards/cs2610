import path from 'path';
import { Response } from './response.js';
import { readFileSync } from 'fs';

export function createFileServer(next) {
  return function (request) {
    const ext = path.extname(request.path);
    switch (ext)
    {
      case "": {
        const response = next(request);
        return response;
      }
      case ".css":
      case ".js": {
        let response = new Response();
        try {
          let staticFile = readFileSync("static" + request.path, "utf-8");
          if (ext === ".css") {
            response.css(staticFile);
          }
          else {
            response.javascript(staticFile);
          }
        }
        catch {
          response.notFound();
        }
        return response;
      }
    }
    let response = new Response();
    response.notFound();
    return response;
  }
}
