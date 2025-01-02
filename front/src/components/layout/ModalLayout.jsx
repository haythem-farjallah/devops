import React from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../../contexts/ModalContext";

const ModalLayout = () => {
  let { modalContent, handleModal, modal } = React.useContext(ModalContext);
  if (modal) {
    return (
      <div
        className="fixed top-0 left-0 inset-0 z-50 flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.8)" }}>
        <div className="bg-primary relative p-5 shadow-lg rounded flex flex-col items-start text-lg focus:outline-none focus:text-gray-300 text-gray-800">
          <button
            className="absolute top-1 right-1  font-bold self-end rounded-full  mb-3 bg-primary shadow-md hover:shadow-xl text-3xl w-10 h-10"
            onClick={() => handleModal()}>
            &times;
          </button>
          {modalContent}
        </div>
      </div>
    );
  } else return null;
};

export default ModalLayout;
