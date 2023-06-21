import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {findQuery} from '../functions'

const API_KEY = process.env.REACT_APP_API_KEY;

const initialState = {
  searches: {},
  currentSearch: {},
  currentSearchQuery: '',
  saved: []
};

export const searchJobs = createAsyncThunk('counter/searchJobs', async (query) => {
  try {
    console.log(query);
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_jobs',
        q: query,
        hl: 'en',
        api_key: API_KEY,
      },
    });

    let results = response.data;
    console.log('did an api call');
    return results;
  } catch (error) {
    console.error(error);
  }
});

// Define the counter slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchJobsSuccess(state, { payload }) {
      state.currentSearch.concat(payload.jobs_results)
    },
    saveJob(state, {payload}){
      state.saved.push({
        item: payload,
        date: new Date().toLocaleDateString(),
        status: 'saved'
      })
    },
    removeJob(state, {payload}){
      console.log(typeof(payload))
      state.saved.splice(payload, 1)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchJobs.fulfilled, (state, { payload }) => {
      state.currentSearch = payload.jobs_results
      let query = findQuery(payload.search_parameters.q)
      state.searches[query] = payload.jobs_results
      state.currentSearchQuery = query
      console.log('hello', state.currentSearchQuery)
    });
  },
});


export const {searchJobsSuccess, saveJob, removeJob} = searchSlice.actions
export default searchSlice.reducer;
