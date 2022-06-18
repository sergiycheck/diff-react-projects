import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { throttle } from "lodash";
import { loadState, saveState } from "./localStorage";
import usersReducer from "../components/other/usersSlice";
import counterReducer from "../components/Counter/counterSlice";
import { loggerMiddleware } from "./middewares";

const preloadedState = loadState();
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
  },
  preloadedState: preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(loggerMiddleware),
});

const numberOfMillisecondsToSaveTodos = 1000;
store.subscribe(
  throttle(() => {
    const state = store.getState();
    saveState({
      ...state,
    });
  }, numberOfMillisecondsToSaveTodos)
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
