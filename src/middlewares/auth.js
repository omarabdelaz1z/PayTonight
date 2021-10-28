const loginRequired = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/");
};

const isAlreadyLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  return next();
};

module.exports = { loginRequired, isAlreadyLoggedIn };
