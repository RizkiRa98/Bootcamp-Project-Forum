import express from "express";
// import controller
import {
  getRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controller/roles.js";

const RolesRoute = express.Router();

// membuat router
RolesRoute.get("/roles", getRole);
RolesRoute.get("/roles/:id", getRoleById);
RolesRoute.post("/roles", createRole);
RolesRoute.patch("/roles/:id", updateRole);
RolesRoute.delete("/roles/:id", deleteRole);

export default RolesRoute;
