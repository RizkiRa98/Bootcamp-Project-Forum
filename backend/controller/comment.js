import Forum from "../models/forumModel.js";
import Post from "../models/postModel.js";
import Users from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import { Op } from "sequelize";

//fungsi get all Comment
export const getComment = async (req, res) => {
  try {
    const response = await Comment.findAll({
      // Atribut yang ingin ditampilkan
      attributes: ["uuid", "isiComment", "postId", "createdAt"],
      where: {
        postId: req.params.id,
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

//fungsi create Comment
export const createComment = async (req, res) => {
  const { isiComment } = req.body;
  try {
    await Comment.create({
      isiComment: isiComment,
      userId: req.userId,
      postId: req.params.id,
    });
    res.status(201).json({ msg: "Comment Berhasil Dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//fungsi update Comment
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: {
        [Op.and]: [{ postId: req.params.idPost }, { uuid: req.params.id }],
      },
    });
    if (!comment) {
      res.status(404).json({ msg: "Comment Tidak Ada" });
    }
    const { isiComment } = req.body;
    // Jika yang akses data comment adalah admin
    // maka munculkan data
    if (req.roleId === "admin") {
      await Comment.update(
        {
          isiComment,
        },
        { where: { id: comment.id } }
      );
    } else {
      // Jika yang mengakses data comment bukan user pemilik komen dan admin
      // Maka akses ditolak
      // Jika yang akses adalah pemilik komen maka tampilkan data
      if (req.userId !== comment.userId) {
        return res
          .status(403)
          .json({ msg: "Akses Ditolak! Anda Tidak Bisa Update Komentar Ini!" });
      }
    }
    await Comment.update(
      {
        isiComment,
      },
      {
        where: {
          [Op.and]: [{ id: comment.id }, { userId: req.userId }],
        },
      }
    );
    res.status(200).json({ msg: "Comment Berhasil Di Update" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//FUNGSI DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: {
        [Op.and]: [{ postId: req.params.idPost }, { uuid: req.params.id }],
      },
    });
    if (!comment) {
      res.status(404).json({ msg: "Comment Tidak Ada!" });
    }
    // Jika yang mengakses data ada lah admin
    // Maka munculkan data
    if (req.roleId === "admin") {
      await Comment.destroy({
        where: {
          id: comment.id,
        },
      });
    } else {
      // Jika yang akses data bukan admin atau bukan user yang comment
      // Maka akses ditolak
      // Jika yang akses adalah user yang comment, maka tampilkan data
      if (req.userId !== comment.userId) {
        return res.status(403).json({
          msg: "Akses Ditolak! Anda Tidak Bisa Hapus Komentar Ini!",
        });
      }
      await Comment.destroy({
        where: {
          [Op.and]: [{ id: comment.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Comment Berhasil Di Hapus" });
  } catch (error) {
    res.status(500).json({ msg: msg.message });
  }
};
