import { createSlice } from '@reduxjs/toolkit';

// Define the todos slice
const taskSlice = createSlice({
    name: 'task',
    initialState: [],
    reducers: {
      addTodo(state, action) {
        state.push(action.payload);
      },
      removeTodo(state, action) {
        return state.filter(todo => todo.id !== action.payload);
      },
    },
  });

  export const {addTodo, removeTodo} = taskSlice.actions

  export default taskSlice.reducer