import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

const OVERLAY_MAP = {
  addCategory: "addTransaction",
  addAccount: "addTransaction",
};

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null);
  const [nestedModal, setNestedModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  function openModal(name, data = null) {
    if (data) setModalData(data);

    if (OVERLAY_MAP[name] && activeModal === OVERLAY_MAP[name]) {
      setNestedModal(name);
    } else {
      setNestedModal(null);
      setActiveModal(name);
    }
  }

  function closeModal() {
    if (nestedModal) {
      setNestedModal(null);
    } else {
      setActiveModal(null);
      setModalData(null);
    }
  }

  function toggleModal(name, data = null) {
    if (name === nestedModal) {
      setNestedModal(null);
      return;
    }

    if (name === activeModal) {
      setActiveModal(null);
      setNestedModal(null);
      setModalData(null);
      return;
    }

    openModal(name, data);
  }

  function isModalActive(name) {
    return name === activeModal || name === nestedModal;
  }

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        nestedModal,
        modalData,
        openModal,
        toggleModal,
        closeModal,
        isModalActive,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
