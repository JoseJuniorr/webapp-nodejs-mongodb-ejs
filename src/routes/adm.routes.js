const { Router } = require("express");
const router = Router();

const { renderListUsers } = require("../controllers/AdmController");

const { isAuthenticated } = require("../helpers/isAuthenticated");

router.get("/", isAuthenticated, (req, res) => {
  res.render("adm/dashboard", { title: "Dashboard" });
});

router.get("/list-users", isAuthenticated, renderListUsers);

module.exports = router;
