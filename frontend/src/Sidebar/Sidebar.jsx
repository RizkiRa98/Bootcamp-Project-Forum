import { IoCreateOutline } from "react-icons/io5";
import {
  AiOutlineHome,
  AiOutlineFire,
  AiOutlineDesktop,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { FaHeadset } from "react-icons/fa";
import { VscTools } from "react-icons/vsc";

export default function Sidebar() {
  return (
    <div className="bg-white  flex justify-end mx-auto fixed left-0 top-20 invisible md:visible rounded-xl shadow-lg h-auto drop-shadow-xl lg:ml-6 xl:w-80 w-56">
      <div className="container">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center">
            {/* Create Post Button */}
            <div className="flex space-x-4 justify-center mt-5">
              <div className="relative mt-5 mb-5 w-full">
                <div className="absolute inset-y-0 left-2 flex items-center pl- pointer-events-none"></div>
                <button
                  href="/"
                  className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-regular rounded-lg lg:text-lg text-sm h-12 px-5 py-2.5 inline-flex mr-auto4 w-full dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center items-center transition-colors duration-300"
                >
                  <IoCreateOutline className="h-7 w-7 mr-2 -ml-1" />
                  Create New Post
                </button>
              </div>
            </div>
            {/* Feeds */}
            <span className="text-sm text-gray-500">Feeds</span>
            <ul role="list" className=" font-medium text-gray-900 text-lg">
              {/* Home link */}
              <li className="mt-3 mb-3">
                <a
                  href="/"
                  className="inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-buttonHover dark:hover:text-white transition-colors duration-300"
                >
                  <AiOutlineHome className="w-7 h-7 mr-3" />
                  Home
                </a>
              </li>
              {/* Trending Link */}
              <li className="mt-3 mb-3">
                <a
                  href="/trending"
                  className="inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-buttonHover dark:hover:text-white transition-colors duration-300"
                >
                  <AiOutlineFire className="w-7 h-7 mr-3" />
                  Trending
                </a>
              </li>
            </ul>

            {/* Forum */}
            <span className="text-sm text-gray-500">Forum</span>
            <ul role="list" className=" font-medium text-gray-900 text-lg">
              {/* Desktop Setup link */}
              <li className="mt-3 mb-3">
                <a
                  href="/forum/:id"
                  className="inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-buttonHover dark:hover:text-white transition-colors duration-300"
                >
                  <AiOutlineDesktop className="w-7 h-7 mr-3" />
                  Desktop Setup
                </a>
              </li>
              {/* PC Building Link */}
              <li className="mt-3 mb-3">
                <a
                  href="/forum/:id"
                  className="inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-buttonHover dark:hover:text-white transition-colors duration-300"
                >
                  <VscTools className="w-7 h-7 mr-3" />
                  PC Building
                </a>
              </li>
              {/* PC Building Link */}
              <li className="mt-3 mb-3">
                <a
                  href="/forum/:id"
                  className="inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-buttonHover dark:hover:text-white transition-colors duration-300"
                >
                  <AiOutlineExclamationCircle className="w-7 h-7 mr-3" />
                  Troubleshooting
                </a>
              </li>
              {/* Accessories Link */}
              <li className="mt-3 mb-3">
                <a
                  href="/forum/:id"
                  className="inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-buttonHover dark:hover:text-white transition-colors duration-300"
                >
                  <FaHeadset className="w-6 h-6 mr-3" />
                  Accessories
                </a>
              </li>
            </ul>
            <div className="lg:col-span-12"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
