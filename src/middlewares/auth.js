// To access a protected route, you must be logged in.
const loginRequired = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("login");
};

// Don't go back to login or register unless you are not logged in.
const isAlreadyLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/");
  return next();
};

module.exports = { loginRequired, isAlreadyLoggedIn };
