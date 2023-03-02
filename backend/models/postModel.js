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
    uuid: {
      type: DataTypes.STRING,
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    forumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
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
