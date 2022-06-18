import { normalize } from "normalizr";
import * as schema from "./schema";
import * as api from "../api/server";
import { getIsFetching } from "./todosSlice";

export const todoActionTypes = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  SET_FILTER: "SET_FILTER",
  RECEIVE_TODOS: "RECEIVE_TODOS",
  REQUEST_TODOS: "REQUEST_TODOS",
  FAIL_TODOS: "FAIL_TODOS",
};

export const filterTypes = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

export const fetchTodos = (filter) => async (dispatch, getState) => {
  const currentlyProcessingARequest = Boolean(getIsFetching(getState(), filter));
  if (currentlyProcessingARequest) {
    return Promise.resolve();
  }

  dispatch({
    type: todoActionTypes.REQUEST_TODOS,
    filter,
  });

  try {
    const response = await api.fetchTodos(filter);
    return dispatch({
      type: todoActionTypes.RECEIVE_TODOS,
      filter,
      payload: normalize(response, schema.arrayOfTodos),
    });
  } catch (error) {
    return dispatch({
      type: todoActionTypes.FAIL_TODOS,
      filter,
      message: error.message || "There an error occured",
    });
  }
};

export const addTodo = (text) => async (dispatch) => {
  const todo = await api.addTodo(text);
  dispatch({ type: todoActionTypes.ADD, payload: normalize(todo, schema.todo) });
};

export const toggleTodo = (id) => async (dispatch) => {
  const todo = await api.toggleTodo(id);

  dispatch({ type: todoActionTypes.TOGGLE, payload: normalize(todo, schema.todo) });
};
