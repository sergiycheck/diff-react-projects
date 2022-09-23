import React from 'react';
import produce from 'immer';

type Todo = {
  title: string;
  done: boolean;
};

type User = {
  name: string;
  todos: Todo[];
};

type StoreType = {
  users: Map<string, User>;
};

function useNestedDataStructures() {
  // example complex data structure
  const store: StoreType = {
    users: new Map([
      [
        '17',
        {
          name: 'Michel',
          todos: [
            {
              title: 'Get coffee',
              done: false,
            },
            {
              title: 'eat',
              done: true,
            },
            { title: 'walk', done: false },
            { title: 'programming', done: true },
          ],
        },
      ],
      [
        '23',
        {
          name: 'Name 2',
          todos: [
            {
              title: 'do something',
              done: true,
            },
          ],
        },
      ],
    ]),
  };

  // updating something deeply in-an-object-in-an-array-in-a-map-in-an-object:
  const updatedDeeplyInAnObjInArrInMapInObj = produce(store, (draft) => {
    draft.users.get('17')!.todos[0].done = true;
  });

  // filtering out all unfinished todo's
  const filteredOutAllUnfinishedTodos = produce(store, (draft) => {
    const user = draft.users.get('17')!;
    // when filtering, creating a fresh collection is simpler than
    // removing irrelevant items
    user.todos = user.todos.filter((todo) => todo.done);
  });

  return {
    store,
    updatedDeeplyInAnObjInArrInMapInObj,
    filteredOutAllUnfinishedTodos,
  };
}

export function NestedDataStructures() {
  const diffUpdatedNestedDataStructures = useNestedDataStructures();

  return (
    <div>
      {Object.entries(diffUpdatedNestedDataStructures).map(
        ([key, storeVariant]) => (
          <div key={key}>
            <p>{key}</p>
            <StoreValiantList storeVariant={storeVariant} />
            <hr />
          </div>
        )
      )}
    </div>
  );
}

const StoreValiantList = ({ storeVariant }: { storeVariant: StoreType }) => {
  return (
    <div>
      {Object.entries(storeVariant).map(([key, store]) => {
        return (
          <div key={key}>
            {Array.from(store.entries()).map(([name, user]) => (
              <div key={name}>
                <p>name: {user.name}</p>
                <p>todos:</p>
                <TodosList todos={user.todos} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const TodosList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div>
      <ul>
        {todos.map((todo, i) => (
          <TodoItem todo={todo} key={i} num={i} />
        ))}
      </ul>
    </div>
  );
};

const TodoItem = React.memo(({ todo, num }: { todo: Todo; num: number }) => (
  <li>
    {num}{' '}
    <i style={{ textDecoration: todo?.done ? 'line-through' : 'none' }}>
      {todo.title}
    </i>
  </li>
));
