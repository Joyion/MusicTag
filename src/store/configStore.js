import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import selectedSongReducer from "../reducers/selectedSong.reduce"

import cueReducer from "../reducers/cues.reduce"
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const store = createStore(
    combineReducers({
      selectedSong: selectedSongReducer,
      cues: cueReducer
 
    }),
    composeEnhancers(applyMiddleware(thunk)))

export default store;