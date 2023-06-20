import { combineReducers } from '@reduxjs/toolkit';
import searchReducer from './searchSlice.js'
import todosSlice from './todosSlice.js'

// Combine the slices into a root reducer
const rootReducer = combineReducers({
  search: searchReducer,
  todos: todosSlice.reducer,
});

// Export the action creators

export const { addTodo, removeTodo } = todosSlice.actions;

export default rootReducer;
