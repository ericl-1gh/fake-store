import {
    ADD_TO_CART,
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY,
  } from '../actions/cartActions';
  
  const initialState = {
    items: [],
  };
  
  const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case ADD_TO_CART:
        const existingIndex = state.items.findIndex(
          (item) => item.id === action.payload.product.id
        );
  
        if (existingIndex >= 0) {
          const updatedItems = [...state.items];
          updatedItems[existingIndex].quantity += action.payload.quantity;
          return { ...state, items: updatedItems };
        } else {
          return {
            ...state,
            items: [
              ...state.items,
              { ...action.payload.product, quantity: action.payload.quantity },
            ],
          };
        }
  
      case INCREMENT_QUANTITY:
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
  
      case DECREMENT_QUANTITY:
        return {
          ...state,
          items: state.items
            .map((item) =>
              item.id === action.payload && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  