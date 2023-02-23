import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
//import sync modal
// import db from "./config/db.js";

//import routes
import PostRoute from "./routes/postRoute.js";
import ForumRoute from "./routes/forumRoute.js";
import UserRoute from "./routes/userRoute.js";
import CommentRoute from "./routes/commentRoute.js";
import RolesRoute from "./routes/rolesRoute.js";
import LoginRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

//sync database
// (async () => {
//   await db.sync();
// })();

//mendefinisi session
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);

//middleware untuk akses Front End
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//Middleware untuk menerima data dalam bentuk JSON
app.use(express.json());
app.use(LoginRoute);
app.use(UserRoute);
app.use(RolesRoute);
app.use(ForumRoute);
app.use(PostRoute);
app.use(CommentRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server berjalan");
});
