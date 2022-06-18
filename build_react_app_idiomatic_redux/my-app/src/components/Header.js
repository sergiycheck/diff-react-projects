import { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../redux/actionsData";

//connect explained
//https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e

function Header({ dispatch }) {
  const [text, setText] = useState("");
  const placeholder = "add new todo...";

  return (
    <header className="App-header">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text) return;
          dispatch(addTodo(text));
          setText("");
        }}
      >
        <input
          className="new-todo"
          placeholder={placeholder}
          autoFocus={true}
          value={text}
          onChange={(e) => {
            setText(e.target.value?.trim());
          }}
        />
        <button type="submit">add todo</button>
      </form>
    </header>
  );
}

//connect takes two arguments
//mapStateToProps
//mapDispatchToProps
export default connect(null, null)(Header);
