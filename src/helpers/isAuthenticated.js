const isAuthenticated = {};

isAuthenticated.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "É necessário estar autenticado!");
    res.redirect("/users/login");
  }
};

module.exports = isAuthenticated;
