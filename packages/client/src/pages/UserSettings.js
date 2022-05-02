import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { SimpleForm } from "../modules/user/SettingsForm";

export const UserSettings = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h1">User Settings</Typography>
      </Grid>
      <Grid item xs={12}>
        <SimpleForm />
      </Grid>
    </>
  );
};
