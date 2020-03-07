import axios from "axios"

export const getCues = (cues, 
                        totalResultCount = 1, 
                        currentPageDisplay = 1, 
                        currentPage = 1, filters = {}) => ({
    type: "GET_CUES",
    cues: cues,
    totalResultCount: totalResultCount,
    currentPageDisplay: currentPageDisplay,
    currentPage: currentPage,
    filters: filters

})

export const startGetCues = (dispatch, filters, currentPage = 1) => {
    axios.get('api/bicues', {
        // params: {
        //   composer: filters.composer,
        //   categoryStyle: filters.categoryStyle,
        //   instruments: filters.instruments,
        //   description: filters.description,
        //   tempo: filters.tempo,
        //   bands: filters.bands,
        //   films: filters.films,
        //   duration: filters.duration,
        //   top40: filters.top40,
        //   status: filters.status
        // }
      })
      .then(function (response) {
        const currentPageCount = 0;
        const cues = JSON.parse(response.data);
        console.log(cues);
      dispatch(getCues(cues, 1, 1, 25,  {}))
      })
      .catch(function (error) {
        console.log(error);
      })
    
}