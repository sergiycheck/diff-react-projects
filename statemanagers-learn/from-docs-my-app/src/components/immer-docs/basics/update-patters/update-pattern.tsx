import React from 'react';
import produce from 'immer';

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

type TodoLookUp = {
  [key: string]: Todo;
};

function useObjectMutations() {
  const [todosObj, setTodos] = React.useState<TodoLookUp>({
    id1: { id: 'id1', done: false, title: 'Take out the trash' },
    id2: { id: 'id2', done: false, title: 'Check Email' },
  });

  // add
  const addedTodosObj = produce(todosObj, (draft) => {
    draft['id3'] = { id: 'id3', done: false, title: 'Buy bananas' };
  });

  // delete
  const deletedTodosObj = produce(todosObj, (draft) => {
    delete draft['id1'];
  });

  // update
  const updatedTodosObj = produce(todosObj, (draft) => {
    draft['id1'].done = true;
  });

  const handleToggle = React.useCallback((id: Todo['id']) => {
    setTodos(
      produce((draft: TodoLookUp) => {
        const todo = draft[id]!;
        todo.done = !todo.done;
      })
    );
  }, []);

  return { addedTodosObj, deletedTodosObj, updatedTodosObj, handleToggle };
}

export function UpdatePatternsTodos() {
  const todosStates = useObjectMutations();
  const { handleToggle } = todosStates;

  return (
    <div>
      <h1>contains errors</h1>
      <p>added todos</p>
      <ul>
        {Object.entries(todosStates.addedTodosObj).map(([id, todo]) => (
          <TodoItem todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>
      <p>deleted todos</p>

      <ul>
        {Object.entries(todosStates.deletedTodosObj).map(([id, todo]) => (
          <TodoItem todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>

      <p>updated todos</p>

      <ul>
        {Object.entries(todosStates.updatedTodosObj).map(([id, todo]) => (
          <TodoItem todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>
    </div>
  );
}

const TodoItem = React.memo(
  ({ todo, onToggle }: { todo: Todo; onToggle: (id: string) => void }) => (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      {todo.title}
    </li>
  )
);
