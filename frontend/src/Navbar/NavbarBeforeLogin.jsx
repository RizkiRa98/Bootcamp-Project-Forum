import React from "react";
import { Disclosure } from "@headlessui/react";
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

export default function Navbar() {
  // const [isOpen, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50">
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
                    <a
                      href="/login"
                      className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-xl h-9 py-1 mr-3 w-36 dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center"
                    >
                      Login
                    </a>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <div as="div" className="relative ml-3">
                    <div>
                      <a
                        href="/login"
                        className="flex rounded-full bg-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-button"
                      >
                        <FaUserAlt className="h-10 w-10 rounded-full" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
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
                className=" font-medium text-gray-900 text-lg ml-2"
              >
                {/* Desktop Setup link */}
                <li className="mt-3 mb-3">
                  <a
                    href="/forum/:id"
                    className="inline-flex items-center justify-start pt-2 pb-2 w-full text-lg font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-gray-400 dark:hover:text-white transition-colors duration-300"
                  >
                    <AiOutlineDesktop className="w-7 h-7 mr-3" />
                    Desktop Setup
                  </a>
                </li>
                {/* PC Building Link */}
                <li className="mt-3 mb-3">
                  <a
                    href="/forum/:id"
                    className="inline-flex items-center justify-start pt-2 pb-2 w-full text-lg font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-gray-400 dark:hover:text-white transition-colors duration-300"
                  >
                    <VscTools className="w-7 h-7 mr-3" />
                    PC Building
                  </a>
                </li>
                {/* PC Building Link */}
                <li className="mt-3 mb-3">
                  <a
                    href="/forum/:id"
                    className="inline-flex items-center justify-start pt-2 pb-2 w-full text-lg font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-gray-400 dark:hover:text-white transition-colors duration-300"
                  >
                    <AiOutlineExclamationCircle className="w-7 h-7 mr-3" />
                    Troubleshooting
                  </a>
                </li>
                {/* Accessories Link */}
                <li className="mt-3 mb-3">
                  <a
                    href="/forum/:id"
                    className="inline-flex items-center justify-start pt-2 pb-2 w-full text-lg font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-gray-400 dark:hover:text-white transition-colors duration-300"
                  >
                    <FaHeadset className="w-7 h-7 mr-3" />
                    Accessories
                  </a>
                </li>
              </ul>
              <div className="flex space-y-1 px-2 pt-2 pb-3">
                <div className="flex justify-center justify-items-center m-auto">
                  <a
                    href="/login"
                    className=" text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-xl h-11 py-2 w-60 dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center transition-colors duration-300"
                  >
                    Login
                  </a>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
