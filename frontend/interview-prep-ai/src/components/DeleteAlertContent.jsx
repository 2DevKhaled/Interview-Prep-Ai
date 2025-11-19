import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
  <div className="p-5 bg-surface rounded-lg shadow-md">
  <p className="text-sm text-text-muted">{content}</p>
  <div className="flex justify-end mt-6">
    <button
      type="button"
      className="bg-primary hover:bg-primary-hover text-white font-medium px-4 py-2 rounded-lg hover:from-sky-500/90 hover:to-blue-600/90 transition cursor-pointer"
      onClick={onDelete}
    >
      Delete
    </button>
  </div>
</div>

  );
};

export default DeleteAlertContent;
