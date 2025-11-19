import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper"; // عشان تتحقق من الإيميل
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
function SignUp({ setCurrentPage }) {
  const [profilePic, setProfilePic] = useState(null);
  const { updateUser } = useContext(UserContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    // التحقق من الحقول
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // مسح رسالة الخطأ
    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

return (
  <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center bg-bg rounded-lg shadow-xl shadow-black/20">
    <h3 className="text-xl font-semibold text-text mb-2">Create an Account</h3>
    <p className="text-sm text-text-muted mb-6">
      Join us today by entering your details below.
    </p>

    <form onSubmit={handleSignUp} className="space-y-5">
      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

      <Input
        value={fullName}
        onChange={({ target }) => setFullName(target.value)}
        label="Full Name"
        placeholder="Khaled Alsaeedi"
        type="text"
      />

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

      {error && <p className="text-danger text-xs">{error}</p>}

      <button
        type="submit"
        className="bg-primary hover:bg-primary-hover transition-all duration-200 w-full h-11 text-white font-medium rounded-md cursor-pointer"
      >
        SIGN UP
      </button>

      <p className="text-sm text-center text-text-muted">
        Already have an account?{" "}
        <button
          type="button"
          className="text-primary hover:underline"
          onClick={() => setCurrentPage('login')}
        >
          Login
        </button>
      </p>
    </form>
  </div>
);

}

export default SignUp;
