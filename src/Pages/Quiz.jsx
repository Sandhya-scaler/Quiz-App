"use client"

import { useEffect, useState } from "react"
import { useQuiz } from "../Context/QuizContext"
import { useNavigate } from "react-router-dom"

function Quiz() {
  const { category, difficulty, score, setScore, questions, setQuestions, backgroundImage, currentTheme } = useQuiz()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(15) // 15 seconds per question
  const [currentOptions, setCurrentOptions] = useState([])
  const navigate = useNavigate()

  // Fetch questions
  useEffect(() => {
    if (!category || !difficulty) {
      alert("Please select quiz options first.")
      navigate("/Select")
      return
    }

    const fetchQuestions = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`,
        )
        const data = await res.json()
        setQuestions(data.results)
      } catch (error) {
        console.error("Error fetching quiz data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [category, difficulty, navigate])

  // Set shuffled options when currentIndex changes or questions load
  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const currentQ = questions[currentIndex]
      const shuffledOptions = [...currentQ.incorrect_answers, currentQ.correct_answer].sort(() => Math.random() - 0.5)

      setCurrentOptions(shuffledOptions)
      // Reset timer when moving to next question
      setTimeLeft(15)
    }
  }, [currentIndex, questions])

  // Timer effect
  useEffect(() => {
    if (loading || questions.length === 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Time's up, move to next question
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentIndex, loading, questions.length])

  const handleTimeUp = () => {
    const next = currentIndex + 1
    if (next < questions.length) {
      setCurrentIndex(next)
    } else {
      navigate("/result")
    }
  }

  // Calculate timer color and width
  const getTimerColor = () => {
    if (timeLeft > 10) return "bg-green-500"
    if (timeLeft > 5) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getTimerWidth = () => {
    return `${(timeLeft / 15) * 100}%`
  }

  // Calculate progress percentage
  const getProgressPercentage = () => {
    return `${(currentIndex / questions.length) * 100}%`
  }

  // Dynamic background styles
  const getBackgroundStyle = () => {
    if (!backgroundImage) {
      return {
        background: `linear-gradient(to bottom right, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
      }
    }

    return {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }
  }

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center transition-all duration-1000 ease-in-out"
        style={getBackgroundStyle()}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <p
          className={`text-white text-center mt-10 ${currentTheme.cardBackground} bg-opacity-80 p-6 rounded-xl relative z-10`}
        >
          Loading quiz... 🌀
        </p>
      </div>
    )

  if (questions.length === 0)
    return (
      <div
        className="min-h-screen flex items-center justify-center transition-all duration-1000 ease-in-out"
        style={getBackgroundStyle()}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <p
          className={`text-white text-center mt-10 ${currentTheme.cardBackground} bg-opacity-80 p-6 rounded-xl relative z-10`}
        >
          No questions found.
        </p>
      </div>
    )

  const currentQ = questions[currentIndex]

  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQ.correct_answer
    const newScore = isCorrect ? score + 1 : score
    setScore(newScore)

    const next = currentIndex + 1
    if (next < questions.length) {
      setCurrentIndex(next)
    } else {
      navigate("/result")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 transition-all duration-1000 ease-in-out"
      style={getBackgroundStyle()}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div
        className={`${currentTheme.cardBackground} bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-xl space-y-6 ${currentTheme.borderColor} transition-transform duration-300 hover:scale-[1.01] relative z-10`}
      >
        {/* Progress Bar */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xs text-white font-medium">Progress:</span>
          <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: getProgressPercentage(), backgroundColor: currentTheme.primaryColor }}
            ></div>
          </div>
          <span className="text-xs text-white font-medium">
            {currentIndex}/{questions.length}
          </span>
        </div>

        {/* Timer Bar */}
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full ${getTimerColor()} transition-all duration-1000 ease-linear`}
            style={{ width: getTimerWidth() }}
          ></div>
        </div>

        {/* Timer Display */}
        <div className="text-center text-white font-bold">Time Left: {timeLeft}s</div>

        <h2 className="text-2xl font-bold text-white text-center">
          Question {currentIndex + 1} of {questions.length}
        </h2>
        <p className="text-lg text-white mb-4 text-center" dangerouslySetInnerHTML={{ __html: currentQ.question }} />
        <div className="space-y-4">
          {currentOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full py-3 px-6 rounded-xl text-white hover:scale-105 transition-all duration-300 ease-in-out ${currentTheme.borderColor} hover:border-white shadow-md hover:shadow-xl`}
              style={{
                background: `linear-gradient(to right, ${currentTheme.primaryColor}88, ${currentTheme.secondaryColor}88)`,
                borderColor: currentTheme.borderColor,
              }}
              dangerouslySetInnerHTML={{ __html: option }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Quiz