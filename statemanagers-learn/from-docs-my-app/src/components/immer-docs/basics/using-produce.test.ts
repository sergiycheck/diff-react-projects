import { useTodoState } from './using-produce';

describe('useTodoState test', () => {
  test('changed state tests', () => {
    const { baseState, nextState } = useTodoState();

    // the new item is only added to the next state,
    // base state is unmodified
    expect(baseState.length).toBe(2);
    expect(nextState.length).toBe(3);

    // same for the changed 'done' prop
    expect(baseState[1].done).toBe(false);
    expect(nextState[1].done).toBe(true);

    // unchanged data is structurally shared
    expect(nextState[0]).toBe(baseState[0]);
    // ...but changed data isn't.
    expect(nextState[1]).not.toBe(baseState[1]);
  });
});
