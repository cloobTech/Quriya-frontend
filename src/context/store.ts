import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  REGISTER,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "@src/services/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalReducer from "@features/shared/slice/modal";
import organizationReducer from "@features/organization/slice/organization";
import { authReducer } from "@features/auth";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["authentication", "organization"],
  blacklist: [baseApi.reducerPath],
};

const appReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  modal: modalReducer,
  authentication: authReducer,
  organization: organizationReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === "authentication/logout") {
    // Clear all persisted state
    storage.removeItem("persist:root");
    state = undefined;
  }
  //@ts-ignore
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "modal/openModal",
        ],
        ignoredPaths: ["modal.content", "modal.content.$$typeof"],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

// ✅ This enables refetchOnFocus/refetchOnReconnect features in RTK Query
setupListeners(store.dispatch);

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
