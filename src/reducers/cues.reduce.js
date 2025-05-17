import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
        cues: [],
        totalCues: 25,
        page: 25,
        totalPages: 25,
        status: "Pending",
        release: "All",
        selectedSong: {},
        releases: [],
        composers: [],
        releases: [],
        publishers: [],
}

 const cuesSlice = createSlice({
    name: "cues",
    initialState: defaultState,
    reducers: {
        setFilters: (state, action) => {
            return {
                ...state,
                release: action.payload.release,
                status: action.payload.status,
            };
        },
        
        getCues: (state, action) => {
        
              return {  
                    ...state,
                    cues: action.payload.cues,
                    page: action.payload.page,
                    status: action.payload.status,
                    totalCues: action.payload.totalCues,
                    totalPages: action.payload.totalPages,
                    selectedSong: action.payload.selectedSong
              };

            },
        
        updateCues: (state, action) => {
                   return { ...state,
                    selectedSong: action.payload.cue,
                    composers: action.payload.comps,
                    publishers: action.payload.pubs,
                   }
            
            },
      
        getAllComposers: (state, action) => {
               
           return { ...state,
            composers: action.payload.comps,
            publishers: action.payload.pubs,
           }
                
        },

        setSelectedSong: (state, action) => {
    
                   return { ...state,
                    selectedSong: action.payload.cue
                   }

            },
        getSetSong: (state, action) => {
                
                      return {  ...state,
                        selectedSong: action.payload.selectedSong
                      }
                
            },
        getReleases: (state, action) => {
               
                   return { ...state,
                    release: action.payload.releases
                   }
                
        },
        playSong: (state, action) => {
             
                   return { ...state,
                   selectedSong: action.payload.selectedSong
                }
    },
    }
})

export const {
    getCues, 
    updateCue, 
    getAllComposers, 
    setSong,
    getSetSong,
    getRelease,
    getReleases,
    playSong
} = cuesSlice.actions;

export default cuesSlice.reducer;