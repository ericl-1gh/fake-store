export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';

export const addToCart = (product: any, count: number = 1) => ({
  type: ADD_TO_CART,
  payload: { product, count },
});

export const incrementQuantity = (productId: number) => ({
  type: INCREMENT_QUANTITY,
  payload: productId,
});

export const decrementQuantity = (productId: number) => ({
  type: DECREMENT_QUANTITY,
  payload: productId,
});

export const setCartItems = (items) => ({
  type: SET_CART_ITEMS,
  payload: items,
});


