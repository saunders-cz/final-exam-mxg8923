import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import { ADD_USER } from "./queries.js";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// define our initial state for our form
const initialValues = {
  name: "",
  email: "",
  password: "",
  newsletter: false,
};

// simple validation

const validationSchema = yup.object({
  name: yup.string().required().label("Full Name"),
  email: yup.string().required().label("Email"),
  password: yup.string().required().min(8, "Too short").label("Password"),
  newsletter: yup.boolean().required().label("Sign up for News Letter"),
});

export const SimpleForm = () => {
  const [addUser] = useMutation(ADD_USER);
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values) => {
      addUser({
        variables: {
          input: {
            name: values.name,
            email: values.email,
            password: values.password,
            newsletter: values.newsletter,
          },
        },
      }).then((data) => {
        if (data) {
          if (data.addUser) {
            if (data.addUser.success) {
              alert("You have successfully registered!");
              navigate("/LoginUser");
            }
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
            id="name"
            label="Full Name"
            variant="outlined"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
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
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                id="newsletter"
                checked={values.newsletter}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            }
            label="Sign up for News Letter"
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
