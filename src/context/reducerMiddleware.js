import { useReducer } from "react";
function useReducerWithThunk(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  let customDispatch = (action, _state) => {
    if (typeof action === "function") {
      action({ dispatch: customDispatch, state });
    } else {
      dispatch(action);
    }
  };
  return [state, customDispatch];
}

export default useReducerWithThunk;
