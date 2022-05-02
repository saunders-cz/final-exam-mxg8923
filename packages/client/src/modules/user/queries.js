import { gql } from "@apollo/client";

const AUTH_USER = gql`
  query AUTH_USER($email: String!, $password: String!) {
    auth(email: $email, password: $password) {
      id
      name
      email
      password
      newsletter
    }
  }
`;

const GET_USER = gql`
  query GET_USER($id: ID!) {
    user(id: $id) {
      id
      name
      email
      password
      newsletter
    }
  }
`;

const ADD_USER = gql`
  mutation ADD_USER($input: UserInput!) {
    addUser(input: $input) {
      success
    }
  }
`;

const EDIT_USER = gql`
  mutation EDIT_USER($id: ID!, $input: UserInput!) {
    editUser(id: $id, input: $input) {
      success
    }
  }
`;

export { AUTH_USER, GET_USER, ADD_USER, EDIT_USER };
