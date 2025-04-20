import React from "react";
import { useQuiz } from "../Context/QuizContext";
import { useNavigate } from "react-router-dom";

function Result() {
  const { score, questions, name, backgroundImage } = useQuiz();
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/quiz");
  };

  const handleHome = () => {
    navigate("/");
  };

  const isPassed = score >= questions.length / 2;

  // Dynamic background styles
  const getBackgroundStyle = () => {
    if (!backgroundImage) {
      return {
        backgroundImage: "linear-gradient(to bottom right, #0A192F, #112240)",
      };
    }
    
    return {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 transition-all duration-1000 ease-in-out"
      style={getBackgroundStyle()}
    >
      <div className="bg-[#1C2541] bg-opacity-90 p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-[#324766] text-center">
        <h1 className="text-3xl font-bold text-white">
          {isPassed ? "🎉 Congratulations!" : "😞 Oops!"}
        </h1>
        <p className="text-white text-lg">
          {name ? `${name}, ` : ""}you scored{" "}
          <span className="font-bold text-green-400">{score}</span> out of 
          <span className="font-bold text-green-400"> {questions.length}</span>
        </p>
        <div className="flex flex-col space-y-4 mt-6">
          <button
            onClick={handleRestart}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105"
          >
            🔁 Restart Quiz
          </button>
          <button
            onClick={handleHome}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;