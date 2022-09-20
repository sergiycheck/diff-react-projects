import React from 'react';
import { useHookstate } from '@hookstate/core';

export const LocalState = () => {
  const state = useHookstate(0);
  return (
    <>
      <b>Counter value: {state.get()} </b>
      <button onClick={() => state.set((p) => p + 1)}>Increment</button>
    </>
  );
};
