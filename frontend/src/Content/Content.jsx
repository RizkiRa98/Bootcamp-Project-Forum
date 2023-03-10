import React, { useState, useEffect } from "react";
import Profile from "./Component/Profile";
import Post from "./Component/Post";
import LikeReply from "./Component/LikeReply";
import axios from "axios";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs().format();
dayjs.extend(relativeTime);

export default function Content() {
  const [post, setPost] = useState([]);

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
      className="flex justify-center mt-4 sm:ml-14 mx-2
    "
    >
      <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 justify-end sm:w-6/12 w-full">
        <div className="ml-2 text-lg ">Home</div>
        <div className="grid grid-cols-1 gap-4 justify-end h-auto mt-2">
          {/* Post */}
          {post.map((post, user, index) => (
            <div className="flex justify-center shadow-lg" key={post.uuid}>
              <div className="bg-white border rounded-md h-40 shadow-lg w-full ">
                <a href="/">
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
                  <div className="flex items-center ml-12 mt-2">
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
                <LikeReply />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
