import express from "express";
// import controller
import {
  getForum,
  getForumById,
  createForum,
  updateForum,
  deleteForum,
} from "../controller/forum.js";

const ForumRoute = express.Router();

// membuat router
ForumRoute.get("/forum", getForum);
ForumRoute.get("/forum/:id", getForumById);
ForumRoute.post("/forum", createForum);
ForumRoute.patch("/forum/:id", updateForum);
ForumRoute.delete("/forum/:id", deleteForum);

export default ForumRoute;
