import React from "react";
import Profile from "./Component/Profile";
import Post from "./Component/Post";
import LikeReply from "./Component/LikeReply";

export default function Content() {
  return (
    <div
      className="flex justify-center mt-4 sm:ml-14 mx-2
    "
    >
      <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 justify-end sm:w-7/12 w-full">
        <div className="ml-2 text-lg ">Home</div>
        <div className="grid grid-cols-1 gap-4 justify-end h-auto mt-2">
          {/* Post */}
          <div className="flex justify-center shadow-lg">
            <div className="bg-white border rounded-md h-40 shadow-lg w-full ">
              {/* Profile */}
              <Profile />
              {/* Post & Link to Post */}
              <a href="/">
                <Post />
              </a>
              {/* Like & Reply */}
              <LikeReply />
            </div>
          </div>

          <div className="flex justify-center shadow-lg">
            <div className="bg-white border rounded-md h-40 shadow-lg w-full ">
              {/* Profile */}
              <Profile />
              {/* Post & Link to Post */}
              <a href="/">
                <Post />
              </a>
              {/* Like & Reply */}
              <LikeReply />
            </div>
          </div>

          <div className="flex justify-center shadow-lg">
            <div className="bg-white border rounded-md h-40 shadow-lg w-full ">
              {/* Profile */}
              <Profile />
              {/* Post & Link to Post */}
              <a href="/">
                <Post />
              </a>
              {/* Like & Reply */}
              <LikeReply />
            </div>
          </div>

          <div className="flex justify-center shadow-lg">
            <div className="bg-white border rounded-md h-40 shadow-lg w-full ">
              {/* Profile */}
              <Profile />
              {/* Post & Link to Post */}
              <a href="/">
                <Post />
              </a>
              {/* Like & Reply */}
              <LikeReply />
            </div>
          </div>

          <div className="flex justify-center shadow-lg">
            <div className="bg-white border rounded-md h-40 shadow-lg w-full ">
              {/* Profile */}
              <Profile />
              {/* Post & Link to Post */}
              <a href="/">
                <Post />
              </a>
              {/* Like & Reply */}
              <LikeReply />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
