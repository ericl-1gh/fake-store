import {combineReducers} from '@reduxjs/toolkit';
import {userDetails} from './userDetails';
import cartReducer from 'store/reducers/cartReducer';

const rootReducer = combineReducers({
  userDetails: userDetails,
  cart: cartReducer
});
export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
