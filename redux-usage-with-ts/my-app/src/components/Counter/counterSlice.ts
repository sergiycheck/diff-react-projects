import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { RootState, AppThunk } from "../../app/store";
import { fetchCount } from "./counterAPI";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
  message: string;
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
  message: "",
};

export const incrementAsync = createAsyncThunk("counter/fetchCount", async (amount: number) => {
  const response = await fetchCount(amount);
  return response.data;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    getMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount, getMessage } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;
export const selectMessage = (state: RootState) => state.counter.message;

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());

    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export const thunkSendMessage =
  (message: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const response = (await exampleApi(message)) as string;
    dispatch(getMessage(response));
  };

//fixing Circular types in exported slices
//export default counterSlice.reducer as Reducer<Counter>
export default counterSlice.reducer;

function exampleApi(message: string) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("message from api " + message);
    }, 1000);
  });
}
