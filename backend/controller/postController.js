const fs = require("fs");
const path = require("path");
const Post = require("../model/postSchema");

function removeFileIfExists(filePath) {
  if (!filePath) {
    return;
  }

  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(__dirname, "..", filePath);

  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
}

exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "File not uploaded" });
    }

    const { post_name, desc } = req.body;

    if (!post_name || !desc) {
      removeFileIfExists(req.file.path);
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }

    const payload = await Post.create({
      post: req.file.path.replace(/\\/g, "/"),
      post_name: post_name.trim(),
      desc: desc.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

exports.allPosts = async (req, res) => {
  try {
    const payload = await Post.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All posts fetched successfully",
      payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

exports.singlePost = async (req, res) => {
  try {
    const payload = await Post.findById(req.params.id);

    if (!payload) {
      return res
        .status(404)
        .json({ success: false, message: "No post available" });
    }

    return res.status(200).json({
      success: true,
      message: "Single post fetched successfully",
      payload,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

exports.updatePosts = async (req, res) => {
  try {
    const payload = await Post.findById(req.params.id);

    if (!payload) {
      if (req.file) {
        removeFileIfExists(req.file.path);
      }

      return res.status(404).json({
        success: false,
        message: "No post is available with this id",
      });
    }

    const updateData = {
      post_name: req.body.post_name ? req.body.post_name.trim() : payload.post_name,
      desc: req.body.desc ? req.body.desc.trim() : payload.desc,
      post: payload.post,
    };

    if (req.file) {
      removeFileIfExists(payload.post);
      updateData.post = req.file.path.replace(/\\/g, "/");
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      payload: updatedPost,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

exports.deletePosts = async (req, res) => {
  try {
    const payload = await Post.findById(req.params.id);

    if (!payload) {
      return res
        .status(404)
        .json({ success: false, message: "No post available" });
    }

    removeFileIfExists(payload.post);
    await Post.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};
