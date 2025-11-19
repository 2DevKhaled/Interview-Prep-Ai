import React from "react";
import { IoMdClose } from "react-icons/io";
function Modal({ children, isOpen, onClose, title, hideHeader }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
      <div className=" relative flex flex-col bg-surface shadow-lg rounded-lg overflow-hidden">
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 ">
            <h1 className="md:text-lg font-medium text-text">{title}</h1>
          </div>
        )}
        <button
          type="button"
          className=" flex items-center text-gray-400 bg-transparent hover:bg-bg hover:text-text rounded-lg text-sm w-8 h-8 f;ex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
          onClick={onClose}
        ><IoMdClose size={22}/>
        </button>
        <div className="flex-1 overflow-auto custom-scrollbar">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
