export function createLogger(next) {
  return function (request) {
    console.log("Incoming request: " + request.toLogString());
    const response = next(request);
    console.log("Response: " + response.toLogString());
    return response;
  }
}
