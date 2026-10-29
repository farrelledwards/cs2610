
export class Request {
  constructor(raw) {
    this.path = "";
    this.method = "";
    this.headers = [];
    this.version = "";

    const [requestLine] = raw.split("\n");
    [this.method, this.path, this.version] = requestLine.split(" ");    
  }

  toLogString() {
    return `${this.method} ${this.path}`;
  }
}

