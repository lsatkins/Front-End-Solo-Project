import { combineReducers } from '@reduxjs/toolkit';
import counterSlice from './counterSlice'
import todosSlice from './todosSlice'

// Combine the slices into a root reducer
const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  todos: todosSlice.reducer,
});

// Export the action creators
export const { increment, decrement } = counterSlice.actions;
export const { addTodo, removeTodo } = todosSlice.actions;

export default rootReducer;
