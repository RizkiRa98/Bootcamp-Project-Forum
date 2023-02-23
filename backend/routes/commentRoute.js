import express from "express";
// import controller
import {
  getComment,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from "../controller/comment.js";

const CommentRoute = express.Router();

// membuat router
CommentRoute.get("/comment", getComment);
CommentRoute.get("/comment/:id", getCommentById);
CommentRoute.post("/comment", createComment);
CommentRoute.patch("/comment/:id", updateComment);
CommentRoute.delete("/comment/:id", deleteComment);

export default CommentRoute;
