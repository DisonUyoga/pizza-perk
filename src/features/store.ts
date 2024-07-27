// import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import AuthSlice from "./slices/AuthSlice";
import productSlice from "./slices/productSlice";
import adminSlice from "./slices/adminSlice";


import { configureStore } from '@reduxjs/toolkit'

export const store = () => {
  return configureStore({
      reducer: {
    cart: cartSlice,
    auth: AuthSlice,
    product: productSlice,
    admin: adminSlice,
  },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
