import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
const HomeScreen = () => {
  let session = {}
  const start = () => {
    if(!localStorage.getItem("Token")){
      session = {
        token: "",
        score: 0,
      };
    }
    else{
      session = {
        token: "",
        score: JSON.parse(localStorage.getItem("Token")).score,
      };
    }
    localStorage.setItem("Token", JSON.stringify(session));
  };
  const reset = () => {
    localStorage.removeItem("Token");
  };
  return (
    // Start and Reset Button
    <Grid
      container 
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Link style={{textDecoration:"none", marginTop:"5vw" , marginBottom:"10vw"}} to="/questiontype">
        <Button style={{ width:"10vw"}} variant="contained" onClick={start}>
          Start
        </Button>
      </Link>
      <Button style={{ width:"10vw"}} variant="contained" onClick={reset}>
        Reset
      </Button>
    </Grid>
  );
};

export default HomeScreen;
