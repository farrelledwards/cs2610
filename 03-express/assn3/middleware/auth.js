// Auth middleware
const authMiddleware = (req, res, next) => {
  req.user = req.cookies.username;
  req.session = req.cookies.session;

  if (!req.username) {
    res.redirect('/login');
  }
  else {
    next();
  }
};

export default authMiddleware;
