import Forum from "../models/forumModel.js";

//fungsi get all forum semua role bisa lihat
export const getForum = async (req, res) => {
  try {
    const response = await Forum.findAll({
      //Atribut yang ingin ditampilkan
      attributes: ["id", "uuid", "namaForum", "detail", "createdAt", "icon"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//fungsi get forum by id
export const getForumByName = async (req, res) => {
  try {
    const response = await Forum.findOne({
      //Atribut yang ingin ditampilkan
      attributes: ["uuid", "namaForum", "detail", "createdAt", "icon"],
      where: {
        namaForum: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//fungsi create forum
export const createForum = async (req, res) => {
  const { namaForum, detailt, icon } = req.body;
  try {
    await Forum.create({
      namaForum: namaForum,
      detail: detail,
      icon: icon,
    });
    res.status(201).json({ msg: "Forum Berhasil Dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//fungsi update forum
export const updateForum = async (req, res) => {
  const forum = await Forum.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  //Validasi jika forum tidak ditemukan
  if (!forum) {
    return res.status(404).json({ msg: "Forum Tidak Ada" });
  }
  const { namaForum, detail, icon } = req.body;
  try {
    await Forum.update(
      {
        namaForum: namaForum,
        detail: detail,
        icon: icon,
      },
      {
        where: { uuid: forum.uuid },
      }
    );
    //respon status updated
    res.status(200).json({ msg: "Forum berhasil di Update" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//fungsi delete forum
export const deleteForum = async (req, res) => {
  const forum = await Forum.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!forum) {
    return res.status(404).json({ msg: "Forum Tidak Ada" });
  }

  try {
    //Mengahpus data forum berdasarkan ID
    await Forum.destroy({
      where: { uuid: forum.uuid },
    });
    res.status(200).json({ msg: "Data Forum Berhasil Di Hapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
