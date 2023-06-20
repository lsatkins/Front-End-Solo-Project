import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {findQuery} from '../functions'

const API_KEY = process.env.REACT_APP_API_KEY;

const initialState = {
  searches: {},
  currentSearch: {},
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
      console.log('payload', payload);
      console.log('state', state);
      state.currentSearch.concat(payload.jobs_results)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchJobs.fulfilled, (state, { payload }) => {
      console.log('payload', payload);
      console.log('state', state);
      state.currentSearch = payload.jobs_results
      let query = findQuery(payload.search_parameters.q)
      state.searches[query] = payload.jobs_results
      // state.searches.push()
    });
  },
});


export const {searchJobsSuccess} = searchSlice.actions
export default searchSlice.reducer;
