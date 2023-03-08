import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login/";
import SignUp from "./SignUp/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />}></Route>
          {/* <Route path="createUser" element={<SignUp />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
