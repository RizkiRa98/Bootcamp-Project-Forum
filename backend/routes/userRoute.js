import express from "express";
// import controller
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/user.js";

const UserRoute = express.Router();

// membuat router
UserRoute.get("/users", getUser);
UserRoute.get("/users/:id", getUserById);
UserRoute.post("/users", createUser);
UserRoute.patch("/users/:id", updateUser);
UserRoute.delete("/users/:id", deleteUser);

export default UserRoute;
