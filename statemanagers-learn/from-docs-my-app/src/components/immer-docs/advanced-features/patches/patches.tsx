import produce, { applyPatches, Patch } from 'immer';

// version 6
import { enablePatches, produceWithPatches } from 'immer';
enablePatches();

type StateType = {
  name: string;
  age: number;
};

export const state: StateType = {
  name: 'Micheal',
  age: 32,
};

export function useStateWithPatches() {
  // Let's assume the user is in a wizard, and we don't know whether
  // his changes should end up in the base state ultimately or not...
  let fork = state;

  // all the changes the user made in the wizard
  const changes: Patch[] = [];

  // the inverse of all the changes made in the wizard
  const inverseChanges: Patch[] = [];

  fork = produce(
    fork,
    (draft) => {
      draft.age = 33;
    },
    // The third argument to produce is a callback to which the patches will be fed
    (patches, inversePatches) => {
      changes.push(...patches);
      inverseChanges.push(...inversePatches);
    }
  );

  // In the meantime, our original state is replaced, as, for example,
  // some changes were received from the server
  const stateChangedFromServer = produce(state, (draft) => {
    draft.name = 'Other name';
  });

  // When the wizard finishes (successfully) we can
  //replay the changes that were in the fork onto the *new* state!
  const statePatchedByChanged = applyPatches(stateChangedFromServer, changes);

  // Finally, even after finishing the wizard, the user might change his mind and undo his changes...
  const stateUndoPatch = applyPatches(statePatchedByChanged, inverseChanges);

  return { statePatchedByChanged, stateUndoPatch, fork };
}

export function produceWithPatchesTodos() {
  const [nextState, patches, inversePathces] = produceWithPatches(
    state,
    (draft: StateType) => {
      draft.age = 27;
    }
  );

  const obj = { nextState, patches, inversePathces };

  return obj;
}

export default function AdvancedImmerPatches() {
  const obj = produceWithPatchesTodos();

  return <div>{JSON.stringify(obj)}</div>;
}
