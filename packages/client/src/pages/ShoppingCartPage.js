import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { CartContentsDetail } from "../modules/shoppingCart/CartContentsDetail";
import { useCart } from "../modules/shoppingCart/CartContext";

export const ShoppingCartPage = () => {
  const { hasItems } = useCart();
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h2" element="h1">
          Shopping Cart
        </Typography>
        {hasItems === false && (
          <Typography>
            There aren't any items in your cart at this time. Check out our{" "}
            <a href="/menu">menu</a>.
          </Typography>
        )}
      </Grid>
      <Grid item>
        <CartContentsDetail />
      </Grid>
    </Grid>
  );
};
