import { Sequelize } from "sequelize";
//koneksi ke database
import db from "../config/db.js";
//import user model & forum model
import Users from "./userModel.js";
import Forum from "./forumModel.js";

const { DataTypes } = Sequelize;

const Post = db.define(
  "post",
  {
    postID: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    judulPost: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 50],
      },
    },
    isiPost: {
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
        notEmpty: false,
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    forumId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
  },
  { freezeTableName: true }
);

//menghubungkan tabel forum dan post
Forum.hasMany(Post);
Post.belongsTo(Forum, { foreignKey: "forumId" });
//Menghubungkan tabel user dan post
Users.hasMany(Post);
Post.belongsTo(Users, { foreignKey: "userId" });

export default Post;
