import { Sequelize } from "sequelize";
//koneksi ke database
import db from "../config/db.js";
// import Roles from "./rolesModel.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 15],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    createDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

//Menghubungkan tabel user dan roles
// Roles.hasMany(Users);
// Users.belongsTo(Roles, { foreignKey: "roleId" });
export default Users;