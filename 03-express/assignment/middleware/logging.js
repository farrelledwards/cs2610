// Logging middleware
const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} Username: ${req.cookies.username}`);
  next(); // Pass control to the next middleware
};

export default loggingMiddleware;
