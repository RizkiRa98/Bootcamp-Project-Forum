import { Sequelize } from "sequelize";
//koneksi ke database
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Roles = db.define(
  "roles",
  {
    roleId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 50],
      },
    },
    roleDetail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 50],
      },
    },
  },
  { freezeTableName: true }
);

export default Roles;
