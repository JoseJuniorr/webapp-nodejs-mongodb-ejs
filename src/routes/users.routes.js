const express = require("express");
const router = express.Router();

const {
  renderFormLogin,
  login,
  logout,
  renderFormRegister,
} = require("../controllers/UserController");

//formulário de login
router.get("/login", renderFormLogin);
//post login
router.post("/login", login);
//get logout
router.get("/logout", logout);

//register
router.get("/register", renderFormRegister);

module.exports = router;
