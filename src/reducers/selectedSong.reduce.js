const defaultState = {
    _id: "",
    catalogName: "",
    songTitle: "",
    metadataComposer: "",
    metadataPublisher: "",
    composer: [],
    composerSplit: [],
    publisherSplit: [],
    publisher: [],
    categoryStyle: "",
    instruments: [],
    description: [],
    tempo: "",
    rating: 0,
    bands: [],
    films: [],
    duration: "",
    top40: "",
    status: "",
    fileName: "",
    createdDate: "",
    listTitle: "",
    list: [],
    playSong: "",
    openEdit: "side-nav-closed",
    openAddEdit: "add-edit-nav-closed",
    instrumentBank: ["keys", "trumpet", "percussion"],
    descriptionBank: ["sad", "happy", "mellow"],
    composerBank: [],
    publisherBank: [],
    categoryBank: ["Dance", "Pop", "R&B", "Rock"],
    tempoBank: ["Slow", "Medium", "Fast", "Changing Tempo"],
    top40Bank: ["Rock", "Dance", "Hip-Hop/R&B"],
    statusBank: ["Active", "Pending", "Pulled"]
    
};

export default (state = defaultState, action) => {
   switch(action.type){
       case "SELECT_SONG":
           return {...action.cue, 
            listTitle: state.listTitle, 
            list: state.list, 
            playSong: state.playSong,
            openEdit: "side-nav-open",
            openAddEdit: "add-edit-nav-closed",
            instrumentBank: state.instrumentBank,
            descriptionBank: state.descriptionBank,
            composerBank: action.composerBank,
            publisherBank: action.publisherBank,
            categoryBank: state.categoryBank,
            tempoBank: state.tempoBank,
            top40Bank: state.top40Bank,
            statusBank: state.statusBank}

        case "UPDATE_SELECT_SONG":
            return {...action.cue, 
                listTitle: state.listTitle, 
                list: state.list, 
                playSong: state.playSong,
                openEdit: state.openEdit,
                openAddEdit: state.openAddEdit,
                instrumentBank: state.instrumentBank,
                descriptionBank: state.descriptionBank,
                composerBank: action.composerBank,
                publisherBank: action.publisherBank,
                categoryBank: state.categoryBank,
                tempoBank: state.tempoBank,
                top40Bank: state.top40Bank,
                statusBank: state.statusBank}

        case "UPDATE_ITEM":
            return {...state, [action.list]: action.listItem}
        case "ADD_LIST_ITEM":
            switch(action.listTitle.toLowerCase()){
                case "composers":

                if(state.composer.length > 0){
                    const composers = state.composer.filter((c) => {
                                return c.fullName.toLowerCase() == action.listItem.fullName.toLowerCase();
                    });
                    if(composers.length == 0){
                        const oldC = state.composer.map((c) => {return c})
                        oldC.push(action.listItem);
                        return {...state, composer: oldC}
                    }
                }
                else {
                    const oldC = state.composer.map((c) => {return c})
                        oldC.push(action.listItem);
                        return {...state, composer: oldC}
                }

               case "publishers":
                    if(state.publisher.length > 0){
                            const publishers = state.publisher.filter((p) => {
                            return p.name.toLowerCase() == action.listItem.name.toLowerCase();
                        }); 
                        
                        if(publishers.length == 0){
                            const oldP = state.publisher.map((p) => {return p})
                            oldP.push(action.listItem);
                            return {...state, publisher: oldP}
                        }

                    }
                    else{
                        const oldP = state.publisher.map((p) => {return p})
                        oldP.push(action.listItem);
                        return {...state, publisher: oldP}
                    }         
                case "instruments":
                    if(state.instruments.includes(action.listItem)){
                      return state;
                    }
                    else {
                    const newInstruments = state.instruments.concat([action.listItem]);
                    return {...state, instruments: newInstruments, list: newInstruments}  
                    }                  
                case "descriptions":
                    if(state.description.includes(action.listItem)){
                        return state;
                    }
                    else {
                    const newDescription = state.description.concat([action.listItem]);
                    return {...state, description: newDescription, list: newDescription}  
                    }
                    
                case "bands":
                    if(state.bands.includes(action.listItem)){
                        return state;
                    }
                    else{
                    const newBands = state.bands.concat([action.listItem]);
                    return {...state, bands: newBands, list: newBands}  
                    }
                    
                case "films/tv":
                    if(state.films.includes(action.listItem)){
                        return state;
                    }
                    else {
                      const newFilms = state.films.concat([action.listItem]);
                    return {...state, films: newFilms, list: newFilms}  
                    }
                    
                default:
                    return state;
            }
        case "CHANGE_ITEM":
            return state;
        case "REMOVE_LIST_ITEM":
            console.log(action.listTitle)
            switch(action.listTitle.toLowerCase()){
                case "instruments":
                    const newInstruments = state.instruments.filter( (i) => {return i != action.listItem});
                    console.log(newInstruments);
                    return {...state, instruments: newInstruments, list: newInstruments}
                case "descriptions":
                    const newDescription = state.description.filter( (d) => {return d != action.listItem});
                    return {...state, description: newDescription, list: newDescription}
                case "bands":
                    const newBands = state.bands.filter( (b) => {return b != action.listItem});
                    return {...state, bands: newBands, list: newBands}
                case "films/tv":
                    const newFilms = state.films.filter( (f) => {return f != action.listItem });
                    return {...state, films: newFilms, list: newFilms}
                default:
                    return state;
            }     
        case "SET_LIST":
            switch(action.listTitle.toLowerCase()){
                case "instruments":
                    return {...state, listTitle: action.listTitle, list: state.instruments, openAddEdit: "add-edit-nav-open"}
                case "descriptions":
                    return {...state, listTitle: action.listTitle, list: state.description, openAddEdit: "add-edit-nav-open"}
                case "bands":
                    return {...state, listTitle: action.listTitle, list: state.bands, openAddEdit: "add-edit-nav-open"}
                case "films/tv":
                    return {...state, listTitle: action.listTitle, list: state.films, openAddEdit: "add-edit-nav-open"}
                case "composers":
                    return {...state, listTitle: action.listTitle, list: [state.metadataComposer, state.metadataPublisher], openAddEdit: "add-edit-nav-open"}
                default:
                    return state;
            }
        case "SELECT_PLAY_SONG":
            return {...state, playSong: action.playSong}

        case "CLOSE_ADD_EDIT":
            return {...state,
            openAddEdit: "add-edit-nav-closed"}

        case "CLOSE_EDIT":
            return {...state, openEdit: "side-nav-closed", openAddEdit: "add-edit-nav-closed"}
        case "SAVE_EDIT":
            return defaultState;
       default:
           return state;
   }
}