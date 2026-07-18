import React from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faArrowRightArrowLeft,
  faCreditCard,
  faCircleQuestion,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../context/ModalContext";

const menuItems = [
  {
    id: "trans",
    label: "Agregar Trasaccion",
    icon: faChartLine,
    action: "addTransaction",
  },
  {
    id: "account",
    label: "Agregar Cuenta",
    icon: faArrowRightArrowLeft,
    action: "addAccount",
  },
  { id: "o", label: "Subscriptions", icon: faCreditCard },
  { id: "y", label: "Ayuda", icon: faCircleQuestion },
  { id: "t", label: "Contactanos", icon: faPhone },
];

export default function MobileActionsModal() {
  const { openModal } = useModal();

  return (
    <motion.dialog
      open
      initial={{ opacity: 0, scale: 0, y: 550 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0, y: 550 }}
      transition={{ duration: 0.5 }}
      className="absolute top-1/10 left-10 bg-inherit w-4/5 py-4"
    >
      <h1 className="text-2xl font-bold text-slate-900 mb-8">
        ¿Que mas quieres hacer?
      </h1>
      <ul className="grid grid-cols-2 gap-4 mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action ? () => openModal(item.action) : undefined}
            className="flex flex-col items-center justify-center p-4 h-24 bg-white/80 text-black backdrop-blur-md border border-white/20 rounded-lg transition-all duration-300 transform shadow-lg"
          >
            <FontAwesomeIcon icon={item.icon} className=" text-2xl mb-2" />
            <span className=" text-sm font-semibold text-center">
              {item.label}
            </span>
          </button>
        ))}
      </ul>
    </motion.dialog>
  );
}
