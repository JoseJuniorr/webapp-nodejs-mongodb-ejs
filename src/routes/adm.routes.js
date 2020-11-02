const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/isAuthenticated");

router.get("/", isAuthenticated, (req, res) => {
  res.render("adm/dashboard", { title: "Dashboard" });
});

module.exports = router;
