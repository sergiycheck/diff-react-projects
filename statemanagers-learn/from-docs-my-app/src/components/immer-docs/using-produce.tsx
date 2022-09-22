import produce from 'immer';

type Todo = {
  title: string;
  done?: boolean;
};

export function useTodoState() {
  const baseState: Todo[] = [
    {
      title: 'Learn TypeScript',
      done: true,
    },
    {
      title: 'Try Immer',
      done: false,
    },
  ];

  const nextState = produce(baseState, (draftState) => {
    draftState.push({ title: 'Tweet about it' });
    draftState[1].done = true;
  });

  const obj = { baseState, nextState };
  return obj;
}

export function UsingProduceTodos() {
  const state = useTodoState();

  return (
    <div>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
}
