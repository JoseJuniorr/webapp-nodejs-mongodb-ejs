const { Router } = require("express");
const router = Router();

const {
  renderIndex,
  renderFormNewPost,
  renderListPosts,
} = require("../controllers/PostController");

const { isAuthenticated } = require("../helpers/isAuthenticated");

router.get("/", renderIndex);

router.get("/list-posts", isAuthenticated, renderListPosts);

router.get("/new", isAuthenticated, renderFormNewPost);

module.exports = router;
