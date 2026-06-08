const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    post: {
      type: String,
      required: true,
      trim: true,
    },
    post_name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model("postApp", postSchema);
