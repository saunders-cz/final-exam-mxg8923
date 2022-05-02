import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_FOOD_ITEM,
  EDIT_FOOD_ITEM,
  GET_ALL_FOOD_ITEMS,
  GET_FOOD_ITEM,
  DEL_FOOD_ITEM,
} from "../modules/foodMenu/queries";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const columns = [
  { field: "id", width: 100 },
  { field: "category", width: 200 },
  { field: "title", width: 200 },
  { field: "description", width: 200 },
  { field: "price", width: 100 },
  { field: "imageMedium", width: 200 },
];

const AddModal = ({ refetch }) => {
  const [addFoodItem] = useMutation(ADD_FOOD_ITEM);

  const initialValues = {
    category: "",
    title: "",
    description: "",
    price: 0.0,
    imageMedium: "",
  };

  const validationSchema = yup.object({
    category: yup.string().required().label("Category"),
    title: yup.string().required().label("Food Title"),
    description: yup.string().required().label("Description"),
    price: yup.number().required().label("Food price"),
    imageMedium: yup.string().required().label("Image File"),
  });

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values) => {
      addFoodItem({
        variables: {
          input: {
            category: values.category,
            title: values.title,
            description: values.description,
            price: parseFloat(values.price),
            imageMedium: values.imageMedium,
          },
        },
      }).then((response) => {
        if (response.data) {
          if (response.data.addFoodItem) {
            if (response.data.addFoodItem.success) {
              alert("You have successfully added the new food item!");
              refetch();
            }
          }
        }
      });
    },
  });

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Container>
          <Grid item xs={12}>
            <TextField
              id="category"
              label="Category"
              variant="outlined"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.category}
              helperText={errors.category}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="title"
              label="Food Title"
              variant="outlined"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="price"
              label="Food Price"
              variant="outlined"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="imageMedium"
              label="Image File"
              variant="outlined"
              value={values.imageMedium}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.imageMedium}
              helperText={errors.imageMedium}
            />
          </Grid>
          <Grid item>
            <Button color="primary" type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Container>
      </form>
    </Box>
  );
};

const EditModal = ({ id, refetch }) => {
  const [editFoodItem] = useMutation(EDIT_FOOD_ITEM);
  const { data, loading, error } = useQuery(GET_FOOD_ITEM, {
    variables: { id: id },
  });

  const initialValues = {
    category: data && data.foodItem ? data.foodItem.category : "",
    title: data && data.foodItem ? data.foodItem.title : "",
    description: data && data.foodItem ? data.foodItem.description : "",
    price: data && data.foodItem ? data.foodItem.price : 0.0,
    imageMedium: data && data.foodItem ? data.foodItem.imageMedium : "",
  };

  const validationSchema = yup.object({
    category: yup.string().required().label("Category"),
    title: yup.string().required().label("Food Title"),
    description: yup.string().required().label("Description"),
    price: yup.number().required().label("Food price"),
    imageMedium: yup.string().required().label("Image File"),
  });

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values) => {
      editFoodItem({
        variables: {
          id: id,
          input: {
            category: values.category,
            title: values.title,
            description: values.description,
            price: values.price,
            imageMedium: values.imageMedium,
          },
        },
      }).then((response) => {
        if (response.data) {
          if (response.data.editFoodItem) {
            if (response.data.editFoodItem.success) {
              alert(
                `You have successfully edited the food item "${values.title}"!`
              );
              refetch();
            }
          }
        }
      });
    },
  });

  if (loading) return <Typography variant="body1">loading...</Typography>;
  if (error) {
    return (
      <Typography color="error" variant="h4">
        {error.message}
      </Typography>
    );
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Container>
          <Grid item xs={12}>
            <TextField
              id="category"
              label="Category"
              variant="outlined"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.category}
              helperText={errors.category}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="title"
              label="Food Title"
              variant="outlined"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="price"
              label="Food Price"
              variant="outlined"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="imageMedium"
              label="Image File"
              variant="outlined"
              value={values.imageMedium}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.imageMedium}
              helperText={errors.imageMedium}
            />
          </Grid>
          <Grid item>
            <Button color="primary" type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Container>
      </form>
    </Box>
  );
};

export const ManageMenu = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState("0");
  const [deleteFoodItem] = useMutation(DEL_FOOD_ITEM);
  const { data, loading, error, refetch } = useQuery(GET_ALL_FOOD_ITEMS);
  if (loading) return <Typography variant="body1">loading...</Typography>;
  if (error) {
    return (
      <Typography color="error" variant="h4">
        {error.message}
      </Typography>
    );
  }

  const rows = [...data.foodItems];

  return (
    <Grid container direction="column" spacing={2}>
      <Typography variant="h2" element="h1">
        Manage Menu
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          onRowClick={(params) => {
            setTimeout(() => setOpenEdit(false), 0);
            setEditId(params.id);
          }}
        />
      </div>
      <ButtonGroup variant="contained">
        <Button color="primary" onClick={() => setOpenAdd(!openAdd)}>
          {openAdd ? "Close" : "Open"} Add Food Item Form
        </Button>
        <Button
          color="warning"
          disabled={editId === "0"}
          onClick={() => setOpenEdit(!openEdit)}
        >
          {openEdit ? "Close" : "Open"} Edit Food Item Form
        </Button>
        <Button
          color="error"
          disabled={editId === "0"}
          onClick={() => {
            deleteFoodItem({ variables: { id: editId } }).then((response) => {
              if (response.data && response.data.deleteFoodItem) {
                if (response.data.deleteFoodItem.success) {
                  alert(`Deleted food item "ID=${editId}`);
                  refetch();
                }
              }
            });
          }}
        >
          Delete Selected Food Item
        </Button>
      </ButtonGroup>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={6}>
          {openAdd && <AddModal refetch={refetch} />}
        </Grid>
        <Grid item xs={6}>
          {openEdit && <EditModal id={editId} refetch={refetch} />}
        </Grid>
      </Grid>
    </Grid>
  );
};
