import React from 'react';
// import ReactDOM, {render} from 'react-dom';
import createRoot from 'react-dom/client'
// import {createStore} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import Search from './components/Search'
import SearchDetails from './components/SearchDetails'
import Tasks from './components/Tasks'
// import reducer from './reducers/reducer'
import rootReducer from './slices/combinedSlice'
import BaseLayout from './components/layout/BaseLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' //defaults to local storage for web
import {PersistGate} from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css';

// const store = createStore(reducer)

const persistConfig = {
  key: 'root',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),});

let persistor = persistStore(store)

//redux thunk

const root = createRoot.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  <Provider store={store}>
  <PersistGate persistor={persistor} loading={null}>

  <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/tasks' element={<Tasks />}/>
          <Route path='/job-details/:id' element={<SearchDetails />}/>
          
        </Routes>
      </BaseLayout>
    </Router>
  
  </PersistGate>
  </Provider>
  </React.StrictMode>
);


