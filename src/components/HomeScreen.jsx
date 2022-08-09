import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import AlertMessage from "./Alert";
import DataContext from "../context/dataContext";

const HomeScreen = () => {
  let [open, setOpen] = useState(false);
  const value = useContext(DataContext);
  let session = {};
  const start = () => {
    value.setIncorrectAnswers({
      question: [],
      correctAnswer: [],
      incorrectAnswer: [],
    });
    if (!localStorage.getItem("Token")) {
      session = {
        token: "",
        score: 0,
        totalQuestion: 0,
        incorrectAnswers: {},
      };
    } else {
      session = {
        token: "",
        score: JSON.parse(localStorage.getItem("Token")).score,
        totalQuestions: JSON.parse(localStorage.getItem("Token"))
          .totalQuestions,
        incorrectAnswers: {},
      };
    }
    localStorage.setItem("Token", JSON.stringify(session));
  };
  const reset = () => {
    localStorage.removeItem("Token");
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };
  return (
    // Start and Reset Button
    <Grid container direction="column" alignItems="center" justify="center">
      {open ? (
        <AlertMessage Type="success" message="Player scores reseted" />
      ) : (
        ""
      )}
      <Link
        style={{
          textDecoration: "none",
          marginTop: "5vw",
          marginBottom: "10vw",
        }}
        to="/questiontype"
      >
        <Button style={{ width: "10vw" }} variant="contained" onClick={start}>
          Start
        </Button>
      </Link>
      <Button style={{ width: "10vw" }} variant="contained" onClick={reset}>
        Reset
      </Button>
    </Grid>
  );
};

export default HomeScreen;
