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
import React, { useEffect, useRef, useState } from "react";
import GameOver from "./GameOver";
const Question = ({ data }) => {
  let Marks = useRef(0);
  let [nextQuestion, setNextQuestion] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  let [options, setOptions] = useState([]);
  const [alert,setAlert] = useState({})
  useEffect(() => {
    // Running this only when the trivia is not completed
    if (nextQuestion < data.length) {
      // Creating a random value to put the correct answer at a randomized value to shuffle the array
      const randomValue = Math.floor(Math.random() * 4);
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
  const next = () => {
    if (selectedValue === "") {
      setAlert({open:true,alert:<Alert style={{backgroundColor:"black",color:"white"}} severity="error">Please select an option</Alert>})
      setTimeout(()=>{
           setAlert({...alert,open:false})
    },3000)
      throw new Error("Select a value");
    }
    // go to the next question
    setNextQuestion((prev) => prev + 1);
    // Checking if the selected value is correct or not
    if (selectedValue === data[nextQuestion].correct_answer) {
      Marks.current++;
    }
    setSelectedValue("");
  };
  return (
    <div>
      {alert.open?alert.alert:""}
      {/* Checking if the trivia questions are completed or not  */}
      {nextQuestion < data.length ? (
        <>
        <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
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
            <Button style={{marginTop:"15px"}} variant="contained" onClick={next}>
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
