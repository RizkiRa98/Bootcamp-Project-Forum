import React, { useState, useEffect, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaUserAlt } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlineFire,
  AiOutlineDesktop,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { FaHeadset } from "react-icons/fa";
import { VscTools } from "react-icons/vsc";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [foto, setFoto] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [login, setLogin] = useState(false);
  const [forum, setForum] = useState([]);
  const navigate = useNavigate();

  // Fetch data forum dari API
  const getForum = async () => {
    const response = await axios.get("http://localhost:5000/forum");
    setForum(response.data);
  };

  // Call method getForum pada useEffect
  useEffect(() => {
    getForum();
  }, []);

  // Decode jwt token
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setEmail(decoded.email);
        setFoto(decoded.foto);
        setLoading(false);
        setLogin(true);
        // console.log(decoded.email);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  // Method Handle Logout
  const logout = async () => {
    try {
      console.log(email);
      await axios.delete("http://localhost:5000/logout", {
        withCredentials: true,
        data: {
          email: email,
        },
      });
      navigate(0);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  // Memanggil fungsi refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  // const [isOpen, setOpen] = useState(false);
  return (
    <div className="fixed top-0 z-20 w-full">
      <Disclosure as="nav" className="bg-white drop-shadow-xl ">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8 ">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center border-r border-dark border-r-dark pr-2 box-border h-auto">
                    <a
                      className="block lg:hidden space-x-4 font-semibold text-2xl"
                      href="/"
                    >
                      TechWare
                    </a>
                    <a
                      className="hidden lg:block space-x-4 font-semibold text-2xl"
                      href="/"
                    >
                      TechWare
                    </a>
                  </div>
                </div>
                {/* Search Bar */}

                <div className="flex space-x-4 justify-start">
                  <form className="flex justify-start">
                    <label htmlFor="search-bar" className="sr-only">
                      Search
                    </label>
                    <div className="relative mt-5 mb-5 w-full invisible md:visible">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BsSearch className="h-6 w-6" />
                      </div>
                      <input
                        type="text"
                        id="search-bar"
                        className=" bg-gray-50 border border-button text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hidden sm:block  pl-10 p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96"
                        placeholder="Search Post"
                        autoComplete="off"
                      ></input>
                    </div>
                  </form>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 justify-end">
                    {/* Jika state loading false maka munculkan button/identitas name, jika loading true maka munculkan tulisan loading */}
                    {!loading ? (
                      <>
                        {name ? (
                          name
                        ) : (
                          <>
                            <a
                              href="/login"
                              className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-xl h-9 py-1 mr-3 w-36 dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center"
                            >
                              Login
                            </a>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex">
                          <div className="h-2.5 w-2.5 bg-current rounded-full animate-bounce mr-1"></div>
                          <div className="h-2.5 w-2.5 bg-current rounded-full mr-1  animate-bounce 1s infinite 200ms"></div>
                          <div className="h-2.5 w-2.5 bg-current rounded-full animate-bounce 1s infinite 400ms"></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {login ? (
                    <>
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div className="flex rounded-full bg-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-button object-cover">
                          <Menu.Button className="flex rounded-full bg-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-button object-cover w-full h-full">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="w-10 h-10 rounded-full overflow-hidden"
                              src={`http://localhost:5000/${foto}`}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={logout}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <div as="div" className="relative ml-3">
                        <div>
                          <a
                            href="/login"
                            className="flex rounded-full bg-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-button object-cover w-full h-full"
                          >
                            <FaUserAlt className="h-10 w-10 rounded-full" />
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden overflow-y-auto">
              <div className="flex space-y-1 px-2 pt-2 pb-3">
                <div className="flex justify-center justify-items-center m-auto">
                  {!loading ? (
                    <>
                      {name ? (
                        name
                      ) : (
                        <>
                          <a
                            href="/login"
                            className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-xl h-9 py-1 mr-3 w-36 dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center"
                          >
                            Login
                          </a>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex">
                        <div className="h-2.5 w-2.5 bg-current rounded-full animate-bounce mr-1"></div>
                        <div className="h-2.5 w-2.5 bg-current rounded-full mr-1  animate-bounce 1s infinite 200ms"></div>
                        <div className="h-2.5 w-2.5 bg-current rounded-full animate-bounce 1s infinite 400ms"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* Feeds */}
              <span className="text-sm text-gray-500 ml-2">Feeds</span>
              <ul
                role="list"
                className=" font-medium text-gray-900 text-lg ml-2"
              >
                {/* Home link */}
                <li className="mt-3 mb-3">
                  <a
                    href="/"
                    className="inline-flex items-center justify-start pt-2 pb-2 w-full text-lg font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-gray-400 dark:hover:text-white transition-colors duration-300"
                  >
                    <AiOutlineHome className="w-7 h-7 mr-3" />
                    Home
                  </a>
                </li>
                {/* Trending Link */}
                <li className="mt-3 mb-3">
                  <a
                    href="/trending"
                    className="inline-flex items-center justify-start pt-2 pb-2 w-full text-lg font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-gray-400 dark:hover:text-white transition-colors duration-300"
                  >
                    <AiOutlineFire className="w-7 h-7 mr-3" />
                    Trending
                  </a>
                </li>
              </ul>
              {/* Forum */}
              <span className="text-sm text-gray-500 ml-2">Forum</span>
              <ul
                role="list"
                className="font-medium text-gray-900 text-lg ml-2"
              >
                {/* Get Forum*/}
                {forum.map((forum, index) => (
                  <li className="mt-3 mb-3" key={forum.id}>
                    <a
                      href={`/forum/${forum.id}`}
                      className="inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-lg font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-buttonHover dark:hover:text-white transition-colors duration-300"
                    >
                      <img
                        className="w-7 h-7 mr-3"
                        src={`http://localhost:5000/${forum.icon}`}
                        alt="Icon Forum"
                      />

                      {forum.namaForum}
                    </a>
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
