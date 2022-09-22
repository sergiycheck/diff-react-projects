import produce from 'immer';

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

function useCreateCurriedProduce() {
  const baseState = [
    {
      id: 'JavaScript',
      title: 'Learn TypeScript',
      done: true,
    },
    {
      id: 'Immer',
      title: 'Try Immer',
      done: false,
    },
  ];

  const nextState = toggleTodo(baseState, 'Immer');

  function toggleTodo(state: Todo[], id: Todo['id']) {
    return produce(state, (draft) => {
      const todo = draft.find((todo) => todo.id === id)!;
      todo.done = !todo.done;
    });
  }

  return nextState;
}

function usingShortenedRightCurriedProduce() {
  // curried producer:
  const toggleTodo = produce((draft: Todo[], id: Todo['id']) => {
    const todo = draft.find((todo) => todo.id === id)!;
    todo.done = !todo.done;
  });

  const baseState: Todo[] = [
    {
      id: 'JavaScript',
      title: 'Learn TypeScript',
      done: true,
    },
    {
      id: 'Immer',
      title: 'Try Immer',
      done: false,
    },
  ];
  const nextState = toggleTodo(baseState, 'Immer');

  return nextState;
}

function useCurriedProducers() {
  return usingShortenedRightCurriedProduce();
}

export function CurriedProducers() {
  const state = useCurriedProducers();

  return (
    <div>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
}
