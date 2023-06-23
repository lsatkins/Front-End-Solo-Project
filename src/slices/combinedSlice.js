import { combineReducers } from '@reduxjs/toolkit';
import searchReducer from './searchSlice.js'
import taskReducer from './taskSlice.js'

// Combine the slices into a root reducer
const rootReducer = combineReducers({
  search: searchReducer,
  task: taskReducer,
});

// Export the action creators

export default rootReducer;
