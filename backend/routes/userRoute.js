import express from "express";
// import controller
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/user.js";
//import middleware yang dibutuhkan
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import { uploadUser } from "../middleware/uploadFotoUser.js";

const UserRoute = express.Router();

// membuat router, set middleware verifyUser dan adminOnly
UserRoute.get("/users", getUser);
UserRoute.get("/users/:id", getUserById);
UserRoute.post("/users", uploadUser, createUser);
UserRoute.patch("/users/:id", uploadUser, updateUser);
UserRoute.delete("/users/:id", deleteUser);

export default UserRoute;
