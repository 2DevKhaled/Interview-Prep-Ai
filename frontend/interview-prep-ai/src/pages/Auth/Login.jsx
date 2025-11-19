import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

function Login({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form
  const handleLogin = async (e) => {
    e.preventDefault();

    // تحقق من الإيميل
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return; // أوقف التنفيذ هنا
    }

    // تحقق من الباسورد
    if (!password) {
      setError("Please enter the password");
      return; // أوقف التنفيذ هنا
    }

    // إذا ما فيه أخطاء نمسح الرسالة
    setError("");

    // LOGIN API CALL
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

 return (
  <div className="w-[90vw] md:w-[33vw] bg-surface rounded-2xl shadow-lg p-8 flex flex-col justify-center">
    <h3 className="text-xl font-semibold text-white mb-2">Welcome Back</h3>
    <p className="text-sm text-text-muted mb-6">
      Please enter your details to log in.
    </p>

    <form onSubmit={handleLogin} className="space-y-5">
      <Input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label="Email Address"
        placeholder="example@gmail.com"
        type="text"
      />

      <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label="Password"
        placeholder="Min 8 Characters"
        type="password"
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        type="submit"
        className="bg-primary hover:bg-primary-hover transition-all duration-200 w-full h-11 text-white font-medium rounded-md cursor-pointer"
      >
        LOGIN
      </button>

      <p className="text-sm text-center text-text-muted">
        Don’t have an account?{" "}
        <button
          type="button"
          className="text-primary hover:underline"
          onClick={() => setCurrentPage("signup")}
        >
          Sign Up
        </button>
      </p>
    </form>
  </div>
);

}

export default Login;
