import { Sequelize } from "sequelize";
//koneksi ke database
import db from "../config/db.js";
//import user model & forum model
import Users from "./userModel.js";
import Post from "./postModel.js";

const { DataTypes } = Sequelize;

const Comment = db.define(
  "comment",
  {
    commentID: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isiComment: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    postId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

//menghubungkan tabel post dan comment
Post.hasMany(Comment);
Comment.belongsTo(Post, { foreignKey: "forumId" });
//Menghubungkan tabel comment dan user
Users.hasMany(Comment);
Comment.belongsTo(Users, { foreignKey: "userId" });

export default Comment;
