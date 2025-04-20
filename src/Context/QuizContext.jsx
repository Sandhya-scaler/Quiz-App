// 1. First, let's update QuizContext.jsx to include background management
import React, { createContext, useContext, useState } from "react";
// In QuizContext.jsx
import generalKnowledge from '../assets/gk.jpg';
import technology from '../assets/technology.jpeg';
import historyImage from '../assets/history.jpg';
import sportsImage from '../assets/sports.jpeg';

const QuizContext = createContext();

export const QuizProvider = ({children}) => {
    const [name, setName] = useState('');
    const [mode, setMode] = useState('');
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState('');
    const [questions, setQuestions] = useState([]);
    const [category, setCategory] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');

    // Get background based on category
    const updateBackground = (categoryId) => {
        switch(categoryId) {
            case '9': // General Knowledge
                setBackgroundImage('/assets/db34d40b271fb59477621550bf73ea0b3ea0b');
                break;
            case '18': // Science: Computers
                setBackgroundImage('/assets/technology');
                break;
            // etc.
        }
    };

    return(
        <QuizContext.Provider value={{
            name, setName,
            mode, setMode,
            score, setScore,
            difficulty, setDifficulty,
            questions, setQuestions, 
            category, setCategory,
            backgroundImage, updateBackground
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => useContext(QuizContext);