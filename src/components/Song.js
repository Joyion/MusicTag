import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setSong, startSetSong} from "../actions/cues.action";
class Song extends React.Component{
    constructor(props){
        super(props);
        this.playingSong = this.playingSong.bind(this);
        this.editSong = this.editSong.bind(this);
    }

    playingSong(){
        this.props.playSong();
    }

    editSong(){
        //startSetSong(this.props.cue._id, this.props.dispatch, this.props.history.push);
        this.props.history.push("/EditSong/" + this.props.cue._id);

    }
    
    render(){
        return (
            <div>
                <div>
                    <p>{this.props.cue.songTitle}</p>
                    <div>{this.props.cue.description && this.props.cue.description.map((d, i)=>{
                        const desc = d + " "
                        return <p key={i}>{desc}</p>
                    })}</div>
                </div>
                <div>
                <div>{this.props.cue.composers && this.props.cue.composers.map((c, i) => {
                    return <p key={i}>{c.fullName}</p>
                })}</div>
                </div>
                <div>
                    <p>{this.props.cue.tempo && this.props.cue.tempo}</p>
                </div>
                <div>
                    <button>PLAY</button>
                    <button onClick={this.editSong}>EDIT</button>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    cue: ownProps.cue

})

const myComponent = connect(mapStateToProps)(Song);

export default withRouter(myComponent);