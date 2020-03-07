const defaultState = {
    cues: [],
    totalResultCount: 0,
    currentPageDisplay: 0,
    currentPage: 1,
    filters: {}
}

export default (state = defaultState, action) => {
    switch(action.type){
        case "GET_CUES":
            return {cues: action.cues, 
                    totalResultCount: 0,
                    currentPageCount: 0,
                    currentPage: 1,
                    filters: {}
            }
        default:
            return state;
    }
}