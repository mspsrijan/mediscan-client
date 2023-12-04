import { useContext, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { HiOutlineLogout } from "react-icons/hi";
import { HiMiniXMark, HiMoon, HiSun, HiUser } from "react-icons/hi2";
import { Link, useNavigate, NavLink } from "react-router-dom";
import MediScanLogoWhite from "../assets/mediscan-logo-white.png";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const OffCanvasMenu = ({ isOpen, onClose, darkMode, toggleMode }) => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch();
  };

  const controls = useAnimation();

  useEffect(() => {
    controls.start(isOpen ? "open" : "closed");
  }, [isOpen, controls]);

  const variants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-60 md:w-72 h-full p-4 md:p-8 bg-slate-800 text-white flex flex-col gap-8"
      animate={controls}
      variants={variants}
    >
      <button
        onClick={onClose}
        className="lg:hidden text-xl text-white p-1.5 rounded-full bg-slate-700 hover:bg-slate-600 duration-300 absolute top-2 md:top-4 right-2 md:right-4"
      >
        <HiMiniXMark />
      </button>

      <div>
        <Link to="/">
          <img
            src={MediScanLogoWhite}
            alt="MediScan"
            className="w-40 md:w-48"
          />
        </Link>
      </div>
      <div className="flex-grow">
        {isAdmin && (
          <ul className="pb-8 mb-8 border-b-[1px] border-slate-600 flex flex-col gap-3">
            <NavLink to="/dashboard/site-banners">
              <li>Site Banners</li>
            </NavLink>
            <NavLink to="/dashboard/all-users">
              <li>All Users</li>
            </NavLink>
            <NavLink to="/dashboard/add-a-test">
              <li>Add a Test</li>
            </NavLink>
            <NavLink to="/dashboard/all-tests">
              <li>All Tests</li>
            </NavLink>
            <NavLink to="/dashboard/reservations">
              <li>Reservations</li>
            </NavLink>
          </ul>
        )}
        <ul className="flex flex-col gap-3">
          <NavLink to="/dashboard/profile">
            <li>Profile</li>
          </NavLink>
          <NavLink to="/dashboard/upcoming-appointments">
            <li>Upcoming Appointments</li>
          </NavLink>
          <NavLink to="/dashboard/test-results">
            <li>Test Results</li>
          </NavLink>
        </ul>
      </div>
      <div className="flex justify-center gap-4">
        {user.photoURL ? (
          <>
            <Link to="/dashboard/profile">
              <img
                src={user.photoURL}
                alt=""
                className="w-[32px] h-[32px] rounded-full group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <button
              onClick={handleSignOut}
              className="p-2.5 rounded-full bg-slate-700 hover:bg-slate-600 duration-300"
            >
              <HiOutlineLogout />
            </button>
          </>
        ) : (
          <button className="p-2.5 rounded-full bg-slate-700 hover:bg-slate-600 duration-300">
            <HiUser />
          </button>
        )}
        <button
          onClick={toggleMode}
          className="p-2.5 rounded-full bg-slate-700 hover:bg-slate-600 duration-300"
        >
          {darkMode ? <HiSun /> : <HiMoon />}
        </button>
      </div>
    </motion.div>
  );
};

export default OffCanvasMenu;
