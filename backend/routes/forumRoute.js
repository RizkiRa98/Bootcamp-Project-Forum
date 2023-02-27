import express from "express";
// import controller
import {
  getForum,
  getForumByName,
  createForum,
  updateForum,
  deleteForum,
} from "../controller/forum.js";
//import middleware verifyUser agar hanya yang sudah login bisa akses
//import middleware adminOnly agar hanya admin yang bisa akses
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const ForumRoute = express.Router();

// membuat router
ForumRoute.get("/forum", getForum);
ForumRoute.get("/forum/:id", getForumByName);
ForumRoute.post("/forum", verifyUser, adminOnly, createForum);
ForumRoute.patch("/forum/:id", verifyUser, adminOnly, updateForum);
ForumRoute.delete("/forum/:id", verifyUser, adminOnly, deleteForum);

export default ForumRoute;
