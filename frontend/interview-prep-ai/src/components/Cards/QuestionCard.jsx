import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AiResponsePreview from "../../pages/InterviewPrep/components/AiResponsePreview";
function QuestionCard({
  question,
  answer,
  isPinned,
  onLearnMore,
  onTogglePin,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contnetRef = useRef(null);
  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contnetRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
   <>
  <div className="bg-surface rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-black/20 border border-border group">
    <div className="flex items-center justify-between cursor-pointer">
      <div className="flex items-start gap-3.5">
        <span className="text-xs md:text-[15px] font-semibold text-text-muted leading-[18px]">
          Q
        </span>
        <h3
          className="text-xs md:text-[14px] font-medium text-text mr-0 md:mr-20"
          onClick={toggleExpand}
        >
          {question}
        </h3>
      </div>
      <div className="flex items-center justify-end ml-4 relative">
        <div className="flex">
          <button
            className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1 mr-2 rounded border border-primary/10 hover:border-primary cursor-pointer"
            onClick={onTogglePin}
          >
            {isPinned ? <LuPinOff className="text-xs" /> : <LuPin className="text-xs" />}
          </button>
          <button
            className="flex items-center bg-bg text-text gap-2 text-xs font-medium text-info bg-info/10 px-3 py-1 mr-2 rounded border border-info/10 hover:border-info cursor-pointer"
            onClick={() => onLearnMore()}
          >
            <LuSparkles />
            <span className="hidden md:block">Learn More</span>
          </button>
        </div>
        <button
          className="text-text-muted hover:text-text cursor-pointer"
          onClick={toggleExpand}
        >
          <LuChevronDown
            size={20}
            className={`transform transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>

    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: `${height}px` }}
    >
      <div
        ref={contnetRef}
        className="text-text bg-bg px-5 py-3 rounded-lg mt-4"
      >
        <AiResponsePreview content={answer} />
      </div>
    </div>
  </div>
</>

  );
}

export default QuestionCard;
