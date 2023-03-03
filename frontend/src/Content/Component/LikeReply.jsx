import React from "react";

import { IconButton } from "@material-tailwind/react";
import { FaHeart, FaComment } from "react-icons/fa";

export default function LikeReply() {
  return (
    <div className="flex items-center ml-12 mt-2">
      <div className="flex flex-row ml-3 w-9/12">
        {/* Like */}
        <div className="text-lg font-semibold flex justify-items-center">
          <IconButton
            variant="text"
            className="flex justify-center items-center border-red-500 border-2 h-7 w-7"
          >
            <FaHeart />
          </IconButton>
        </div>
        <div className="items-center ml-2">23</div>
        {/* Reply */}
        <div className="items-center text-lg font-semibold text-dark ml-7">
          <a href="/forum/:idForum/post/:id">
            <IconButton
              variant="text"
              className="flex justify-center items-center border-blue-700 border-2 h-7 w-7"
            >
              <FaComment />
            </IconButton>
          </a>
        </div>
        <div className="items-center ml-2">5</div>
      </div>
    </div>
  );
}
