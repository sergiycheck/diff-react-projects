import { combineReducers } from "redux";
import { filterTypes, todoActionTypes } from "./actionsData";

const createList = (filter) => {
  const handleToggle = (state, action) => {
    const { result: toggledId, entities } = action.payload;
    const { completed } = entities.todos[toggledId];

    const shouldRemove = (completed && filter === "active") || (!completed && filter === "completed");

    return shouldRemove ? state.filter((id) => id !== toggledId) : state;
  };

  const ids = (state = [], action) => {
    switch (action.type) {
      case todoActionTypes.RECEIVE_TODOS:
        return filter === action.filter ? action.payload.result : state;
      case todoActionTypes.ADD:
        return filter !== filterTypes.Completed ? [...state, action.payload.result] : state;
      case todoActionTypes.TOGGLE:
        return handleToggle(state, action);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case todoActionTypes.REQUEST_TODOS:
        return true;
      case todoActionTypes.RECEIVE_TODOS:
      case todoActionTypes.FAIL_TODOS:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case todoActionTypes.FAIL_TODOS:
        return action.message;
      case todoActionTypes.REQUEST_TODOS:
      case todoActionTypes.RECEIVE_TODOS:
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
