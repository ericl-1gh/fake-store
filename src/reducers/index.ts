import {combineReducers} from '@reduxjs/toolkit';
import {userDetails} from './userDetails';
import cartReducer from 'store/reducers/cartReducer';
import { orderReducer } from 'store/reducers/orderReducer';

const rootReducer = combineReducers({
  userDetails: userDetails,
  cart: cartReducer,
  order: orderReducer
});
export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
