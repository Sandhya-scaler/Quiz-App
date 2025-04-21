import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export const QuizProvider = ({children})=>{
    const [name , setName] = useState('');
    const [mode, setMode] = useState('');
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const[ category, setCategory] = useState('');


    return(
        <QuizContext.Provider value={{name , setName,mode,setMode,score,setScore,difficulty, setDifficulty,questions, setQuestions, category, setCategory}}>
            {children}
        </QuizContext.Provider>
    );
 
};

export const useQuiz = ()=> useContext(QuizContext);
