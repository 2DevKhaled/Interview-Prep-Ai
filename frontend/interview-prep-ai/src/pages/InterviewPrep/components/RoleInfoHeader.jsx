import React from "react";

function RoleInfoHeader({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) {
  return (
    <div className="bg-bg relative py-6">
      <div className="container mx-auto px-10 md:px-0">
        <div className="w-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-text">{role}</h2>
                  <p className="text-sm font-medium text-text-muted mt-1">
                    {topicsToFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Experience: {experience} {experience === 1 ? "Year" : "Years"}
            </span>
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {questions} Q&A
            </span>
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Last Update: {lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleInfoHeader;
