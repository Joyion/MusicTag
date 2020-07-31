import axios from "axios"

export const getCues = (cues, totalCues, page, totalPages, status) => ({
  type: "GET_CUES",
  cues,
  totalCues: parseInt(totalCues),
  page: parseInt(page),
  totalPages: parseInt(totalPages),
  status,
})

export const startGetCues = (page, filter, dispatch) => {
  console.log("In start get cues");
  console.log("Current page: " + page);
  axios.get('/api/bicues/getBiCues', {
    params: {
      page,
      status: filter,
    }
  })
    .then(function (response) {
      const data = JSON.parse(response.data);
      console.log("Returned From startgetCues \n" + data.cues);
      dispatch(getCues(data.cues, data.totalCues, data.page, data.totalPages, data.status))
    })
    .catch(function (error) {
      console.log(error);
    })

}

export const updateCue = (cue) => ({
  type: "UPDATE_CUE",
  cue
})

export const startUpdateCue = (cue, dispatch) => {
  console.log("Starting update");
  axios.post('/api/bicues/updateCue', {
    params: {
      id: cue._id,
      trackId: cue.trackId
    }
  })
    .then(function (response) {
      const data = JSON.parse(response.data);
      console.log(data);
      dispatch(updateCue(data));
    })
    .catch(function (error) {
      console.log(error);
    })
}

export const setSong = (cue) => ({
  type: "SET_SONG",
  cue
})

export const startSetSong = (cue, dispatch) => {
  console.log("Starting update " + cue);
  axios.post('/api/bicues/getMetadata', {

     id: cue


})
.then((response) => {
 const data = JSON.parse(response.data);
 console.log(data);
  dispatch(setSong(data));
})
.catch( (error) => {
 console.log(error);
})

}


// export const startSetSong = (id) => {
  
//   return (dispatch) => {

//     axios.post('/api/bicues/getMetadata', {
//       id: id
//     })
//       .then((response) => {
//         const data = JSON.parse(response.data);
//         console.log(data);
//         dispatch(setSong(data));
//       })
//       .catch((error) => {
//         console.log(error);
//       })

//   }
// }

export const getSetSong = () => ({
  type: "GET_SET_SONG"
})