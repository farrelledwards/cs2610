# Exam 2 Grading Rubric

14 questions, 10 points each, 140 points total. Award partial credit when most elements are present. Students don't need to use the lesson's exact wording.

---

## 1. Node.js and npm (10 pts)

**Question:**

> Explain what Node.js is and why it's useful for building web servers. Describe the purpose of npm and the package.json file. Explain the difference between dependencies and devDependencies in a package.json file.

**Answer should include:**
- Node runs JavaScript outside the browser (server side).
- Useful for servers: asynchronous and event-driven (non-blocking I/O), one language for frontend and backend.
- npm is the package manager; package.json holds project metadata, dependencies, and scripts.
- `dependencies` are needed to run in production; `devDependencies` are only for development (testing, building).

---

## 2. Computer Networks and IP Addresses (10 pts)

**Question:**

> Explain why computer networks are necessary and how they enable modern computing. Describe what an IP address is and explain the difference between private and public IP addresses. Provide an example of when you would use each type.

**Answer should include:**
- Networks replace physically moving data; they enable instant sharing, shared resources, communication, and remote access.
- An IP address is a unique identifier for a device or interface on a network.
- Private addresses (10.x, 172.16-31.x, 192.168.x) are used inside local networks and are not routable on the internet; public addresses are unique on the internet and assigned by an ISP.
- A reasonable example of each (e.g., home laptop = private, public web server = public).

---

## 3. TCP vs UDP (10 pts)

**Question:**

> Explain the key differences between TCP and UDP. Describe three characteristics that make TCP reliable and explain why UDP might be preferred in certain situations. Provide an example of an application that uses TCP and one that uses UDP.

**Answer should include:**
- TCP is connection-oriented, reliable, and ordered; UDP is connectionless, unreliable, faster, with lower overhead.
- Any three reliability features: sequence numbers, ACKs, retransmission, flow control, ordering.
- UDP is preferred when speed matters more than reliability.
- One TCP example (HTTP, email, SSH) and one UDP example (DNS, gaming, streaming, VoIP).

---

## 4. TCP Ports (10 pts)

**Question:**

> Explain what a port is and why computers need ports. Describe how ports allow multiple networked programs to run on the same machine. Provide examples of at least three well-known ports and the protocols or services typically associated with them.

**Answer should include:**
- A port is a 16-bit number (0-65535) identifying an application or service on a machine.
- IP + port gives a unique endpoint, so many programs can share one IP, each listening on a different port.
- At least three correct well-known ports (80 HTTP, 443 HTTPS, 22 SSH, 5432 PostgreSQL).

---

## 5. TCP Protocol Characteristics (10 pts)

**Question:**

> Explain what TCP is and describe the three key characteristics that make TCP reliable. Explain how TCP handles missing or lost packets during transmission. Describe at least one common application or protocol that uses TCP and explain why TCP is well-suited for that use case.

**Answer should include:**
- TCP is the Transmission Control Protocol, running on top of IP.
- Three key characteristics: reliable, ordered, stream-oriented.
- Lost packets are handled with sequence numbers, ACKs, a timeout, and retransmission.
- An application or protocol such as HTTP, email, or SSH, with a reason (needs guaranteed, ordered delivery).

---

## 6. HTTP Request Structure (10 pts)

**Question:**

> Explain the three main parts of an HTTP request (request line/start line, headers, and body). Describe what information is contained in the request line (also called the start line) and provide an example. Explain why there must be a blank line between the headers and the body in an HTTP request.

**Answer should include:**
- Three parts: request line, headers, body (optional).
- Request line contains method, path/URI, and HTTP version, with a valid example (e.g., `GET /api/users HTTP/1.1`).
- The blank line signals the end of the headers; it is required even when there is no body.

---

## 7. HTTP Methods (10 pts)

**Question:**

> Explain the purpose of HTTP methods (verbs) and describe when you would use GET, POST, PUT, PATCH, and DELETE. Explain the difference between PUT and PATCH requests and when you would use each. Explain the difference between GET and POST requests, including when each should be used.

