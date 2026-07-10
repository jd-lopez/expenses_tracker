import React from "react";
import Dashboard from "../../features/Dashboard/Dashboard";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileInvoice,
  faChartLine,
  faMoneyCheckDollar,
  faGear,
  faCircleQuestion,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ isOpen, setIsOpen, toggleSidebar }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <section
      popoverTarget="my-popover"
      className={`hidden md:block md:h-full border-r bg-background border-r-sky-300 shadow-lg transition-all duration-300 ${isOpen ? "w-52 p-4" : "w-28 p-2"}`}
      onMouseEnter={(e) => {
        toggleSidebar();
      }}
      onMouseLeave={toggleSidebar}
    >
      <aside className="flex flex-row md:flex-col justify-between  items-center h-full gap-4">
        <ul className="flex md:flex-col gap-4">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-6 py-1 flex gap-2  items-center ${isActive && isOpen ? "bg-blue-600 rounded-md text-white" : "bg-background text-blue-600"}`
              }
            >
              {({ isActive }) => (
                <>
                  <FontAwesomeIcon
                    icon={faHome}
                    className={`transition-all duration-200 ${isOpen ? "text-xl" : isActive ? "text-xl text-white px-3 py-1 rounded-md  bg-blue-600" : "text-2xl px-3"}`}
                  />
                  <span
                    className={` transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}
                  >
                    Dashboard
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `px-6 py-1 flex gap-2  items-center ${isActive && isOpen ? "bg-blue-600 rounded-md text-white" : "bg-background text-blue-600"}`
              }
            >
              {({ isActive }) => (
                <>
                  <FontAwesomeIcon
                    icon={faFileInvoice}
                    className={`transition-all duration-200 ${isOpen ? "text-xl" : isActive ? "text-xl text-white px-3 py-1 rounded-md  bg-blue-600" : "text-2xl px-3"}`}
                  />
                  <span
                    className={` transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}
                  >
                    Transactions
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-6 py-1 flex gap-2  items-center ${isActive && isOpen ? "bg-blue-600 rounded-md text-white" : "bg-background text-blue-600"}`
              }
            >
              {({ isActive }) => (
                <>
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className={`transition-all duration-200 ${isOpen ? "text-xl" : isActive ? "text-xl text-white px-3 py-1 rounded-md  bg-blue-600" : "text-2xl px-3"}`}
                  />
                  <span
                    className={` transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}
                  >
                    Analytics
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accounts"
              className={({ isActive }) =>
                `px-6 py-1 flex gap-2  items-center ${isActive && isOpen ? "bg-blue-600 rounded-md text-white" : "bg-background text-blue-600"}`
              }
            >
              {({ isActive }) => (
                <>
                  <FontAwesomeIcon
                    icon={faMoneyCheckDollar}
                    className={`transition-all duration-200 ${isOpen ? "text-xl" : isActive ? "text-xl text-white px-3 py-1 rounded-md  bg-blue-600" : "text-2xl px-3"}`}
                  />
                  <span
                    className={` transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}
                  >
                    Accounts
                  </span>
                </>
              )}
            </NavLink>
          </li>

          <li className="">
            <NavLink
              to=""
              className={({ isActive }) =>
                `px-6 py-1 flex gap-2  items-center ${isActive && isOpen ? "bg-blue-600 rounded-md text-white" : "bg-background text-blue-600"}`
              }
            >
              {({ isActive }) => (
                <>
                  <FontAwesomeIcon
                    icon={faGear}
                    className={`transition-all duration-200 ${isOpen ? "text-xl" : isActive ? "text-xl text-white px-3 py-1 rounded-md  bg-blue-600" : "text-2xl px-3 "}`}
                  />
                  <span
                    className={` transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}
                  >
                    Settings
                  </span>
                </>
              )}
            </NavLink>
          </li>
        </ul>

        <div className="hidden md:flex flex-col gap-2">
          <button className={`flex gap-2`}>
            <FontAwesomeIcon icon={faCircleQuestion} className="sideIcon" />
            <span
              className={` transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}
            >
              Help
            </span>
          </button>
          <button onClick={handleLogout} className={`flex gap-2`}>
            <FontAwesomeIcon icon={faSignOut} className="sideIcon" />
            <span
              className={` transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}
            >
              Log out
            </span>
          </button>
        </div>
      </aside>
    </section>
  );
}
