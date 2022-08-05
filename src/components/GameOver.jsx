import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import DataContext from "../context/questionTypeContext";
const GameOver = ({ Marks }) => {
  const value = useContext(DataContext);
  let totalScore = 0;
  // Checking if token already exists or not
  const setLocalStorage = () => {
    totalScore =
      JSON.parse(localStorage.getItem("Token")).score + Marks.current;
    const session = {
      token: value.questionType.token,
      score: totalScore,
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
        {/* Current Score */}
        <h4>Your Score</h4>
        <p>{Marks.current}/5</p>
        {/* Total Score  */}
        <h4>Your Total Score</h4>
        {localStorage.getItem("Token") ? (
          <p>{JSON.parse(localStorage.getItem("Token")).score}</p>
        ) : (
          <p>{Marks.current}/5</p>
        )}
        {/* Navigating Back to home  */}
        <Link to="/" style={{textDecoration:"none",marginTop:"10px"}}>
          <Button variant="contained">Go Back to Home</Button>
        </Link>
      </Box>
    </div>
  );
};

export default GameOver;
