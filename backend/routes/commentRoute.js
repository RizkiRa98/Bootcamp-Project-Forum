import express from "express";
// import controller
import {
  getComment,
  createComment,
  updateComment,
  deleteComment,
} from "../controller/comment.js";

//import middleware verifyUser agar hanya yang sudah login bisa akses
//import middleware adminOnly agar hanya admin yang bisa akses
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const CommentRoute = express.Router();

// membuat router
CommentRoute.get("/post/:id/comment", getComment);
CommentRoute.post("/post/:id/comment", verifyUser, createComment);
CommentRoute.patch("/post/:idPost/comment/:id", verifyUser, updateComment);
CommentRoute.delete("/post/:idPost/comment/:id", verifyUser, deleteComment);

export default CommentRoute;
