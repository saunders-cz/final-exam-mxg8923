import {
  ButtonGroup,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useCart } from "./CartContext";
import { useQuery } from "@apollo/client";
import { GET_FOOD_ITEM } from "../foodMenu/queries";

const CartDetailItem = ({ item, updateItemQuantity }) => {
  const { data, error, loading } = useQuery(GET_FOOD_ITEM, {
    variables: { id: item.id },
  });

  if (error)
    return (
      <Typography color="error" variant="body1">
        {error.message}
      </Typography>
    );
  if (loading) return <Typography variant="body1">loading...</Typography>;

  const { title, price } = data.foodItem;

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="body1" gutterBottom>
          {title} x {item.qty} @ ${price}
        </Typography>
      </Grid>
      <Grid item>
        <ButtonGroup>
          <IconButton onClick={() => updateItemQuantity(item.id, item.qty + 1)}>
            <Icon>add</Icon>
          </IconButton>
          <IconButton
            onClick={() =>
              updateItemQuantity(item.id, Math.max(1, item.qty - 1))
            }
          >
            <Icon>remove</Icon>
          </IconButton>
          <IconButton onClick={() => updateItemQuantity(item.id, 0)}>
            <Icon>delete</Icon>
          </IconButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export const CartContentsDetail = () => {
  const cart = useCart();
  const { items, updateItemQuantity } = cart;
  return (
    <Grid container style={{ maxWidth: 400 }} direction="column">
      {items.map(
        (item, i) =>
          item.qty > 0 && (
            <CartDetailItem
              key={i}
              item={item}
              updateItemQuantity={updateItemQuantity}
            />
          )
      )}
    </Grid>
  );
};
