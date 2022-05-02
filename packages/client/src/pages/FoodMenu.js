import { Container, Divider, Grid, Typography } from "@material-ui/core";
import { FoodItem } from "../modules/foodMenu/FoodItem";
import { useQuery } from "@apollo/client";
import { GET_FOOD_ITEMS } from "../modules/foodMenu/queries";

const categories = {
  entree: "Entrees",
  desert: "Deserts",
  snack: "Snacks",
};

const sortByCategory = (foodItems) => {
  let sorted = {};
  foodItems.forEach((item, i) => {
    let cat = categories[item.category] ?? item.category;
    if (!(cat in sorted)) sorted[cat] = [];
    sorted[cat].push(item);
  });
  return sorted;
};

const CatDivider = () => {
  return (
    <div style={{ padding: "30px" }}>
      <Divider />
    </div>
  );
};

export const FoodMenu = () => {
  const { data, error, loading } = useQuery(GET_FOOD_ITEMS);
  if (error)
    return (
      <Typography color="error" variant="body1">
        {error.message}
      </Typography>
    );
  if (loading) return <Typography variant="body1">loading...</Typography>;
  const foodItemsSorted = sortByCategory(data.foodItems);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1">Food Menu</Typography>
          <Typography variant="body1">_</Typography>
          <Typography gutterBottom>
            In irure occaecat ut non minim minim reprehenderit adipisicing irure
            irure quis commodo. Sint incididunt duis excepteur anim laborum
            nostrud adipisicing in irure adipisicing in velit. Ex sunt
            consectetur fugiat magna adipisicing.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {Object.entries(foodItemsSorted).map(([cat, foodItems], i) => (
            <Container key={i}>
              <Typography variant="h2">{cat}</Typography>
              <CatDivider />
              <Grid container spacing={4}>
                {foodItems.map((item, i) => (
                  <Grid item key={i} xs={12} sm={6} md={4} xl={2} lg={3}>
                    <FoodItem {...item} />
                  </Grid>
                ))}
              </Grid>
              <CatDivider />
            </Container>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
