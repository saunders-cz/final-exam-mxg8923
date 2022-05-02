import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { SimpleForm } from "../modules/user/LoginForm";

export const LoginUser = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h1">Login form</Typography>
      </Grid>
      <Grid item xs={12}>
        <SimpleForm />
      </Grid>
    </>
  );
};
