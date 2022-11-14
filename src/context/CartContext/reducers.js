const quantityChange = (state, action) => {
  const { id, increment, quantity } = action.payload;

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
  console.log("payload in set items", payload);
  return {
    ...state,
    cart: payload.items,
    netAmounts: _netAmounts,
    orderId: payload.orderId,
  };
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

const reducers = { quantityChange, removeItem, emptyCart, setCart };

export default reducers;
