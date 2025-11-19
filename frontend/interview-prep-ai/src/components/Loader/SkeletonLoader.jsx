import React from "react";
import { ImSpinner2 } from "react-icons/im";

export default function SkeletonLoader({ size = 24 }) {
return (
  <div className="space-y-6">
    <div role="status" className="animate-pulse space-y-4 max-w-3xl">
      <div className="h-4 bg-sky-800/40 rounded-md w-1/2"></div>
      <div className="space-y-2">
        <div className="h-3 rounded bg-sky-800/30 w-full"></div>
        <div className="h-3 rounded bg-sky-800/30 w-11/12"></div>
        <div className="h-3 rounded bg-sky-800/30 w-10/12"></div>
        <div className="h-3 rounded bg-sky-800/30 w-9/12"></div>
      </div>
      <div className="bg-sky-900/20 rounded p-4 space-y-2">
        <div className="h-2.5 bg-sky-800/40 rounded w-3/4"></div>
        <div className="h-2.5 bg-sky-800/40 rounded w-2/3"></div>
        <div className="h-2.5 bg-sky-800/40 rounded w-1/2"></div>
      </div>
    </div>

    <div role="status" className="animate-pulse space-y-4 max-w-3xl">
      <div className="h-6 bg-sky-800/40 rounded-md w-1/2"></div>
      <div className="space-y-2">
        <div className="h-3 rounded bg-sky-800/30 w-full"></div>
        <div className="h-3 rounded bg-sky-800/30 w-11/12"></div>
        <div className="h-3 rounded bg-sky-800/30 w-10/12"></div>
        <div className="h-3 rounded bg-sky-800/30 w-9/12"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 rounded bg-sky-800/30 w-full"></div>
        <div className="h-3 rounded bg-sky-800/30 w-11/12"></div>
        <div className="h-3 rounded bg-sky-800/30 w-10/12"></div>
        <div className="h-3 rounded bg-sky-800/30 w-9/12"></div>
      </div>
      <div className="h-6 bg-sky-800/40 rounded-md w-1/2"></div>
      <div className="space-y-2">
        <div className="h-3 rounded bg-sky-800/30 w-full"></div>
        <div className="h-3 rounded bg-sky-800/30 w-11/12"></div>
        <div className="h-3 rounded bg-sky-800/30 w-10/12"></div>
        <div className="h-3 rounded bg-sky-800/30 w-9/12"></div>
      </div>
    </div>
  </div>
);


}
