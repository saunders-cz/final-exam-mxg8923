import { MenuItem, MenuList, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../modules/shoppingCart/CartContext";

const StyledItem = styled(MenuItem)`
  display: inline-block;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  font-size: 1.3rem;
  /* color: blue; */
  padding-right: 1rem;
  &.active {
    color: black;
  }
`;

export const MainMenu = () => {
  const { user, setUser } = useCart();
  useEffect(() => {}, [user, setUser]);
  return (
    <nav>
      <MenuList>
        <StyledItem>
          <Link to="/">Home</Link>
        </StyledItem>
        <StyledItem>
          <Link to="/AboutUs">About Us</Link>
        </StyledItem>
        <StyledItem>
          <Link to="/ContactInfo">Contact Info</Link>
        </StyledItem>
        <StyledItem>
          <Link to="/HrsOfOperation">Hours of Operations</Link>
        </StyledItem>
        <StyledItem>
          <Link to="/RegisterUser">User Registration</Link>
        </StyledItem>
        <StyledItem>
          <Link to="/LoginUser">User Login</Link>
        </StyledItem>
        {user && (
          <StyledItem>
            <Typography variant="h5">
              Logged in: {user.name} ({user.email})
            </Typography>
          </StyledItem>
        )}
        {user && (
          <StyledItem>
            <Link to="/UserSettings">User Settings</Link>
          </StyledItem>
        )}
        <StyledItem>
          <Link to="/ManageMenu">Manage Menu</Link>
        </StyledItem>
      </MenuList>
    </nav>
  );
};
