import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DataContext from "../context/dataContext";
import AlertMessage from "./Alert";
const QuestionType = () => {
  const value = useContext(DataContext);
  let navigate = useNavigate();
  let [open,setOpen] = useState(false)
  useEffect(() => { 
    // If token is not generated go to Home Screen 
    if (!localStorage.getItem("Token")) {
      navigate("/");
    }
    // Making request for the token
    try {
      const fetchToken = async () => {
        const response = await axios.get(
          `https://opentdb.com/api_token.php?command=request`
        );
        value.setQuestiontype({
          ...value.questionType,
          token: response.data.token,
        });
        if (localStorage.getItem("Token")) {
          const session = {
            ...JSON.parse(localStorage.getItem("Token")),
            token: response.data.token,
          };
          localStorage.setItem("Token", JSON.stringify(session));
        }
      };
      fetchToken();
    } catch (error) {
      console.log(error);
    }
  }, []);
  // Submit Button 
  const handleSubmit = () => {
    if(value.questionType.type || value.questionType.difficulty){
      navigate("/trivia");
    }
    setOpen(true)
    // setting alert time 
   setTimeout(()=>{
     setOpen(false)
   },1500)
  };
  // skip button 
  const handleSkip = () => {
    navigate("/trivia");
  };
  return (
    <div>
       {open?<AlertMessage Type = "error" message = "Please select type of questions or click on the skip button"/>:""}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap:"10px"
        }}
      >
          <Button sx={{mr:"15px",alignSelf:"flex-end"}} variant="text" onClick={handleSkip}>
            skip <ArrowForwardIcon/>
          </Button>
      {/* Choosing Type of Questions  */}
      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        <h3>Set Difficulty</h3>
        </FormLabel>
        {/* choosing difficulty  */}
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(e) => {
            value.setQuestiontype({
              ...value.questionType,
              difficulty: e.target.value,
            });
          }}
        >
          <FormControlLabel value="easy" control={<Radio />} label="Easy" />
          <FormControlLabel value="medium" control={<Radio />} label="Medium" />
          <FormControlLabel value="hard" control={<Radio />} label="Hard" />
        </RadioGroup>
        <FormLabel id="demo-radio-buttons-group-label">
        <h3>Set Type</h3>
        </FormLabel>
        {/* Choosing type of questions  */}
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(e) => {
            value.setQuestiontype({
              ...value.questionType,
              type: e.target.value,
            });
          }}
        >
          <FormControlLabel
            value="multiple"
            control={<Radio />}
            label="Multiple"
          />
          <FormControlLabel
            value="boolean"
            control={<Radio />}
            label="True/False"
          />
        </RadioGroup>
      </FormControl>
        {/* Submitting the response  */}
        <Button style={{marginTop:"25px",marginBottom:"15px"}} variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default QuestionType;
