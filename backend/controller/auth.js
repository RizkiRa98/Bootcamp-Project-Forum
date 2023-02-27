import { request } from "express";
import Users from "../models/userModel.js";
import argon2 from "argon2";

//Membuat fungsi login
export const login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  //Jika user tidak ada
  if (!user) {
    return res.status(404).json({ msg: "User Tidak Ditemukan" });
  }
  const match = await argon2.verify(user.password, req.body.password);
  //Jika password dan confirm password tidak cocok
  if (!match) {
    return res.status(400).json({ msg: "Password Salah!" });
  }
  //request session berdasarkan uuid
  req.session.uuid = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const roleId = user.roleId;
  res.status(200).json({ uuid, name, email, roleId });
};

//Membuat fungsi get user yang sedang login
export const userLogin = async (req, res) => {
  //Validasi JIka Session User tidak ada
  if (!req.session.uuid) {
    return res.status(401).json({ msg: "Mohon Untuk Login Terlebih Dahulu" });
  }
  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "roleId"],
    where: {
      uuid: req.session.uuid,
    },
  });
  //Validasi jika user tidak ada
  if (!user) {
    return res.status(404).json({ msg: "User Tidak Ditemukan" });
  }
  res.status(200).json(user);
};

// membuat fungsi logout
export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ msg: "Logout Gagal" });
    }
    res.status(200).json({ msg: "Logout Berhasil" });
  });
};
