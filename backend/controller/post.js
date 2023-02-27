import Post from "../models/postModel.js";
import Roles from "../models/rolesModel.js";
import Users from "../models/userModel.js";
// Import Operator Dari Sequelize
import { Op } from "sequelize";

//fungsi get all post
export const getPost = async (req, res) => {
  try {
    const response = await Post.findAll({
      //Attribut yang ingin ditampilkan
      attributes: [
        "uuid",
        "judulPost",
        "isiPost",
        "created_date",
        // "userId",
        "forumId",
        "foto",
      ],
      include: [
        {
          model: Users,
          attributes: ["userName", "name", "roleId", "gender", "foto"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//fungsi get all post by id forum
export const getPostByForumId = async (req, res) => {
  try {
    const response = await Post.findAll({
      //Attribut yang ingin ditampilkan
      attributes: [
        "uuid",
        "judulPost",
        "isiPost",
        "created_date",
        // "userId",
        "forumId",
        "foto",
      ],
      where: {
        forumId: req.params.id,
      },
      include: [
        {
          model: Users,
          attributes: ["userName", "name", "roleId", "gender", "foto"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//fungsi get post by Judul
export const getPostById = async (req, res) => {
  try {
    const response = await Post.findOne({
      //Attribut yang ingin ditampilkan
      attributes: [
        "uuid",
        "judulPost",
        "isiPost",
        "created_date",
        // "userId",
        "forumId",
        "foto",
      ],
      // cari data berdasarkan judul post sebagai parameter
      where: {
        [Op.and]: [{ forumId: req.params.idForum }, { uuid: req.params.id }],
      },
      include: [
        {
          model: Users,
          attributes: ["userName", "name", "roleId", "gender", "foto"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//fungsi create post
export const createPost = async (req, res) => {
  const { judulPost, isiPost, created_date, forumId, foto } = req.body;
  try {
    await Post.create({
      judulPost: judulPost,
      isiPost: isiPost,
      created_date: created_date,
      forumId: forumId,
      foto: foto,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Post Berhasil Dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//fungsi update post
export const updatePost = async (req, res) => {
  // Mencari post berdasarkan uuid
  try {
    const post = await Post.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!post) {
      res.status(404).json({ msg: "Post Tidak Ada" });
    }
    const { judulPost, isiPost, created_date, forumId, foto } = req.body;
    // Jika yang akses data adalah admin
    // Maka munculkan data
    if (req.roleId === "admin") {
      await Post.update(
        { judulPost, isiPost, created_date, forumId, foto },
        {
          where: {
            id: post.id,
          },
        }
      );
    } else {
      // JIka yang akses data bukan admin atau bukan user yang post
      // Maka akses ditolak
      // Jika yang akses adalah user yang post, maka tampilkan data
      if (req.userId !== post.userId) {
        return res.status(403).json({
          msg: "Akses Ditolak! Anda Tidak Bisa Update Postingan Ini!",
        });
      }
      await Post.update(
        { judulPost, isiPost, created_date, forumId, foto },
        {
          where: {
            [Op.and]: [{ id: post.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Post Berhasil Di Update" });
  } catch (error) {
    res.status(500).json({ msg: msg.message });
  }
};

//fungsi delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!post) {
      res.status(404).json({ msg: "Post Tidak Ada" });
    }
    // Jika yang akses data adalah admin
    // Maka munculkan data
    if (req.roleId === "admin") {
      await Post.destroy({
        where: {
          id: post.id,
        },
      });
    } else {
      // JIka yang akses data bukan admin atau bukan user yang post
      // Maka akses ditolak
      // Jika yang akses adalah user yang post, maka tampilkan data
      if (req.userId !== post.userId) {
        return res.status(403).json({
          msg: "Akses Ditolak! Anda Tidak Bisa Hapus Postingan Ini!",
        });
      }
      await Post.destroy({
        where: {
          [Op.and]: [{ id: post.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Post Berhasil Di Hapus" });
  } catch (error) {
    res.status(500).json({ msg: msg.message });
  }
};
