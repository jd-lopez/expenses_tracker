import React from "react";
import Dashboard from "../../features/transactions/pages/Dashboard";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ isOpen, setIsOpen, toggleSidebar }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <section
      className={`hidden md:block md:h-screen border-r border-r-sky-300 shadow-lg ${isOpen ? "w-52 - p-4" : "w-24"}`}
      onMouseEnter={(e) => {
        toggleSidebar();
      }}
      onMouseLeave={toggleSidebar}
    >
      <aside className="flex flex-row md:flex-col justify-between h-full">
        <h1 className="hidden md:block">FinTrack</h1>

        <ul className="flex md:flex-col flex-1">
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={"/transactions"}>Transactions</NavLink>
          </li>
          <li>
            <NavLink>Analytics</NavLink>
          </li>
          <li>
            <NavLink to="/accounts">Accounts</NavLink>
          </li>
          <li>
            <NavLink>Subscriptions</NavLink>
          </li>
          <li>
            <NavLink>Settings</NavLink>
          </li>
        </ul>

        <div className="hidden md:flex flex-col">
          <button>Help</button>
          <button onClick={handleLogout}>Logut</button>
        </div>
      </aside>
    </section>
  );
}
