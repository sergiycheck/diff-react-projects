const stateName: string = "state";

export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem(stateName);
    if (!serializedState) return;
    const parsedState = JSON.parse(serializedState);
    return parsedState;
  } catch (e) {
    return;
  }
};

export const saveState = (state: unknown) => {
  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem(stateName, serializedState);
  } catch (err) {}
};
