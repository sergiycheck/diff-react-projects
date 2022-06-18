import "./App.css";
import { useState } from "react";

import { useSelector, useDispatch } from 'react-redux';
import {actions,selectCount } from './counterSlice';


//TODO: cover App with tests 

function App() {
  
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  // const render = () =>{
  //   const state = store.getState();
  //   console.log('render state.counter ',state.counter);
  //   const {value} = state.counter;
  // }
  // render();
  // store.subscribe(render);

  const incrementHandler = (_)=>{
    console.log('click increment');

    dispatch({type:actions.counterIncremented});
  }
  const decrementHandler = (_)=>{
    dispatch({type:actions.counterDecremented});
  }
  const incrementIfOddHandler = (_)=>{

    console.log('incrementIfOddHandler count ', count);
    if(count%2!==0){
      dispatch({type:actions.counterIncremented});
    }
  }
  const incrementAsyncHandler = (_)=>{
    setTimeout(()=>{
      dispatch({type:actions.counterIncremented});
    },1000)
  }

  const onChangeInputHandler = (event)=>{
    setInputIncrementAmountVal(Number(event.target.value)||0)
  }

  const [inputIncrementAmountVal, setInputIncrementAmountVal] = useState('0');
  const incrementAmountHandler = ()=>{
    dispatch({type:actions.counterIncrementAmount, payload:Number(inputIncrementAmountVal)||0});
  }
  const decrementAmountHandler = ()=>{
    dispatch({type:actions.counterDecrementAmount, payload:Number(inputIncrementAmountVal)||0});
  }
  return (
    <div className="App">
      <section>
        <div>
          <p>Clicked: {count} times</p>
        </div>
        <div>
          <button
          onClick={incrementHandler}
          >+</button>
          <button
          onClick={decrementHandler}
          >-</button>
          <button
          onClick={incrementIfOddHandler}
          >increment if odd
          </button>
          <button
          onClick={incrementAsyncHandler}
          >increment async</button>
        </div>
        <div>
          <input
            value={inputIncrementAmountVal}
            onChange={(event)=>onChangeInputHandler(event)} 
            ></input>
          <button
            onClick={incrementAmountHandler}
          >increment amount</button>
          <button
            onClick={decrementAmountHandler}
          >decrement amount</button>
        </div>
      </section>
    </div>
  );
}

export default App;
