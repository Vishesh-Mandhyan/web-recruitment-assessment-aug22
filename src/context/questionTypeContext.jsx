import { createContext, useState, useEffect } from "react";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [questionType, setQuestiontype] = useState({
    token: "",
    type: "",
    difficulty: "",
  });

  return (
    <DataContext.Provider
      value={{
        questionType,
        setQuestiontype,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
