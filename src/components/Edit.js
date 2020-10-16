import React from 'react';
import { connect } from "react-redux"
import { startSetSong, startUpdateCue, startGetComposers,startCopy } from "../actions/cues.action";





class Edit extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            proArray: pros,
            catalogName: "",
            songTitle: "",
            fName: "",
            mName: "",
            lName: "",
            suffix: "",
            cSplit: 0,
            cae: "",
            pro: "ASCAP",
            addComposer: -1,
            newSplit: 0,
            publisher: -1,
            publisherArray: publisherArray,
            publisherSplit: 0,
            genreArray: sortGenres,
            genre: -1,
            instrumentArray: instrumentArray,
            newInstrument: "",
            descriptionArray: descriptionArray,
            newDescription: "",
            tempo: "",
            rating: 0,
            band: "",
            film: "",
            status: "",
            mainVersion: "",
            styleGreen: { backgroundColor: "green" },
            styleRed: { backgroundColor: "red" },
        }

    }

    render(){
        return(
            <div>
                <h2>Add Composer</h2>
                <form onSubmit={this.addComposer}>
                    <select onChange={this.handleInput}>

                    </select>
                </form>
            </div>
        )
    }
}