
//TODO: cover counterReducer with tests 

const initialCounterState = {
  value: 0,
};

export const actions = {
  counterIncremented: "counter/incremented",
  counterDecremented: "counter/decremented",
  counterIncrementAmount:'counter/incrementAmount',
  counterDecrementAmount:'counter/decrementAmount'
};

export const counterReducer = (state = initialCounterState, action) => {
  console.log("counterReducer", state, action);

  switch (action.type) {
    case actions.counterIncremented:
      const newStateIncremented = { ...state, value: state.value + 1 };
      console.log("actions.counterIncremented newState ", newStateIncremented);
      return newStateIncremented;
    
    case actions.counterDecremented:
      const newStateDecremented = { ...state, value: state.value - 1 };
      console.log(" actions.counterDecremented newState ", newStateDecremented);
      return newStateDecremented;
    
    case actions.counterIncrementAmount:
      const newStateIncrementAmount = { ...state, value: state.value + action.payload };
      console.log(" actions.counterIncrementAmount newState ", newStateIncrementAmount);
      return newStateIncrementAmount;

    case actions.counterDecrementAmount:
      const newStateDecrementAmount = { ...state, value: state.value - action.payload };
      console.log(" actions.newStateDecrementAmount newState ", newStateDecrementAmount);
      return newStateDecrementAmount;
    
      default:
      return state;
  }
};

export const selectCount = (state)=>{
	return state.counter.value;
}


