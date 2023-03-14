import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Select, Option } from "@material-tailwind/react";

export const ModalPost = ({ setShowModal }) => {
  // UseState Upload Post
  const [judulPost, setJudulPost] = useState("");
  const [userId, setUserId] = useState("");
  const [isiPost, setIsiPost] = useState("");
  const [forumId, setForumId] = useState("");
  const [forums, setForums] = useState([]);
  const [foto, setFoto] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  // Decode jwt token
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUserId(decoded.userId);
      });
    } catch (error) {}
  };

  // Memanggil fungsi refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  // Method untuk fetch data
  const getForum = async () => {
    const response = await axios.get("http://localhost:5000/forum");
    setForums(response.data);
  };

  // Call Method pada useEffect
  useEffect(() => {
    getForum();
  }, []);

  // Handle Untuk Save Postingan
  const savePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/post",
        {
          judulPost: judulPost,
          isiPost: isiPost,
          forumId: forumId,
          foto: foto,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(0);
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setTimeout(() => {
          setMsg("");
        }, 3000);
      }
    }
  };

  // Use Effect untuk auto close alert Error
  useEffect(() => {
    const errMsgTimer = setTimeout(() => {
      setMsg("");
    }, 3000);
    return () => clearTimeout(errMsgTimer);
  }, [msg]);

  // Set limit pada input title
  const maxLength = 50; //Batas limit title
  const sisaChar = maxLength - judulPost.length; //jumlah karakter yang tersisa

  // Handle perubahan jumlah char
  const handleCharChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setJudulPost(e.target.value);
    }
  };

  // Usestate untuk preview foto yang akan di upload
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle Change untuk preview foto
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setFoto(e.target.value);
  };

  // Handle Change untuk close preview foto
  const handleRemovePreview = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  // console.log(judulPost + "-" + isiPost + "-" + forumId + "-" + foto);
  return (
    <div className="fixed inset-0 bg-dark bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="w-[700px] flex flex-col sm:mr-0 sm:ml-0 mr-3 ml-3 top-0 z-99  overflow-y-auto max-h-full">
        <div className="bg-slate-100 p-5 rounded shadow-2xl overflow-y-auto z-auto">
          <div className="justify-end items-end">
            {/* Trigger Close Modal Button */}
            <button
              className="text-dark place-self-end justify-end items-end"
              onClick={() => setShowModal(false)}
            >
              <AiOutlineClose className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-center">
            <h1 className="justify-center items-center text-3xl font-medium text-dark">
              Create Post
            </h1>
          </div>
          <hr className="border-1 border-gray-300" />
          {msg && (
            <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className=" text-center font-bold text-sm">{msg}</strong>{" "}
            </div>
          )}

          {/* FORM */}
          <form className="mt-5" onSubmit={savePost}>
            {/* Select Forum */}
            <span>Select Forum</span>
            <select
              className="flex justify-start h-10 w-[50%]  border-collapse rounded-md  text-sm  py-2.5 px-0 text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  text-justify text-md pl-4"
              onChange={(e) => setForumId(e.target.value)}
              value={forumId}
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              {forums.map((forum) => (
                <option key={forum.id} value={forum.id}>
                  {forum.namaForum}
                </option>
              ))}
            </select>

            {/* Input Judul */}
            <div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  id="floating_title"
                  className="shadow-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-6 text-justify text-md"
                  placeholder=" "
                  required
                  value={judulPost}
                  onChange={(e) => setJudulPost(e.target.value)}
                  onInput={handleCharChange}
                ></input>
                <label
                  for="floating_title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
              </div>
              <span>
                {sisaChar}/{maxLength}
              </span>
            </div>

            {/* Text Area Isi Post*/}
            <div className="relative z-0 w-full mb-6 group">
              <textarea
                type="textarea"
                id="floating_textarea"
                className="shadow-lg min-h-mheight block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-6 text-justify text-md"
                placeholder=" "
                value={isiPost}
                onChange={(e) => setIsiPost(e.target.value)}
              ></textarea>
              <label
                for="floating_textarea"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                What do you want to discuss ?
              </label>
            </div>

            {/* Upload Image */}
            <div className="flex flex-col justify-center items-start">
              {previewUrl && (
                <div className="relative mt-2 mb-3">
                  <button
                    type="button"
                    className="absolute top-0 right-0 mt-2 mr-2 hover:text-red-600 cursor-pointer"
                    onClick={handleRemovePreview}
                  >
                    <AiOutlineClose className="h-5 w-5" />
                  </button>
                  {/* Preview Foto */}
                  <img src={previewUrl} alt="preview" className="w-auto h-32" />
                </div>
              )}

              <input
                accept=".jpg,.jpeg,.png,.gif"
                className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 shadow-md"
                id="file_input"
                type="file"
                onInput={(e) => handleFileChange(e)}
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
              />
              <p className="mt-1 text-sm text-gray-500" id="file_input_help">
                PNG, JPG (MAX. 10MB).
              </p>

              {/* Button Post */}
              <div className="flex justify-end items-end mt-5">
                <button className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-regular rounded-lg lg:text-lg text-sm h-8 px-5 py-2.5 inline-flex w-28 dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center items-center justify-center transition-colors duration-300 ">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
