const defaultState = {
        cues: [],
        totalCues: 0,
        page: 1,
        totalPages: 1,
        status: "Pending",
        selectSong: {
            catalogName: ""
        },
        composers: [],
        releases: [],
        publishers: [],
}

export default (state = defaultState, action) => {
    switch(action.type){
        case "GET_CUES":
            return {
                    ...state,
                    cues: action.cues, 
                    page: action.page,
                    status: action.status,
                    totalCues: action.totalCues,
                    totalPages: action.totalPages,
                    selectSong: action.selectSong,
            }
        case "UPDATE_CUE":
            return {
                ...state,
                selectSong: action.cue,
                composers: action.comps,
                publishers: action.pubs,
            };
        case "GET_ALL_COMPOSERS":
            return {
                ...state,
                composers: action.composers,
                publishers: action.pubs,
            }
        case "SET_SONG":
            return {
                ...state,
                selectSong: action.cue
            }
        case "GET_SET_SONG":
            return{
                ...state
            }
        case "GET_RELEASES":
            return {
                ...state,
                releases: action.releases
            }
        case "PLAY_SONG":
            return {
                ...state,
                selectSong: action.selectSong
            }
        default:
            return state;
    }
}