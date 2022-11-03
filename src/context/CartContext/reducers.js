const quantityChange = (state, action) => {
  const { id, increment, inventory } = action.payload;
  const updatedObjects = state.cart.map((item) => {
    if (item.id === id) {
      if (
        increment &&
        item.quantity <
          inventory /* storeItems.find((shopItem) => shopItem.id === item.id).inventory*/
      ) {
        return { id: item.id, quantity: item.quantity + 1 };
      } else if (!increment && item.quantity > 0) {
        return { id: item.id, quantity: item.quantity - 1 };
      }
    }
    return item;
  });
  return [...updatedObjects];
};

const setCart = (state, payload) => {
  if (payload === "") return { ...state, cart: [] };
  return { ...state, cart: payload };
};

const removeItem = (state, action) => {
  const { id } = action.payload;
  const remainingCart = state.cart.filter((item) => item.id !== id);
  return [...remainingCart];
};

const emptyCart = (state, action) => {
  const remainingCart = state.cart.filter((item) => item === "notEqualToMe:)");
  return [...remainingCart];
};

const updateCart = (state, action) => {
  const { id, quantity } = action.payload;
  const otherItems = state.cart.filter((item) => item.id !== id);
  const result =
    quantity > 0 ? [...otherItems, { id: id, quantity: quantity }] : otherItems;
  return result;
};

const reducers = { quantityChange, removeItem, emptyCart, updateCart, setCart };

export default reducers;
