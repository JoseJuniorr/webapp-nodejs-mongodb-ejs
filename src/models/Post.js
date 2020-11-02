const { model, Schema } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
    },
  },
  { timestamps: true }
);

module.exports = model("Post", PostSchema);
