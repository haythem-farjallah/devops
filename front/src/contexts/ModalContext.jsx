import React from "react";
import { useModal } from "../hooks/useModal";
import ModalLayout from "../components/layout/ModalLayout";

const ModalContext = React.createContext();

let ModalProvider = ({ children }) => {
  let { modal, handleModal, modalContent } = useModal();
  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
      <ModalLayout />
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
