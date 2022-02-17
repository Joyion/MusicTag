const defaultState = {
        cues: [],
        totalCues: 0,
        page: 1,
        totalPages: 1,
        status: "Pending",
        release: "All",
        selectSong: {
            catalogName: ""
        },
        releases: [],
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
            break;
        case "UPDATE_CUE":
            return {
                ...state,
                selectSong: action.cue,
                composers: action.comps,
                publishers: action.pubs,
            };
            break;
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
            break;
        case "GET_SET_SONG":
            return{
                ...state
            }
        case "GET_RELEASES":
            return {
                ...state,
                releases: action.releases
            }
            break;
        case "PLAY_SONG":
            return {
                ...state,
                selectSong: action.selectSong
            }
            break;
        default:
            return state;
    }
}