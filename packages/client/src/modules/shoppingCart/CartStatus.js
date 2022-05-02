import { Badge, Icon, Popover, Tooltip, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "./CartContext";

const Wrapper = styled.div`
  padding: 1rem;
  cursor: pointer;
`;

export const CartStatus = () => {
  const { hasItems, itemCount } = useCart();
  const navigate = useNavigate();
  const handleClick = () => navigate("/cart");

  return (
    <Tooltip
      title={
        hasItems ? `Click to see contents` : "You have no items in your cart"
      }
    >
      <Wrapper onClick={handleClick} hasItems={hasItems}>
        <Badge badgeContent={itemCount} color="primary">
          <Icon>shopping_cart</Icon>
        </Badge>
      </Wrapper>
    </Tooltip>
  );
};
