import React from 'react';
import produce from 'immer';

type Todo = {
  id: string;
  body: string;
  done: boolean;
};

function useTodosArrayWithDiffStateUpdates() {
  const todosArray: Todo[] = [
    { id: 'id1', done: true, body: 'Take out the trash' },
    { id: 'id2', done: false, body: 'Check Email' },
  ];

  // add
  const addedTodosArray = produce(todosArray, (draft) => {
    draft.push({ id: 'id3', done: false, body: 'Buy bananas' });
  });

  // delete by index
  const deletedTodosArray = produce(todosArray, (draft) => {
    draft.splice(3 /*the index */, 1);
  });

  // update by index
  const updatedTodosArray = produce(todosArray, (draft) => {
    draft[1].done = true;
  });

  // insert at index
  const insertAtIndexTodosArray = produce(todosArray, (draft) => {
    draft.splice(3, 0, { id: 'id3', done: false, body: 'Buy bananas' });
  });

  // remove last item
  const removeLastItemTodosArray = produce(todosArray, (draft) => {
    draft.pop();
  });

  // remove first item
  const removedFirstItemTodosArray = produce(todosArray, (draft) => {
    draft.shift();
  });

  // add item at the beginning of the array
  const unshiftTodosArray = produce(todosArray, (draft) => {
    draft.unshift({ id: 'id3', done: false, body: 'Buy bananas' });
  });

  // delete by id
  const deletedByIdTodosArray = produce(todosArray, (draft) => {
    const index = draft.findIndex((todo) => todo.id === 'id1');
    if (index !== -1) draft.splice(index, 1);
  });

  // update by id
  const updatedByIdTodosArray = produce(todosArray, (draft) => {
    const index = draft.findIndex((todo) => todo.id === 'id1');
    if (index !== -1) draft[index].done = true;
  });

  // filtering items
  const filteredTodosArray = produce(todosArray, (draft) => {
    // creating a new state is simpler in this example
    // (note that we don't need produce in this case,
    // but as shown below, if the filter is not on the top
    // level produce is still pretty useful)
    return draft.filter((todo) => todo.done);
  });

  return {
    todosArray,
    addedTodosArray,
    deletedTodosArray,
    updatedTodosArray,
    deletedByIdTodosArray,
    insertAtIndexTodosArray,
    removeLastItemTodosArray,
    removedFirstItemTodosArray,
    unshiftTodosArray,
    updatedByIdTodosArray,
    filteredTodosArray,
  };
}

export function ArrayMutationsTodos() {
  const todosStates = useTodosArrayWithDiffStateUpdates();

  return (
    <div>
      {Object.entries(todosStates).map(([key, todos]) => (
        <TodosList title={key} key={key} todos={todos} />
      ))}
    </div>
  );
}

const TodosList = ({ todos, title }: { todos: Todo[]; title: string }) => {
  return (
    <div>
      <p>{title}</p>
      <ul>
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
};

const TodoItem = React.memo(({ todo }: { todo: Todo }) => (
  <li>
    <i style={{ textDecoration: todo?.done ? 'line-through' : 'none' }}>
      {todo.body}
    </i>
  </li>
));
