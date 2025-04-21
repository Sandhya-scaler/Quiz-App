import { useNavigate } from "react-router-dom"
import { useQuiz } from "../Context/QuizContext"
import { useEffect } from "react"

import gk from "../assets/gk.jpg"

function SelectMode() {
  const { category, setCategory, difficulty, setDifficulty, updateBackground, backgroundImage, currentTheme } =
    useQuiz()

  const navigate = useNavigate()

  // Update background when category changes
  useEffect(() => {
    if (category) {
      updateBackground(category)
    }
  }, [category, updateBackground])

  const handleStart = (e) => {
    e.preventDefault()
    if (!category || !difficulty) {
      return alert("Please select both category and difficulty!")
    }
    navigate("/quiz")
  }

  // Dynamic background styles
  const getBackgroundStyle = () => {
    if (!backgroundImage) {
      return {
        background: `linear-gradient(to bottom right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
      }
    }

    return {
      backgroundImage: `${backgroundImage}`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 transition-all duration-1000 ease-in-out"
      style={getBackgroundStyle()}
    >
        <img src={getBackgroundStyle().backgroundImage} alt="" />
        {console.log(getBackgroundStyle())}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <form
        onSubmit={handleStart}
        className={`${currentTheme.cardBackground} bg-opacity-90 p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 ${currentTheme.borderColor} transition-transform transform hover:scale-105 relative z-10`}
      >
        <h2 className="text-3xl font-bold text-center text-white">🎯 Choose Your Quiz</h2>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-300">Category</label>
          <select
            className={`w-full p-3 ${currentTheme.borderColor} rounded-md bg-[#0F172A] text-white focus:outline-none focus:ring-2`}
            style={{ focusRingColor: currentTheme.primaryColor }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="default">-- Select Category --</option>
            <option value="9">General Knowledge</option>
            <option value="18">Science: Computers</option>
            <option value="23">History</option>
            <option value="21">Sports</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-300">Difficulty</label>
          <select
            className={`w-full p-3 ${currentTheme.borderColor} rounded-md bg-[#0F172A] text-white focus:outline-none focus:ring-2`}
            style={{ focusRingColor: currentTheme.primaryColor }}
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
          className={`w-full bg-gradient-to-r ${currentTheme.buttonGradient} text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105`}
        >
          Start Quiz!
        </button>
      </form>
    </div>
  )
}

export default SelectMode