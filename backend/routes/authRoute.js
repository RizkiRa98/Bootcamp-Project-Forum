import express from "express";
import { login, logout, userLogin } from "../controller/auth.js";

const LoginRoute = express.Router();

LoginRoute.get("/userLogin", userLogin);
LoginRoute.post("/login", login);
LoginRoute.delete("/logout", logout);

export default LoginRoute;
