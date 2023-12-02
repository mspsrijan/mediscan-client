import { useEffect, useState } from "react";
import OffCanvasMenu from "../../components/OffCanvasMenu";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Link, Outlet } from "react-router-dom";
import MediScanLogo from "../../assets/mediscan-logo.png";
import MediScanLogoWhite from "../../assets/mediscan-logo-white.png";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) ??
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <div className="flex flex-row justify-start items-center gap-4 p-4 md:p-8">
        <button
          onClick={toggleMenu}
          className="text-xl bg-msLightBlue/20 hover:bg-msLightBlue duration-300 p-3 rounded-full dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <HiMiniBars3CenterLeft />
        </button>
        <div className="flex items-center justify-between gap-4">
          <Link to="/">
            <img
              src={darkMode ? MediScanLogoWhite : MediScanLogo}
              alt="MediScan"
              className="w-40 md:w-48"
            />
          </Link>
        </div>
      </div>
      <OffCanvasMenu
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        darkMode={darkMode}
        toggleMode={toggleMode}
      />
      <Outlet></Outlet>
    </>
  );
};

export default Dashboard;
