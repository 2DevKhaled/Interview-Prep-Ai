import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { LoaderIcon } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
function CreateSessionForm() {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFoucs: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFoucs, description } = formData;
    if (!role || !experience || !topicsToFoucs) {
      setError("Please Fill all the required fields.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      // Call AI API to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFoucs,
          numberOfQuestions: 10,
        }
      );
      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });
      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center bg-bg rounded-lg shadow-xl shadow-black/20">
      <h3 className="text-lg font-semibold text-text">
        Start a New Interview Journey
      </h3>
      <p className="text-xs text-text-muted mt-[5px] mb-3">
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-4">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label={"Target Role"}
          placeholder={"e.g., Frontend Developer, UI/UX Designer, etc."}
          type={"text"}
        />
        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label={"Years of Experience"}
          placeholder={"e.g., 1 Year, 2 Years, 5+ Years, etc."}
          type={"number"}
        />
        <Input
          value={formData.topicsToFoucs}
          onChange={({ target }) => handleChange("topicsToFoucs", target.value)}
          label={"Topics To Focus On"}
          placeholder={"e.g., React, Python, Node.js, etc."}
          type={"text"}
        />
        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label={"Description"}
          placeholder={"Any specific goals or notes for this session"}
          type={"text"}
        />

        {error && <p className="text-danger text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover flex justify-center items-center w-full h-11 text-white rounded-md cursor-pointer hover:bg-primary-dark transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? <LoaderIcon /> : "Create Session"}
        </button>
      </form>
    </div>
  );
}

export default CreateSessionForm;
