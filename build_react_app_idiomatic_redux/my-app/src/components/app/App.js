import "./App.css";
import Header from "../Header";
import VisibleTodoList from "../VisibleTodoList";
import VisibilityFilter from "../VisibilityFilter";

function App() {
  return (
    <div className="App">
      <Header />
      <VisibleTodoList />
      <VisibilityFilter />
    </div>
  );
}

export default App;
