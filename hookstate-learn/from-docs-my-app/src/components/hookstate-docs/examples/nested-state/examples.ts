import { useHookstate } from '@hookstate/core';
import { none } from '@hookstate/core';

function useSettingObjectToState() {
  const state = useHookstate({ a: 1, b: 2 });
  state.set({ a: 2, b: 3 });

  console.log('state ', state);
  return state;
}

function useGetNamesOfProps() {
  const state = useHookstate({ a: 1, b: 2 });
  const keys = state.keys; // will be ['a', 'b'] for the above example
  console.log('keys', keys);

  return state;
}

function useUpdateExistingProperty() {
  const state = useHookstate({ a: 1, b: 2 });
  state.a.set((p) => p + 1); // increments value of property a
  // or
  state['a'].set((p) => p + 1);
  // or
  state.merge((p) => ({ a: p.a + 1 }));

  console.log('state updated', state);

  return state;
}

function useAddNewProperty() {
  // notice b property is optional
  const state = useHookstate<{ a: number; b?: number }>({ a: 1 });
  console.log('intial state', state);

  state.b.set(2);
  // or
  state['b'].set(2);
  // or
  state.merge({ b: 2 });

  console.log(state);

  return state;
}

function useDeleteExistingProp() {
  // notice b property is optional
  const state = useHookstate<{ a: number; b?: number }>({ a: 1, b: 2 });
  state.b.set(none);
  // or
  // state['b'].set(none);
  // or
  // state.merge({ b: none });

  console.log(state);

  return state;
}

function useSwappingTwoProps() {
  const state = useHookstate<Record<string, number>>({ a: 1, b: 2 });
  state.merge((p) => ({ b: p.a, a: p.b }));

  console.log(state);
  return state;
}

function usePartialUpdate() {
  const state = useHookstate<Record<string, number>>({
    propertyToUpdate: 1,
    propertyToDelete: 2,
  });
  state.merge({
    propertyToUpdate: 2,
    propertyToDelete: none,
    propertyToAdd: 1,
  }); // state value will be: { propertyToUpdate: 2, propertyToAdd: 1 }

  console.log(state);
  return state;
}

function useAdvancedMutations() {
  function useSettingNewVal() {
    const state = useHookstate([1, 2]);
    state.set([2, 3]);

    state.set((p) => [p[0] + 1, p[1] - 1]);
    return state;
  }

  function gettingIndexes() {
    const state = useHookstate([1, 2]);
    console.log(state.keys);
    return state;
  }

  function updatingExistingEl() {
    const state = useHookstate([1, 2]);
    const first = state[0];
    first.set((p) => p + 1);

    state.merge((p) => {
      const first = p[0];

      return {
        0: first + 1,
      };
    });
    return state;
  }

  function appendingNewEl() {
    const state = useHookstate([1000]);

    // TODO: fix causes to many re-renderx
    // state[state.length].set(2000);
    // or
    state.merge([2000]);

    console.log('state ', state);
    return state;
  }

  function deleteExistingEl() {
    const state = useHookstate([1000, 2000, 3000]);

    state[1].set(none);
    // or
    // state.merge({ 1: none });

    console.log(state);

    return state;
  }

  function concatenateAnotherArr() {
    const state = useHookstate([1000, 2000]);

    state.merge([3000, 4000]);

    console.log(state);

    return state;
  }

  function swappingTwoElementsrArr() {
    const state = useHookstate([1000, 2000]);

    state.merge((p) => ({ 1: p[0], 0: p[1] }));

    console.log(state);

    return state;
  }

  function splicingElements() {
    const state = useHookstate([3000, 4000]);
    state.set((p) => {
      p.splice(0, 0, 1000, 2000);
      return p;
    });

    console.log(state);

    return state;
  }

  function partialUpdatesAndDeletions() {
    const state = useHookstate([1000, 2000, 3000]);
    state.merge({
      0: 2,
      1: none,
      3: 4000,
    }); // state value will be: [2, 3000, 4000]

    console.log(state);

    return state;
  }

  function stringMutations() {
    const state = useHookstate('Hello ');

    state.merge(' World'); // state.value will be "Hello World"
    // or the same
    state.set((p) => p + ' World');

    console.log(state);

    return state;
  }

  return stringMutations();
}

export function useNestedStateExamples() {
  return useAdvancedMutations();
}
