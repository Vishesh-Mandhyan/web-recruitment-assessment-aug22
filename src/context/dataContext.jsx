import { createContext, useState } from "react";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [questionType, setQuestiontype] = useState({
    token: "",
    type: "",
    difficulty: "",
  });
  const [incorrectAnswers, setIncorrectAnswers] = useState({
    question: [],
    correctAnswer: [],
    incorrectAnswer: [],
  });
  return (
    <DataContext.Provider
      value={{
        questionType,
        setQuestiontype,
        incorrectAnswers,
        setIncorrectAnswers
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
