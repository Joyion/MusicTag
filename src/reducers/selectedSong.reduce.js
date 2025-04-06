import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
   composerBank: [{
       id: "THISISANID",
       fullName: "Joyion Timmons",
       firstName: "Joyion",
       middleName: "Cne",
       lastName: "Timmons",
       cae: "123",
       pro: "BMI"
   }],
   publisherBank: [] 
};

const selectedSongSlice = createSlice({
   name: "selectedSong",
   defaultState,
   reducers: [{
       getSelectedSong(state, action) {
           return {
               ...state,
               selectedSong: action.payload.selectedSong,
               composers: action.payload.comps,
               publishers: action.payload.pubs,
           }
       }
   }, {
       getAllComposers(state, action) {
           return {
               ...state,
               composers: action.payload.comps,
               publishers: action.payload.pubs,
           }
       }
   }, {
       setSong(state, action) {
           return {
               ...state,
               selectedSong: action.payload.cue
           }
       }
   }, {
       getSetSong(state) {
           return {
               ...state
           }
       }
   }]
})

export default (state = defaultState, action) => {
   switch(action.type){
     
       default:
           return state;
   }
}