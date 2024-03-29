import { hookstate, useHookstate } from '@hookstate/core';

const globalState = hookstate(0);

setInterval(() => globalState.set((p) => p + 1), 1000);

export const ExampleComponentGlobalState = () => {
  const state = useHookstate(globalState);
  return (
    <>
      <b>Counter value: {state.get()}</b> (watch +1 every 1 seconds){' '}
      <button onClick={() => state.set((p) => p + 1)}>Increment</button>
    </>
  );
};
