// export const loggerMiddleware = (storeAPI) => (next) => (action) => {
//   devLog("dispatching", action);
//   let result = next(action);
//   devLog("next state", storeAPI.getState());
//   return result;
// };

export function devLog(...args) {
  /* eslint-disable no-console */
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
  /* eslint-disable no-console */
}

export const loggerMiddleware = (store) => (next) => {
  /* eslint-disable no-console */
  if (!console.group) {
    return next;
  }
  return (action) => {
    console.group(action.type);
    console.log("%c prev state", "color: gray", store.getState());
    console.log("%c action", "color: blue", action);
    const returnValue = next(action);
    console.log("%c next state", "color: green", store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
  /* eslint-disable no-console */
};

// implementing currying pattern
export const promiseMiddeware = (store) => (next) => (action) => {
  if (typeof action.then === "function") {
    return action.then(next);
  }
  return next(action);
};
