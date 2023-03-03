import React from "react";

export default function Profile() {
  return (
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
  );
}
