import { createSlice } from '@reduxjs/toolkit';

// Define the counter slice
const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      count: 23
    },
    reducers: {
      increment(state) {
        state.count++;
      },
      decrement(state) {
        state.count--;
      },
    },
  });

  export default counterSlice