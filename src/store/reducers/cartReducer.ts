import {
  ADD_TO_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  SET_CART_ITEMS,

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
        // Product exists, update the count
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          count: updatedItems[existingIndex].count + action.payload.count,
        };
        return { ...state, items: updatedItems };
      } else {
        // Product doesn't exist, add it to the cart
        return {
          ...state,
          items: [
            ...state.items,
            { ...action.payload.product, count: action.payload.count },
          ],
        };
      }


    case INCREMENT_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, count: item.count + 1 }
            : item
        ),
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        items: state.items
          .map((item) => {
            if (item.id === action.payload) {
              if (item.count > 1) {
                return { ...item, count: item.count - 1 };
              }
              // count === 1, will be removed in filter below
              return null;
            }
            return item;
          })
          .filter((item) => item !== null),
      };

    case SET_CART_ITEMS:
      return {
        ...state,
        items: action.payload, // server response already includes `count`
      };

    default:
      return state;
  }
};

export default cartReducer;
