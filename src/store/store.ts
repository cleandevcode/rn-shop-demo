import { combineReducers, createStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slice/cartSlice";

const appReducer = combineReducers({
  cart: cartReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
