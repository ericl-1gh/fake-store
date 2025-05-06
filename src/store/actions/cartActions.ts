export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';

export const addToCart = (product: any, quantity: number = 1) => ({
  type: ADD_TO_CART,
  payload: { product, quantity },
});

export const incrementQuantity = (productId: number) => ({
  type: INCREMENT_QUANTITY,
  payload: productId,
});

export const decrementQuantity = (productId: number) => ({
  type: DECREMENT_QUANTITY,
  payload: productId,
});
