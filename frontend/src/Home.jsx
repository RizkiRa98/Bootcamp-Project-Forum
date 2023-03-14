import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/NavbarUser";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import { ModalPost } from "./Sidebar/Component/ModalPost";
import axios from "axios";

export default function Home({}) {
  // State Modal dan Token
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState("");
  // Decode jwt token
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

  return (
    <React.Fragment>
      {/* Jika Buttom Modal di trigger maka tampilkan showModal */}
      {showModal && <ModalPost setShowModal={setShowModal} />}
      <Navbar />
      <Content setShowModal={setShowModal} />
      <Sidebar setShowModal={setShowModal} />
    </React.Fragment>
  );
}
