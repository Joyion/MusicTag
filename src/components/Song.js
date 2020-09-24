import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setSong, startSetSong } from "../actions/cues.action";
class Song extends React.Component {
    constructor(props) {
        super(props);
        this.playingSong = this.playingSong.bind(this);
        this.editSong = this.editSong.bind(this);
    }

    playingSong(e) {
        e.preventDefault();
        console.log(`${this.props.cue.release}/${this.props.cue.fileName}`)
        let fileName = `${this.props.cue.release}/${this.props.cue.fileName}`;
        this.props.setAudioFile(fileName, this.props.cue.songTitle);
    }

    editSong() {
        //startSetSong(this.props.cue._id, this.props.dispatch, this.props.history.push);
        this.props.history.push("/EditSong/" + this.props.cue._id);

    }

    render() {
        return (
            <div className="song">
                <div className="song__large">
                    <div >
                        <p className="song__title">{this.props.cue.songTitle}</p>
                    </div>

                    <div className="song__desc">
                        <p>
                            {this.props.cue.descriptions && this.props.cue.descriptions.map((d, i) => {
        
                                if (i < 5) {
                                    if(i == 4){
                                        return d;

                                    }else{
                                       return d + ", " ;
                                    }
                                    
                                }


                            })}
                        </p>
                    </div>
                </div>

                <div className="song__large" >
                    <div>
                        {this.props.cue.composers ? this.props.cue.composers.map((c, i) => { return <p key={i}>{c.fullName}</p> }) : " "}
                    </div>
                </div>

                <div className="song__large">
                    <div>
                        {this.props.cue.publishers ? this.props.cue.publishers.map((p, i) => { return <p key={i}>{`${p.publisherName}  (${p.publisherPro}) ${p.publisherSplit}% `}</p> }) : " "}
                    </div>
                </div>

                <div className="song__tempo">
                    <p>{this.props.cue.tempo && this.props.cue.tempo}</p>
                </div>

                <div>
                    <button className="song__play" onClick={this.playingSong}>PLAY</button>
                    <button className="song__edit" onClick={this.editSong}>EDIT</button>

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