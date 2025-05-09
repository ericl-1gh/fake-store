import { SET_ORDER_ITEMS } from "store/actions/orderActions";

const initialState = {
    items: [],
  };

export const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ORDER_ITEMS:
      return {
        ...state,
        items: action.payload, // server response already includes `count`
      };


    default:
      return state;
  }
};