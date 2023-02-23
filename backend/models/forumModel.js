import { Sequelize } from "sequelize";
//koneksi ke database
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Forum = db.define(
  "forum",
  {
    forumId: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    namaForum: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 50],
      },
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [15, 150],
      },
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
  },
  { freezeTableName: true }
);

export default Forum;
