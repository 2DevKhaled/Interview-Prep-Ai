import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "motion/react";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import { LoaderIcon } from "react-hot-toast";
import { toast } from "react-hot-toast";
import DashoardLayout from "../../components/Layouts/DashoardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import AiResponsePreview from "./components/AiResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
function InterviewPrep() {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsupdateLoader] = useState(false);
  // Fetch Session Data By Session Id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data && response.data.session) {
        setSessionData(response.data && response.data.session);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );
      if (response.data) {
        console.log("AI response:", response.data);
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation, Try again later");
      console.error("Erorr", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      console.log(response);
      if (response.data && response.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  // Add more questions to a session
  const uploadMoreQuestions = async () => {
    try {
      setIsupdateLoader(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFoucs: sessionData?.topicsToFoucs,
          numberOfQuestions: 3,
        }
      );
      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );
      if (response.data) {
        toast.success("Added More Q&A!!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log(
        "❌ UploadMore Error:",
        error.response?.data || error.message
      );
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Please try again");
      }
    } finally {
      setIsupdateLoader(false);
    }
  };
  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => {};
  }, []);
  return (
  <DashoardLayout>
    {/* Header */}
    <RoleInfoHeader
      role={sessionData?.role || ""}
      topicsToFoucs={sessionData?.topicsToFoucs || ""}
      questions={sessionData?.questions?.length || ""}
      experience={sessionData?.experience}
      description={sessionData?.description}
      lastUpdated={
        sessionData?.updatedAt
          ? moment(sessionData.updatedAt).format("Do MMM YYYY")
          : ""
      }
    />

    {/* Main Content */}
    <div className="container mx-auto pt-4 pb-4 px-4 md:px-0 bg-bg min-h-screen">
      <h2 className="text-lg font-semibold text-text">Interview Q & A</h2>

      <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
        <div
          className={`col-span-12 ${
            openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
          }`}
        >
          <AnimatePresence>
            {sessionData?.questions.map((data, index) => (
              <motion.div
                key={data._id || index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 100,
                  delay: index * 0.1,
                  damping: 15,
                }}
                layout
                layoutId={`question-${data._id || index}`}
              >
                <QuestionCard
                  question={data?.question}
                  answer={data?.answer}
                  isPinned={data?.isPinned}
                  onLearnMore={() => generateConceptExplanation(data.question)}
                  onTogglePin={() => toggleQuestionPinStatus(data._id)}
                />
                {!isLoading &&
                  sessionData?.questions?.length === index + 1 && (
                    <div className="flex items-center justify-center mt-5">
                      <button
                        disabled={isLoading || isUpdateLoader}
                        onClick={uploadMoreQuestions}
                        className="flex items-center gap-3 text-sm font-medium text-text bg-primary/80 hover:bg-primary px-5 py-2 rounded shadow-md transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isUpdateLoader ? (
                          <LoaderIcon className="text-lg text-text" />
                        ) : (
                          <LuListCollapse className="text-lg text-text" />
                        )}
                        Load More
                      </button>
                    </div>
                  )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        isOpen={openLearnMoreDrawer}
        onClose={() => setOpenLearnMoreDrawer(false)}
        title={!isLoading && explanation?.title}
      >
        {errorMsg && (
          <p className="flex gap-2 text-sm text-danger font-medium">
            <LuCircleAlert className="mt-1" />
            {errorMsg}
          </p>
        )}
        {isLoading && <SkeletonLoader />}
        {!isLoading && explanation && (
          <AiResponsePreview content={explanation?.explanation} />
        )}
      </Drawer>
    </div>
  </DashoardLayout>
);

}

export default InterviewPrep;
