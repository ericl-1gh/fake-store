import {combineReducers} from '@reduxjs/toolkit';
import {userDetails} from './userDetails';

const rootReducer = combineReducers({
  userDetails: userDetails,
});
export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
