import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";


const middlewareNoSerializableCheck = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {

  },
  middleware: middlewareNoSerializableCheck,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
