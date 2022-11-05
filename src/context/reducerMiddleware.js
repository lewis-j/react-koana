import { useReducer } from "react";
function useReducerWithThunk(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  let customDispatch = (action) => {
    console.log("dispatching middleware", typeof action);
    if (typeof action === "function") {
      action(customDispatch);
    } else {
      dispatch(action);
    }
  };
  return [state, customDispatch];
}

export default useReducerWithThunk;
