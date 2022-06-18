const stateName = "state";

export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem(stateName);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem(stateName, serializedState);
  } catch (err) {}
};
