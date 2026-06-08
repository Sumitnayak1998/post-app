const express = require("express");
const router = express.Router();
const {
  createPost,
  allPosts,
  updatePosts,
  deletePosts,
  singlePost,
} = require("../controller/postController");
const { authorize, authenticate } = require("../middleware/auth");
const upload = require("../config/multer");

router.post(
  "/posts",
  authenticate,
  authorize("admin", "user"),
  upload.single("post"),
  createPost,
);

router.get(
  "/posts",
  authenticate,
  authorize("admin", "user"),
  allPosts,
);

router.get(
  "/posts/:id",
  authenticate,
  authorize("admin", "user"),
  singlePost,
);

router.put(
  "/posts/:id",
  authenticate,
  authorize("admin", "user"),
  upload.single("post"),
  updatePosts,
);

router.delete(
  "/posts/:id",
  authenticate,
  authorize("admin", "user"),
  deletePosts,
);

module.exports = router;
