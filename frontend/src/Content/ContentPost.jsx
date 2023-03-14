import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/NavbarUser";
import Sidebar from "../Sidebar/Sidebar";
import LikeReply from "./Component/LikeReply";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs().format();
dayjs.extend(relativeTime);

export default function ContentPost() {
  const [post, setPost] = useState([]);
  const [token, setToken] = useState("");
  const [comment, setComment] = useState([]);
  const { id, idForum } = useParams();

  // Get Refresh Token
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        setToken(response.data.accessToken);
      });
    } catch (error) {}
  };

  // Memanggil fungsi refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  // Method untuk fetch data post berdasarkan id forum dan UUID post
  const getPostById = async () => {
    const response = await axios.get(
      `http://localhost:5000/forum/${idForum}/post/${id}`
    );
    setPost(response.data);
    // console.log(response.data);
  };

  // Call Method pada useEffect
  useEffect(() => {
    getPostById();
  }, []);

  // get comment data dari API
  const getComment = async () => {
    const response = await axios.get(
      `http://localhost:5000/post/${id}/comment`
    );
    // setComment(response.data);
    // console.log(response.data);
    return response.data;
  };

  // Call Method pada useEffect
  useEffect(() => {
    const dataCom = async () => {
      getComment().then((res) => {
        console.log(res);
        setComment(res);
      });
    };
    dataCom();
  }, []);

  return (
    <>
      {/* // Navbar */}
      <Navbar />
      {/* // Sidebar */}
      <Sidebar />
      <div
        className="flex justify-center mt-20 sm:ml-14 mx-2
    "
      >
        <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 justify-end sm:w-6/12 w-full">
          <div className="grid grid-cols-1 gap-4 justify-end h-auto mt-2">
            <div className="flex justify-center shadow-lg">
              <div className="bg-white border rounded-md h-auto shadow-lg w-full pb-2">
                {/* Headers dan isi konten */}
                <div className="flex items-center ml-10 mt-5 ">
                  {post.user && (
                    <div className="w-14 h-12 rounded-full overflow-hidden border-2 border-button">
                      <img
                        className="object-cover w-full h-full"
                        src={`http://localhost:5000/${post.user.foto}`}
                        alt="Profile User"
                      />
                    </div>
                  )}
                  <div className="flex flex-col ml-3 w-1/2">
                    {post.user && <>Posted By {post.user.name}</>}
                    {post.forum && (
                      <div className="text-xs">/{post.forum.namaForum}</div>
                    )}
                  </div>
                  <div className="flex justify-end w-1/2 mr-10">
                    <div className="flex right-0 text-sm text-gray-500">
                      {dayjs(post.createdAt).fromNow()}
                    </div>
                  </div>
                </div>

                {/* Isi Post */}
                <div className="flex items-center ml-12 mt-5 mb-5">
                  <div className="flex flex-col  w-[95%]">
                    <div className="text-lg font-semibold text-dark">
                      {post.judulPost}
                    </div>
                    <div className="text-sm mt-5 ">{post.isiPost}</div>
                  </div>
                </div>

                {/* Like dan jumlah comment */}
                <div className="mb-5 -ml-3">
                  <LikeReply />
                </div>

                {/* Text Area Untuk Comment */}
                <div className="flex flex-col items-start ml-12 mt-5 mb-5">
                  <span className="text-xs text-gray-500 mb-3">
                    Comment As Users
                  </span>
                  <div className="relative z-0 w-full mb-6 group">
                    <form>
                      <textarea
                        type="textarea"
                        id="floating_textarea"
                        className="shadow-lg min-h-mheight block p-2  w-[95%] text-gray-900 bg-transparent border-2  border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-2 text-justify text-md"
                        placeholder=" "
                      ></textarea>
                      <label
                        for="floating_textarea"
                        className="peer-focus:font-medium absolute text-sm ml-1  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Write a comment here..
                      </label>

                      {/* Buttom Comment */}
                      <div className="flex justify-start items-end mt-5">
                        <button className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-regular rounded-lg text-sm h-8 px-5 py-2.5 inline-flex w-28 dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center items-center justify-center transition-colors duration-300 ">
                          Comment
                        </button>
                      </div>
                      <hr className="h-px mt-8 mb-6 bg-gray-200 border-0 dark:bg-gray-700 w-[95%]" />
                    </form>

                    {/* Isi Comment pada post */}
                    {comment.map((comment, index) => (
                      <>
                        <div className="flex items-center ml-3 mt-5 ">
                          {comment.user && (
                            <div className="w-10 h-9 rounded-full overflow-hidden border-2 border-button">
                              <img
                                className="object-cover w-full h-full"
                                src={`http://localhost:5000/${comment.user.foto}`}
                                alt="Profile User"
                              />
                            </div>
                          )}
                          <div className="flex flex-col ml-3 w-1/2">
                            {comment.user && (
                              <div className="text-sm">{comment.user.name}</div>
                            )}
                          </div>
                          <div className="flex justify-start w-1/2">
                            <div className="flex  text-sm text-gray-500">
                              {dayjs(comment.createdAt).fromNow()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center ml-12 mt-1">
                          <div className="flex flex-col ml-3 w-9/12">
                            <div className="text-xs">{comment.isiComment}</div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
