import React from "react";

export const ModalPost = ({ setShowModal }) => {
  return (
    <div className="fixed inset-0 bg-dark bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">Test Modal</div>
      </div>
    </div>
  );
};
