
import axios from "axios";

// opens just the Edit Menu with cue information
export const selectSong = (cue, composerBank, publisherBank) => ({
    type: "SELECT_SONG",
    cue,
    composerBank,
    publisherBank
});

// opens just the Edit Menu with cue information
export const startSelectSong = (dispatch, cue) => {
    console.log(cue._id);
    let host = "http://localhost:5000/api/bicues/" + cue._id;

    axios.get(host
    ).then(function (response) {
        console.log(response);
        let json = JSON.parse(response.data);
        console.log(json);
        dispatch(selectSong(json.cue, json.composerBank, json.publisherBank))
    }).catch(function(err){
        console.log(err);
    })

}

// set which item to edit Add Edit Menu
export const setListAction = (listTitle) => ({
    type: "SET_LIST",
    listTitle: listTitle.trim(),
})

// set which item to edit Add Edit Menu
export const startSetListAction = (listTitle, dispatch) => {
    dispatch(setListAction(listTitle));
   
}

export const addListItem = (listTitle, listItem) => ({
    type: "ADD_LIST_ITEM",
    listTitle,
    listItem
})

export const changeItem = (category, change) => ({
    type: "CHANGE_ITEM",
    category,
    change
})

export const removeListItem = (listTitle, listItem) => ({
    type: "REMOVE_LIST_ITEM",
    listTitle,
    listItem
})

export const selectPlaySong = (playSong) => ({
    type: "SELECT_PLAY_SONG",
    playSong
})


export const closeEdit = () => ({
    type: "CLOSE_EDIT"
})

export const closeAddEdit = () => ({
    type: "CLOSE_ADD_EDIT"
})


export const updateItem = (list, listItem) => ({
    type: "UPDATE_ITEM",
    list,
    listItem
})

export const saveEdit = (cue) => ({
    type: "SAVE_EDIT"
});

export const compPubEdit = (cue, composerBank, publisherBank) => ({
    type: "UPDATE_SELECT_SONG",
    cue,
    composerBank,
    publisherBank
})

export const compEdit = (cue) => ({
    type: "UPDATE_SELECT_SONG",
    cue
})

// gets cue with updated publisher/composer information from database and doesn't close edit windows
export const startUpdate = (dispatch, cue) => {
    console.log(cue._id);
    let host = "http://localhost:5000/api/bicues/" + cue._id;
    
    axios.get(host
        ).then(function (response) {
            console.log(response);
            let json = JSON.parse(response.data);
            console.log(json);
            dispatch(compPubEdit(json.cue, json.composerBank, json.publisherBank))
        }).catch(function(err){
            console.log(err);
        })
  
}

// updates cue information and closes edit windows 
export const startCueUpdate = (cue, dispatch) => {
    const host = "http://localhost:5000/api/bicues/cue/" + cue._id;
    axios.put(host, {cue})
        .then(function (response){
            console.log("In dispatch of cue update");
            let json = (JSON.parse(response.data))
            console.log(json);
            dispatch(saveEdit())
        })
}

// creates composer on composer model in mongoose
 export const startComposerEdit = (composer, cue, dispatch) => {
    const comp = "http://localhost:5000/api/bicues/composer";
    const songId = cue._id;
    console.log("IN start composer Edit");
    axios.post(comp, {composer, songId})
            .then(function (response){
                console.log("In dispatch of composer");
                let json = (JSON.parse(response.data))
                console.log(json);
                startUpdate(dispatch, cue);
            })
}

// creates publisher on publisher model in mongoose 
export const startPubEdit = (publisher, cue, dispatch) => {
    const pub = "http://localhost:5000/api/bicues/publisher";
    const songId = cue._id;
    console.log("In start pubEdit");
 axios.post(pub, { publisher, songId})
        .then(function (response){
            console.log("In dispatch of publisher");
            let json = (JSON.parse(response.data))
            console.log(json);
            startUpdate(dispatch, cue)
        })
        .catch(function(err){
            console.log(err);
        })
}


// delete composer on composer model in mongoose
export const startCompDelete = (songId, compId, dispatch, cue) => {
    const host = "http://localhost:5000/api/bicues/composer/" + songId + "/" + compId;
    axios.delete(host)
        .then(function (response){
            let json = (JSON.parse(response.data));
           startUpdate(dispatch, cue);
        })
        .catch(function(err){
            console.log(err);
        })
}

// delete publisher on publisher model in mongoose
export const startPubDelete = (songId, pubId, dispatch, cue) => {
    const host = "http://localhost:5000/api/bicues/publisher/" + songId + "/" + pubId;
    axios.delete(host)
        .then(function (response){
            let json = (JSON.parse(response.data));
           startUpdate(dispatch, cue);
        })
        .catch(function(err){
            console.log(err);
        })
}