import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PersistConfig, createTransform, persistReducer, persistStore } from "redux-persist";
import userReducer, { logOut } from "../features/user/userSlice";
import accountReducer from "../features/account/accountSlice";
import { thunk } from "redux-thunk";
import authReducer from "../features/auth/authSlice"

const persistConfig: PersistConfig<RootState> = {
  key: "hundred-pay",
  storage: AsyncStorage,
  blacklist: ["auth"],
};

const rootReducer = combineReducers({
  user: userReducer,
  account: accountReducer,
  auth: authReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);

export const logoutUser = () => {
  AsyncStorage.clear();
};

// Define RootState
export type RootState = ReturnType<typeof rootReducer>;
