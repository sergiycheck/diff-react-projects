import { combineReducers } from "redux";
import todosReducer from "./todosSlice";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
