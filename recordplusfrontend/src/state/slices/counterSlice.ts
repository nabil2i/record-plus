import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1 //pseudo mutable code
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    decrement: (state) => {
      state.value -= 1
    }
  },

  //async reducers
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, () => {
        // console.log("Pending")
      })
      .addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      });
    // builder.addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // });
  },
});

// async action
export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
)

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// const increment = { type: "INCREMENT", payload: 1}

export default counterSlice.reducer;
