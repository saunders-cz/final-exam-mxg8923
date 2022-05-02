import { Grid, Typography } from "@material-ui/core";
import React from "react";

export const HrsOfOperation = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">Hours of Operation</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          _
        </Typography>
        <Typography variant="body1">
          Monday - Friday (8:00 am - 6:00 pm)
        </Typography>
        <Typography variant="body1">
          _
        </Typography>
        <Typography variant="body1">
          Saturday, Sunday (10:00 am - 8:00 pm)
        </Typography>
      </Grid>
    </>
  );
};
