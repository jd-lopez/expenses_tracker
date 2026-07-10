import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faArrowRightArrowLeft,
  faCreditCard,
  faCircleQuestion,
  faPhone,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
const menuItems = [
  { label: "Analisis", icon: faChartLine, to: "#" },
  { label: "Transfers", icon: faArrowRightArrowLeft, to: "#" },
  { label: "Subscriptions", icon: faCreditCard, to: "#" },
  { label: "Ayuda", icon: faCircleQuestion, to: "#" },
  { label: "Contactanos", icon: faPhone, to: "#" },
];

export default function MobileActionsModal() {
  const { logout } = useAuth();

  return (
    <motion.dialog
      open
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-10 bg-inherit w-4/5 py-4"
    >
      <h1 className="text-2xl font-bold text-white mb-8">
        ¿Que mas quieres hacer?
      </h1>
      <ul className="grid grid-cols-2 gap-4 mt-8">
        {menuItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.to}
              className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg transition-all duration-300 transform shadow-lg"
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-white text-2xl mb-2"
              />
              <span className="text-white text-sm font-semibold text-center">
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}
        <li>
          <button
            onClick={logout}
            className="w-full flex flex-col items-center justify-center p-4 bg-white/10  backdrop-blur-md border border-white/30 rounded-lg  transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="text-white text-2xl mb-2"
            />
            <span className="text-white text-sm font-semibold">
              Cerrar sesion
            </span>
          </button>
        </li>
      </ul>
    </motion.dialog>
  );
}
