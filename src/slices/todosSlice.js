import { createSlice } from '@reduxjs/toolkit';

// Define the todos slice
const todosSlice = createSlice({
    name: 'todos',
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

  export default todosSlice