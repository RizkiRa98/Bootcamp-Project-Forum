import express from "express";
// import controller
import {
  getPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostByForumId,
} from "../controller/post.js";
//import middleware verifyUser agar hanya yang sudah login bisa akses
//import middleware adminOnly agar hanya admin yang bisa akses
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import { uploadPost } from "../middleware/uploadFotoPost.js";
import { verifyToken } from "../middleware/verifyToken.js";

const PostRoute = express.Router();

// membuat router
PostRoute.get("/listPost", getPost);
PostRoute.get("/forum/:id/post", getPostByForumId);
PostRoute.get("/forum/:idForum/post/:id", getPostById);
PostRoute.post("/post", verifyToken, uploadPost, createPost);
PostRoute.patch("/post/:id", verifyUser, uploadPost, updatePost);
PostRoute.delete("/post/:id", verifyUser, deletePost);

export default PostRoute;
