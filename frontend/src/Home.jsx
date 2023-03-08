import React from "react";
import Navbar from "./Navbar/NavbarBeforeLogin";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";

export default function Home({ children }) {
  return (
    <React.Fragment>
      <Navbar />
      <Sidebar />
      <Content />
    </React.Fragment>
  );
}
