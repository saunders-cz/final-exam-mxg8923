import { createContext, useContext, useState } from "react";

const context = createContext({});

export const CartProvider = ({ children }) => {
  const [state, setState] = useState({
    items: [],
    hasItems: false,
    itemCount: 0,
    user: null,
  });

  const logout = () => {
    setState({
      ...state,
      user: null,
    });
  };

  const setUser = (id, email, name, newsletter) => {
    setState({
      ...state,
      user: {
        id: id,
        email: email,
        name: name,
        newsletter: newsletter,
      },
    });
  };

  const addItem = (foodItemId) => {
    // get a copy of items so we aren't modifying the state directly
    let items = [...state.items];
    // check for an existing item and update qty
    const existingItem = items.find((i) => i.id === foodItemId);
    if (existingItem !== undefined) {
      existingItem.qty++;
      setState({
        ...state,
        items,
        hasItems: true,
        itemCount: getItemCount(items),
      });
    } else {
      items = [...items, { id: foodItemId, qty: 1 }];
      setState({
        ...state,
        items,
        hasItems: true,
        itemCount: getItemCount(items),
      });
    }
  };

  const updateItemQuantity = (foodItemId, newQuantity) => {
    // Copy the array
    const items = [...state.items];
    // Get a reference to the item
    const item = items.find((item) => item.id === foodItemId);

    if (item === undefined) {
      console.error(
        `Food item id ${foodItemId} not found when trying to update quantity.`
      );
      return;
    }

    if (newQuantity === 0) {
      // remove the item from our items
      items.splice(
        items.findIndex((i) => i.id === foodItemId),
        1
      );
    } else {
      item.qty = newQuantity;
    }

    setState({
      ...state,
      items,
    });
  };

  const getItemCount = (items) => {
    let count = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      count += item.qty;
    }
    return count;
  };

  return (
    <context.Provider
      value={{
        ...state,
        addItem,
        updateItemQuantity,
        setUser,
        logout,
      }}
    >
      {children}
    </context.Provider>
  );
};
export const CartConsumer = context.Consumer;

export const useCart = () => useContext(context);
