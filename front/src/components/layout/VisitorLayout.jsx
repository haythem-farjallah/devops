import React from "react";
import logo from "../../assets/logo2.png";
import { Link } from "react-router-dom";
function VisitorLayout({ children }) {
  return (
    <main className="h-screen overflow-hidden w-full banner pt-4">
      <nav class="flex items-center max-w-screen-xl mx-auto px-6 py-3 ">
        <Link to="/" class="flex flex-grow">
          <img class="w-36 cursor-pointer" src={logo} alt="logo" />
        </Link>
        <div class="flex items-center justify-end space-x-6">
          <Link to={"/login"} class="poppins">
            Sign In
          </Link>
          <Link
            to="/register"
            class=" bg-red-400 px-6 py-3 text-white poppins rounded-full bg-red-400 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105">
            Sign Up
          </Link>
        </div>
      </nav>
      <div className="flex flex-col items-center ">{children}</div>
    </main>
  );
}

export default VisitorLayout;
