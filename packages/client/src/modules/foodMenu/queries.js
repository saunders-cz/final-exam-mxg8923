import { gql } from "@apollo/client";

const GET_FOOD_ITEMS = gql`
  query GET_FOOD_ITEMS {
    foodItems {
      id
      category
    }
  }
`;

const GET_FOOD_ITEM = gql`
  query GET_FOOD_ITEM($id: ID!) {
    foodItem(id: $id) {
      category
      title
      description
      price
      imageMedium
    }
  }
`;

const GET_ALL_FOOD_ITEMS = gql`
  query GET_ALL_FOOD_ITEMS {
    foodItems {
      id
      category
      title
      description
      price
      imageMedium
    }
  }
`;

const ADD_FOOD_ITEM = gql`
  mutation ADD_FOOD_ITEM($input: FoodItemInput!) {
    addFoodItem(input: $input) {
      success
    }
  }
`;

const EDIT_FOOD_ITEM = gql`
  mutation EDIT_FOOD_ITEM($id: ID!, $input: FoodItemInput!) {
    editFoodItem(id: $id, input: $input) {
      success
    }
  }
`;

const DEL_FOOD_ITEM = gql`
  mutation DEL_FOOD_ITEM($id: ID!) {
    deleteFoodItem(id: $id) {
      success
    }
  }
`;

export {
  ADD_FOOD_ITEM,
  GET_FOOD_ITEM,
  GET_FOOD_ITEMS,
  GET_ALL_FOOD_ITEMS,
  EDIT_FOOD_ITEM,
  DEL_FOOD_ITEM,
};
