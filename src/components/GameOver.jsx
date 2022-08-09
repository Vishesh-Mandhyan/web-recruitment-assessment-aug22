import { Box, Button } from "@mui/material";
import congratulationsImage from "../animation_500_l6m8v2uo.gif";
import { Link } from "react-router-dom";
import React, { useContext, useRef } from "react";
import DataContext from "../context/dataContext";
const GameOver = ({ Marks }) => {
  const value = useContext(DataContext);
  let totalScore = 0;
  const setLocalStorage = () => {
    totalScore =
      JSON.parse(localStorage.getItem("Token")).score + Marks.current;
    const session = {
      token: value.questionType.token,
      score: totalScore,
      totalQuestions:
        JSON.parse(localStorage.getItem("Token")).totalQuestions + 5,
      incorrectAnswers: value.incorrectAnswers,
    };
    localStorage.setItem("Token", JSON.stringify(session));
  };
  setLocalStorage();
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>GameOver</h1>
        {/* Showing Congratulations if the user has answered all the questions correctly  */}
        {Marks.current === 5 ? (
          <>
            <img
              src={congratulationsImage}
              alt="Congratulations"
              width="100px"
            />
            <h3>Congratulations</h3>
          </>
        ) : (
          ""
        )}
        {/* Current Score */}
        <h4>Current Score</h4>
        <p>
          You have answered {Marks.current} questions correctly out of 5
          questions
        </p>
        {/* Total Score  */}
        <h4>Total Score</h4>
        <p>
          You have answered {JSON.parse(localStorage.getItem("Token")).score}{" "}
          questions correctly out of total{" "}
          {JSON.parse(localStorage.getItem("Token")).totalQuestions} questions
        </p>
        {/* Showing detailed score  */}
        {/* Navigating Back to home  */}
        {/* Only showing button if the user has answered some questions wrong */}
        {Marks.current !== 5 ? (
          <>
            <Link
              to="/reviewscore"
              style={{ textDecoration: "none", marginTop: "10px" }}
            >
              <Button variant="contained">View Detailed Score</Button>
            </Link>
          </>
        ) : (
          ""
        )}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            marginTop: "10px",
            marginBottom: "15px",
          }}
        >
          <Button variant="contained">Go Back to Home</Button>
        </Link>
      </Box>
    </div>
  );
};

export default GameOver;
