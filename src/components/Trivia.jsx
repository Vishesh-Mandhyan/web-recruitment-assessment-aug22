import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/questionTypeContext";
import Question from "./Question";
import { useNavigate } from "react-router-dom";
const Trivia = () => {
  const ApiUrl = "https://opentdb.com";
  const [data, setData] = useState();
  const value = useContext(DataContext);
  let navigate = useNavigate();
  useEffect(() => {
    // If token is not generated go to Home Screen
    if (!localStorage.getItem("Token")) {
      navigate("/");
    }
    // Making the Trivia api request to fetch questions
    try {
      const getData = async () => {
        const response =
          await axios.get(`${ApiUrl}/api.php?amount=5&token=${value.questionType.token}&difficulty=${value.questionType.difficulty}&type=${value.questionType.type}
        `);
        setData(response.data.results);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  //  If the request is successful data then go to question component
  return <div>{data && <Question data={data} />}</div>;
};

export default Trivia;
