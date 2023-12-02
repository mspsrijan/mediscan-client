import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSun,
  HiMoon,
  HiUser,
  HiMiniXMark,
  HiMiniBars3CenterLeft,
} from "react-icons/hi2";
import MediScanLogo from "../assets/mediscan-logo.png";
import MediScanLogoWhite from "../assets/mediscan-logo-white.png";

const Header = () => {
  const isDarkModePreferred =
    JSON.parse(localStorage.getItem("darkMode")) ??
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(isDarkModePreferred);

  const toggleMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut().then().catch();
  };

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  const navLinks = (
    <>
      <li>
        <Link
          to="/"
          onClick={closeMobileNav}
          className="pb-1 border-b-2 border-transparent hover:border-msBlue dark:hover:border-slate-600"
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          to="/all-tests"
          onClick={closeMobileNav}
          className="pb-1 border-b-2 border-transparent hover:border-msBlue dark:hover:border-slate-600"
        >
          All Tests
        </Link>
      </li>

      <li>
        <Link
          to="/blogs"
          onClick={closeMobileNav}
          className="pb-1 border-b-2 border-transparent hover:border-msBlue dark:hover:border-slate-600"
        >
          Blogs
        </Link>
      </li>
    </>
  );

  const menuAnimation = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  return (
    <header className="max-w-screen-xl mx-auto py-4 px-4 relative z-10">
      <div className="flex items-center justify-between gap-4">
        <Link to="/">
          <img
            src={darkMode ? MediScanLogoWhite : MediScanLogo}
            alt="MediScan"
            className="w-40 md:w-48"
          />
        </Link>
        <div className="flex items-center gap-4 divide-x-0 md:divide-x-2 divide-slate-100 dark:divide-slate-700">
          <nav>
            <ul className="hidden md:flex gap-8 font-medium">{navLinks}</ul>
          </nav>
          <div className="flex items-center gap-2 pl-4">
            {user ? (
              <div className="group relative">
                <div className="flex gap-2">
                  <div>
                    <label
                      onMouseEnter={() => {
                        setDropdownOpen(true);
                      }}
                    >
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt=""
                          className="w-[32px] h-[32px] rounded-full group-hover:opacity-100 transition-opacity"
                        />
                      ) : (
                        <button className="bg-slate-50 hover:bg-slate-100 duration-300 p-2.5 rounded-full dark:bg-slate-700 dark:hover:bg-slate-600 ">
                          <HiUser />
                        </button>
                      )}
                    </label>
                    {dropdownOpen && (
                      <ul className="absolute z-2 right-0 mt-2 p-4 w-52 border border-slate-100 bg-white rounded-xl shadow-sm dark:bg-slate-800 dark:border-slate-800 space-y-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <li className="p-2.5 text-center font-medium">
                          {user.displayName}
                          <hr className="m-2" />
                        </li>
                        <li></li>
                        <li>
                          <Link
                            to="/dashboard"
                            onClick={closeDropdown}
                            className="hover:text-msBlue dark:hover:text-slate-200"
                          >
                            Dashboard
                          </Link>
                        </li>

                        <li>
                          <Link
                            onClick={handleSignOut}
                            className="hover:text-msBlue dark:hover:text-slate-200"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Link to="/login" className="btn btn-sm btn-outline">
                  Login
                </Link>
              </div>
            )}
            <button
              onClick={toggleMode}
              className="bg-slate-50 hover:bg-slate-100 duration-300 p-2.5 rounded-full dark:bg-slate-700 dark:hover:bg-slate-600"
            >
              {darkMode ? <HiSun /> : <HiMoon />}
            </button>
            <button
              onClick={toggleMobileNav}
              className="md:hidden text-xl bg-slate-50 hover:bg-slate-100 duration-300 p-2 rounded-full dark:bg-slate-700 dark:hover:bg-slate-600"
            >
              <HiMiniBars3CenterLeft />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            className="md:hidden fixed inset-y-0 left-0 w-64 bg-slate-100 dark:bg-slate-800"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuAnimation}
          >
            <div className="flex justify-end p-4 ">
              <button
                onClick={closeMobileNav}
                className="text-xl bg-slate-50 hover:bg-slate-100 duration-300 p-2 rounded-full dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                <HiMiniXMark />
              </button>
            </div>
            <nav className="text-center">
              <ul className="flex flex-col items-center gap-4">{navLinks}</ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
