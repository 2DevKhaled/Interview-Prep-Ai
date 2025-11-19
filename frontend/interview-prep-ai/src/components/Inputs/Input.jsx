import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
function Input({ value, onChange, label, placeholder, type }) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
 return (
  <div>
    <label className="text-text-muted">{label}</label>
    <div className="flex my-4 items-center rounded-md border border-border px-4 py-2 bg-surface-light transition-all duration-200 focus-within:border-primary">
      <input
        type={
          type === "password" ? (showPassword ? "text" : "password") : type
        }
        placeholder={placeholder}
        className="w-full bg-transparent text-text outline-none placeholder:text-text-muted"
        value={value}
        onChange={(e) => onChange(e)}
      />
      {type === "password" && (
        <>
          {showPassword ? (
            <FaRegEye
              size={22}
              className="text-sky-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="text-sky-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          )}
        </>
      )}
    </div>
  </div>
);

}

export default Input;
