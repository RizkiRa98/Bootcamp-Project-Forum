import Users from "../models/userModel.js";
import argon2 from "argon2";

//fungsi get all User
export const getUser = async (req, res) => {
  try {
    const response = await Users.findAll({
      //atribut yang ingin di tampilkan
      attributes: ["userId", "userName", "name", "email", "roleId", "gender"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//fungsi get User by id
export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      //atribut yang ingin di tampilkan
      attributes: ["userId", "userName", "name", "email", "roleId", "gender"],
      where: {
        userId: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//fungsi create User
export const createUser = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    confPassword,
    roleId,
    gender,
    createDate,
    foto,
  } = req.body;

  //validasi password dan confirm password
  if (password !== confPassword)
    res.status(400).json({ msg: "Password dan Confirm Password Tidak Cocok" });

  //jika password dan confirm password sesuai
  const hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      userName: username,
      name: name,
      email: email,
      password: hashPassword,
      roleId: roleId,
      gender: gender,
      createDate: createDate,
      foto: foto,
    });
    //respon status created
    res.status(201).json({ msg: "Registrasi Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//fungsi update User
export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      userId: req.params.id,
    },
  });
  // validasi jika user tidak ditemukan
  if (!user) return res.status(404).json({ msg: "User Tidak Ada" });
  const {
    username,
    name,
    email,
    password,
    confPassword,
    roleId,
    gender,
    createDate,
    foto,
  } = req.body;
  // validasi jika user merubah password atau tidak mengisi field password
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  //validasi password dan confirm password
  if (password !== confPassword)
    res.status(400).json({ msg: "Password dan Confirm Password Tidak Cocok" });

  //update data
  try {
    await Users.update(
      {
        userName: username,
        name: name,
        email: email,
        password: hashPassword,
        roleId: roleId,
        gender: gender,
        createDate: createDate,
        foto: foto,
      },
      {
        where: { userId: user.userId },
      }
    );
    //respon status created
    res.status(200).json({ msg: "Data Berhasil Di Update" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//fungsi delete User
export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      userId: req.params.id,
    },
  });
  // validasi jika user tidak ditemukan
  if (!user) return res.status(404).json({ msg: "User Tidak Ada" });

  //update data
  try {
    await Users.destroy({
      where: { userId: user.userId },
    });
    //respon status created
    res.status(200).json({ msg: "Data User Berhasil Dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
