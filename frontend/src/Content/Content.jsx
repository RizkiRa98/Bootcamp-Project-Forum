import React, { useState, useEffect, Fragment } from "react";
import LikeReply from "./Component/LikeReply";
import axios from "axios";
import { IoCreateOutline } from "react-icons/io5";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs().format();
dayjs.extend(relativeTime);

export default function Content({ setShowModal }) {
  const [post, setPost] = useState([]);
  // Method create post, hanya untuk yang sudah login saja
  const [token, setToken] = useState("");
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get Refresh Token
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        setToken(response.data.accessToken);
        setLoading(false);
        setLogin(true);
      });
    } catch (error) {}
  };

  // Memanggil fungsi refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  // Method untuk fetch data
  const getPost = async () => {
    const response = await axios.get("http://localhost:5000/listPost");
    setPost(response.data);
  };

  // Call Method pada useEffect
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div
      className="flex justify-center mt-20 sm:ml-14 mx-2
    "
    >
      <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 justify-end sm:w-6/12 w-full">
        {/* Create Post Button */}
        <div className="sm:collapse sm:hidden">
          {login ? (
            <Fragment>
              <div className="flex space-x-4 justify-start mt-5 sm:collapse">
                <div className="justify-start relative mt-5 mb-5 w-72 sm:collapse">
                  <div className="absolute inset-y-0 left-2 flex items-center pl- pointer-events-none"></div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-regular rounded-lg lg:text-lg text-sm h-12 px-5 py-2.5 inline-flex mr-auto4 w-full dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center items-center transition-colors duration-300 sm:collapse"
                  >
                    <IoCreateOutline className="h-7 w-7 mr-2 -ml-1 sm:collapse" />
                    Create New Post
                  </button>
                </div>
              </div>
              {/* <ModalPost /> */}
            </Fragment>
          ) : (
            <div className="sm:collapse">{null}</div>
          )}
        </div>
        <div className="ml-2 text-lg ">Home</div>
        <div className="grid grid-cols-1 gap-4 justify-end h-auto mt-2">
          {/* Post */}
          {post.map((post, user, index) => (
            <div className="flex justify-center shadow-lg" key={post.id}>
              <div className="bg-white border rounded-md h-auto shadow-lg w-full ">
                <a href={`/forum/${post.forum.id}/post/${post.id}`}>
                  <div className="flex items-center ml-10 mt-2">
                    <div className="w-14 h-12 rounded-full overflow-hidden border-2 border-button">
                      <img
                        className="object-cover w-full h-full"
                        src={`http://localhost:5000/${post.user.foto}`}
                        alt="Profile User"
                      />
                    </div>
                    <div className="flex flex-col ml-3 w-1/2">
                      <div className="text-lg text-dark font-medium">
                        {post.user.name}
                      </div>
                      <div className="text-xs">/{post.forum.namaForum}</div>
                    </div>
                    <div className="flex justify-end w-1/2 mr-10">
                      <div className="flex right-0 text-sm text-gray-500">
                        {dayjs(post.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                  {/* Isi Post */}
                  <div className="flex items-center ml-12 mt-4">
                    <div className="flex flex-col ml-3 w-9/12">
                      <div className="text-lg font-semibold text-dark">
                        {post.judulPost}
                      </div>
                      <div className="text-xs break-words truncate">
                        {post.isiPost}
                      </div>
                    </div>
                  </div>
                </a>
                {/* Like & Reply */}
                <div className="mt-4 mb-5">
                  <LikeReply />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
