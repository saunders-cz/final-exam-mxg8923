import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import { EDIT_USER } from "./queries.js";
import { useMutation } from "@apollo/client";
import { useCart } from "../shoppingCart/CartContext.js";

const validationSchema = yup.object({
  name: yup.string().label("Full Name"),
  password: yup.string().min(8, "Too short").label("Password"),
  newsletter: yup.boolean().label("Receive News Letter"),
});

export const SimpleForm = () => {
  const { user, setUser } = useCart();
  const [editUser] = useMutation(EDIT_USER);

  const initialValues = {
    name: user ? user.name : "",
    password: "",
    newsletter: user ? user.newsletter : false,
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values) => edit(values),
  });

  const edit = async (values) => {
    if (!user) return;
    const { name, password, newsletter } = values;
    const input = {
      name: name !== "" ? name : undefined,
      password: password !== "" ? password : undefined,
      newsletter: newsletter,
    };

    const { data } = await editUser({
      variables: {
        id: user.id,
        input: input,
      },
    });

    if (data) {
      if (data.editUser) {
        if (data.editUser.success) {
          alert("You have successfully edited your settings!");
          setUser({ ...user, ...input });
        }
      }
    }
  };

  return (
    <div>
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
    </div>
  );
};
