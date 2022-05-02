import { gql } from "apollo-server-express";

export default gql`
  scalar DateTime
  type Query {
    foodItems: [FoodItem]
    foodItem(id: ID!): FoodItem

    auth(email: String, password: String): User
    user(id: ID!): User
  }

  type Error {
    message: String
    path: String
  }

  type BaseResponse {
    success: String
    errors: [Error]
  }

  type Mutation {
    addFoodItem(input: FoodItemInput!): BaseResponse
    editFoodItem(id: ID!, input: FoodItemInput!): BaseResponse
    deleteFoodItem(id: ID!): BaseResponse
    addUser(input: UserInput!): BaseResponse
    editUser(id: ID!, input: UserInput!): BaseResponse
  }

  type FoodItem {
    id: ID!
    title: String!
    description: String!
    price: Float!
    imageMedium: String!
    category: String!
  }

  input FoodItemInput {
    title: String
    description: String
    price: Float
    imageMedium: String
    category: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    newsletter: Boolean!
  }

  input UserInput {
    name: String
    email: String
    password: String
    newsletter: Boolean
  }
`;
