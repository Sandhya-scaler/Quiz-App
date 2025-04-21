"use client"

import { useQuiz } from "../Context/QuizContext"
import { useNavigate } from "react-router-dom"

function Home() {
  const { name, setName, currentTheme } = useQuiz()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() === "") return alert("Enter your name")
    navigate("/Select")
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-tr ${currentTheme.backgroundColor} px-4 transition-all duration-500`}
    >
      <form
        onSubmit={handleSubmit}
        className={`${currentTheme.cardBackground} bg-opacity-90 p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 ${currentTheme.borderColor} transition-transform transform hover:scale-105`}
      >
        <h1 className="text-3xl font-bold text-center text-white">🎉 Welcome to Trivia Battle!</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-opacity-50 rounded-md bg-[#0F172A] text-white focus:outline-none focus:ring-2"
          style={{ borderColor: currentTheme.primaryColor, focusRingColor: currentTheme.primaryColor }}
        />
        <button
          type="submit"
          className={`w-full bg-gradient-to-r ${currentTheme.buttonGradient} text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105`}
        >
          Start Game
        </button>
      </form>
    </div>
  )
}

export default Home