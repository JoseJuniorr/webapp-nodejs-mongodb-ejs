const UserController = {};

const passport = require("passport");

UserController.renderFormLogin = (req, res) => {
  res.render("users/login", { title: "Login", message: null });
};

UserController.login = passport.authenticate("local", {
  failureRedirect: "/users/login",
  successRedirect: "/adm",
  failureFlash: true,
});

UserController.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Usuário deslogado com sucesso!");
  res.redirect("/users/login");
};

UserController.renderFormRegister = (req, res) => {
  res.render("users/register", { title: "Registrar Usuário", message: null });
};

UserController.register = (req, res) => {
  const errors = [];

  const { name, email, password, confirm_password, role } = req.body;
};

module.exports = UserController;
