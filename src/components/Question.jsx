import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../context/dataContext";
import AlertMessage from "./Alert";
import GameOver from "./GameOver";
const Question = ({ data }) => {
  const value = useContext(DataContext);
  let Marks = useRef(0);
  let [nextQuestion, setNextQuestion] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  let [options, setOptions] = useState([]);
  let [open, setOpen] = useState(false);
  useEffect(() => {
    // Running this only when the trivia is not completed
    if (nextQuestion < data.length) {
      // Creating a random value to put the correct answer at a randomized value to shuffle the array
      const randomValue = Math.floor(Math.random() * data.length - 1);
      data[nextQuestion].incorrect_answers.splice(
        randomValue,
        0,
        data[nextQuestion].correct_answer
      );
      setOptions(data[nextQuestion].incorrect_answers);
    }
  }, [nextQuestion, data]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  // On pressing next button 
   const next = () => {
    if (selectedValue === "") {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1500);
      throw new Error("Select a value");
    }
    // go to the next question
    setNextQuestion((prev) => prev + 1);
    // Checking if the selected value is correct or not
    if (selectedValue === data[nextQuestion].correct_answer) {
      Marks.current++;
    } else {
      value.setIncorrectAnswers({
        question: [
          ...value.incorrectAnswers.question,
          data[nextQuestion].question,
        ],
        correctAnswer: [
          ...value.incorrectAnswers.correctAnswer,
          data[nextQuestion].correct_answer,
        ],
        incorrectAnswer: [
          ...value.incorrectAnswers.incorrectAnswer,
          selectedValue,
        ],
      });
    }
    setSelectedValue("");
  };
  return (
    <div>
      {open ? (
        <AlertMessage Type="error" message="Please select an option" />
      ) : (
        ""
      )}
      {/* Checking if the trivia questions are completed or not  */}
      {nextQuestion < data.length ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Printing Question */}
            <h3>{data[nextQuestion].question}</h3>
            <FormControl required>
              <FormLabel id="demo-radio-buttons-group-label">
                Select one option
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={handleChange}
              >
                {/* Mapping through options to print them all */}
                {options.map((option, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  );
                })}
              </RadioGroup>
              {/* Next button for going to the next question  */}
              <Button
                style={{ marginTop: "15px" }}
                variant="contained"
                onClick={next}
              >
                Next
              </Button>
            </FormControl>
          </Box>
        </>
      ) : (
        // Go to gameover component when the trivia is completed
        <GameOver Marks={Marks} />
      )}
    </div>
  );
};

export default Question;
