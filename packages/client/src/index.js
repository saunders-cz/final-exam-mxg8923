import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AboutUs } from "./pages/AboutUs";
import { ContactInfo } from "./pages/ContactInfo";
import { HrsOfOperation } from "./pages/HrsOfOperation";
import { NotFound } from "./pages/NotFound";
import { RegisterForMailing } from "./pages/RegisterForMailing";
import { FoodMenu } from "./pages/FoodMenu";
import { PageTemplate } from "./common/PageTemplate";
import { CartProvider } from "./modules/shoppingCart/CartContext";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RegisterUser } from "./pages/RegisterUser";
import { LoginUser } from "./pages/LoginUser";
import { UserSettings } from "./pages/UserSettings";
import { ManageMenu } from "./pages/ManageMenu";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageTemplate />}>
              <Route index element={<FoodMenu />} />
              <Route path="AboutUs" element={<AboutUs />} />
              <Route path="ContactInfo" element={<ContactInfo />} />
              <Route path="HrsOfOperation" element={<HrsOfOperation />} />
              <Route
                path="RegisterForMailing"
                element={<RegisterForMailing />}
              />
              <Route path="menu" element={<FoodMenu />} />
              <Route path="cart" element={<ShoppingCartPage />} />
              <Route path="RegisterUser" element={<RegisterUser />} />
              <Route path="LoginUser" element={<LoginUser />} />
              <Route path="*" element={<NotFound />} />
              <Route path="UserSettings" element={<UserSettings />} />
              <Route path="ManageMenu" element={<ManageMenu />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
