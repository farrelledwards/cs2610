const NOT_FOUND = `<html>
<head><title>404 Not Found</title></head>
<body>
<h1>Not Found</h1>
<p>The requested URL was not found on this server.</p>
</body>
</html>`;

export class Response {
  #body;
  
  constructor() {
    this.headers = [];
    this.status = "OK";
    this.responseCode = 200;
    this.#body = "";
  }

  set html(val) {
    this.#body = val;
    this.headers.push("Content-Type: text/html");
  }

  notFound() {
    this.headers.push("Content-Type: text/html");
    this.status = "Not Found";
    this.responseCode = 404;
    this.#body = NOT_FOUND;
  }

  redirect(path) {
    this.headers.push("Connection: close");
    this.headers.push("Location: " + path);
    this.status = "Moved Permanently";
    this.responseCode = 301;
    this.#body = "";
  }

  javascript(content) {
    this.headers.push("Content_Type: application/javascript");
    this.status = "OK";
    this.responseCode = 200;
    this.#body = content;
  }

  css(content) {
    this.headers.push("Content_Type: text/css; charset=UTF-8");
    this.status = "OK";
    this.responseCode = 200;
    this.#body = content;
  }

  toLogString() {
    return `HTTP/1.1 ${this.responseCode} ${this.status}`;
  }

  toString() {
    return `HTTP/1.1 ${this.responseCode} ${this.status}\n` +
      this.headers.join("\n") + "\n" +
      `Date: ${new Date().toUTCString()}\n` +
      `Content-Length: ${this.#body.length}\n\n` +
      this.#body;
  }
}

