import React from "react";
import Cover from "../assets/hardware.jpg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative sm:w-1/2 w-0 h-full flex sm:flex-col flex-row sm:visible invisible">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="sm:text-7xl text-2xl sm:text-white text-gray-700 font-bold ">
            Unlocking
          </h1>
          <h1 className="sm:text-5xl text-xl sm:text-white text-gray-700  font-bold mt-0">
            The Power of Technology
          </h1>
          <p className="text-base sm:text-white  text-gray-700  font-semibold mt-2">
            Join the Hardware Forum Community Today!
          </p>
        </div>
        <img
          src={Cover}
          className="w-full h-full sm:visible invisible object-cover"
        ></img>
      </div>
      <div className="w-1/2 h-full flex flex-col p-20 justify-between">
        <h1 className="text-2xl text-dark font-semibold">TechWare</h1>

        <div className="w-full flex flex-col text-dark ">
          <div className="sm:w-full w-72 flex flex-col mb-10">
            <h3 className="text-2xl font-semibold mb-4">Login</h3>
            <p className="text-sm mb-2">
              Welcome Back! Please Continue To Login
            </p>
          </div>
          <form>
            <div className="w-full flex flex-col gap-3">
              {/* Input Email */}
              <input
                type="email"
                placeholder="Email"
                className="sm:w-full w-72  text-dark py-2 my-2 bg-transparent  border-b-2 border-l-0 border-r-0 border-t-0 border-buttonHover outline-none focus:outline-none  rounded-sm"
              ></input>
              {/* Input Password */}
              <input
                type="password"
                placeholder="Password"
                className="sm:w-full w-72  text-dark py-2 my-2 bg-transparent  border-b-2 border-l-0 border-r-0 border-t-0 border-buttonHover outline-none focus:outline-none  rounded-sm"
              ></input>
              <div className="sm:w-full w-72 flex justify-start">
                <Link to="/lupaPassword" className="font-light text-sm ">
                  Forgot Password?
                </Link>{" "}
              </div>
            </div>
          </form>
        </div>
        <div className="sm:w-full w-72 flex justify-center">
          <p className="text-sm font-normal text-gray-600">
            Don't Have Account?{" "}
            <Link
              to="/createUser"
              className="font-semibold underline underline-offset-s"
            >
              Sign Up Here
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
