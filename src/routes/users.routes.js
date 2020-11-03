const express = require("express");
const router = express.Router();

const {
  renderFormLogin,
  login,
  logout,
  renderFormRegister,
  register,
} = require("../controllers/UserController");

const { isAuthenticated } = require("../helpers/isAuthenticated");

//formulário de login
router.get("/login", renderFormLogin);
//post login
router.post("/login", login);
//get logout
router.get("/logout", logout);

//register
router.get("/register", isAuthenticated, renderFormRegister);

router.post("/register", isAuthenticated, register);

module.exports = router;
