import { createContext, useContext, useState } from "react"
import gk from "../assets/gk.jpg"
import sportsImage from "../assets/sports.jpeg"
import technology from "../assets/technology.jpeg"
import history from "../assets/history.jpg"


// Define theme configurations for each category
const themeConfig = {
  "9": {
    // General Knowledge
    name: "general",
    primaryColor: "#f5a623",
    secondaryColor: "#f8c471",
    backgroundColor: "from-amber-100 to-amber-200",
    cardBackground: "bg-amber-100",
    buttonGradient: "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
    borderColor: "border-amber-400",
    backgroundImage: gk,
  },
  "18": {
    // Science: Computers
    name: "technology",
    primaryColor: "#3498db",
    secondaryColor: "#2980b9",
    backgroundColor: "from-blue-800 to-blue-900",
    cardBackground: "bg-blue-800",
    buttonGradient: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    borderColor: "border-blue-500",
    backgroundImage: technology,
  },
  "23": {
    // History
    name: "history",
    primaryColor: "#8b4513",
    secondaryColor: "#a0522d",
    backgroundColor: "from-amber-800 to-amber-900",
    cardBackground: "bg-amber-800",
    buttonGradient: "from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900",
    borderColor: "border-amber-700",
    backgroundImage: history,
  },
  "21": {
    // Sports
    name: "sports",
    primaryColor: "#2980b9",
    secondaryColor: "#3498db",
    backgroundColor: "from-blue-600 to-blue-700",
    cardBackground: "bg-blue-600",
    buttonGradient: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    borderColor: "border-blue-500",
    backgroundImage: sportsImage,
  },
  "default": {
    name: "default",
    primaryColor: "#2c3e50",
    secondaryColor: "#34495e",
    backgroundColor: "from-[#0A192F] to-[#112240]",
    cardBackground: "bg-[#1C2541]",
    buttonGradient: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
    borderColor: "border-[#324766]",
    backgroundImage: "",
  },
}

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [name, setName] = useState("")
  const [mode, setMode] = useState("")
  const [score, setScore] = useState(0)
  const [difficulty, setDifficulty] = useState("")
  const [questions, setQuestions] = useState([])
  const [category, setCategory] = useState("")
  const [backgroundImage, setBackgroundImage] = useState("")
  const [currentTheme, setCurrentTheme] = useState(themeConfig.default)

  // Update theme and background based on category
  const updateBackground = (categoryId) => {
    console.log(categoryId)
    console.log(!isNaN(Number(categoryId)))
    if (themeConfig[categoryId]) {
      setCurrentTheme(themeConfig[categoryId])
      setBackgroundImage(themeConfig[categoryId].backgroundImage)
    } else {
      setCurrentTheme(themeConfig.default)
      setBackgroundImage("")
    }
    console.log("update finish")
  }

  return (
    <QuizContext.Provider
      value={{
        name,
        setName,
        mode,
        setMode,
        score,
        setScore,
        difficulty,
        setDifficulty,
        questions,
        setQuestions,
        category,
        setCategory,
        backgroundImage,
        updateBackground,
        currentTheme,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizContext)