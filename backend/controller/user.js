import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";

//fungsi get all User
export const getUser = async (req, res) => {
  try {
    const response = await Users.findAll({
      //atribut yang ingin di tampilkan
      attributes: [
        "uuid",
        "userName",
        "name",
        "email",
        "roleId",
        "gender",
        "foto",
        "createdAt",
      ],
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
      attributes: [
        "uuid",
        "userName",
        "name",
        "email",
        "roleId",
        "gender",
        "foto",
        "createdAt",
      ],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//fungsi create User
export const createUser = async (req, res) => {
  const { userName, name, email, password, confPassword, roleId, gender } =
    req.body;

  if (email) {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Format Email Salah!" });
    }
  }

  // Validai email jika sudah digunakan
  const cekEmail = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (cekEmail) {
    return res.status(400).json({ msg: "Email Sudah Digunakan" });
  }

  //validasi password dan confirm password
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password Tidak Cocok" });

  //jika password dan confirm password sesuai
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  let userPhoto = null;
  if (req.file) {
    userPhoto = req.file.path;
  } else {
    userPhoto = "./public/default_photo.jpg";
  }
  try {
    await Users.create({
      userName: userName,
      name: name,
      email: email,
      password: hashPassword,
      roleId: roleId,
      gender: gender,
      foto: userPhoto,
    });
    //respon status created
    res.status(200).json({ msg: "Registrasi Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//fungsi update User
export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  // validasi jika user tidak ditemukan
  if (!user) {
    return res.status(404).json({ msg: "User Tidak Ada" });
  }
  const { username, name, email, password, confPassword, roleId, gender } =
    req.body;
  // validasi jika user merubah password atau tidak mengisi field password
  let hashPassword;
  if (typeof password !== "undefined" && password !== null && password !== "") {
    hashPassword = await argon2.hash(password);
  } else {
    hashPassword = user.password;
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
        foto: req.file.path,
      },
      {
        where: { uuid: user.uuid },
      }
    );
    //respon status updated
    res.status(200).json({ msg: "Data User Berhasil Di Update" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//fungsi delete User
export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  // validasi jika user tidak ditemukan
  if (!user) {
    return res.status(404).json({ msg: "User Tidak Ada" });
  }

  //delete data
  try {
    await Users.destroy({
      where: { uuid: user.uuid },
    });
    //respon status deleted
    res.status(200).json({ msg: "Data User Berhasil Dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
