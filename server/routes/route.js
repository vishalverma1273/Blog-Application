// import express from "express";

// import { signupUser, loginUser } from "../controller/user-controller.js";
// // import { uploadImage } from "../controller/image-controller.js";
// import { uploadImage, getImage } from "../controller/image-controller.js";
// import upload from "../utils/upload.js";
// import CreatePost from "../../client/src/components/create/CreatePost.jsx";
// import { authorization } from "../controller/jwt-controller.js";

// const router = express.Router();

// router.post("/signup", signupUser);
// router.post("/login", loginUser);
// router.post("/file/upload", upload.single("file"), uploadImage);
// router.get("/file/:filename", getImage);
// router.post("/create", CreatePost);

// export default router;

import express from "express";

import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts
} from "../controller/post-controller.js";
import { uploadImage, getImage } from "../controller/image-controller.js";
import {
  newComment,
  getComments,
  deleteComment
} from "../controller/comment-controller.js";
import {
  loginUser,
  signupUser,
  logoutUser
} from "../controller/user-controller.js";
import {
  authenticateToken,
  createNewToken
} from "../controller/jwt-controller.js";

import upload from "../utils/upload.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", logoutUser);

router.post("/token", createNewToken);

router.post("/create", authenticateToken, createPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);

router.get("/post/:id", getPost);
router.get("/posts", authenticateToken, getAllPosts);

router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);

router.post("/comment/new", authenticateToken, newComment);
router.get("/comments/:id", authenticateToken, getComments);
router.delete("/comment/delete/:id", authenticateToken, deleteComment);

export default router;
