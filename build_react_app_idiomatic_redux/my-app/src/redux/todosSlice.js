import { combineReducers } from "redux";
import { filterTypes } from "./actionsData";
import byId, * as fromById from "./byId";
import createList, * as fromList from "./createList";

const listByFilter = combineReducers({
  all: createList(filterTypes.All),
  active: createList(filterTypes.Active),
  completed: createList(filterTypes.Completed),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

export default todos;

const selectGlobalTodos = (state) => state.todos;

export const getVisibleTodos = (state, visibilityFilter) => {
  const todos = selectGlobalTodos(state);
  let filteredTodos = todos.listByFilter[visibilityFilter];
  const ids = fromList.getIds(filteredTodos);
  return ids.map((id) => fromById.getTodo(todos.byId, id));
};

export const getIsFetching = (state, filter) => fromList.getIsFetching(selectGlobalTodos(state).listByFilter[filter]);
export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(selectGlobalTodos(state).listByFilter[filter]);
