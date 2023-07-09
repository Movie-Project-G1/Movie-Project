/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

import { FiUsers } from "react-icons/fi";

import { LiaCommentSolid } from "react-icons/lia";
import { BiLogoBlogger } from "react-icons/bi";
import { RxPinBottom } from "react-icons/rx";

export const Aside = () => {
  return (
    <aside className="fixed top-0 z-50 w-60  h-screen pt-[65px] pb-1 transition-transform -translate-x-full  md:translate-x-0">
      <div className="overflow-y-auto py-5 px-3 h-full bg-[#222] ">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <FiUsers />
              users
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <BiLogoBlogger />
              Posts
            </Link>
          </li>
          <li>
            <Link
              to="/comment"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <LiaCommentSolid />
              Comments
            </Link>
          </li>

          <li>
            <Link
              to="/request"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <RxPinBottom />
              Requests
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
