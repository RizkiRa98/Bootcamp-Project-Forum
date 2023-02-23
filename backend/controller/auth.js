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
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Password Salah!" });
  req.session.userId = user.userId;
  const userId = user.userId;
  const name = user.name;
  const email = user.email;
  const roleId = user.roleId;
  res.status(200).json({ userId, name, email, roleId });
};

//Membuat fungsi get user login
export const userLogin = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon Login Ke Akun Anda" });
  }
  const user = await Users.findOne({
    attributes: ["userId", "name", "email", "roleId"],
    where: {
      userId: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  res.status(200).json(user);
};

// membuat fungsi logout
export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Logout Gagal" });
    res.status(200).json({ msg: "Logout Berhasil" });
  });
};
