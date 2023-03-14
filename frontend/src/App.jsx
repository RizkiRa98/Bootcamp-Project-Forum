import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login/";
import ContentPost from "./Content/ContentPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="forum/:idForum/post/:id"
            element={<ContentPost />}
          ></Route>
          {/* <Route path="createUser" element={<SignUp />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
