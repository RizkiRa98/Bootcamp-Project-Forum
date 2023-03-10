import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Post() {
  return (
    // Content Postingan
    <>
      {/* Profile User Post */}

      <div className="flex items-center ml-10 mt-2">
        <div className="w-14 rounded-full overflow-hidden border-2 border-button">
          <img
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt="Profile User"
          />
        </div>
        <div className="flex flex-col ml-3 w-1/2">
          <div className="text-lg text-dark font-medium">Andrew Strong</div>
          <div className="text-xs">/PC-Building</div>
        </div>
        <div className="flex justify-end w-1/2 mr-10">
          <div className="flex right-0 text-sm text-gray-500">10min ago</div>
        </div>
      </div>
      {/* Isi Post */}
      <div className="flex items-center ml-12 mt-2">
        <div className="flex flex-col ml-3 w-9/12">
          <div className="text-lg font-semibold text-dark">
            Saran Build PC Budget 10Jt
          </div>
          <div className="text-xs break-words truncate">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vel odio at massa porttitor finibus. Orci varius natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus. In
            facilisis sed dui a porttitor. Nam nec diam nunc. Nullam gravida
            dapibus sem at ultrices. Fusce rutrum felis non justo tincidunt
            eleifend. Interdum et malesuada fames ac ante ipsum primis in
            faucibus.
          </div>
        </div>
      </div>
    </>
  );
}
