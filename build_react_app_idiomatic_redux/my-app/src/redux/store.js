import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { throttle } from "lodash";
import {
  // loadState,
  saveState,
} from "./localStorage";
import rootReducer from "./reducer";

const configureStore = () => {
  // const preloadedState = loadState();

  const middlewares = [thunk];

  if (process.env.NODE_ENV === "development") {
    middlewares.push(createLogger());
  }

  const store = createStore(
    rootReducer,
    // preloadedState,
    applyMiddleware(...middlewares)
  );

  const numberOfMillisecondsToSaveTodos = 1000;
  store.subscribe(
    throttle(() => {
      const state = store.getState();
      saveState({
        todos: state.todos,
      });
    }, numberOfMillisecondsToSaveTodos)
  );

  return store;
};

export default configureStore;
