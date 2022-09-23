import { produceWithPatchesTodos, useStateWithPatches } from './patches';

describe('patches tests', () => {
  test('patches is as expected', () => {
    const { fork, statePatchedByChanged, stateUndoPatch } =
      useStateWithPatches();

    expect(fork).toEqual({
      name: 'Micheal',
      age: 33,
    });

    // state now contains the changes from both code paths!
    expect(statePatchedByChanged).toEqual({
      name: 'Other name', // changed by the server
      age: 33, // changed by the wizard
    });

    expect(stateUndoPatch).toEqual({
      name: 'Other name', // Not reverted
      age: 32, // Reverted
    });
  });

  test('produce with pathces is as expected', () => {
    const obj = produceWithPatchesTodos();

    expect(obj.inversePathces).toEqual([
      {
        op: 'replace',
        path: ['age'],
        value: 32,
      },
    ]);

    expect(obj.nextState).toEqual({
      age: 27,
      name: 'Micheal',
    });

    expect(obj.patches).toEqual([
      {
        op: 'replace',
        path: ['age'],
        value: 27,
      },
    ]);
  });
});
