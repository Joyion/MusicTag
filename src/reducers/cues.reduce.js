const defaultState = {
        cues: ["tom"],
        totalCues: 0,
        page: 1,
        totalPages: 1,
        status: "Pulled",
        selectSong: ""
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
            return state;
        case "PLAY_SONG":
            return {
                ...state,
                selectSong: action.selectSong
            }
        default:
            return state;
    }
}