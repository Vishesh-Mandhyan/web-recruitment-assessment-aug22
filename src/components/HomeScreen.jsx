import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
const HomeScreen = () => {
  const start = () => {
    const session = {
      token: "",
      score: 0,
    };
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
