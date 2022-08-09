import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ReviewScore = () => {
  // Parsing questions in which user has submitted wrong answers 
  const questions = JSON.parse(localStorage.getItem("Token")).incorrectAnswers
    .question;
  const CorrectAnswer = JSON.parse(localStorage.getItem("Token"))
    .incorrectAnswers.correctAnswer;
  const selectedAnswer = JSON.parse(localStorage.getItem("Token"))
    .incorrectAnswers.incorrectAnswer;
  return (
    <div>
      {/* Showing user his answers and correct answers on questions which he has given wrong answers  */}
      {questions.map((incorrect, index) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={index}
          >
            <h3>
              Question {index + 1} : {incorrect}{" "}
            </h3>
            <h4 style={{ color: "#66bb6a" }}>
              Correct Answer : {CorrectAnswer[index]}{" "}
            </h4>
            <h4 style={{ color: "#e53935" }}>
              Your Answer : {selectedAnswer[index]}{" "}
            </h4>
          </Box>
        );
      })}
      <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Navigating to home button  */}
      <Link to="/" style={{ textDecoration: "none" ,marginBottom:"15px"}}>
        <Button variant="contained">Go Back to Home</Button>
      </Link>
      </Box>
    </div>
  );
};

export default ReviewScore;
