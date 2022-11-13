const quantityChange = (state, action) => {
  const { id, increment, quantity } = action.payload;

  console.log("quantityChange", { id, increment, quantity });
  console.log("cart", state.cart);
  const updatedObjects = state.cart.map((item) => {
    if (item.id === id) {
      console.log("item.quantity", item.quantity, "inventory", item.inventory);
      const _inventory = +item.inventory;
      if (
        increment &&
        item.quantity <
          _inventory /* storeItems.find((shopItem) => shopItem.id === item.id).inventory*/
      ) {
        return { ...item, id: item.id, quantity: item.quantity + 1 };
      } else if (!increment && _inventory > 0) {
        return { ...item, id: item.id, quantity: item.quantity - 1 };
      }
    }
    return item;
  });
  return [...updatedObjects];
};
const formatCurrency = (num) => (num / 100).toFixed(2);

const setCart = (state, payload) => {
  if (payload === "") return { ...state, cart: [] };

  const _netAmounts = Object.entries(payload.netAmounts).reduce(
    (obj, [key, value]) => {
      return { ...obj, [key]: formatCurrency(value.amount) };
    },
    {}
  );

  payload.items.map((item) => ({
    ...item,
    price: formatCurrency(item.price),
  }));

  return { ...state, cart: payload.items, netAmounts: _netAmounts };
};

const removeItem = (state, action) => {
  const { id } = action.payload;
  const remainingCart = state.cart.filter((item) => item.id !== id);
  return [...remainingCart];
};

const emptyCart = (state, action) => {
  // const remainingCart = state.cart.filter((item) => item === "notEqualToMe:)");
  return [];
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
