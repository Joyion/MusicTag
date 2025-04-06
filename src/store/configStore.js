// import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
// import selectedSongReducer from "../reducers/selectedSong.reduce"

// import cueReducer from "../reducers/cues.reduce"
// import thunk from 'redux-thunk';
import cueReducer from "../reducers/cues.reduce.js"
// import { createSlice } from "@reduxjs/toolkit";

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    // selectedSong: selectedSongReducer,
    cues: cueReducer
  }
})



// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



// const store = createStore(
//     combineReducers({
//       selectedSong: selectedSongReducer,
//       cues: cueReducer
 
//     }),
//     composeEnhancers(applyMiddleware(thunk)))

// export default store;