import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const Todo = ({ onClick, completed, text }) => {
  return (
    <li onClick={onClick} className={cx("todo-item", completed && "todo-item-completed")}>
      {!completed ? "👋" : "👌"}
      {text}
    </li>
  );
};

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;
