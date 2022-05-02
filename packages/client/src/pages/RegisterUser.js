import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { SimpleForm } from "../modules/user/RegisterForm";

export const RegisterUser = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h1">Register form</Typography>
      </Grid>
      <Grid item xs={12}>
        <SimpleForm />
      </Grid>
    </>
  );
};
