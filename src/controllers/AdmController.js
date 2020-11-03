const AdmController = {};

const User = require("../models/User");

//renderiza lista de usuários cadastrados
AdmController.renderListUsers = async (req, res) => {
  const users = await User.find({});

  res.render("adm/list-users", { users: users, title: "Usuários" });
};

module.exports = AdmController;
