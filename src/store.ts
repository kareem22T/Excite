import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './features/auth/authSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';
import cartReducer from './features/cart/cartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'], // Persist only the auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store }; // Ensure the store is exported correctly
export default store;
