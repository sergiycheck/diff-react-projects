import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { getVisibleTodos, getIsFetching, getErrorMessage } from "../redux/todosSlice";
import { toggleTodo, filterTypes, fetchTodos } from "../redux/actionsData";
import TodoList from "./TodoList";
import FetchError from "./FetchTodoError";

const VisibleTodoList = ({ todos, isFetching, filter, errorMessage, toggleTodo, fetchTodos }) => {
  const memoizedFetchTodos = useCallback(() => {
    fetchTodos(filter);
  }, [filter, fetchTodos]);

  useEffect(() => {
    memoizedFetchTodos();
  }, [memoizedFetchTodos]);

  if (isFetching && !todos.length) {
    return <p>Loading...</p>;
  }
  if (errorMessage && !todos.length) {
    return <FetchError message={errorMessage} onRetry={() => memoizedFetchTodos()}></FetchError>;
  }

  return <TodoList todos={todos} onTodoClick={toggleTodo}></TodoList>;
};

VisibleTodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, text: PropTypes.string, completed: PropTypes.bool })
  ),
  filter: PropTypes.oneOf([...Object.values(filterTypes)]).isRequired,
  errorMessage: PropTypes.string,
  toggleTodo: PropTypes.func.isRequired,
  fetchTodos: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { match }) => {
  let filter = match.params.filter || filterTypes.All;
  if (!Object.values(filterTypes).includes(filter.toLowerCase())) filter = filterTypes.All;

  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
    errorMessage: getErrorMessage(state, filter),
  };
};

//if the args passed to the callback are passed through to the action creator with the same order
// we can use shorter configuration object. Config object maps the names of the callback props
//to the corresponding action creator function

const VisibleTodoListWithRouter = withRouter(connect(mapStateToProps, { toggleTodo, fetchTodos })(VisibleTodoList));

export default VisibleTodoListWithRouter;
