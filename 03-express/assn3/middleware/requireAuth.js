// Require the user to having logged in.
const requireAuth = (req, res, next) => {
  console.log(`${req.user} and ${req.session}`);

  if (!req.user || !req.session) {
    res.redirect('/login');
  }
  else {
    next();
  }
};

export default requireAuth;
