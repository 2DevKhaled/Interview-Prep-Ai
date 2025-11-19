import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";
const SummaryCard = ({
  role,
  topicsToFoucs,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className="bg-surface border border-border rounded-xl p-5 shadow-md hover:shadow-blue-500/30 cursor-pointer relative group transition"
    >
      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 w-12 h-12 bg-surface-light rounded-md flex items-center justify-center mr-4 shadow-inner">
          <span className="text-lg font-semibold text-sky-400">
            {getInitials(role)}
          </span>
        </div>
        <div className="flex-grow">
          <h2 className="text-[17px] font-medium text-sky-400">{role}</h2>
          <p className="text-xs text-text-muted">{topicsToFoucs}</p>
        </div>
      </div>

      <button
        className="hidden group-hover:flex bg-surface items-center gap-2 text-red-500 font-medium bg-red-50 px-3 py-1 rounded-full border border-primary  absolute top-3 right-3 transition cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <LuTrash2 />
      </button>

      <div className="flex flex-wrap gap-2 mt-2">
        <span className="text-xs font-semibold text-text px-3 py-1 border border-border rounded-full">
          Experience: {experience} {experience === 1 ? "Year" : "Years"}
        </span>
        <span className="text-xs font-semibold text-text px-3 py-1 border border-border rounded-full">
          Last Updated: {lastUpdated}
        </span>
      </div>

      <p className="text-text-muted text-sm mt-3 line-clamp-2">{description}</p>
    </div>
  );
};
export default SummaryCard;
