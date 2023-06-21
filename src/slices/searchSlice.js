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
        status: 'Saved'
      })
    },
    removeJob(state, {payload}){
      state.saved.splice(payload, 1)
    },
    updateStatus(state, {payload}){
      let index = state.saved.findIndex(object => object.item.job_id === payload.obj.item.job_id)
      console.log(index)
      state.saved[index] = {
        item: payload.obj.item,
        date: new Date().toLocaleDateString(),
        status: payload.value
      }
    },
    updateSearchList(state, {payload}){
      delete state.searches[payload]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchJobs.fulfilled, (state, { payload }) => {
      state.currentSearch = payload.jobs_results
      let query = findQuery(payload.search_parameters.q)
      state.searches[query] = {
        results: payload.jobs_results,
        date: new Date().toLocaleDateString()
      }
      state.currentSearchQuery = query
    });
  },
});


export const {searchJobsSuccess, saveJob, removeJob, updateStatus, updateSearchList} = searchSlice.actions
export default searchSlice.reducer;
