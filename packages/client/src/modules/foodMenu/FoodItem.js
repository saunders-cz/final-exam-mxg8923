import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import React from "react";
import { useCart } from "../shoppingCart/CartContext";
import { useQuery } from "@apollo/client";
import { GET_FOOD_ITEM } from "./queries";

const StyledCard = styled(Card)`
  height: 100%;
`;

export const FoodItem = (item) => {
  const { id } = item;
  const cart = useCart();
  const { data, error, loading } = useQuery(GET_FOOD_ITEM, {
    variables: { id: id },
  });

  if (error)
    return (
      <Typography color="error" variant="body1">
        {error.message}
      </Typography>
    );
  if (loading) return <Typography variant="body1">loading...</Typography>;

  const onAddItem = (itemId) => cart.addItem(itemId);
  const { title, imageMedium, description, price } = data.foodItem;

  return (
    <StyledCard>
      <Grid
        container
        direction="column"
        style={{ height: "100%" }}
        alignContent="stretch"
      >
        <Grid item>
          <CardMedia
            component="img"
            height={200}
            image={imageMedium}
            alt={title}
          />
        </Grid>
        <Grid
          item
          container
          style={{ height: "calc(100% - 200px)" }}
          alignContent="stretch"
          justifyContent="space-between"
        >
          <CardContent>
            <Grid
              container
              direction="column"
              style={{ height: "100%", justifyContent: "space-between" }}
            >
              <Grid item>
                <Typography gutterBottom variant="h5">
                  {title}
                </Typography>
                <Typography gutterBottom variant="body1">
                  {description}
                </Typography>
              </Grid>
              <Grid item container direction="column">
                <Typography
                  variant="h6"
                  element="div"
                  gutterBottom
                  align="right"
                >
                  ${price}
                </Typography>
                <Button onClick={() => onAddItem(id)}>Add Item</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </StyledCard>
  );
};
