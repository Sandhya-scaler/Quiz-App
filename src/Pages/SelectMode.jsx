import { useNavigate } from "react-router-dom";
import { useQuiz } from "../Context/QuizContext";

function SelectMode() {
  const { category, setCategory, difficulty, setDifficulty } = useQuiz();
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (!category || !difficulty) {
      return alert("Please select both category and difficulty!");
    }
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A192F] to-[#112240] px-4">
      <form
        onSubmit={handleStart}
        className="bg-[#1C2541] p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-[#324766] transition-transform transform hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-center text-white">
          🎯 Choose Your Quiz
        </h2>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-300">
            Category
          </label>
          <select
            className="w-full p-3 border border-[#324766] rounded-md bg-[#0F172A] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            <option value="9">General Knowledge</option>
            <option value="18">Science: Computers</option>
            <option value="23">History</option>
            <option value="21">Sports</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-300">
            Difficulty
          </label>
          <select
            className="w-full p-3 border border-[#324766] rounded-md bg-[#0F172A] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">-- Select Difficulty --</option>
            <option value="easy">Easy 🐣</option>
            <option value="medium">Medium 🧠</option>
            <option value="hard">Hard 🧨</option>
          </select>
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105"
        >
          Start Quiz!
        </button>
      </form>
    </div>
  );
}

export default SelectMode;
