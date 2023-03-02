import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
//import sync modal
import db from "./config/db.js";

//import routes
import PostRoute from "./routes/postRoute.js";
import ForumRoute from "./routes/forumRoute.js";
import UserRoute from "./routes/userRoute.js";
import CommentRoute from "./routes/commentRoute.js";
import LoginRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

// session ke database
const store = new sessionStore({
  db: db,
});

// sync database
// (async () => {
//   await db.sync();
// })();

//Middleware session untuk tracking pengguna website
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
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

// Static Images Folder
app.use("/public/Images/user", express.static("./public/Images/user"));
app.use("/public/Images/post", express.static("./public/Images/post"));

//Middleware untuk menerima data dalam bentuk JSON
app.use(express.json());
app.use(LoginRoute);
app.use(UserRoute);
app.use(ForumRoute);
app.use(PostRoute);
app.use(CommentRoute);

//sync store session dengan database
// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server berjalan");
});
