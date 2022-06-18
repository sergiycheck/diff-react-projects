import { Middleware } from "redux";

export const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  logm("dispatching", action);
  let result = next(action);
  logm("next state", storeAPI.getState());
  return result;
};
export const logm = (...args: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};
