"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice"; // 
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {

  const sidebar = useRef(null);
  const [SideBaropen, setSideBaropen] = useState(false);
  const { user } = useSelector((state) => state.auth); // Access user data from Redux store
  console.log("User from Redux in Navbar:", user); // Log the user data for debugging
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSidebar = () => {
    // console.log("hamburger clicked");
    setSideBaropen(!SideBaropen);
    if (SideBaropen) {
      sidebar.current.classList.remove("hidden");
    } else {
      sidebar.current.classList.add("hidden");
    }
  };


  const handleLogout = async () => {
    try {
      // Send logout request to the backend to clear the cookie
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
  
      dispatch(logout()); // Clear user data from Redux store
      // Redirect to sign-in page
      router.push("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="w-screen sticky top-0 z-50">
      <nav className="bg-gray-800 p-2 shadow-black/30 shadow-xl w-full">
        <div className="md:px-12 px-4 flex justify-between items-center">
          <div className="text-white text-lg font-bold">Logo</div>
          <div className="hidden md:flex gap-10 space-x-4">
            <Link href="/" className="text-white">
              Home
            </Link>
            <Link href="/about" className="text-white">
              About
            </Link>
            <Link href="/services" className="text-white">
              Services
            </Link>
            <Link href="/contact" className="text-white">
              Contact
            </Link>
            
            {user ? (
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>

            ) : (
              <Link href="/signin" className="text-white">
                Sign In
              </Link>
            )}
          </div>

          <div
            className="md:hidden block cursor-pointer"
            onClick={handleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="26px"
              viewBox="0 0 50 50"
            >
              <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
            </svg>
          </div>
        </div>
      </nav>

      <div
        className="md:hidden fixed right-0 hidden z-10 w-2/3 shadow-[0px_8px_10px_5px_#493d3d]"
        ref={sidebar}
      >
        <div className="flex flex-col items-start py-20 z-20 gap-10 text-xl bg-black bg-opacity-80 p-4 text-center h-screen">
          <Link href="/" onClick={handleSidebar} className="text-white">
            Home
          </Link>
          <Link href="/about" onClick={handleSidebar} className="text-white">
            About
          </Link>
          <Link href="/services" onClick={handleSidebar} className="text-white">
            Services
          </Link>
          <Link href="/contact" onClick={handleSidebar} className="text-white">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
