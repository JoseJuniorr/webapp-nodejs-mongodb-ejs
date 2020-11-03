const PostController = {};

const Post = require("../models/Post");

PostController.renderIndex = (req, res) => {
  res.render("posts/index", { title: "Publicações", message: null });
};

PostController.renderListPosts = async (req, res) => {
  await Post.find({})
    .sort({ createdAt: "desc" })
    .then((posts) => {
      res.render("posts/list-posts", {
        title: "Lista de  Posts",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log(err);
      req.flash("error_msg", "Não foi possível carregar os posts!");
    });
};

PostController.renderFormNewPost = (req, res) => {
  res.render("posts/new", { title: "Novo Post", message: null });
};

module.exports = PostController;
