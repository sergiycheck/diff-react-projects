import React, { memo, useCallback, useState } from 'react';
import produce from 'immer';

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export const TodoListImmerFirst = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 'React',
      title: 'Learn React',
      done: true,
    },
    {
      id: 'Immer',
      title: 'Try immer',
      done: false,
    },
  ]);
  const unfinishedTodoCount = todos.filter(
    (todo) => todo.done === false
  ).length;

  const handleToggle = useCallback((id: string) => {
    setTodos(
      produce((draft: Todo[]) => {
        const todo = draft.find((todo) => todo.id === id)!;
        todo.done = !todo.done;
      })
    );
  }, []);

  const handleAdd = useCallback(() => {
    setTodos(
      produce((draft) => {
        draft.push({
          id: 'todo_' + Math.random(),
          title: 'A new todo',
          done: false,
        });
      })
    );
  }, []);

  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>
      Tasks left: {unfinishedTodoCount}
    </div>
  );
};

const TodoItem = memo(
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
