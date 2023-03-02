import express from "express";
// import controller
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/user.js";
//import middleware verifyUser
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import { uploadUser } from "../middleware/uploadFotoUser.js";

const UserRoute = express.Router();

// membuat router, set middleware verifyUser dan adminOnly
UserRoute.get("/users", verifyUser, adminOnly, getUser);
UserRoute.get("/users/:id", verifyUser, adminOnly, getUserById);
UserRoute.post("/users", uploadUser, createUser);
UserRoute.patch("/users/:id", verifyUser, updateUser);
UserRoute.delete("/users/:id", verifyUser, adminOnly, deleteUser);

export default UserRoute;
