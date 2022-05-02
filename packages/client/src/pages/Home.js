import { Grid, Typography } from "@material-ui/core";
import React from "react";

export const Home = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">Max's Pizzeria</Typography>
      </Grid>
      <Grid item xs={12}>
        <img src="img/home.jpg" alt="home page picture" height={720} width={960} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          _
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Grid>
    </>
  );
};

export default Home;
