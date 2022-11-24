const quantityChange = (state, action) => {
  const { id, increment } = action.payload;

  const updatedObjects = state.cart.map((item) => {
    if (item.id === id) {
      console.log("item.quantity", item.quantity, "inventory", +item.inventory);
      const _inventory = +item.inventory;
      if (
        increment &&
        item.quantity <
          _inventory /* storeItems.find((shopItem) => shopItem.id === item.id).inventory*/
      ) {
        return { ...item, id: item.id, quantity: item.quantity + 1 };
      } else if (!increment && item.quantity > 0) {
        return { ...item, id: item.id, quantity: item.quantity - 1 };
      }
    }
    return item;
  });
  return [...updatedObjects];
};
const formatCurrency = (num) => (num / 100).toFixed(2);

const setCart = (state, payload) => {
  console.log("state", state);
  if (payload === "") return { ...state, cart: [] };

  console.log("payload in setcart", payload);

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
    deletions: [],
    cart: payload.items,
    netAmounts: _netAmounts,
  };
};
const setOrder = (state, payload) => {
  const { orderId, link } = payload;
  return {
    ...state,
    order: { orderId, payLink: link },
  };
};
const removeItem = (state, action) => {
  const { id } = action.payload;
  const remainingCart = state.cart.filter((item) => item.id !== id);
  const { uid } = state.cart.find(({ id: _id }) => _id === id);
  const cart = [...remainingCart];
  return { cart, removedItem: uid };
};

const emptyCart = (state, action) => {
  // const remainingCart = state.cart.filter((item) => item === "notEqualToMe:)");
  return [];
};

const reducers = { quantityChange, removeItem, emptyCart, setCart, setOrder };

export default reducers;
