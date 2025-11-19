import React from "react";
import { IoClose } from "react-icons/io5";

const Drawer = ({ isOpen, onClose, title, children }) => {
return (
  <div
    className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] p-4 overflow-y-auto transition-transform bg-surface w-full md:w-[40vw] shadow-2xl shadow-sky-800/10 border-l border-border ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
    tabIndex="-1"
    aria-label="drawer-right-label"
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h5
        className="flex items-center text-base font-semibold text-text"
        id="drawer-right-label"
      >
        {title}
      </h5>

      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="flex items-center justify-center w-8 h-8 rounded-full text-text-muted hover:bg-sky-200/30 hover:text-text transition"
      >
        <IoClose className="text-lg" />
      </button>
    </div>

    {/* Body Content */}
    <div className="text-sm text-text-muted">{children}</div>
  </div>
);

};

export default Drawer;
