import express from "express";
// import controller
import {
  getPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controller/post.js";

const PostRoute = express.Router();

// membuat router
PostRoute.get("/post", getPost);
PostRoute.get("/post/:id", getPostById);
PostRoute.post("/post", createPost);
PostRoute.patch("/post/:id", updatePost);
PostRoute.delete("/post/:id", deletePost);

export default PostRoute;
