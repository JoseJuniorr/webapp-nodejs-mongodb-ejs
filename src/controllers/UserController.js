const UserController = {};

const passport = require("passport");
const User = require("../models/User");

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

UserController.renderFormRegister = async (req, res) => {
  res.render("users/register", { title: "Registrar Usuário", message: null });
};

UserController.register = async (req, res) => {
  const errors = [];

  const { name, email, password, confirm_password, role } = req.body;

  if (password != confirm_password) {
    errors.push({ text: "As senhas não conferem! Tente Novamente!" });
  }
  if (password.length < 6) {
    errors.push({ text: "A senha deve ter no mínimo 6 caracteres!" });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      title: "Cadastrar Usuário",
      errors,
      name,
      email,
    });
  } else {
    const emailExiste = await User.findOne({ email: email });

    if (emailExiste) {
      req.flash("error_msg", "Este email já está em uso!");
      res.redirect("/users/register");
    } else {
      const newUser = new User({ name, email, password, role });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      // var text =
      //   "Olá {name}, você foi cadastrado no sistema adm do site CVM Unicampo, para acessar basta usar o seu email: {email} e sua senha: {password}, guarde este email para consulta.";
      // text = text
      //   .replace("{name}", req.body.name)
      //   .replace("{password}", req.body.password)
      //   .replace("{email}", req.body.email);

      // require("../mail")(
      //   req.body.email,
      //   "Site CVM Unicampo - Cadastro realizado com sucesso!",
      //   text
      // );
      req.flash("success_msg", "Usuário cadastrado com sucesso!");
      res.redirect("/adm/list-users");
    }
  }
};

module.exports = UserController;
