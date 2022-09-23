import React, { memo, useCallback, useState } from 'react';
import produce from 'immer';
import { useImmer } from 'use-immer';
import { useImmerReducer } from 'use-immer';

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

function useTodosANdHandlersV2() {
  const [todos, setTodos] = useImmer([
    {
      id: 'React',
      title: 'Learn React',
      done: true,
    },
    {
      id: 'Immer',
      title: 'Try Immer',
      done: false,
    },
  ]);

  const unfinishedTodoCount = todos.filter(
    (todo) => todo.done === false
  ).length;

  const handleToggle = useCallback((id: Todo['id']) => {
    setTodos((draft: Todo[]) => {
      const todo = draft.find((todo) => todo.id === id)!;
      todo.done = !todo.done;
    });
  }, []);

  const handleAdd = useCallback(() => {
    setTodos((draft) => {
      draft.push({
        id: 'todo_' + Math.random(),
        title: 'A new todo',
        done: false,
      });
    });
  }, []);

  return {
    todos,
    handleAdd,
    handleToggle,
    unfinishedTodoCount,
  };
}

type ActionType = {
  type: 'toggle' | 'add';
  payload: any;
};
function useTodosWithReducerAndHandlersV1() {
  const [todos, dispatch] = React.useReducer(
    produce((draft: Todo[], action: ActionType) => {
      switch (action.type) {
        case 'toggle':
          const { id } = action.payload as { id: string };
          const todo = draft.find((todo) => todo.id === id)!;
          todo.done = !todo.done;
          break;
        case 'add':
          const { id: idNew } = action.payload as { id: string };

          draft.push({
            id: idNew,
            title: 'A new todo',
            done: false,
          });
          break;
      }
    }),
    [
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
    ]
  );

  const handleToggle = useCallback((id: Todo['id']) => {
    dispatch({
      type: 'toggle',
      payload: { id },
    });
  }, []);

  const handleAdd = useCallback(() => {
    dispatch({
      type: 'add',
      payload: { id: 'todo_' + Math.random() },
    });
  }, []);

  const unfinishedTodoCount = todos.filter(
    (todo) => todo.done === false
  ).length;

  return {
    todos,
    handleAdd,
    handleToggle,
    unfinishedTodoCount,
  };
}

function useTodosWithImmerReducer() {
  const [todos, dispatch] = useImmerReducer(
    (draft, action) => {
      switch (action.type) {
        case 'toggle':
          const { id } = action.payload as { id: string };

          const todo = draft.find((todo) => todo.id === id)!;
          todo.done = !todo.done;
          break;
        case 'add':
          const { id: newId } = action.payload as { id: string };
          draft.push({
            id: newId,
            title: 'A new todo',
            done: false,
          });
          break;
        default:
          break;
      }
    },
    [
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
    ]
  );

  const handleToggle = useCallback((id: Todo['id']) => {
    dispatch({
      type: 'toggle',
      payload: { id },
    });
  }, []);

  const handleAdd = useCallback(() => {
    dispatch({
      type: 'add',
      payload: { id: 'todo_' + Math.random() },
    });
  }, []);

  const unfinishedTodoCount = todos.filter(
    (todo) => todo.done === false
  ).length;

  return {
    todos,
    handleAdd,
    handleToggle,
    unfinishedTodoCount,
  };
}

// Redux-Toolkit uses immer under the hood

export const ReactAndImmerTodo = () => {
  const { todos, handleAdd, handleToggle, unfinishedTodoCount } =
    useTodosWithImmerReducer();
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
