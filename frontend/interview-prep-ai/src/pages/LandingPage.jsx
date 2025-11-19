import React, { useContext, useState } from "react";
import { appFeatures } from "../utils/data";
import SignUp from "../pages/Auth/SignUp";
import Login from "../pages/Auth/Login";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { UserContext } from "../context/userContext";

function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-bg relative overflow-hidden text-white">
        {/* Background Layer */}
        <div className="w-[1500px] h-[500px] bg-gradient-to-r from-blue-700/20 via-sky-600/10 to-indigo-500/10 blur-3xl absolute top-0 left-0"></div>

        {/* Content Layer */}
        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl font-bold text-white">
              Interview Prep AI
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-blue-600 to-sky-500 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-gray-800 hover:text-white border border-gray-700 transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero */}
          <div>
            <div className="inline-block px-3 py-1 text-sm font-semibold text-sky-400 bg-blue-900/20 rounded-full border border-blue-600 mb-4">
              AI Powered
            </div>

            <h1 className="text-5xl font-bold leading-tight text-white mb-4">
              Ace Interviews with <br />
              <span className="text-sky-400">AI-Powered</span> Learning
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mb-6">
              Get role-specific questions, expand answers when you need them,
              dive deeper into concepts, and organize everything your way. From
              preparation to mastery – your ultimate toolkit is here.
            </p>
            <button
              onClick={handleCTA}
              className="h-12 md:h-12 w-fit flex items-center justify-center gap-3 
           bg-sky-400
             text-sm font-semibold text-white px-7 py-2.5 rounded-lg 
    
             transition-colors cursor-pointer hover:shadow-blue-300"
            >
              Get Started
            </button>
          </div>

          {/* Features Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {appFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="bg-surface border border-border rounded-xl p-5 shadow-md hover:shadow-blue-500/30 transition"
              >
                <h3 className="text-sky-400 font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
}

export default LandingPage;
