import React from "react";
import { useEffect, useState } from "react";

import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faClone,
  faTrashCan,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useTransactions } from "../../context/TransactionsContext";
import { useModal } from "../../context/ModalContext";

export default function TransacOptions({ selectedTransact }) {
  const [deleteSelected, setDeleteSelected] = useState();
  const { closeModal } = useModal();

  const { deleteTransaction } = useTransactions();

  const options = [
    { id: "edit", label: "Editar", icon: faEdit },
    {
      id: "duplicate",
      label: "Duplicar",
      icon: faClone,
    },
    {
      id: "delete",
      label: "Eliminar",
      icon: faTrashCan,
    },
  ];

  function handleDeletion() {
    deleteTransaction(selectedTransact.id);
    setDeleteSelected(false);
    closeModal();
  }

  function handleAction(id) {
    switch (id) {
      case "edit":
        //
        break;
      case "duplicate":
        //
        break;

      case "delete":
        setDeleteSelected(true);
        break;
    }
  }

  return (
    <motion.dialog
      open
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className={` top-1/4 left-1/8 min-w-20 w-80 rounded-2xl shadow-md flex flex-col gap-4
        md:left-1/3 md:min-w-80
        `}
    >
      <div className="bg-blue-200 font-bold flex justify-between gap-6 rounded-tl-2xl rounded-tr-2xl py-2 px-4 border-b border-blue-800">
        <h2>Que quieres hacer?</h2>
        <button onClick={closeModal}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div className="flex flex-col px-4 pb-4 gap-4">
        {options.map((opt) => {
          return (
            <div
              className={`flex gap-6 text-blue-600 font-bold ${opt.label === "Eliminar" ? "text-red-500" : ""}`}
              key={opt.id}
              onClick={() => {
                handleAction(opt.id);
              }}
            >
              <FontAwesomeIcon icon={opt.icon} />
              <button>{opt.label}</button>
            </div>
          );
        })}
      </div>
      {deleteSelected && (
        <div className="text-sm px-4 pb-2">
          <h3 className="font-bold text-gray-700">
            Estas seguro que quieres eliminar esta transaccion?
          </h3>
          <div className="flex gap-20 font-bold">
            <button onClick={() => handleDeletion()} className="text-red-600">
              Si
            </button>
            <button
              onClick={() => {
                setDeleteSelected(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
    </motion.dialog>
  );
}
