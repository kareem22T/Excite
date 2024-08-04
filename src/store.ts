import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import serviceReducer from './features/serviceSlice';
import settingReducer from './features/settingsSlice';
import workReducer from './features/worksSlice';

const rootReducer = combineReducers({
  services: serviceReducer, 
  settings: settingReducer, 
  works: workReducer, 
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [], // Persist only the auth slice
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
