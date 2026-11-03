// Require the user to having logged in.
const requireAuth = (req, res, next) => {
  req.user = req.cookies.username;
  req.session = req.cookies.session;

  if (!req.username || !req.session) {
    res.redirect('/login');
  }
  else {
    next();
  }
};

export default authMiddleware;
