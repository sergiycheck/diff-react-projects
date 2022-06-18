
import { configureStore } from "@reduxjs/toolkit";
import {counterReducer} from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// console.log('store.getState() ', store.getState()) // {counter{...}}


/**
 * Redux application data frlow 
 * *Initial step:
 *  - A redux store is created using a root reducer function.
 *  - The store calls the root reducer once and saves the return value as its initial state.
 *  - When the UI is first rendered, UI components access the current state of the Redux store, and use that data to decide 
 *    what to render. They also subscribe to any future store updates so they can know if the state has changed.
 * *Updates:
 *  - Something happens in the app, such as a user clicking a button
 *  - The app code dispatches an action to the Redux store, like dispatch({type: 'counter/incremented'})
 *  - The store runs the reducer function again with the previous state and the current action, and saves the return 
 *    value as the new state.
 *  - The store notifies all parts of the UI that are subscribed that the store has been updated.
 *  - Each UI component that needs data from the store checks to see if the parts of the state they need have changed.
 *  - Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown 
 *    on the screen.
 */