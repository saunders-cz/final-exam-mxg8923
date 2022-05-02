import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { AUTH_USER } from "./queries.js";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useCart } from "../shoppingCart/CartContext.js";

// define our initial state for our form
const initialValues = {
  name: "",
  email: "",
  password: "",
  newsletter: false,
};

// simple validation

const validationSchema = yup.object({
  email: yup.string().required().label("Email"),
  password: yup.string().required().min(8, "Too short").label("Password"),
});

export const SimpleForm = () => {
  const { setUser } = useCart();
  const [getUser] = useLazyQuery(AUTH_USER);
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values) => {
      getUser({
        variables: {
          email: values.email,
          password: values.password,
        },
      }).then((response) => {
        const { data } = response;
        if (data) {
          if (data.auth) {
            const { id, email, name, newsletter } = data.auth;
            setUser(id, email, name, newsletter);
            alert("You have successfully logged in!");
            navigate("/");
          }
        }
      });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.password}
            helperText={errors.password}
          />
        </Grid>
        <Grid item>
          <Button color="primary" type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Container>
    </form>
  );
};
