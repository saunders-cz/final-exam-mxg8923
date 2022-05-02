import { Container, Grid } from "@material-ui/core";
import React from "react";
import { Outlet } from "react-router-dom";
import { MainMenu } from "../common/MainMenu";
import { CartStatus } from "../modules/shoppingCart/CartStatus";

export const PageTemplate = () => {
  return (
    <Container>
      <Grid container direction="column">
        <Grid item container justifyContent="space-between">
          <Grid item>
            <MainMenu />
          </Grid>
          <Grid item>
            <CartStatus />
          </Grid>
        </Grid>
        <Grid item>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};
