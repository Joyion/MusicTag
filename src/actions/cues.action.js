import axios from "axios"

export const getCues = (cues, totalCues, page, totalPages, status) => ({
    type: "GET_CUES",
    cues,
    totalCues,
    page,
    totalPages,
    status,
})

export const startGetCues = (page, filter, dispatch) => {
  console.log("In start get cues");
    axios.get('/api/bicues/getBiCues', {
           params: {
            page,
            status: filter,
          }
      })
      .then(function (response) {
        const data = JSON.parse(response.data);
        console.log(data);
      dispatch(getCues(data.cues, data.totalCues, data.page, data.totalPages, data.status))
      })
      .catch(function (error) {
        console.log(error);
      })
    
}