**Answer should include:**
- GET retrieves, POST creates or submits, PUT replaces an entire resource, PATCH partially updates, DELETE removes.
- PUT replaces the whole resource; PATCH changes only the specified fields.
- GET is safe and idempotent with no body; POST creates or changes data and carries a body.

---

## 8. HTTP Status Codes (10 pts)

**Question:**

> Explain what HTTP status codes are and why they are important. Describe the difference between status codes in the 200s, 400s, and 500s ranges. Provide examples of at least three different status codes (one from each range) and explain when a server would return each one.

**Answer should include:**
- Status codes communicate the result of a request.
- 2xx = success, 4xx = client error, 5xx = server error.
- One correct code from each range with when it's returned (e.g., 200 or 201; 400, 401, or 404; 500 or 503).

---

## 9. Request and Response Classes (10 pts)

**Question:**

> Describe the structure of the Request class and list the key properties it contains. Describe the structure of the Response class and list the key properties it contains. Explain why these classes are useful abstractions in web server architecture.

**Answer should include:**
- Request: method, version, headers, body, uri.
- Response: version, code, reason, headers, body.
- Why useful: structured, easy-to-use objects instead of raw bytes; separates HTTP parsing from application logic.

---

## 10. Router and Endpoints (10 pts)

**Question:**

> Explain what a router does in web server architecture and how it selects which code should handle a request. Describe what an endpoint is and explain the relationship between endpoints and the router.

**Answer should include:**
- The router matches the request's method and URI to the correct endpoint (exact match or pattern like `/users/:id`).
- An endpoint is a function that takes a Request and returns a Response.
- The router holds the endpoints (`routes`) and calls the matching one.

---

## 11. Static File Serving vs Endpoints (10 pts)

**Question:**

> Explain the difference between static file serving and endpoint-based dynamic responses. Describe how each approach works and when you would use each one. Provide an example scenario where you would choose static file serving and another where you would choose an endpoint.

**Answer should include:**
- Static serving maps a path to a file on disk and returns its contents.
- An endpoint runs code and generates the response dynamically (inputs, database, auth).
- A suitable scenario for each (e.g., CSS/images vs. a database-driven API).

---

## 12. Middleware Factory Pattern (10 pts)

**Question:**

> Explain what middleware is and how it fits into the web server request/response pipeline. Describe the middleware factory pattern and explain how middleware factory functions work (what they take as arguments and what they return). Explain why middleware ordering matters and provide an example of when order would be important.

**Answer should include:**
- Middleware is a function (Request → Response) between the server and the router, running code before and/or after the next handler.
- The factory takes `next` (middleware or router) and returns the middleware function.
- Order matters, with a valid example (e.g., cookie parsing before authentication; auth before endpoints).

---

## 13. Middleware Wrapping (10 pts)

**Question:**

> Explain what types of functions middleware can wrap and what requirement those functions must meet. Describe why this ability to wrap different types of functions makes middleware a powerful pattern in web server architecture. Provide a concrete example of a practical use case for middleware.

**Answer should include:**
- Can wrap any function that takes a Request and returns a Response: other middleware, endpoints, or the router.
- Powerful because cross-cutting concerns are added without modifying endpoints, and middleware can be composed.
- A concrete use case (logging, authentication, error handling, adding headers).

---

## 14. PostgreSQL Database Connection (10 pts)

**Question:**

> Explain how to connect to a PostgreSQL database using the pg module in Node.js. Describe how to execute a SQL query and retrieve results. Explain why it's important to close the database connection and describe a best practice for ensuring connections are always closed.

**Answer should include:**
- Create a `pg` Client with connection info, then `connect()`.
- Run `client.query(sql)`; results are in `result.rows` (parameterized queries are a plus).
- Close with `client.end()` to avoid leaking connections.
- Best practice: a `finally` block so the connection closes even on error.